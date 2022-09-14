import {} from "react";
import cs from "./Card.module.scss";
import classNames from "classnames";
import Big from "@/utils/big";
import { Rate } from "antd";
interface Props {
  isRow2?: boolean;
}
export default function Card(props: Props) {
  return (
    <div className={classNames(cs.root, { [cs.isRow2]: props.isRow2 })}>
      <img className={cs.head} src="/static/head.png" alt="head" />
      <div className={cs.title}>Compound</div>
      <div className={cs.stars}>
        <Rate className={"app-rate"} allowHalf disabled defaultValue={4.5} />
        <span className={cs.starNo}>ETH Finance</span>
      </div>
      <div className={cs.txtBar}>
        <span>Users</span>
        <span>{Big.formatNum(710)}</span>
      </div>
      <div className={cs.txtBar}>
        <span>Tx</span>
        <span>{Big.formatNum(1135)}</span>
      </div>
      <div className={cs.txtBar}>
        <span>Volume</span>
        <span>{Big.formatNum(17777234.06)} $</span>
      </div>
    </div>
  );
}
