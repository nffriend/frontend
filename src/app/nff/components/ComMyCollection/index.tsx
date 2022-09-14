import { useState, useMemo, useEffect } from "react";
import classNames from "classnames";
import cs from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import EditBtn from "../EditBtn";
import EditMyCollection from "../EditMyCollection";
import EditMyCollectionChose, { UploadStatus } from "../EditMyCollectionChose";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import NoData from "@/components/NoData";

import useNftDatas from "./useNftDatas";
import useUserType from "@/hooks/useUserType";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface Props {
  account: string;
}
export default function ComMyCollection(props: Props) {
  const { isMySelf, token } = useUserType();
  const { showNfts, loading, saveShowNfts, refreshCollection } = useNftDatas(props.account, true, token);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowModal2, setShowModal2] = useState(false);

  function onEdit() {
    if (isMySelf === 1) {
      setShowModal(true);
    }
  }

  // 用户呼出选择NFT框
  function onChoseIn() {
    setShowModal(false);
    setShowModal2(true);
  }

  // 用户退出选择NFT框
  function onChoseOut() {
    setShowModal(true);
    setShowModal2(false);
  }

  // 用户退出编辑框
  function onEditClose() {
    setShowModal(false);
    setNewChosedData(showNfts);
  }
  /**
   * 用户保存选择NFT
   * @param chosedData 所有最新选中的
   * newChosedData跟随showNfts, 但也可手动改变， 它是最新的选中的NFTs
   * */
  const [newChosedData, setNewChosedData] = useState(showNfts);
  function onChoseSave(chosedData: any[]) {
    setNewChosedData(chosedData);
    onChoseOut();
  }

  useEffect(() => {
    setNewChosedData(showNfts);
  }, [showNfts]);

  // 用户最终确认将新的更改应用于橱窗
  async function onSaveSubmit() {
    await saveShowNfts(
      token,
      newChosedData.map(item => ({
        contract: item.contract,
        token_id: item.id.tokenId,
      })),
    );
    setShowModal(false);
    refreshCollection();
  }

  return (
    <div className={cs.root}>
      <div className={cs.title}>
        <span>My Collection {loading && <Spin indicator={antIcon} />}</span>
        {isMySelf === 1 && (
          <div className={cs.editCom}>
            <EditBtn onSubmit={onEdit} />
          </div>
        )}
      </div>
      {
        <div className={cs.list}>
          <Swiper className={cs.swiperPadding} slidesPerView={"auto"} spaceBetween={16} slidesOffsetBefore={24} slidesOffsetAfter={24} grabCursor>
            {showNfts?.map((item, index) => {
              return (
                <SwiperSlide className={cs.slide} key={index}>
                  <Card data={item} />
                </SwiperSlide>
              );
            })}
            {!showNfts?.length && isMySelf === 1 && (
              <SwiperSlide className={cs.slide}>
                <Card onClick={onEdit} />
              </SwiperSlide>
            )}
          </Swiper>
          {!showNfts?.length && isMySelf === 0 && <NoData image="/static/nff/icon-nodata1.png" info="Sorry:(no data" />}
        </div>
      }

      <EditMyCollection isShow={isShowModal} onClose={onEditClose} onChoseShow={onChoseIn} newChosedData={newChosedData} onChange={setNewChosedData} onSave={onSaveSubmit} />
      <EditMyCollectionChose isShow={isShowModal2} onClose={onChoseOut} onSave={onChoseSave} newChosedData={newChosedData} type={UploadStatus.Total} />
    </div>
  );
}
