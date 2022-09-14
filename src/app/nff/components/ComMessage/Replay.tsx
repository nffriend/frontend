import { useState } from "react";
import cs from "./Replay.module.scss";
import { Input } from "antd";
import classNames from "classnames";
const { TextArea } = Input;

interface Props {
  loading: boolean;
  onSubmit: (str: string, callback: () => void) => void;
}
export default function Replay(props: Props) {
  const [v, setV] = useState("");

  function onInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setV(e.target.value);
  }

  function onSubmit() {
    props.onSubmit((v || "").trim(), clear);
  }

  function clear() {
    setV("");
  }

  return (
    <div className={cs.root}>
      <TextArea rows={3} placeholder={"Leave your message"} autoSize={{ minRows: 3, maxRows: 3 }} maxLength={200} value={v} onChange={onInput} />
      <div className={classNames("btn", cs.replayBtn, { [cs.disabled]: !v.length || props.loading })} onClick={onSubmit}>
        Replay
      </div>
    </div>
  );
}
