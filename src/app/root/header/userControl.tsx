import cs from "./userControl.module.scss";
import Link from "next/link";
import classNames from "classnames";
import React, { useEffect } from "react";
interface Props {
  isShow: boolean;
  onCloseMenu: () => void;
}
export default function UserControl(props: Props) {
  function onCloseMenu() {
    props.onCloseMenu();
  }

  function stop(e: React.TouchEvent) {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
  }

  useEffect(() => {
    document.body.addEventListener("touchend", onCloseMenu, false);
    return () => {
      document.body.removeEventListener("touchend", onCloseMenu, false);
    };
  }, []);

  return (
    <div className={classNames(cs.userControl, { [cs.show]: props.isShow })} onTouchEnd={stop}>
      <div>
        <Link href="/mybag_test?chose=map">
          <a className={cs.item} onClick={onCloseMenu}>
            My Assets
          </a>
        </Link>
        <Link href="/mybag_test?chose=order">
          <a className={cs.item} onClick={onCloseMenu}>
            My Order
          </a>
        </Link>
      </div>
    </div>
  );
}
