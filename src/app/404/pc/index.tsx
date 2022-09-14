import {} from "react";
import cs from "./index.module.scss";
import Link from "next/link";
export default function notFound() {
  return (
    <div className={cs.root}>
      <img className={cs.pic} src="/static/nff/404.png" alt="404" />
      <div className={cs.title}>Oops!</div>
      <div className={cs.info}>
        <span>We can’t find the page that you’re looking for : )</span>
        <br />
        <span>Please try again</span>
      </div>
      <Link href="/">
        <a>
          <div className={cs.btnBack}>BACK HOME</div>
        </a>
      </Link>
    </div>
  );
}
