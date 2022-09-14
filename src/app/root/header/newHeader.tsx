import React, { useState, useMemo } from "react";
import classNames from "classnames";
import cs from "./newHeader.module.scss";
import { makeStyles } from "@/components/provider/makeStyles";
import useAccount from "@/hooks/useAccount";
import B from "@/utils/big";
import Link from "next/link";
import UserControl from "./userControl";
import useWallet from "@/hooks/useWallet";
const useStyles = makeStyles()(() => ({
  font: {
    fontFamily: "MetalMania",
  },
}));

export default function Header() {
  const {classes} = useStyles();

  function onCloseMenu() {
    setControlShow(false);
  }

  const { account } = useAccount();
  const isConnected = useMemo(() => {
    return !!account;
  }, [account]);

  const { setWalletShow } = useWallet();

  const [isControlShow, setControlShow] = useState(false);

  function stop(e: React.TouchEvent) {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
  }

  function toggleControl() {
    setControlShow(perv => {
      return !perv;
    });
  }
  return (
    <nav className={classNames(cs.header)} onTouchEnd={stop}>
      <div className={cs.headerBox}>
        <Link href="/mint">
          <a className={cs.logo}>
            <img src="/static/heroMint/logoBig.png" alt="logo" />
          </a>
        </Link>
        <ul className={classNames(cs.menuUl)}>
          {isConnected ? (
            <li className={cs.userLi} onMouseEnter={() => setControlShow(true)} onMouseLeave={() => setControlShow(false)} onTouchEnd={toggleControl}>
              <div>
                <img className={cs.photo} src="/static/icon/default-head.png" alt="head" />
                {B.addMosaic(account)}
              </div>
              <UserControl onCloseMenu={onCloseMenu} isShow={isControlShow} />
            </li>
          ) : (
            <li className={cs.btnli}>
              <div className={classNames(cs.tab, cs.btn)} onClick={() => setWalletShow(true)}>
                Connect Wallet
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
