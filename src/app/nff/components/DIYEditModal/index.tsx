import { useEffect, useState, useMemo } from "react";
import { Modal } from "antd";
import cs from "./index.module.scss";
import classNames from "classnames";

import Preview from "../ComDIY/preview";
import Loading from "@/components/LoadingIcon";
import "@wangeditor/editor/dist/css/style.css";
interface Props {
  isShow: boolean;
  sourceData: any;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (newData: any) => void;
}

let editor: any = null; // 缓存，后面卸载
let toolbar: any = null;

export default function DIYEditModal(props: Props) {
  const [name, setName] = useState("");
  const [html, setHtml] = useState(""); // 编辑器内容

  useEffect(() => {
    if (props.isShow) {
      if (props.sourceData?.data) {
        setName(props.sourceData.data.name || "");
      }
    } else {
      setName("");
      setHtml("");
    }
  }, [props.isShow, props.sourceData?.data]);

  const sw = useMemo(() => {
    return props.sourceData?.w || 0;
  }, [props.sourceData?.w]);

  function onSubmit() {
    if (props.loading) return;
    props.onSubmit({ name, detail: html });
  }

  // ======= 编辑器相关 ======= //

  // memo缓存，修改其他状态时，不会重新渲染
  const EMemo = useMemo(async () => {
    // 这个编辑器不支持服务端渲染
    if (typeof window !== "undefined" && props.isShow) {
      let _E = await import("@wangeditor/editor");
      return _E;
    }
    return null;
  }, [props.isShow]);

  useEffect(() => {
    let E;
    (async () => {
      E = await EMemo;
      if (E) {
        editor = E.createEditor({
          selector: "#editBox",
          config: {
            onChange() {
              setHtml(editor.getHtml());
            },
            MENU_CONF: {
              fontFamily: {
                fontFamilyList: ["Arial", "Tahoma", "Verdana", "Times New Roman", "Courier New"],
              },
            },
          },
        });
        toolbar = E.createToolbar({
          editor,
          selector: "#editBar",
          config: {
            excludeKeys: ["fullScreen", "group-image", "group-video"],
            insertKeys: { index: 21, keys: ["insertImage", "insertVideo"] },
          },
        });
        E.i18nChangeLanguage("en");

        // console.log("toolbar.getConfig()", toolbar.getConfig(), editor.getMenuConfig("uploadImage"));
        if (props.sourceData.data?.detail) {
          editor.setHtml(props.sourceData.data.detail);
        }
      }
    })();

    return () => {
      editor && editor.destroy();
      editor = null;
      toolbar = null;
    };
  }, [EMemo]);

  function buildModalBody() {
    return (
      <div className={cs.root}>
        <div className={cs.control}>
          <i className={classNames("iconfont icon-close", cs.close)} onClick={props.onCancel} />
          <span className={cs.title}>Edit Detail</span>
          <div className={classNames("btn-g", cs.submit)} onClick={props.onCancel}>
            Cancel
          </div>
          <div className={classNames("btn", cs.submit)} onClick={onSubmit}>
            Save <Loading isShow={props.loading} />
          </div>
        </div>
        <div className={cs.body}>
          <div className={classNames(cs.prevView, { [cs.sizeSmall]: sw === 2, [cs.sizeMidum]: sw === 4, [cs.sizeLarge]: sw === 6 })}>
            <Preview name={name} detail={html} />
          </div>
          <div className={cs.formLayout}>
            <div className={cs.label}>Widget Name</div>
            <input className={cs.input} maxLength={25} placeholder="Enter the name of the widgets" value={name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          </div>
          <div className={cs.formLayout}>
            <div className={cs.label}>Edit Detail</div>
            <div className={cs.editBox}>
              <div id="editBar"></div>
              <div id="editBox" className={cs.editer}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Modal visible={props.isShow} onCancel={props.onCancel} modalRender={() => buildModalBody()} className={"modal-self"} maskClosable={false} />;
}
