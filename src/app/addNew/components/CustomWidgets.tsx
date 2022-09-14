import { useState, useMemo, useEffect } from "react";
import cs from "./CustomWidgets.module.scss";
import classNames from "classnames";
import { message, Radio, RadioChangeEvent, Button, Input } from "antd";

import "@wangeditor/editor/dist/css/style.css";
import Preview from "../../nff/components/ComDIY/preview";

interface Props {
  onSubmitDIY: (name: string, size: string, details: string, callback: any) => void;
}

let editor: any = null; // 缓存，后面卸载
let toolbar: any = null;

function trim_str(orign: string, char: string, type: string) {
  if (char) {
    if (type == 'left') {
      return orign.replace(new RegExp('^\\'+char+'+', 'g'), '');
    } else if (type == 'right') {
      return orign.replace(new RegExp('\\'+char+'+$', 'g'), '');
    }
    return orign.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
  }
  return orign.replace(/^\s+|\s+$/g, '');
};


export default function CustomWidgets(props: Props) {
  const [name, setName] = useState("");
  const [html, setHtml] = useState(""); // 编辑器内容
  const [size, setSize] = useState("small");

  function onSubmit() {
    props.onSubmitDIY(name, size, html, reset);
    // props.onSubmit({ name, detail: html }); // TODO
  }

  function reset() {
    setName("");
    setSize("small");
  }

  function onRadioChange(e: RadioChangeEvent) {
    setSize(e.target.value);
  }

  // ======= 编辑器相关 ======= //

  // memo缓存，修改其他状态时，不会重新渲染
  const EMemo = useMemo(async () => {
    // 这个编辑器不支持服务端渲染
    if (typeof window !== "undefined") {
      let _E = await import("@wangeditor/editor");
      return _E;
    }
    return null;
  }, []);

  useEffect(() => {
    let E;
    (async () => {
      E = await EMemo;
      if (E) {
        editor = E.createEditor({
          selector: "#editBox",
          config: {
            onChange() {
              const letf_ch = trim_str(editor.getHtml(), '<p><br></p>', 'left');
              const right_ch = trim_str(letf_ch, '<p><br></p>', 'right');
              setHtml(right_ch);
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
        // if (props.sourceData.data?.detail) {
        //   editor.setHtml(props.sourceData.data.detail);
        // }
      }
    })();

    return () => {
      editor && editor.destroy();
      editor = null;
      toolbar = null;
    };
  }, [EMemo]);

  return (
    <div className={cs.root}>
      <div className={classNames(cs.prevView, { [cs.medium]: size === "medium", [cs.large]: size === "large" })}>
        <Preview name={name} detail={html} />
      </div>

      <div className={cs.label}>
        <div className={cs.title}>Select Size</div>
        <div className={cs.size}>
          <Radio.Group onChange={onRadioChange} value={size}>
            <Radio value={"small"}>Small</Radio>
            <Radio value={"medium"}>Medium</Radio>
            <Radio value={"large"}>Large</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className={cs.label}>
        <div className={cs.title}>Widget Name</div>
        <div className={cs.formCom}>
          <Input maxLength={25} placeholder="Enter the name of the widgets" value={name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        </div>
      </div>

      <div className={cs.label}>
        <div className={cs.title}>Edit Detail</div>
        <div className={cs.editBox}>
          <div id="editBar"></div>
          <div id="editBox" className={cs.editer}></div>
        </div>
      </div>

      <div className={cs.control}>
        <div className={classNames("btn", cs.submit)} onClick={onSubmit}>
          Save
        </div>
      </div>
    </div>
  );
}
