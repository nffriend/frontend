import { useEffect, useMemo, useState } from "react";
import cs from "./ChoseCard.module.scss";
import classNames from "classnames";
import { ipfsTransferUrl } from "@/utils";

interface Props {
  item: any;
  isChosed?: boolean; // 是否选中
  onChange: (type: boolean) => void; // 选中状态改变
}

export default function ChoseCard(props: Props) {
  const imgData = useMemo(() => {
    if (!props.item) return "";
    let imgUrl = props.item.media?.[0]?.gateway || props.item.media?.[0]?.raw || props.item.metadata?.image || "";
    // return imgUrl.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
    return ipfsTransferUrl(imgUrl);
  }, [props.item]);

  function onClickNft() {
    props.onChange(!props.isChosed);
  }

  return (
    <div className={cs.root} onClick={onClickNft}>
      <img className={cs.pic} src={imgData} alt="pic" />
      <div className={classNames(cs.choseBox, { [cs.chosed]: props.isChosed })}>
        <img className={cs.nocheck} src="/static/nff/icon-no-check.png" alt="no-check" />
        <img className={cs.check} src="/static/nff/icon-check.png" alt="check" />
      </div>
    </div>
  );
}
