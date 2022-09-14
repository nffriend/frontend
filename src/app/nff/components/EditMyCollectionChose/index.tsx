import { useEffect, useMemo, useState } from "react";
import { Modal, Upload, message } from "antd";

import classNames from "classnames";

import cs from "./index.module.scss";

import ChoseCard from "./ChoseCard";

import useNftDatas from "../ComMyCollection/useNftDatas";
import NoData from "@/components/NoData";

export enum UploadStatus {
  Normal = "normal",
  Animate = "animate",
  Total = "total",
}

// mock
// import nftData from "@/mock/nft";
interface Props {
  type: UploadStatus;
  isShow: boolean;
  isSingle?: boolean; // 是否只支持单选
  newChosedData: any[];
  max?: number; // 最多选择多少个
  onClose: () => void;
  onSave: (chosedData: any[]) => void;
}

export default function EditProfile(props: Props) {
  // mock
  // const myNftData = { data: nftData };

  const { myNftData } = useNftDatas();

  const [chosedData, setChosedData] = useState<any[]>([]);
  // console.log("没有吗mynftdat:", myNftData);
  // 每次出现时，把当前橱窗内的数据赋值，表示默认选中这些
  useEffect(() => {
    if (props.isShow) {
      setChosedData(props.newChosedData);
    }
  }, [props.isShow]);

  const nftList = useMemo(() => {
    // console.log("myNftData", myNftData);
    if (myNftData.data?.length) {
      if (props.type === UploadStatus.Animate) {
        return myNftData.data.filter((nft: any) => !!nft.metadata.animation_url);
      } else if (props.type === UploadStatus.Normal) {
        return myNftData.data.filter((nft: any) => !nft.metadata.animation_url);
      }
    }
    return myNftData.data;
  }, [myNftData, props.type]);

  function checkDefaultChosed(itemNft: any) {
    return chosedData ? chosedData?.findIndex((item: any) => item.id.tokenId === itemNft.id.tokenId) > -1 : false;
  }

  // 选中改变，需要更新chosedData
  function onChoseChange(itemNft: any, type: boolean) {
    const isIndex = chosedData ? chosedData.findIndex(item => item.id.tokenId === itemNft.id.tokenId) : -1;

    // 如果是单选
    if (props.isSingle) {
      if (isIndex === -1) {
        setChosedData([itemNft]);
      } else {
        setChosedData([]);
      }

      return;
    }

    // 添加或取消
    if (type) {
      if (isIndex === -1) {
        if (props.max && props.max > 0) {
          if (chosedData.length >= props.max) {
            return;
          }
        }
        setChosedData(prev => [...prev, itemNft]);
      }
    } else {
      if (isIndex > -1) {
        setChosedData(prev => {
          const temp = [...prev];
          temp.splice(isIndex, 1);
          return temp;
        });
      }
    }
  }

  useEffect(() => {
    // console.log("当前选中；", chosedData);
  }, [chosedData]);

  function buildModalBody() {
    return (
      <div className={cs.root}>
        <div className={cs.control}>
          <i className={classNames("iconfont icon-close", cs.close)} onClick={handleCancel} />
          <span className={cs.title}>Choose {props.type === UploadStatus.Animate ? "Animate" : ""} NFT</span>
          {!!(props.max && props.max > 0) && (
            <div>
              {chosedData.length} /{props.max}
            </div>
          )}

          <div className={classNames("btn-g", cs.submit)} onClick={handleCancel}>
            Cancel
          </div>
          <div className={classNames("btn", cs.submit)} onClick={handleOk}>
            Save
          </div>
        </div>
        <div className={cs.list}>
          {nftList.map((item: any, index: number) => {
            return <ChoseCard key={index} item={item} isChosed={checkDefaultChosed(item)} onChange={(type: boolean) => onChoseChange(item, type)} />;
          })}
        </div>
        {!nftList.length && <NoData className={cs.noData} />}
      </div>
    );
  }

  function handleOk() {
    props.onSave(chosedData);
  }

  function handleCancel() {
    props.onClose();
  }

  return <Modal visible={props.isShow} modalRender={() => buildModalBody()} className={"modal-self"} />;
}
