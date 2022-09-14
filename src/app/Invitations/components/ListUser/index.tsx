import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import Follow from "@/components/FollowBtn";
import ImageSelf from "@/components/ImageSelf";
import Link from "next/link";
interface Props {
  source: any;
}

export default function Card(props: Props) {
  return (
    <div className={classNames(cs.root)}>
      <div className={cs.col1}>
        <ImageSelf className={cs.photo} src={props.source.bio} />
        <Link href={`/${props.source.address}`}>
          <a>
            <span className={cs.username}>{props.source.username}</span>
          </a>
        </Link>
      </div>

      <div className={cs.col2}>{props.source.last_login_date}</div>

      <div className={cs.col3}>
        <Follow pid={props.source.address} />
      </div>
    </div>
  );
}
