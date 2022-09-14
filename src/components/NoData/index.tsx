import {} from "react";
import { Empty } from "antd";
import cs from "./index.module.scss";
import classNames from "classnames";
interface Props {
  info?: string;
  image?: string;
  className?: string;
}
export default function NoData(props: Props) {
  return <Empty className={classNames(cs.root, props.className)} image={props.image || "/static/nff/icon-nodata1.png"} description={<span>{props.info || "Sorry:(no data"}</span>} />;
}
