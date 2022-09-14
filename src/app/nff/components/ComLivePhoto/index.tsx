import { useState, useMemo, useEffect } from "react";
import classNames from "classnames";
import cs from "./index.module.scss";
import NoDataEdit from "@/components/NoDataEdit";

import useUserType from "@/hooks/useUserType";
import { saveLivephoto, useLivePhoto } from "@/hooks/useData";

import EditMyCollectionChose, { UploadStatus } from "../EditMyCollectionChose";
import { message } from "antd";
import { ipfsTransferUrl } from "@/utils";

import useInterval from "@/hooks/useInterval";
import PhotoBox from "./PhotoBox";

export default function ComLivePhoto() {
  const { isMySelf, token, accountNow } = useUserType();
  const [isShowEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, refresh } = useLivePhoto(accountNow || "");

  function onEditPhoto() {
    if (!isMySelf) return;
    setNewChosedData(data);
    setShowEdit(true);
  }

  function onClose() {
    setShowEdit(false);
    setNewChosedData(data);
  }

  /**
   * 用户保存选择NFT
   * @param chosedData 所有最新选中的
   * newChosedData跟随data, 但也可手动改变， 它是最新的选中的NFTs
   * */
  const [newChosedData, setNewChosedData] = useState(data);

  async function onSubmit(items: any[]) {
    setLoading(true);
    let res;

    const arr = items.map(item => {
      return { contract: item.contract.address, token_id: item.id.tokenId };
    });

    res = await saveLivephoto(token, arr);

    setLoading(false);

    if (!res) {
      message.error("update NFT error");
      return;
    }
    refresh();
    setShowEdit(false);
  }

  const [photoIndex, setPhotoIndex] = useState(0);

  const photo0 = useMemo(() => {
    const res = data[photoIndex];
    if (res?.metadata?.image) {
      return `${ipfsTransferUrl(res.metadata.image)}@@${photoIndex}`;
    }
    return null;
  }, [data, photoIndex]);

  const photo1 = useMemo(() => {
    let pindex = photoIndex + 1;
    if (pindex >= data.length && data.length > 4) {
      pindex = pindex - data.length;
    }
    const res = data[pindex];
    if (res?.metadata?.image) {
      return `${ipfsTransferUrl(res.metadata.image)}@@${photoIndex}`;
    }
    return null;
  }, [data, photoIndex]);

  const photo2 = useMemo(() => {
    let pindex = photoIndex + 2;
    if (pindex >= data.length && data.length > 4) {
      pindex = pindex - data.length;
    }
    const res = data[pindex];
    if (res?.metadata?.image) {
      return `${ipfsTransferUrl(res.metadata.image)}@@${photoIndex}`;
    }
    return null;
  }, [data, photoIndex]);

  const photo3 = useMemo(() => {
    let pindex = photoIndex + 3;
    if (pindex >= data.length && data.length > 4) {
      pindex = pindex - data.length;
    }
    const res = data[pindex];
    if (res?.metadata?.image) {
      return `${ipfsTransferUrl(res.metadata.image)}@@${photoIndex}`;
    }
    return null;
  }, [data, photoIndex]);

  useInterval(
    () => {
      setPhotoIndex(prev => {
        let next = prev + 1;
        if (next === data.length) {
          next = 0;
        }
        return next;
      });
    },
    data.length > 4 ? 5000 : 0,
  );

  return (
    <div className={cs.root}>
      <div className={cs.title}>Live Photo</div>
      <div className={cs.photos}>
        <div className={classNames(cs.first, { [cs.shadow]: !!photo0 })} onClick={onEditPhoto}>
          {!!photo0 ? <PhotoBox src={photo0} /> : <NoDataEdit loading={loading} />}
        </div>

        <div className={cs.list}>
          <div onClick={onEditPhoto} className={classNames(cs.photoBox)}>
            {!!photo1 ? <PhotoBox src={photo1} /> : <NoDataEdit mini loading={loading} />}
          </div>
          <div onClick={onEditPhoto} className={classNames(cs.photoBox)}>
            {!!photo2 ? <PhotoBox src={photo2} /> : <NoDataEdit mini loading={loading} />}
          </div>
          <div onClick={onEditPhoto} className={classNames(cs.photoBox)}>
            {!!photo3 ? <PhotoBox src={photo3} /> : <NoDataEdit mini loading={loading} />}
          </div>
        </div>
      </div>
      <EditMyCollectionChose max={5} isShow={isShowEdit} onClose={onClose} onSave={onSubmit} newChosedData={newChosedData} type={UploadStatus.Normal} />
    </div>
  );
}
