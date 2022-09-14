import { useEffect, useMemo, useState } from "react";
import { Input, Modal, Tabs } from "antd";
import classNames from "classnames";
import cs from "./index.module.scss";

import ComPersonInfo from "../ComPersonInfo";
import ComLevel from "../ComLevel";
import ComMyNFT from "../ComMyNFT";
import ComRecentActivity from "../ComRecentActivity";
import ComMyCollection from "../ComMyCollection";
import ComMyActivity from "../ComMyActivity";
import ComLivePhoto from "../ComLivePhoto";
import ComMessage from "../ComMessage";
import ComPlay from "../ComPlay";

const { TabPane } = Tabs;

interface Props {
  isShow: boolean;
  material: any[];
  account: string;
  gameData: any;
  onClose: () => void;
  onSubmitLibrary: (ids: string[]) => void;
  onSubmitDIY: (name: string, size: string) => void;
}

export default function AddNewKit(props: Props) {
  const notUsedData = useMemo(() => {
    return props.material.filter(item => !item.isUsed && !item.isDIY && !item.isDIY2);
  }, [props.material]);

  const [choseId, setChoseId] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [size, setSize] = useState("small");

  useEffect(() => {
    if (props.isShow) {
      setChoseId([]);
      setName("");
      setSize("small");
      setTabKey("1");
    }
  }, [props.isShow]);

  function getComponent(id: string) {
    switch (id) {
      case "a":
        return <ComPersonInfo />;
      case "b":
        return <ComLevel account={props.account} />;
      case "c":
        return <ComMyNFT />;
      case "d":
        return <ComRecentActivity account={props.account} />;
      case "e":
        return <ComMyCollection account={props.account} />;
      case "f":
        return <ComMyActivity account={props.account} />;
      case "g":
        return <ComLivePhoto />;
      case "h":
        return <ComMessage />;
      case "i":
        return <ComPlay index={0} data={props.gameData} />;
      case "j":
        return <ComPlay index={1} data={props.gameData} />;
      case "k":
        return <ComPlay index={2} data={props.gameData} />;
    }
  }

  function onSubmit() {
    if (tabKey === "1") {
      props.onSubmitLibrary(choseId);
    } else {
      props.onSubmitDIY(name, size);
    }
  }

  function onCancel() {
    props.onClose();
  }

  // 点选某一个
  function onAddChose(id: string) {
    const index = choseId.findIndex(item => item === id);
    if (index > -1) {
      const temp = [...choseId];
      temp.splice(index, 1);
      setChoseId(temp);
    } else {
      setChoseId([...choseId, id]);
    }
  }

  const [tabKey, setTabKey] = useState("1");
  function onTabChange(key: string) {
    setTabKey(key);
  }

  // 自定义组件区域
  function onClickSize(size: string) {
    setSize(size);
  }

  function buildModalBody() {
    return (
      <div className={cs.root}>
        <div className={cs.control}>
          <i className={classNames("iconfont icon-close", cs.close)} onClick={onCancel} />
          <span className={cs.title}>Add New Widgets</span>
          <div className={classNames("btn-g", cs.submit)} onClick={onCancel}>
            Cancel
          </div>
          <div className={classNames("btn", cs.submit)} onClick={onSubmit}>
            Save
          </div>
        </div>
        <div className={cs.tabs}>
          <Tabs className={"tabsAntdWidgets"} activeKey={tabKey} onChange={onTabChange}>
            <TabPane tab="Component library" key="1">
              <div className={cs.tabBody}>
                <div className={cs.comList}>
                  {notUsedData.map(item => {
                    return (
                      <div key={item.i} className={classNames(cs.comBox, { [cs.col1]: item.w === 2, [cs.col2]: item.w === 4, [cs.col3]: item.w === 6 })} onClick={() => onAddChose(item.i)}>
                        <div className={classNames(cs.radio, { [cs.chosed]: choseId.includes(item.i) })}>
                          <img className={cs.nocheck} src="/static/nff/icon-no-check.png" alt="no-check" />
                          <img className={cs.check} src="/static/nff/icon-check.png" alt="check" />
                        </div>
                        <div className={cs.comView}>{getComponent(item.i)}</div>
                      </div>
                    );
                  })}
                </div>
                <div className={cs.footer}>
                  Can&#39;t find a suitable one, you can <span onClick={() => setTabKey("2")}>customize it</span>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Custom Widgets" key="2">
              <div className={cs.tabBody}>
                <div className={cs.formLayout}>
                  <div className={cs.label}>Widget Name</div>
                  <input className={cs.input} maxLength={25} placeholder="Enter the name of the widgets" value={name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                </div>
                <div className={cs.formLayout}>
                  <div className={cs.label}>
                    Select Size <sup>*</sup>
                  </div>
                  <div className={cs.area}>
                    <div className={classNames(cs.small, { [cs.chosed]: size === "small" })} onClick={() => onClickSize("small")}>
                      Small
                    </div>
                    <div className={classNames(cs.medium, { [cs.chosed]: size === "medium" })} onClick={() => onClickSize("medium")}>
                      Medium
                    </div>
                    <div className={classNames(cs.large, { [cs.chosed]: size === "large" })} onClick={() => onClickSize("large")}>
                      Large
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }

  return <Modal title="add new" visible={props.isShow} onCancel={onCancel} modalRender={() => buildModalBody()} className={"modal-self"} maskClosable={false} />;
}
