import { useMemo } from "react";
import cs from "./Steps.module.scss";
import classNames from "classnames";

interface Props {
  stepData: any[];
  stepNow: number;
}
export default function Steps(props: Props) {
  return (
    <div className={cs.root}>
      {props.stepData.map((item, index: number) => {
        return (
          <div className={cs.step} key={index}>
            <div className={cs.box}>
              <div className={cs.tip}>{index + 1}</div>
              {props.stepNow < index + 1 && <div className={cs.step0}></div>}
              {props.stepNow === index + 1 && <img className={cs.stepIcon} src="/static/nff/icon-rocket.png" alt="pic" />}
              {props.stepNow > index + 1 && <div className={cs.step1}></div>}
              <div className={classNames(cs.words, { [cs.chose]: props.stepNow === index + 1 })}>
                {item.words.map((itemW: string, indexW: number) => {
                  return <div key={indexW}>{itemW}</div>;
                })}
              </div>
            </div>

            {index < props.stepData.length - 1 && <div className={classNames(cs.line, { [cs.dashed]: props.stepNow <= index + 1 })}></div>}
          </div>
        );
      })}
    </div>
  );
}
