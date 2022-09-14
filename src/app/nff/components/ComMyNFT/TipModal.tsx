import {} from "react";
import { Modal } from "antd";
import cs from "./TipModal.module.scss";
import classNames from "classnames";

interface Props {
  isShow: boolean;
  onCancel: () => void;
}

export default function MyNftTips(props: Props) {
  function buildModalBody() {
    return (
      <div className={cs.root}>
        <img className={cs.back} src="/static/nff/tipback.png" alt="back" />
        <div className={cs.infoBox}>
          <img className={cs.centerIcon} src="/static/nff/icon-r1.png" alt="r" />
          <i className={"iconfont icon-close"} onClick={props.onCancel} />
          <div className={cs.title}>No More Points Today</div>
          <div className={cs.info}>
            You’ve reached your limit today, leave
            <br />
            some points for other friends
          </div>
          <div className={classNames("btn", cs.btn)} onClick={props.onCancel}>
            Go Back
          </div>
        </div>
      </div>
    );
  }

  return <Modal visible={props.isShow} onCancel={props.onCancel} modalRender={() => buildModalBody()} className={"modal-self"} maskClosable={false} />;
}
