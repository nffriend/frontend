import { useEffect, useState } from "react";
import classNames from "classnames";
import cs from "./index.module.scss";
import "intro.js/introjs.css";
import { useRouter } from "next/router";

import useMenu from "@/hooks/useMenu";
import useWallet from "@/hooks/useWallet";
import useUserType from "@/hooks/useUserType";

import Landscape from "../components/Landscape";
import EmptySpace from "../components/EmptySpace";

export default function Nff() {
  const router = useRouter();
  const { pid, type } = router.query;
  const { isConnected, setWalletShow } = useWallet();

  const { accountNow } = useUserType();

  const [menuType, setMenu] = useMenu();

  const [showAdd, setShowAdd] = useState(false);

  // 退出编辑模式
  function onClose() {
    setMenu({ isEdit: false });
  }

  useEffect(() => {
    if(type && type === 'invite' && pid) {
      const account = pid as string;
      localStorage.setItem('invite_code', account)
    }
  }, [type, pid])

  return (
    <section className={cs.root}>
      {!pid && !isConnected && <EmptySpace />}
      {(pid || isConnected) && (
        <div className={cs.content}>
          <Landscape isDraggable={menuType.isEdit} onClose={onClose} showAdd={showAdd} account={accountNow} />
        </div>
      )}
    </section>
  );
}
