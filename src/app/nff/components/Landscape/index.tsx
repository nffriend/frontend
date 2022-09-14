import { useState, useContext, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/models/store";
import cs from "./index.module.scss";
import Context from "@/app/root/context";
import GridLayout from "react-grid-layout";
import classNames from "classnames";
import { message } from "antd";
import _ from "lodash";

import { useRouter } from "next/router";
import { useGames } from "@/hooks/useData";
import useLayout from "@/hooks/useLayout";
import useMenu from "@/hooks/useMenu";
import useCom2Datas from "@/hooks/useCom2Datas";

import GameWindow from "@/components/GameWindow";
import DIYEditModal from "../DIYEditModal";
import AddNewKit from "../AddNewKit";
import EditBar from "../EditBar";
import DIYTips from "../DIYTips";

import ComRecentActivity from "../ComRecentActivity";
import ComMyCollection from "../ComMyCollection";
import ComMyActivity from "../ComMyActivity";
import ComPersonInfo from "../ComPersonInfo";
import ComLivePhoto from "../ComLivePhoto";
import ComMessage from "../ComMessage";
import ComMyNFT from "../ComMyNFT";
import ComLevel from "../ComLevel";
import ComPlay from "../ComPlay";
import ComDIY2 from "../ComDIY2";
import ComDIY from "../ComDIY";

interface Props {
  isDraggable: boolean; // 是否可以拖动（处于编辑模式）
  showAdd: boolean; // 是否显示添加新模块的弹框
  account: string | null | undefined;
  onClose: () => void;
}

export default function Landscape(props: Props) {
  const account = props.account || "";
  const router = useRouter();

  const { winSize } = useContext(Context);
  const token: string = useSelector((state: RootState) => state.app.token);
  const { layout, material, isDone, DIYDatas, setLayout, setPrevLayout, saveNewLayout, restoreLayout, addLayout, removeLayout, resetLayout, addLayoutDIY, updateDIYDatasByUser, editDIY2 } = useLayout(account);
  const [menuType] = useMenu();
  const boxSize = useMemo(() => {
    // const winW = Math.min(winSize.w, 1440); // 1920+ 留白
    // const w = winW - (winW <= 750 ? 0 : menuType.isClose ? winSize.fontSize : winSize.fontSize * 2);
    // const h = winSize.fontSize * 3.92; // 高度392px;

    const winW = 1440; // 1920+ 留白
    const w = winW - (winSize.w <= 750 ? 0 : menuType.isClose ? winSize.fontSize : winSize.fontSize * 2);
    const h = winSize.fontSize * 3.92; // 高度392px;

    return { w, h };
  }, [winSize.w, winSize.fontSize, menuType.isClose]);

  const [isShow, setShow] = useState(false);

  const { data: gameData, refresh: refreshGame } = useGames(account, token);
  const { list: com2List } = useCom2Datas();

  useEffect(() => {
    setShow(true);
  }, []);

  // 每次进入编辑模式，保存当前布局，因为用户可能取消
  useEffect(() => {
    if (props.isDraggable) {
      setPrevLayout(layout);
    }
  }, [props.isDraggable]);

  // 用户点击移除
  function onRemove(i: string) {
    removeLayout(i);
  }

  // 布局改变后触发
  function onLayoutChange(newLayout: any) {
    setLayout(newLayout);
  }

  // 用户点击完成，保存新布局
  function onSave() {
    saveNewLayout(layout);
    props.onClose();
  }

  // 用户点击取消，恢复到之前的布局
  function onCancel() {
    restoreLayout();
    props.onClose();
  }

  // 用户点击重置， 恢复默认布局
  function onReset() {
    resetLayout();
    props.onClose();
  }

  // 用户点击添加新组件按钮，模态框出现
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  function onSubmitLibrary(ids: string[]) {
    addLayout(ids);
    setIsModalVisible(false);
  }

  // 保存DIY
  async function onSubmitDIY(name: string, size: string) {
    const res = await addLayoutDIY(name, size);
    if (res.type) {
      let w = 2;
      if (size === "medium") w = 4;
      else if (size === "large") w = 6;

      setDIYNowInfo({ i: res.i as string, data: { name }, w });
      setIsModalVisible(false);
      setDIYShow(true);
      props.onClose();
    } else {
      message.error(res.msg);
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (props.showAdd) {
      showModal();
    } else {
      handleCancel();
    }
  }, [props.showAdd]);

  // 根据ID渲染对应的组件
  function getComponent(item: any) {
    switch (item.i) {
      case "a":
        return <ComPersonInfo />;
      case "b":
        return <ComLevel account={account} />;
      case "c":
        return <ComMyNFT />;
      case "d":
        return <ComRecentActivity account={account} />;
      case "e":
        return <ComMyCollection account={account} />;
      case "f":
        return <ComMyActivity account={account} />;
      case "g":
        return <ComLivePhoto />;
      case "h":
        return <ComMessage />;
      case "i":
        return <ComPlay index={0} data={gameData} onPlay={onPlayGame} refresh={refreshGame} />;
      case "j":
        return <ComPlay index={1} data={gameData} onPlay={onPlayGame} refresh={refreshGame} />;
      case "k":
        return <ComPlay index={2} data={gameData} onPlay={onPlayGame} refresh={refreshGame} />;
    }

    // 渲染diy的组件
    if (/^diy[\d|-]/.test(item.i)) {
      const data = DIYDatas.find(DIYItem => DIYItem.i === item.i);
      return <ComDIY data={data?.DIYData} i={item.i} w={item.w} onEdit={onDIYEdit} />;
    } else if (/^diyp-/.test(item.i)) {
      // diy2.0
      const data = DIYDatas.find(DIYItem => DIYItem.i === item.i);
      return <ComDIY2 data={data?.DIYData} i={item.i} w={item.w} com2List={com2List} onEdit={onDIY2Edit} />;
    }
  }

  // Game相关
  const [isGameShow, setGameShow] = useState(false);
  const [gameUrl, setGameUrl] = useState("");

  function onPlayGame(url: string) {
    setGameUrl(url);
    setGameShow(true);
  }

  function onGameClose() {
    setGameUrl("");
    setGameShow(false);
  }

  // diytips
  const [isDIYShow, setDIYShow] = useState(false);

  function onDIYTipsSubmit() {
    setDIYShow(false);
    setDIYEditShow(true);
  }

  function onDIYClose() {
    setDIYNowInfo(null);
    setDIYShow(false);
  }

  // diy edit
  const [diyNowInfo, setDIYNowInfo] = useState<{ i: string; data: any; w: number } | null>(null);
  const [isDIYEditShow, setDIYEditShow] = useState(false);

  // 可能来自两个地方，刚新建完毕时弹出的edit框(带ID，无data) / 手动点edit拉起（带ID，带data）
  function onDIYEdit(id: string, sourceData: any, w: number) {
    setDIYNowInfo({ i: id, data: sourceData, w });
    setDIYEditShow(true);
  }

  function onDIYEditClose() {
    setDIYNowInfo(null);
    setDIYEditShow(false);
  }

  const [editLoading, setEditLoading] = useState(false);
  async function onDIYEditSubmit(newData: { name: string; detail: string }) {
    let res;
    if (diyNowInfo) {
      setEditLoading(true);
      res = await updateDIYDatasByUser(diyNowInfo.i, newData, diyNowInfo.w);
      setEditLoading(false);
    }
    if (res?.type) {
      message.success("edit success");
      onDIYEditClose();
    } else {
      message.error("edit error");
    }
  }

  // 这个组件是否可编辑，可以编辑的需要显示阴影
  function isCanEdit(i: string) {
    return ["e"].includes(i) || i.includes("diy");
  }

  function onDIY2Edit(id: string, sourceData: any, w: number) {
    editDIY2(id, sourceData, w);
    router.push(`/add-detail?type=${sourceData.name}`);
  }

  return (
    <>
      <EditBar isShow={props.isDraggable} onSubmit={onSave} onCancel={onCancel} onAddBtn={showModal} onReset={onReset} isMenuClose={menuType.isClose} />

      <div className={classNames(cs.box, { [cs.show]: isShow && isDone })}>
        <GridLayout className={cs.layout} layout={layout} width={boxSize.w} draggableHandle=".drag" cols={6} rowHeight={boxSize.h} isResizable={false} isBounded={true} transformScale={winSize.scale} onLayoutChange={onLayoutChange}>
          {_.map(layout, item => (
            <div className={classNames(cs.block, { [cs.canEdit]: isCanEdit(item.i) && !props.isDraggable })} key={item.i}>
              {getComponent(item)}

              <div className={classNames(cs.editBox, { [cs.show]: props.isDraggable })}>
                {item.i !== "a" && (
                  <>
                    <div className={classNames(cs.editBtn)} onClick={() => onRemove(item.i)}>
                      <img src="/static/nff/icon-remove.png" alt="remove" />
                      <span>remove</span>
                    </div>
                    <div className={classNames(cs.editBtn, cs.editDrag, "drag")}>
                      <img src="/static/nff/icon-drag.png" alt="drag" />
                      <span>drag</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </GridLayout>
      </div>

      <AddNewKit isShow={isModalVisible} material={material} account={account} gameData={gameData} onClose={handleCancel} onSubmitLibrary={onSubmitLibrary} onSubmitDIY={onSubmitDIY} />

      <GameWindow isShow={isGameShow} url={gameUrl} onClose={onGameClose} />

      <DIYTips isShow={isDIYShow} onCancel={onDIYClose} onSubmit={onDIYTipsSubmit} />

      <DIYEditModal isShow={isDIYEditShow} sourceData={diyNowInfo} loading={editLoading} onCancel={onDIYEditClose} onSubmit={onDIYEditSubmit} />
    </>
  );
}
