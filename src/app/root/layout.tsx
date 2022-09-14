import React from "react";
// import { makeStyles } from "@/components/provider/makeStyles";
import cs from "./layout.module.scss";
import { useRouter } from "next/router";

import Context from "./context";
import Menu from "@/components/Menu";
import useFontSize from "@/hooks/useFontSize";

import Wallet from "@/components/Wallet";
import FollowCancel from "@/components/FollowCancel";
import InvCodeModal from "@/components/InvCodeModal";
import AuthTips from "@/components/AuthNotice";
import GTA from "@/components/gtag";
// import GTATwitter from '@/components/gtag/twitter';

const Layout = ({ children }: any) => {
  const winSize = useFontSize();

  const router = useRouter();
  const exCludeList = ["/404"];
  // const exFootCludeList = ["/", "/404", "/nff"];

  return (
    <Context.Provider value={{ winSize }}>
      <div
        className={cs.root}
        id="layout"
        style={{ transform: `translateX(-50%) scale(${winSize.scale})` }}
      >
        <GTA />
        {/* <GTATwitter /> */}
        {!exCludeList.includes(router.pathname) ? <Menu /> : null}

        <main className={cs.main}>{children}</main>
        {/* {!exFootCludeList.includes(router.pathname) ? <Footer /> : null} */}
        <Wallet />
        <AuthTips />
        <FollowCancel />
        <InvCodeModal />
      </div>
    </Context.Provider>
  );
};

export default Layout;
