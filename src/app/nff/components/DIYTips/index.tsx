import {} from "react";
import { Modal } from "antd";
import cs from "./index.module.scss";
import classNames from "classnames";

interface Props {
  isShow: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function DIYTips(props: Props) {
  function buildModalBody() {
    return (
      <div className={cs.root}>
        <i className={"iconfont icon-close"} onClick={props.onCancel} />
        <div className={cs.title}>
          The custom widget was added
          <br />
          successfully!
        </div>
        <div className={cs.info}>
          The custom widget is already in your space,
          <br />
          try to edit detail
        </div>
        <div className={classNames("btn", cs.btn)} onClick={props.onSubmit}>
          Edit Detail
        </div>
      </div>
    );
  }

  return <Modal visible={props.isShow} onCancel={props.onCancel} modalRender={() => buildModalBody()} className={"modal-self"} maskClosable={false} />;
}
