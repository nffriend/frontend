import {} from "react";
import cs from "./index.module.scss";

export default function EnterLoading() {
  return (
    <div className={cs.root}>
      <div className={cs.passBox}>
        <div className={cs.pass}></div>
      </div>
      <div className={cs.words}>please wait…NFF space is starting now.</div>
    </div>
  );
}
