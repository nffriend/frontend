import {} from "react";
import cs from "./index.module.scss";

interface Props {
  onSubmit: () => void;
}
export default function EditBtn(props: Props) {
  return (
    <div className={cs.root} onClick={props.onSubmit}>
      Edit
    </div>
  );
}
