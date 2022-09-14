import {} from "react";
import cs from "./Card.module.scss";
import classNames from "classnames";
import Big from "@/utils/big";
import ImageSelf from "@/components/ImageSelf";
interface Props {
  isRow2?: boolean;
  source: any;
}
export default function Card(props: Props) {
  function goto() {
    window.open(`${location.origin}/${props.source.address}`);
  }
  return (
    <div onClick={goto} className={classNames(cs.root, { [cs.isRow2]: props.isRow2 })} style={{ backgroundImage: `url(${props.source.cover_photo || "/static/nff/backpic.jpg"})` }}>
      <div className={cs.info}>
        <ImageSelf className={cs.head} src={props.source.avatar} />
        <span className={classNames(cs.name, "all_nowarp")}>{props.source.username}</span>
        <span className={cs.rank}>{Big.formatNum(props.source.pass_points)}</span>
      </div>
    </div>
  );
}
