import { useEffect, useState } from "react";
import cs from "./PhotoBox.module.scss";
import classNames from "classnames";

interface Props {
  src: string;
}
export default function PhotoBox(props: Props) {
  const [imgPref, setImgPref] = useState(props.src);
  const [imgNow, setImgNow] = useState("");
  const [isStart, setStart] = useState(false);

  useEffect(() => {
    if (props.src) {
      const arr = props.src.split("@@");
      setImgNow(arr[0]);
      setStart(true);
    }
  }, [props.src]);

  function onAniDone() {
    setStart(false);
    setImgPref(imgNow);
  }
  return (
    <div className={cs.root}>
      <img className={classNames(cs.face, { [cs.ani]: isStart })} alt="face" src={imgPref} onAnimationEnd={onAniDone} />
      <img className={classNames(cs.back, { [cs.ani]: isStart })} alt="back" src={imgNow} />
    </div>
  );
}
