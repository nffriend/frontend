import { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import cs from "./index.module.scss";
import useAccount from "@/hooks/useAccount";
import { useSelector } from "react-redux";
import { RootState } from "@/models/store";

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

export default function AuthTips() {
  const auth: string = useSelector((state: RootState) => state.app.auth);
  const [isShow, setIsShow] = useState(false);
  const { account } = useAccount();
  const onCancel = () => setIsShow(false);

  useEffect(() => {
    if (!account) {
      setIsShow(false);
      return;
    }
    const authLocal = localStorage.getItem(`auth-${account}`);
    if (auth) {
      const authInfo = JSON.parse(auth);
      const now = new Date().getTime();
      if (!(authInfo.expiration && new Date(authInfo.expiration).getTime() > now + 12 * 3600 * 1000)) {
        setIsShow(true);
        return;
      }
    }
    setIsShow(!auth && !authLocal);
  }, [account, auth]);

  function buildModalBody() {
    return (
      <div className={cs.root}>
        <i className={"iconfont icon-close"} onClick={onCancel} />
        <div className={cs.title}>
          <Spin indicator={antIcon} />
        </div>
        <div className={cs.info}>waiting for signature to login</div>
      </div>
    );
  }

  return <Modal visible={isShow} onCancel={onCancel} modalRender={() => buildModalBody()} className={"modal-self"} maskClosable={false} />;
}
