import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface Props {
  isShow: boolean;
}
export default function Loading(props: Props) {
  return props.isShow ? <Spin indicator={antIcon} /> : null;
}
