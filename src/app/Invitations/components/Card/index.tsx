import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { message } from "antd";

interface Props {
  item: any;
}

export default function Card(props: Props) {
  function onCopyed() {
    message.success("copy success");
  }

  return (
    <div className={classNames(cs.root, { [cs.used]: !!props.item.invitee })}>
      <div className={cs.title}>Invitation Code</div>
      <div className={cs.info}>
        <span className={classNames(cs.code, "all_nowarp")}>{props.item.invitation_code}</span>
        {!props.item.invitee ? (
          <CopyToClipboard text={`${props.item.invitation_code}`} onCopy={onCopyed}>
            <div className={cs.copyBtn}>
              <img src="/static/nff/icon-copy.png" alt="copy" />
              <span>Copy</span>
            </div>
          </CopyToClipboard>
        ) : (
          <div className={cs.usedStr}>USED</div>
        )}
      </div>
    </div>
  );
}
