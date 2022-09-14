import { useMemo, useState } from "react";
import cs from "./ComLibrary.module.scss";
import classNames from "classnames";

import ComPersonInfo from "../../nff/components/ComPersonInfo";
import ComLevel from "../../nff/components/ComLevel";
import ComMyNFT from "../../nff/components/ComMyNFT";
import ComRecentActivity from "../../nff/components/ComRecentActivity";
import ComMyCollection from "../../nff/components/ComMyCollection";
import ComMyActivity from "../../nff/components/ComMyActivity";
import ComLivePhoto from "../../nff/components/ComLivePhoto";
import ComMessage from "../../nff/components/ComMessage";
import ComPlay from "../../nff/components/ComPlay";

import NoData from "@/components/NoData";

interface Props {
  material: any[];
  account: string;
  gameData: any;

  onSubmitLibrary: (ids: string[]) => void;
}

export default function ComLibrary(props: Props) {
  const notUsedData = useMemo(() => {
    return props.material.filter(item => !item.isUsed && !item.isDIY && !item.isDIY2);
  }, [props.material]);

  const [choseId, setChoseId] = useState<string[]>([]);

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
    props.onSubmitLibrary(choseId);
    setChoseId([]);
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

  return (
    <div className={cs.root}>
      <div className={cs.tabs}>
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
            {!notUsedData.length && (
              <div className={cs.nodata}>
                <NoData />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={cs.control}>
        <div className={classNames("btn", cs.submit, { [cs.disabled]: !choseId.length })} onClick={onSubmit}>
          Save
        </div>
      </div>
    </div>
  );
}
