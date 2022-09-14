import {} from "react";
import cs from "./WidgetCard.module.scss";
import classNames from "classnames";
import { Rate, Button } from "antd";

interface Props {
  type: Number;
  item: any;
  onAdd: (item: any) => void;
}

export default function WidgetCard(props: Props) {
  function onAdd() {
    props.onAdd(props.item);
  }

  return (
    <div className={classNames(cs.root, { [cs.rowBox]: props.type === 0 })}>
      {props.type === 0 ? (
        <>
          <img className={cs.logo} src={props.item.icon} alt="logo" />
          <div className={cs.rowT}>
            <div className={cs.t}>
              <div className={cs.name}>{props.item.name}</div>
              <Rate className={cs.rate} count={5} value={Number(props.item.star) || 5} disabled allowHalf />
            </div>
            <div className={cs.row3}>{props.item.info}</div>
          </div>
          <Button className={cs.button} onClick={onAdd}>
            + Add
          </Button>
        </>
      ) : (
        <>
          <div className={cs.row1}>
            <img className={cs.logo} src={props.item.icon} alt="logo" />
            <div className={classNames(cs.name, "all_nowarp")}>{props.item.name}</div>
            <img className={cs.hot} src="/static/nff/icon-fire.png" alt="hot" />
          </div>

          <div className={cs.row2}>
            <Rate className={cs.rate} count={5} value={Number(props.item.star) || 5} disabled allowHalf />
            <Button className={cs.button} onClick={onAdd}>
              + Add
            </Button>
          </div>

          <div className={cs.row3}>{props.item.info}</div>
        </>
      )}
    </div>
  );
}
