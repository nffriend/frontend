import { useEffect, useState } from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import useInterval from "@/hooks/useInterval";
import useWallet from "@/hooks/useWallet";
export default function EmptySpace() {
  const [isShow, setShow] = useState(false);
  const [time, setTime] = useState(0);
  const [showIndex, setShowIndex] = useState(0);

  const { setWalletShow } = useWallet();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
    setTime(2000);
    return () => {
      setTime(0);
    };
  }, []);

  useInterval(() => {
    setShowIndex(prev => {
      return prev === 0 ? 1 : 0;
    });
  }, time);

  return (
    <div className={classNames(cs.absolute, cs.root, { [cs.show]: isShow })}>
      <img className={classNames(cs.absolute, cs.back)} src="/static/nff/empty/background.png" alt="back" />
      <img className={classNames(cs.absolute, cs.friday)} src="/static/nff/empty/friday.png" alt="friday" />
      <img className={classNames(cs.absolute, cs.pages)} src="/static/nff/empty/pages.png" alt="pages" />

      <img className={classNames(cs.absolute, cs.groupLogos, { [cs.show]: showIndex === 0 })} src="/static/nff/empty/logo1.png" alt="logo" />
      <img className={classNames(cs.absolute, cs.groupLogos, { [cs.show]: showIndex === 1 })} src="/static/nff/empty/logo2.png" alt="logo" />

      <svg className={classNames(cs.absolute, cs.svglines)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 973.68 782.14">
        <defs></defs>
        <path className={classNames(cs.cls, cs.a2)} d="M270.87,154.66s3.33,71.17,58.53,85.14" />
        <path className={classNames(cs.cls, cs.a2)} d="M679.71,145c-10.06,38.64-41.08,54.56-83.13,58.53" />
        <path className={classNames(cs.cls, cs.a2)} d="M891.21,300q-30.93,49.89-92.45,38.58" />
        <path className={cs.cls} d="M462.23,488.84Q348.17,491.5,312.59,566" />
        <path className={cs.cls} d="M247.41,353.16c-50.72,12.79-89.32,7.1-111.73-23.28" />
        <path className={cs.cls} d="M709,582s21.28,24.6,27.27,51.21,32.58,34.58,32.58,34.58" />
      </svg>

      <div className={classNames("btn", cs.createSpace)} onClick={() => setWalletShow(true)}>
        Create My Space
      </div>
    </div>
  );
}
