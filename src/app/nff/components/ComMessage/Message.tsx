import { useMemo } from "react";
import classNames from "classnames";
import cs from "./Message.module.scss";
import Big from "@/utils/big";
import { Button } from "antd";
import ImageSelf from "@/components/ImageSelf";
interface Props {
  item: any;
  isMySelf: boolean;
  onDelete: (id: string) => void;
  loading: boolean;
}

export default function Message(props: Props) {
  const name = useMemo(() => {
    return props.item.user?.username || Big.addMosaic(props.item.user?.address) || "_";
  }, [props.item.user]);

  return (
    <div className={cs.root}>
      <ImageSelf className={cs.photo} src={props.item.user?.avatar} />
      <div className={cs.tip}>
        <div className={cs.user}>
          <span>{name}</span>
          <span className={cs.time}>{Big.formatTime(props.item.created_date, undefined, true)}</span>
        </div>
        <div className={cs.msg}>
          <pre>{props.item.message}</pre>
        </div>
        {/* <div className={cs.time}>
          <span>{Big.formatTime(props.item.created_date, undefined, true)}</span>
        </div> */}
      </div>
      {props.isMySelf && (
        <div className={classNames(cs.delBtn, { [cs.disabled]: props.loading })} onClick={() => props.onDelete(props.item._id)}>
          Delete
        </div>
      )}
    </div>
  );
}
