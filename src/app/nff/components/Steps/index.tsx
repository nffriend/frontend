import { useEffect } from "react";
import classNames from "classnames";
import cs from "./index.module.scss";
import useSteps from "@/hooks/useSteps";

interface Props {
  stepIndex: number;
  info: string;
  onNextStep?: (step: number) => void;
  onClose?: () => void;
}
export default function Steps(props: Props) {
  const { stepInfo, gotoNext, onClose } = useSteps();

  function onNextStep() {
    props.onNextStep?.(props.stepIndex);
    gotoNext(props.stepIndex + 1);
  }

  function onExit() {
    props.onClose?.();
    onClose();
  }

  function onStop(e: React.MouseEvent) {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
    return false;
  }

  useEffect(() => {
    const dom = document.getElementById(`new-step-box${props.stepIndex}`);
    if (dom) {
      if (stepInfo.stepNow === props.stepIndex) {
        dom.style.zIndex = "9999";
      } else {
        dom.style.zIndex = "auto";
      }
    }
  }, [stepInfo.stepNow, props.stepIndex]);

  return stepInfo.isShow ? (
    <div className={classNames(cs.root, { [cs.show]: stepInfo.stepNow === props.stepIndex })}>
      <div className={cs.body} onClick={onStop}>
        <div>新人引导</div>
        <div>{props.info}</div>
        <button onClick={onNextStep}>下一步</button>
        <button onClick={onExit}>关闭</button>
      </div>
    </div>
  ) : null;
}
