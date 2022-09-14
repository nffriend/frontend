import {} from "react";
import cs from "./index.module.scss";
import Big from "@/utils/big";
import FollowBtn from "@/components/FollowBtn";
import ImageSafe from "@/components/ImageSelf";
import Link from "next/link";
interface Props {
  item: any;
}
export default function ListItem(props: Props) {
  return (
    <div className={cs.root}>
      <ImageSafe className={cs.photo} src={props.item.user.avatar} />
      <Link href={`/${props.item.address}`}>
        <a>
          <span className={cs.name}>{props.item.user.username}</span>
        </a>
      </Link>
      <span className={cs.date}>{props.item.user.last_login_date ? Big.formatTime(props.item.user.last_login_date) : ""}</span>
      <span className={cs.auto}></span>
      <FollowBtn pid={props.item.address} type={props.item.relation} infoUser={props.item.user}/>
    </div>
  );
}
