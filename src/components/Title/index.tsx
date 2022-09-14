import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";

interface Props {
  title: any;
  btn?: string;
  noPL?: boolean;
  onClick?: () => void;
}
export default function SpaceRanking(props: Props) {
  return (
    <div className={classNames(cs.title, { [cs.noPL]: props.noPL })}>
      <span>{props.title}</span>
      {!!props.btn && (
        <span className={cs.more} onClick={props.onClick}>
          {props.btn}
        </span>
      )}
    </div>
  );
}
