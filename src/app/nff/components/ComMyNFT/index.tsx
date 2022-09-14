import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import NoDataEdit from "@/components/NoDataEdit";
import useUserType from "@/hooks/useUserType";
import useScore from "@/hooks/useScore";
import { message } from "antd";

import EditMyCollectionChose, { UploadStatus } from "../EditMyCollectionChose";
import Tips from "./TipModal";

import { useMyNft, deleteMyNft, saveMyNft } from "@/hooks/useData";
import { ipfsTransferUrl } from "@/utils";

const defaultData: { k: number; v: any }[] = [
  { k: 0, v: null },
  { k: 1, v: null },
  { k: 2, v: null },
];

export default function ComMyNFT() {
  const { accountNow, token, updateAccountInfo, userInfo, isMySelf } = useUserType();
  const { score, refresh, postScore } = useScore(accountNow ?? "", token); // {loading, value}

  const { data, refresh: refreshMyNft } = useMyNft(accountNow ?? "", token);
  const [isShowEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [test, setTest] = useState(defaultData);
  // console.log("score", score);
  const scoreRef = useRef(defaultData);
  const prevAccount = useRef(accountNow);

  const resetShowData = useCallback(() => {
    if (prevAccount.current !== accountNow) {
      scoreRef.current = defaultData;
      prevAccount.current = accountNow;
    }
    const temp = [...scoreRef.current];
    const scoreV = score.value || [];

    temp.forEach((item: any) => {
      if (item.v) {
        const index = scoreV.findIndex((itemScore: any) => itemScore.id === item.v.id);
        if (index === -1) {
          item.v = null;
        }
      }
    });

    scoreV?.forEach((item: any) => {
      const index = temp.findIndex(itemShow => itemShow.v?.id === item.id);
      if (index === -1) {
        const indexEmpty = temp.findIndex(itemShow => !itemShow.v);
        if (indexEmpty > -1) {
          temp[indexEmpty].v = item;
        }
      }
    });

    scoreRef.current = temp;

    setTest(temp);
  }, [score.value, accountNow]);

  useEffect(() => {
    resetShowData();
  }, [resetShowData]);

  const [passSuccessK, setSuccess] = useState(-1);
  const [isShowTip, setShowTip] = useState(false);
  const scoreClick = async (id: string, k: number) => {
    if (score.loading) return;
    if (!accountNow || !token) {
      message.error("Please login first");
      return;
    }
    try {
      const res: any = await postScore(accountNow, id, token);

      if (res.code === 200) {
        await refresh();
        mergeUserInfo(res.data);
        setSuccess(k);
      } else if (res.code === 400) {
        message.error("score not found");
      } else if (res.code === 405) {
        message.error("you are not the friend");
      } else if (res.code === 406) {
        setShowTip(true);
      }
    } catch {}
  };

  // 收取了积分后，更新自己的等级信息
  function mergeUserInfo(levelData: any) {
    const newUserInfo = { ...userInfo, level: levelData.level, pass_points: levelData.pass_points };
    updateAccountInfo(newUserInfo);
  }

  async function onSubmit(items: any[]) {
    onClose();
    setLoading(true);
    let res;
    if (!items.length) {
      res = await deleteMyNft(token);
    } else {
      const token_id = items[0].id.tokenId;
      const contract = items[0].contract.address;
      res = await saveMyNft(token, contract, token_id);
    }
    setLoading(false);

    if (res) {
      refreshMyNft();
    } else {
      message.error("error");
    }
  }

  function onShow() {
    if (!isMySelf) return;
    setShowEdit(true);
  }

  function onClose() {
    setShowEdit(false);
  }

  const imgData = useMemo(() => {
    if (!data) return "";
    let imgUrl = data.nft.media?.[0]?.gateway || data.nft.media?.[0]?.raw || data.nft.metadata?.image || "";
    return ipfsTransferUrl(imgUrl);
  }, [data]);

  return (
    <div className={cs.root}>
      <div className={cs.title}>
        <span>My NFT</span>
      </div>
      <div className={cs.box}>
        <div className={cs.photo} onClick={onShow}>
          {!!data ? <img src={imgData} alt="photo" /> : <NoDataEdit loading={loading} />}
        </div>

        <img className={cs.light} src="/static/nff/backpic2.png" alt="light" />

        {test.map(item => {
          return (
            <div className={classNames(cs.pass, { [cs.show]: !!item.v, [cs.p24]: item.k === 0, [cs.p88]: item.k === 1, [cs.p10]: item.k === 2 })} onClick={() => scoreClick(item.v?.id, item.k)} key={item.k}>
              <div className={classNames(cs.addOne, { [cs.animate]: passSuccessK === item.k })} onAnimationEnd={() => setSuccess(-1)}>
                +{item.v?.points ?? 1}
              </div>
              <div className={cs.passIn}>
                <img src="/static/nff/icon-pass10.png" alt="light" />
                <div className={cs.word}>
                  <span>{item.v?.points ?? "--"}</span>
                  <br />
                  <span>PASS</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <EditMyCollectionChose isSingle isShow={isShowEdit} onClose={onClose} onSave={onSubmit} newChosedData={[]} type={UploadStatus.Normal} />

      <Tips isShow={isShowTip} onCancel={() => setShowTip(false)} />
    </div>
  );
}
