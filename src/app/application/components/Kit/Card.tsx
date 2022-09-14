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
      <img className={cs.pic} src="/static/test.png" alt="pic" />
      <div className={cs.info}>
        <div className={cs.title}>My NFT For web3.0</div>
        <div className={cs.nums}>
          <span>users</span> {Big.formatNum(200000)}
        </div>
      </div>
    </div>
  );
}
