import cs from "./index.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

interface Props {
  noBorderTop?: boolean;
}
export default function Footer(props: Props) {
  const router = useRouter();
  const list = ["/mint_test", "/mint"];
  return (
    <div className={classNames(cs.footer, "t-mount", { [cs.paddingBottom]: list.includes(router.pathname) })}>
      <img className={cs.logo} src="/static/heroMint/footer_logo.png" alt="logo" />
      {/* <div className={cs.word}>Stay tuned for news about upcoming drops of Power Dungeon.</div>
      <div className={cs.search}>
        <input className={classNames(cs.searchInput)} placeholder="Enter you email address" maxLength={200} />
        <div className={classNames(cs.searchBtn, "t-font")}>
          <span>SUBSCRIBE</span>
        </div>
      </div> */}
      <div className={cs.social}>
        <a href="https://twitter.com/PowerDungeon" target="_blank" rel="noreferrer">
          <img src="/static/homes/png/twitter@2x.png" alt="twitter" />
        </a>
        <a href="https://discord.gg/VabgprGCF3" target="_blank" rel="noreferrer">
          <img src="/static/homes/png/discord@2x.png" alt="discord" />
        </a>
        <a href="https://t.me/PowerDengeon" target="_blank" rel="noreferrer">
          <img src="/static/homes/png/telegrame@2x.png" alt="telegrame" />
        </a>
        <a href="https://powerdungeon.medium.com/" target="_blank" rel="noreferrer">
          <img src="/static/homes/png/y.png" alt="medium" />
        </a>
        <a href="https://powerdungeon.gitbook.io" target="_blank" rel="noreferrer">
          <img src="/static/homes/png/book.png" alt="Gitbook" />
        </a>
        <a href="https://github.com/PowerDungeon" target="_blank" rel="noreferrer">
          <img src="/static/homes/png/hub.png" alt="GitHub" />
        </a>
      </div>
      <div className={cs.end}>2022 © POWER DUNGEON ALL RIGHTS RESERVED.</div>
    </div>
  );
}
