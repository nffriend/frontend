import React, { useEffect, useState } from "react";
import cs from "./index.module.scss";
import classNames from "classnames";

export enum IFRAME_TYPE {
  Single = 1,
  SrcDoc = 2,
}

interface Props {
  type: IFRAME_TYPE;
  url: string;
  srcDoc?: string;
}

const Layout = (props: Props) => {
  const { type, url, srcDoc = "" } = props;
  const bathUrl = url.split("?")[0];

  const [isRefresh, setRefresh] = useState(false);

  // 为了解决iframe不全屏问题
  function setR() {
    setRefresh(true);
    console.log("refressh:");
    setTimeout(() => {
      setRefresh(false);
    }, 300);
  }
  if (type === IFRAME_TYPE.Single) {
    if (url.indexOf('shil.me') !== -1) {
      return (
        <div className={classNames(cs.iframeLayout, { [cs.refresh]: isRefresh })}>
          <iframe onLoad={setR} style={{ border: "none", width: "calc(100% + 150px)", height: "800px",  position: 'absolute', left: -150, top: -400 }} src={url} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      );
    }
    return (
      <div className={classNames(cs.iframeLayout, { [cs.refresh]: isRefresh })}>
        <iframe onLoad={setR} style={{ border: "none", width: "100%", height: "100%" }} src={url} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  if (type === IFRAME_TYPE.SrcDoc) {
    return (
      <div className={classNames(cs.iframeLayout, { [cs.refresh]: isRefresh })}>
        <iframe onLoad={setR} style={{ border: "none", width: "100%", height: "100%" }} data-tweet-url={url} srcDoc={srcDoc} allowFullScreen />
      </div>
    );
  }
  return null;
};

export default Layout;
