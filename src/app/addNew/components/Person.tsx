import { useState, useMemo, useEffect } from "react";
import cs from "./Person.module.scss";
import WidgetCard from "./WidgetCard";
import classNames from "classnames";
import { BarsOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

// import iframeList from "@/config/config";

import useCom2Datas from "@/hooks/useCom2Datas";

export default function Person() {
  const [styleType, setStyleType] = useState(0);
  const router = useRouter();

  const { list: listData, hot: hotData } = useCom2Datas();

  function onChangeStyle() {
    setStyleType(prev => {
      return prev === 0 ? 1 : 0;
    });
  }

  function onAdd(item: any) {
    router.push(`/add-detail?type=${item.id}`);
  }

  return (
    <div className={cs.root}>
      <div className={classNames(cs.box, cs.mb)}>
        <div className={cs.title}>
          <span>
            Hot Today
            <img src="/static/nff/icon-fire.png" alt="hot" />
          </span>
        </div>
        <div className={cs.infos}>
          {hotData.map((item: any, index: number) => {
            return (
              <div key={index} className={cs.hotItem} onClick={() => onAdd(item)}>
                <img src={item.icon} alt="icon" />
                <div>{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={cs.box}>
        <div className={cs.title}>
          <span>Personality Essential</span>
          <div className={cs.typeBtn} onClick={onChangeStyle}>
            {styleType === 1 ? <QrcodeOutlined /> : <BarsOutlined />}
          </div>
        </div>
        <div className={cs.infos2}>
          {listData.map((item: any, index: number) => {
            return <WidgetCard key={index} type={styleType} item={item} onAdd={onAdd} />;
          })}
        </div>
      </div>
    </div>
  );
}
