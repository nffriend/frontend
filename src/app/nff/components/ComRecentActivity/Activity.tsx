import { useMemo } from "react";
import classNames from "classnames";
import cs from "./Activity.module.scss";
import Big from "@/utils/big";

interface Props {
  isLast: boolean;
  item: any;
}
export default function Activity(props: Props) {
  const saleOrBuy = useMemo(() => {
    if (props.item.action === "send") {
      return "SALE";
    } else if (props.item.action === "bought") {
      return "BUY";
    }
    return "";
  }, [props.item.action]);

  const notesArr = useMemo(() => {
    if(!props || !props.item || !props.item.note) return [];
    return [...props.item.note, ...(props.item.pay_note || [])];
  }, [props]);

  const getName = (item: any) => {
    if (item.title) return item.title;
    if (item.collection_name) {
      return `${item.collection_name}#${item.token_id}`;
    }
  };

  return (
    <div className={cs.li}>
      <div className={classNames(cs.tip, { [cs.last]: props.isLast })}></div>
      <div className={cs.msg}>
        <div className={cs.date}>{Big.formatTime(props.item.date_updated, "MMMM D, YYYY", true)}</div>
        {notesArr.map((item, index: number) => {
          return (
            <div className={cs.lidata} key={index}>
              {!!props.item.action && <div className={classNames(cs.type, { [cs.dark]: saleOrBuy === "SALE", [cs.light]: saleOrBuy !== "SALE" })}>{props.item.action?.toUpperCase()}</div>}
              {!!item.preview && <img className={cs.head} src={item.preview.address} alt="pic" />}
              <div className={cs.infoWord}>
                <span>{getName(item)}</span>
                {props.item.action} to <span>{Big.addMosaic(item.to)}</span>
                from
                <span>{Big.addMosaic(item.from)}</span>
                {!!item.amount && (
                  <span>
                    fro {Big.formatAmount(item.amount, item.decimal)} {item.token_symbol}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
