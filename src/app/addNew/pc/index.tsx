import { useEffect, useState } from "react";
import cs from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/models/store";

import { Tabs, message } from "antd";
import { useRouter } from "next/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Person from "../components/Person";
import ComLibrary from "../components/ComLibrary";
import CustomWidgets from "../components/CustomWidgets";

import useUserType from "@/hooks/useUserType";
import { useGames } from "@/hooks/useData";
import useLayout from "@/hooks/useLayout";

const { TabPane } = Tabs;

export default function AddNew() {
  const { accountNow } = useUserType();
  const { layout, material, saveNewLayout, addLayout, addLayoutDIY } = useLayout(accountNow || "");
  const token: string = useSelector((state: RootState) => state.app.token);
  const { data: gameData } = useGames(accountNow || "", token);

  const [isSubmit, setSubmit] = useState(false);
  const router = useRouter();
  const query = router.query;

  function onSubmitLibrary(ids: string[]) {
    addLayout(ids);
    setSubmit(true);
  }

  // 保存DIY
  async function onSubmitDIY(name: string, size: string, detail: string, callback: any) {
    const res = await addLayoutDIY(name, size, detail);
    if (res.type) {
      message.success("add success");
      callback();
      goback();
    } else {
      message.error(res.msg);
    }
  }

  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    if (query.tab) {
      setActiveKey(query.tab as string);
    } else {
      if (sessionStorage.getItem("widgets")) {
        setActiveKey("2");
        sessionStorage.removeItem("widgets");
      }
    }
  }, []);

  useEffect(() => {
    if (isSubmit) {
      saveNewLayout(layout);
      setSubmit(false);
    }
  }, [layout, saveNewLayout, isSubmit]);

  function goback() {
    router.back();
  }

  return (
    <div className={cs.root}>
      <div className={cs.header}>
        <ArrowLeftOutlined className={cs.back} onClick={goback} />
        <div className={cs.title}>Add New Widgets</div>
      </div>

      <Tabs activeKey={activeKey} className="tabsAntd" onChange={setActiveKey}>
        <TabPane tab="Component library" key="1" className={cs.tabpane}>
          <ComLibrary material={material} account={accountNow || ""} gameData={gameData} onSubmitLibrary={onSubmitLibrary} />
        </TabPane>
        <TabPane tab="Personalization Widgets" key="2">
          <Person />
        </TabPane>
        <TabPane tab="Custom Widgets" key="3">
          <CustomWidgets onSubmitDIY={onSubmitDIY} />
        </TabPane>
      </Tabs>
    </div>
  );
}
