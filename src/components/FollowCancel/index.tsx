import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";

import { message, Modal } from "antd";
import useFollow from "@/hooks/useFollow";

export default function FollowCancel() {
  const { isCancelShow, setCancelShow, cancelUsername, onUnFollow } = useFollow();

  async function handleOk() {
    const res = await onUnFollow();
    if (res) {
      message.success("success");
    } else {
      message.error("error");
    }
  }

  function handleCancel() {
    setCancelShow(false);
  }

  function buildModalBody() {
    return (
      <div className={cs.root}>
        <div className={cs.title}>Unfollow</div>
        <div className={cs.title}>@{cancelUsername}</div>
        <div className={cs.info}>This user will no longer appear on your homepage timeline. You can still view their profiles unless their space are protected.</div>
        <div className={cs.control}>
          <div className={cs.btnSubmit} onClick={handleOk}>
            unsubscribe
          </div>
          <div className={cs.btnCancel} onClick={handleCancel}>
            Cancel
          </div>
        </div>
      </div>
    );
  }
  return <Modal visible={isCancelShow} onCancel={handleCancel} modalRender={() => buildModalBody()} style={{ top: "20vh" }} maskClosable={false} />;
}
