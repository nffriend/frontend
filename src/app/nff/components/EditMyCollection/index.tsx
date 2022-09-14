import { useEffect, useState } from "react";
import { Modal } from "antd";

import classNames from "classnames";

import cs from "./index.module.scss";

import Card from "../ComMyCollection/Card";

interface Props {
  isShow: boolean;
  newChosedData: any[];
  onClose: () => void;
  onChoseShow: () => void;
  onChange: (nfts: any[]) => void;
  onSave: () => void;
}

export default function EditProfile(props: Props) {
  const [tempShowNfts, setTempShowNfts] = useState<any[]>([]); // 需要复制一份出来编辑

  useEffect(() => {
    if (props.isShow) {
      setTempShowNfts(props.newChosedData ?? []);
    }
  }, [props.newChosedData, props.isShow]);

  function onRemoveOne(itemNft: any) {
    const temp = [...props.newChosedData];
    const isIndex = temp.findIndex(item => item.id.tokenId === itemNft.id.tokenId);
    temp.splice(isIndex, 1);
    props.onChange(temp);
  }

  function onRemoveAll() {
    props.onChange([]);
  }

  function buildModalBody() {
    return (
      <div className={cs.root}>
        <div className={cs.control}>
          <i className={classNames("iconfont icon-close", cs.close)} onClick={handleCancel} />
          <span className={cs.title}>Edit My Collection</span>
          <div className={classNames("btn-g", cs.submit)} onClick={handleCancel}>
            Cancel
          </div>
          <div className={classNames("btn", cs.submit)} onClick={handleOk}>
            Save
          </div>
        </div>
        <div className={cs.list}>
          {tempShowNfts.map((item, index: number) => {
            return (
              <div className={cs.cardEdit} key={index}>
                <Card data={item} />
                <div className={classNames(cs.iconBtn, cs.iconPosition)} onClick={() => onRemoveOne(item)}>
                  <i className={"iconfont icon-minus"} />
                </div>
              </div>
            );
          })}

          <Card onClick={props.onChoseShow} />
        </div>
        <div className={cs.footer}>
          <div className={classNames("btn-g", cs.removeBtn)} onClick={onRemoveAll}>
            Remove all
          </div>
        </div>
      </div>
    );
  }

  function handleOk() {
    props.onSave();
  }

  function handleCancel() {
    props.onClose();
  }

  return <Modal visible={props.isShow} modalRender={() => buildModalBody()} className={"modal-self"} />;
}
