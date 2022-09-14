import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import Big from "@/utils/big";
export default function NoticeItem() {
  return (
    <div className={cs.root}>
      <div className={cs.title}>
        <img className={cs.head} src="/static/head.png" alt="head" />
        <span className={cs.name}>Announcement</span>
        <span className={cs.date}>{Big.formatTime(Date.now() - 10000000)}</span>
      </div>
      <div className={cs.left}>Left you a message</div>
      <div className={cs.info}>There are new components online, go and try them out!There are new components online, go and try them out!There are new components online, go and try them out!There are new components online, go and try them out!There are new components online, go and try them out!There are new components online, go and try them out!</div>
      <a className={cs.goDetail} href="#">
        check the detail
      </a>
    </div>
  );
}
