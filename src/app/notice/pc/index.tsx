import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

import { Tabs } from "antd";
import Item from "../components/NoticeItem";

const { TabPane } = Tabs;

export default function ListPage() {
  const router = useRouter();

  function onChange() {}

  return (
    <div className={cs.root}>
      <div>
        <div className={cs.title}>
          <img className={cs.left} src="/static/nff/icon-left.png" alt="left" onClick={() => router.back()} />
          <img className={cs.photo} src="/static/test.png" alt="photo" />
          <span className={cs.name}>Oscar Norris</span>
        </div>

        <div className={cs.tabs}>
          <Tabs className={"tabsAntd"} defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="All" key="1">
              {[1, 2, 3, 4, 5].map(item => {
                return <Item key={item} />;
              })}
            </TabPane>
            <TabPane tab="Message" key="2">
              {[1, 2, 3, 4, 5].map(item => {
                return <Item key={item} />;
              })}
            </TabPane>
            <TabPane tab="Announcement" key="3">
              {[1, 2, 3, 4, 5].map(item => {
                return <Item key={item} />;
              })}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
