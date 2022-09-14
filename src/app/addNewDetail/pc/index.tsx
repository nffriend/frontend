import { useEffect, useState, useMemo } from "react";
import cs from "./index.module.scss";
import classNames from "classnames";

import { message, Radio, RadioChangeEvent, Button, Input, Spin } from "antd";

import { useRouter } from "next/router";
import useLayout from "@/hooks/useLayout";
import useUserType from "@/hooks/useUserType";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Iframe, { IFRAME_TYPE } from "../../nff/components/Iframe";

import useCom2Datas from "@/hooks/useCom2Datas";
import axios from "@/utils/axios";
// import sourceUrls from "./sourceUrl";

enum IFRAME_SIZE {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export default function AddNewDetail() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const query = router.query;
  const [editInfoTemp, setIsEditInfo] = useState<any>(null);
  const { list: iframeList } = useCom2Datas();

  const { account } = useUserType();
  const { addLayoutDIY2, editDIY2, updateDIYDatasByUser, DIY2Info } = useLayout(account || "");

  function goback() {
    sessionStorage.setItem("widgets", "1");
    router.back();
  }

  const [size, setSize] = useState(IFRAME_SIZE.Small);
  function onRadioChange(e: RadioChangeEvent) {
    setSize(e.target.value);
    if (iframeItem.id === "pinterest") {
      const formOPtionsTemp = [...formOptions];
      formOPtionsTemp.forEach(item => {
        if (e.target.value === IFRAME_SIZE.Small) {
          if (item.key === "width") item.value = "360px";
          if (item.key === "height") item.value = "400px";
        } else if (e.target.value === IFRAME_SIZE.Medium) {
          if (item.key === "width") item.value = "540px";
          if (item.key === "height") item.value = "400px";
        } else {
          if (item.key === "width") item.value = "1100px";
          if (item.key === "height") item.value = "400px";
        }
      });
      setFormOptions(formOPtionsTemp);
    }
  }

  const [inputValue, setInputValue] = useState("");
  const [iframeItem, setIframeItem] = useState<any>(null);
  useEffect(() => {
    // @ts-ignore
    const data = iframeList.find(item => item.id === query.type);
    console.log("init iframeList", data);
    if (!data) {
      setIframeItem(null);
    } else {
      setIframeItem(data);
    }
  }, [query.type, iframeList]);

  const [formOptions, setFormOptions] = useState<{ key: string; value: string }[]>([]);

  function onFormInput(e: any) {
    setInputValue(e.target.value);
    // 待解析的URL
    let url = iframeItem?.input || iframeItem?.url || "";
    url = url.replace("?", "\\?");

    // 有哪些属性
    let pArr: string[] = url.match(/(?<item>(\$\{.+?\}))/gi) || [];
    pArr = pArr.map((item: string) => {
      return item.replace(/^\$\{/, "").replace(/\}$/, "");
    });

    // 为正则做准备
    let options: any[] = url.split(/\$\{.+?\}/);
    //console.log("url:", url);
    // 生成正则，为了提取属性
    const exp = options.reduce((res, item, index) => {
      res += item;
      if (index < options.length - 1) {
        res += "(?<" + pArr[index] + ">(.+))";
      }
      return res;
    }, "");

    let input = e.target.value;

    // input是否需要split ?
    if (!url.includes("?")) {
      input = input.split("?")[0];
    }

    let params = input.match(new RegExp(exp)) || { groups: {} };
    params = params.groups;
    //console.log("params:", params);

    // 先校验是否符合规范，如果符合，自动解析并填充
    let isError = false;
    if (iframeItem.id !== "vimeo") {
      for (let i = 0; i < pArr.length; i++) {
        if (params[pArr[i]]) continue;
        else {
          isError = true;
          break;
        }
      }
    }

    if (isError || !input) {
      setFormOptions([]);
      return;
    }

    const formOPtionsTemp = [...formOptions];
    for (let i = 0; i < pArr.length; i++) {
      if (params[pArr[i]]) {
        const old = formOPtionsTemp.find(obj => obj.key === pArr[i]);
        if (old) {
          old.value = params[pArr[i]];
        } else {
          formOPtionsTemp.push({ key: pArr[i], value: params[pArr[i]] });
        }
      }
    }

    // special;
    if (iframeItem.id === "pinterest") {
      if (size === IFRAME_SIZE.Small) {
        formOPtionsTemp.push({ key: "width", value: "360px" });
        formOPtionsTemp.push({ key: "height", value: "400px" });
      } else if (size === IFRAME_SIZE.Medium) {
        formOPtionsTemp.push({ key: "width", value: "540px" });
        formOPtionsTemp.push({ key: "height", value: "400px" });
      } else {
        formOPtionsTemp.push({ key: "width", value: "1100px" });
        formOPtionsTemp.push({ key: "height", value: "400px" });
      }
    }

    if (iframeItem.id === "vimeo") {
      vimeoIdReq(input);
      return;
    }

    setFormOptions(formOPtionsTemp);
  }

  async function vimeoIdReq(url: string) {
    const res: any = await axios.get(`https://vimeo.com/api/oembed.json?url=${url}`);
    if (!res.html) {
      message.error("Unrecognized website");
      return;
    }
    const split = res.html.split(" ").filter((i: string) => i.indexOf("src=") !== -1);
    if (!split.length) {
      message.error("Unrecognized website");
      return;
    }
    const url_params = split[0].split("?");
    const videoId = url_params[0].replace('src="https://player.vimeo.com/video/', "");
    const others = url_params[1].split("&amp;");
    const h = others[0].replace("h=", "");
    const app_id = others[1].replace("app_id=", "");
    setFormOptions([
      { key: "videoId", value: videoId },
      { key: "h", value: h },
      { key: "app_id", value: app_id },
    ]);
  }

  async function onSubmit() {
    if (loading) return;

    // 先校验参数是不是都填了
    if (!isOk) {
      message.error("Unrecognized website");
      return;
    }

    setLoading(true);

    // 调用保存 然后返回上一页
    let res;
    if (editInfoTemp) {
      let w = 2;
      switch (size) {
        case "small":
          w = 2;
          break;
        case "medium":
          w = 4;
          break;
        case "large":
          w = 6;
      }
      res = await updateDIYDatasByUser(editInfoTemp.id, { detail: formOptions, name: editInfoTemp.sourceData.name, sourceUrl: inputValue }, w);
    } else {
      res = await addLayoutDIY2(query.type as string, size, formOptions, inputValue);
    }

    setLoading(false);

    if (res?.type) {
      message.success("success");
      goback();
    } else {
      message.error("error");
    }
  }

  const isOk = useMemo(() => {
    if (!iframeItem) return false;
    const optionLength = iframeItem.params.reduce((res: number, item: any) => {
      const s = formOptions.find(obj => obj.key === item);
      if (!s) return res;
      if (s.value) return res + 1;
      return res;
    }, 0);

    if (optionLength < iframeItem.params.length) {
      return false;
    }

    return true;
  }, [formOptions, iframeItem]);

  // 组装最终数据
  const dataRes = useMemo(() => {
    console.log("ha?", iframeItem, formOptions);
    let url = "";
    let srcDoc = "";

    if (!iframeItem) {
      return { url, srcDoc, type: IFRAME_TYPE.Single };
    }

    if (iframeItem.url) {
      url = iframeItem.url;
      iframeItem.params.forEach((item: string) => {
        const exp = new RegExp("\\$\\{" + item + "\\}", "g");
        const s = formOptions.find(obj => obj.key === item);
        if (s) {
          url = url.replace(exp, s.value);
        }
      });
    }

    if (iframeItem.srcDoc) {
      srcDoc = iframeItem.srcDoc;
      iframeItem.params.forEach((item: string) => {
        const exp = new RegExp("\\$\\{" + item + "\\}", "g");
        const s = formOptions.find(obj => obj.key === item);
        if (s) {
          srcDoc = srcDoc.replace(exp, s.value);
        }
      });
    }

    return { url, srcDoc, type: srcDoc ? IFRAME_TYPE.SrcDoc : IFRAME_TYPE.Single };
  }, [iframeItem, formOptions]);

  useEffect(() => {
    console.log("init DIY2:", DIY2Info);
    if (DIY2Info && iframeItem) {
      setIsEditInfo(DIY2Info);
      switch (DIY2Info.w) {
        case 2:
          setSize(IFRAME_SIZE.Small);
          break;
        case 4:
          setSize(IFRAME_SIZE.Medium);
          break;
        case 6:
          setSize(IFRAME_SIZE.Large);
          break;
      }
      if (DIY2Info.sourceData.sourceUrl) {
        onFormInput({ target: { value: DIY2Info.sourceData.sourceUrl } });
      }
      editDIY2("", "", 0);
    }
  }, [DIY2Info, iframeItem]);

  return (
    <div className={cs.root}>
      <div className={cs.header}>
        <ArrowLeftOutlined className={cs.back} onClick={goback} />
        <div className={cs.title}>Edit Drtail</div>
      </div>

      {!!iframeItem && (
        <div className={cs.content}>
          <div className={cs.headCard}>
            <img className={cs.icon} src={iframeItem.icon} alt="icon" />
            <div className={classNames(cs.info, "all_nowrap")}>
              <div>{iframeItem.name || ""}</div>
              <div>{iframeItem?.info || ""}</div>
            </div>
            <Button className={cs.reselect} onClick={goback}>
              Reselect
            </Button>
          </div>
          <div className={classNames(cs.prevView, { [cs.medium]: size === "medium", [cs.large]: size === "large" })}>{isOk ? <Iframe {...dataRes} /> : null}</div>

          <div className={cs.label}>
            <div className={cs.title}>Select Size</div>
            <div className={cs.size}>
              <Radio.Group onChange={onRadioChange} value={size}>
                <Radio value={IFRAME_SIZE.Small}>Small</Radio>
                <Radio value={IFRAME_SIZE.Medium}>Medium</Radio>
                <Radio value={IFRAME_SIZE.Large}>Large</Radio>
              </Radio.Group>
            </div>
          </div>

          {!!iframeItem?.params?.length && (
            <div className={cs.label}>
              <div className={cs.title}>URL</div>
              <div className={cs.formCom}>
                <Input value={inputValue} onChange={onFormInput} placeholder={`Paste a link here, e.g. ${iframeItem.sample_link}`}/>
              </div>
            </div>
          )}

          <div className={classNames("btn", cs.submit)} onClick={onSubmit}>
            Save {loading && <Spin />}
          </div>
        </div>
      )}
    </div>
  );
}
