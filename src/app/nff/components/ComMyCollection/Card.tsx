import { useMemo } from "react";
import classNames from "classnames";
import cs from "./Card.module.scss";
import NoDataEdit from "@/components/NoDataEdit";
import { ipfsTransferUrl } from "@/utils";

interface Props {
  data?: any;
  onClick?: () => void;
}
export default function Card(props: Props) {
  const imgData = useMemo(() => {
    if (!props.data) return "";
    let imgUrl = props.data.media?.[0]?.gateway || props.data.media?.[0]?.raw || props.data.metadata?.image || "";
    return ipfsTransferUrl(imgUrl);
  }, [props.data]);

  const price = useMemo(() => {
    if (!props.data) return "";
    const price = props.data.floorPrice?.looksRare?.floorPrice || props.data.floorPrice?.openSea?.floorPrice || "_";
    const currency = props.data.floorPrice?.looksRare?.priceCurrency || props.data.floorPrice?.openSea?.priceCurrency || "";
    return `${price} ${currency}`;
  }, [props.data]);
  return (
    <div className={classNames(cs.root, { [cs.default]: !!props.data })} onClick={() => props.onClick?.()}>
      {!!props.data ? (
        <>
          <img className={cs.head} src={imgData} alt="pic" />
          <div className={cs.info}>
            <div className={classNames(cs.title, "no-wrap")}>{props.data.description || "_"}</div>
            <div className={classNames(cs.no, "no-wrap")}>{props.data.title}</div>
            <div className={classNames(cs.price, "no-wrap")}>{price}</div>
          </div>
        </>
      ) : (
        <NoDataEdit />
      )}
    </div>
  );
}
