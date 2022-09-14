import { message } from "antd";
import { useEffect, useState } from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  loading?: boolean;
  onSubmit: (invCode: string) => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function InputBar(props: Props) {
  const [v, setV] = useState("");
  function onActive() {
    if (!v) {
      message.error("input invitation code please");
    } else {
      props.onSubmit(v.trim());
    }
  }

  function onInputV(e: React.ChangeEvent<HTMLInputElement>) {
    setV(e.target.value);
  }

  useEffect(() => {
    const code = localStorage.getItem('invite_code');
    if(code) {
      setV(code)
    }
  }, [])

  return (
    <div className={cs.root}>
      <div className={cs.inputBox}>
        <input placeholder="Please enter the invitation code" maxLength={200} value={v} onInput={onInputV} />
      </div>
      <div className={classNames(cs.btn, { [cs.disabled]: props.loading })} onClick={onActive}>
        Activate {props.loading && <Spin indicator={antIcon} />}
      </div>
    </div>
  );
}
