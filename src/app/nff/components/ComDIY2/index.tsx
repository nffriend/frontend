import { useMemo } from "react";
import cs from "./index.module.scss";
import classNames from "classnames";

import Iframe, { IFRAME_TYPE } from "../../components/Iframe";
import useUserType from "@/hooks/useUserType";
import EditBtn from "../EditBtn";
interface Props {
  data: any;
  i: string;
  w: number;
  com2List: any[];
  onEdit: (id: string, sourceData: any, w: number) => void;
}
export default function ComDIY2(props: Props) {
  const { isMySelf } = useUserType();

  const dataObj = useMemo(() => {
    if (typeof props.data === "string") {
      return JSON.parse(props.data);
    }
    return props.data;
  }, [props.data]);

  // 组装最终数据
  const dataRes = useMemo(() => {
    let url = "";
    let srcDoc = "";

    if (!dataObj) {
      return { url, srcDoc, type: IFRAME_TYPE.Single };
    }

    const iframeItem = props.com2List.find(item => item.id === dataObj.name);

    if (!iframeItem) {
      return { url, srcDoc, type: IFRAME_TYPE.Single };
    }

    const formOptions = dataObj.detail;
    if (iframeItem.url) {
      url = iframeItem.url;
      iframeItem.params.forEach((item: string) => {
        const exp = new RegExp("\\$\\{" + item + "\\}", "g");
        const s = formOptions.find((obj: any) => obj.key === item);
        if (s) {
          url = url.replace(exp, s.value);
        }
      });
    }

    if (iframeItem.srcDoc) {
      srcDoc = iframeItem.srcDoc;
      iframeItem.params.forEach((item: string) => {
        const exp = new RegExp("\\$\\{" + item + "\\}", "g");
        const s = formOptions.find((obj: any) => obj.key === item);
        if (s) {
          srcDoc = srcDoc.replace(exp, s.value);
        }
      });
    }

    return { url, srcDoc, type: srcDoc ? IFRAME_TYPE.SrcDoc : IFRAME_TYPE.Single };
  }, [dataObj, props.com2List]);

  function onEdit() {
    props.onEdit(props.i, props.data, props.w);
  }

  return (
    <div className={cs.root}>
      {isMySelf === 1 && (
        <div className={cs.editCom}>
          <EditBtn onSubmit={onEdit} />
        </div>
      )}
      {!!props.data && <Iframe type={dataRes.type} url={dataRes.url} srcDoc={dataRes.srcDoc} />}
    </div>
  );
}
