import {} from "react";
import cs from "./Introduction.module.scss";
import classNames from "classnames";

interface Props {
  v: string;
  onInput: (newV: string) => void;
}
export default function Introduction(props: Props) {
  function onTextInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    props.onInput(e.target.value);
  }

  return (
    <div className={cs.root}>
      <div className={cs.title}>
        <span>Introduction</span>
        <span className={classNames({ [cs.error]: props.v.length > 160 })}>{props.v.length}/160</span>
      </div>
      <textarea maxLength={170} onInput={onTextInput} value={props.v} />
    </div>
  );
}
