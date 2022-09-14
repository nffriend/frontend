import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useUserType from "@/hooks/useUserType";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface Props {
  mini?: boolean; // default / mini
  onClick?: () => void;
  loading?: boolean;
}
export default function NoDataEdit(props: Props) {
  const { isMySelf } = useUserType();
  return (
    <div className={classNames(cs.root, { [cs.mini]: !!props.mini })} onClick={props.onClick}>
      {!!props.loading && <Spin indicator={antIcon} />}
      {isMySelf === 1 && <img src="/static/nff/icon-add.png" alt="add" />}
    </div>
  );
}
