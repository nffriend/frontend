import { useEffect, useMemo, useState } from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import useFollow, { FollowType } from "@/hooks/useFollow";
import useUserType from "@/hooks/useUserType";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface Props {
  pid: string;
  type?: string;
  infoUser?: any;
}

export default function FollowBtn(props: Props) {
  const { pid, type, infoUser = {} } = props;
  const { token } = useUserType();
  const { setCancelShow, relationType, onFollow, cancelPid, checkFollowType, loading } = useFollow(pid, !!pid && !type);
  const followType = useMemo(() => {
    const t = relationType !== FollowType.Unknown ? relationType : type;
    return t;
  }, [type, relationType]);

  const [isHover, setHover] = useState(false);
  const followStr = useMemo(() => {
    if (followType === FollowType.Following || followType === FollowType.Friend) {
      return isHover ? "Unfollow" : "Following";
    }
    if (followType === FollowType.Self) {
      return "Self";
    }
    return "Follow";
  }, [isHover, followType]);

  async function onUserClick() {
    if (!token) {
      message.error("please sign in first");
      return;
    }
    if (followType === FollowType.Following || followType === FollowType.Friend) {
      setCancelShow(true, pid, infoUser.username);
      return;
    }
    if (followType === FollowType.Stranger || followType === FollowType.Fans) {
      const res = await onFollow(pid);
      if (res) {
        message.success("follow success");
      } else {
        message.error("follow fail");
      }
      return;
    }
  }

  // 如果被取消关注，需要刷新状态
  const [isNeedRefresh, setRefresh] = useState(false);
  useEffect(() => {
    if (cancelPid === pid) {
      setRefresh(true);
    }
    if (isNeedRefresh && !cancelPid) {
      checkFollowType();
      setRefresh(false);
    }
  }, [cancelPid, pid, isNeedRefresh]);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames(cs.root, {
        [cs.loading]: loading,
        [cs.following]: followType === FollowType.Following || followType === FollowType.Friend,
        [cs.follow]: followType === FollowType.Stranger || followType === FollowType.Fans,
        [cs.disabled]: followType === FollowType.Self || followType === FollowType.Unknown,
      })}
      onClick={onUserClick}>
      {followStr} {loading && <Spin indicator={antIcon} />}
    </div>
  );
}
