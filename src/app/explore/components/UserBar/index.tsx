import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import FollowBtn from "@/components/FollowBtn";
import ImageSelf from "@/components/ImageSelf";
interface Props {
  item: any;
}

export default function UserBar(props: Props) {
  function goto() {
    window.open(`${location.origin}/${props.item.address}`);
  }

  return (
    <div className={cs.root}>
      <ImageSelf className={cs.head} src={props.item.avatar} />
      <span className={cs.name} onClick={goto}>
        {props.item.username}
      </span>
      <FollowBtn pid={props.item.address} />
    </div>
  );
}
