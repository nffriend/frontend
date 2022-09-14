import { useMemo, useState } from "react";
import classNames from "classnames";
import { styled } from "@mui/material/styles";
import cs from "./index.module.scss";
import ModelDynamic from '@/components/ModelViewer/dynamicComponent';

const IFrame = styled("iframe")`
  display: block;
  border: none;
  width: 100%;
  height: 100%;
`;

export enum URLType {
  Normal = "normal",
  GLB = "glb",
}

interface Props {
  url?: string;
  isShow: boolean;
  onClose: () => void;
  onShare?: () => void;
}

const GameWindow = (props: Props) => {
  const [isFullScreen, setFullScreen] = useState(false);

  const handleClose = () => {
    setFullScreen(false);
    props.onClose();
  };

  const toggleFullscreen = () => {
    setFullScreen((prev) => !prev);
  };

  const urlType: URLType = useMemo(() => {
    if (props.url && props.url?.indexOf("glb") > -1) {
      return URLType.GLB;
    }
    return URLType.Normal;
  }, [props.url]);
  return props.isShow ? (
    <div className={classNames(cs.root)}>
      <div className={cs.body}>
        <div
          className={classNames(cs.iframeBox, {
            [cs.fullScreen]: isFullScreen,
          })}
        >
          {!!props.url && ( urlType === URLType.Normal ? <IFrame src={props.url} /> : <ModelDynamic source={props.url} /> )}
        </div>
        <div
          className={classNames(cs.control, { [cs.fullControl]: isFullScreen })}
        >
          <img src="/static/nff/close.png" onClick={handleClose} alt="close" />
          <img
            src="/static/nff/full.png"
            onClick={toggleFullscreen}
            alt="fullscreen"
          />
          {/* <img src="/static/nff/game.png" onClick={props.onShare} alt="share" /> */}
        </div>
      </div>
    </div>
  ) : null;
};

export default GameWindow;
