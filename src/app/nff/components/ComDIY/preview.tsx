import {} from "react";
import cs from "./index.module.scss";

interface Props {
  detail: string;
  name: string;
}
export default function Preview(props: Props) {
  return (
    <div className={cs.root}>
      {!!props.name && (
        <div className={cs.title}>
          <span>{props.name}</span>
        </div>
      )}

      {!!props.detail && (
        <div className={cs.detailCom}>
          <div className={cs.detailComS}>
            <div className={cs.detailBox} dangerouslySetInnerHTML={{ __html: props.detail }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
