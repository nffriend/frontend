import cs from "./index.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useUserType from "@/hooks/useUserType";
import { message } from "antd";
import Big from "@/utils/big";
import classNames from "classnames";
import { useRouter } from "next/router";

export default function Setting() {
  const { account } = useUserType();
  const router = useRouter();

  function onCopyed() {
    message.success("copy success");
  }

  function onLogout() {
    localStorage.setItem("isLogout", "1");
    router.replace("/");
  }

  return (
    <div className={classNames(cs.root, { [cs.hide]: !account })}>
      <div>
        <div className={cs.title}>Setting</div>
        <div className={cs.body}>
          <div className={cs.item}>
            <img className={cs.icon} src="/static/nff/icon-wallet.png" alt="icon" />
            <span className={cs.t}>Wallet address</span>
            <span className={cs.auto}></span>

            <div className={cs.info}>
              <span>{Big.addMosaic(account)}</span>
              <CopyToClipboard text={`${account}`} onCopy={onCopyed}>
                <img src="/static/nff/icon-copy2.png" alt="copy" />
              </CopyToClipboard>
            </div>
          </div>

          <div className={cs.item}>
            <img className={cs.icon} src="/static/nff/icon-internet.png" alt="icon" />
            <span className={cs.t}>Language</span>
            <span className={cs.auto}></span>

            <div className={cs.info}>
              <span>English</span>
            </div>
          </div>

          <div className={classNames(cs.item, cs.flexTop)}>
            <img className={cs.icon} src="/static/nff/icon-msg.png" alt="icon" />
            <span className={cs.t}>Contact us</span>
            <span className={cs.auto}></span>

            <div className={classNames(cs.info, cs.column)}>
              <div>
                Official email: <a href="mailto:nffriend@outlook.com">nffriend@outlook.com</a>
              </div>
              <div className={cs.links}>
                <a href="https://twitter.com/NonFFriend" target="_blank" rel="noreferrer">
                  <img src="/static/nff/icon-twitter-dark.png" alt="link" />
                </a>
                <a href="https://medium.com/@nffriend" target="_blank" rel="noreferrer">
                  <img src="/static/nff/icon-media-dark.png" alt="link" />
                </a>
              </div>
            </div>
          </div>

          <div className={cs.line}></div>
          <div className={classNames(cs.item, cs.cursor)} onClick={onLogout}>
            <img className={cs.icon} src="/static/nff/icon-logout.png" alt="icon" />
            <span className={cs.t}>Disconnect</span>
          </div>
        </div>
      </div>
    </div>
  );
}
