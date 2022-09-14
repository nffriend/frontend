import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import { Button } from "antd";
// import Step from "../Steps";

interface Props {
  isShow: boolean;
  isMenuClose: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onAddBtn: () => void;
  onReset: () => void;
}
export default function EditBar(props: Props) {
  return (
    <div className={classNames(cs.root, { [cs.show]: props.isShow, [cs.closeMenu]: props.isMenuClose })}>
      <div className={cs.infoBox}>
        {/* <div className={classNames("new-step2", cs.stepBox)} data-step="2">
          <div className={classNames("btn", cs.addBtn)} onClick={props.onAddBtn}>
            <i className={"iconfont icon-jiahao-"} />
            Add New Widgets
          </div>
        </div> */}

        <span />
        <div className={classNames("btn-g", cs.btnControl, cs.transparent)} onClick={props.onCancel}>
          Cancel
        </div>
        <div className={classNames("btn", cs.btnControl)} onClick={props.onSubmit}>
          Save
        </div>
      </div>
    </div>
  );
}
