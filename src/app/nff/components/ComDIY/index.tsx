import { useMemo } from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import useUserType from "@/hooks/useUserType";

import EditBtn from "../EditBtn";

interface Props {
  i: string;
  w: number;
  data?: any;
  onEdit: (id: string, sourceData: any, w: number) => void;
}
export default function ComDIY(props: Props) {
  const { isMySelf } = useUserType();
  const DIYData = useMemo(() => {
    return props.data || { name: "", detail: null };
  }, [props.data]);

  function onEdit() {
    props.onEdit(props.i, props.data, props.w);
  }

  return (
    <div className={cs.root}>
      {!!DIYData.name && (
        <div className={cs.title}>
          <span>{DIYData.name}</span>
        </div>
      )}

      {isMySelf === 1 && (
        <div className={cs.editCom}>
          <EditBtn onSubmit={onEdit} />
        </div>
      )}

      {!DIYData.detail && isMySelf === 1 && (
        <div className={cs.noData}>
          <img src="/static/nff/icon-nodata1.png" alt="no-data" />
          <div className={cs.t}>No data yet</div>
          <div className={cs.info}>
            This is your custom widgets,{props.w === 2 && <br />}click to <span onClick={onEdit}>edit detail</span>
          </div>
        </div>
      )}

      {!!DIYData.detail && (
        <div className={classNames(cs.detailCom, { [cs.noTitle]: !DIYData.name })}>
          <div className={cs.detailComS}>
            <div className={cs.detailBox} dangerouslySetInnerHTML={{ __html: DIYData.detail }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
