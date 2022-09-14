import { useMemo, useState } from "react";
import classNames from "classnames";
import cs from "./index.module.scss";
import NoDataEdit from "@/components/NoDataEdit";
import useUserType from "@/hooks/useUserType";
import { deleteGame, saveGame } from "@/hooks/useData";
import EditMyCollectionChose, { UploadStatus } from "../EditMyCollectionChose";
import { message } from "antd";
import { ipfsTransferUrl } from "@/utils";

interface Props {
  data?: any;
  index: number;
  onPlay?: (url: string) => void;
  refresh?: () => void;
}
export default function ComPlay(props: Props) {
  const { isMySelf, token } = useUserType();
  const [isShowEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const thisData = useMemo(() => {
    return props.data?.find((item: any) => item.index === props.index);
  }, [props.data, props.index]);

  const thisUrl = useMemo(() => {
    return ipfsTransferUrl(thisData?.metadata.animation_url ?? "");
  }, [thisData]);

  const showImg = useMemo(() => {
    return ipfsTransferUrl(thisData?.metadata.image ?? "");
  }, [thisData]);

  function onEdit() {
    if (!isMySelf) return;

    setShowEdit(true);
  }

  function onClose() {
    setShowEdit(false);
  }

  async function onSubmit(items: any[]) {
    onClose();
    setLoading(true);
    let res;
    if (!items.length) {
      if (thisData?.url) {
        res = await deleteGame(token, props.index);
      } else {
        res = true;
      }
    } else {
      const token_id = items[0].id.tokenId;
      const contract = items[0].contract.address;
      res = await saveGame(token, contract, token_id, props.index);
    }
    setLoading(false);

    if (!res) {
      message.error("error");
      return;
    }
    props.refresh?.();
  }

  function onPlay() {
    props.onPlay?.(thisUrl);
  }

  return (
    <div className={cs.root}>
      <div className={cs.picBox} onClick={onEdit}>
        {!!thisData ? (
          <img className={cs.pic} src={showImg} alt="pic" />
        ) : (
          <NoDataEdit loading={loading} />
        )}
      </div>

      {!!thisUrl && (
        <div className={cs.btn} onClick={onPlay}>
          PLAY
        </div>
      )}

      <EditMyCollectionChose
        isSingle
        isShow={isShowEdit}
        onClose={onClose}
        onSave={onSubmit}
        newChosedData={[]}
        type={UploadStatus.Animate}
      />
    </div>
  );
}
