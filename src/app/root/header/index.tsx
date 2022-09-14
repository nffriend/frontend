import React, { useState, useMemo } from "react";
import classNames from "classnames";
import cs from "./index.module.scss";
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

interface Props {
  isPickup?: boolean;
}
export default function Header(props: Props) {
  const {classes} = useStyles();

  const [open, setOpen] = useState(false);
  function onMobileTrrige() {
    setOpen(!open);
  }

  function onCloseMenu() {
    setControlShow(false);
    setOpen(false);
  }

  const { account } = useAccount();
  const isConnected = useMemo(() => {
    return !!account;
  }, [account]);

  const { setWalletShow } = useWallet();

  const [isControlShow, setControlShow] = useState(false);

  function stop(e: React.TouchEvent) {
    e.stopPropagation();
  }

  return (
    <nav className={classNames(cs.header, { [cs.pickup]: props.isPickup !== false }, classes.font)} onTouchEnd={stop}>
      <ul className={classNames(cs.menuUl, { [cs.open]: open })}>
        <li onClick={onCloseMenu}>
          <div>
            <Link href="/#">
              <a>HOME</a>
            </Link>
          </div>
        </li>
        <li onClick={onCloseMenu}>
          <div>
            <a>MYSTERY BOXES</a>
            <div className={cs.comingsoon}>
              <img alt="" src="/static/homes/png/talk.png" />
              <div>COMING SOON~</div>
            </div>
          </div>
        </li>
        <li onClick={onCloseMenu}>
          <div>
            <Link href="/#section6">
              <a>DNG</a>
            </Link>
          </div>
        </li>
        <li className={cs.logo}>
          <div>
            <img alt="" className={cs.logoback} src="/static/homes/logo-back.png" />
            <Link href="/#">
              <a className={classes.font}>
                <div>POWER</div>
                <div>DUNGEON</div>
              </a>
            </Link>
          </div>
        </li>
        <li onClick={onCloseMenu}>
          <div>
            <Link href="/#roadmap">
              <a>ROADMAP</a>
            </Link>
          </div>
        </li>
        <li onClick={onCloseMenu}>
          <div>
            <a>DOCS</a>
            <div className={cs.comingsoon}>
              <img alt="" src="/static/homes/png/talk.png" />
              <div>COMING SOON~</div>
            </div>
          </div>
        </li>
        {isConnected ? (
          <li className={cs.userLi} onMouseEnter={() => setControlShow(true)} onMouseLeave={() => setControlShow(false)}>
            <div>
              <img className={cs.photo} src="/static/icon/default-head.png" alt="head" />
              {B.addMosaic(account)}
            </div>
            <UserControl onCloseMenu={onCloseMenu} isShow={isControlShow} />
          </li>
        ) : (
          <li className={cs.btnli}>
            <div className={classNames(cs.tab, cs.btn)} onClick={() => setWalletShow(true)}>
              <div>
                Connect <span>Wallet</span>
              </div>
            </div>
          </li>
        )}
      </ul>

      <div className={cs.mobileControl}>
        {/* 移动端 */}
        <img alt="menu" className={classNames(cs.mobileBtn, { [cs.open]: open })} src="/static/icon/header-menu.png" onClick={onMobileTrrige} />

        {isConnected ? (
          <div className={cs.userLi} onTouchEnd={() => setControlShow(!isControlShow)}>
            <div className={cs.userHeader}>
              {B.addMosaic(account)}
              <img className={cs.photo} src="/static/icon/default-head.png" alt="head" />
              <UserControl onCloseMenu={onCloseMenu} isShow={isControlShow} />
            </div>
          </div>
        ) : (
          <div className={cs.btnLi} onClick={() => setWalletShow(true)}>
            Connect Wallet
          </div>
        )}
      </div>
    </nav>
  );
}
