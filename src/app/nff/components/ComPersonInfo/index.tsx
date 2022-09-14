import { useState } from "react";
import cs from "./index.module.scss";
import Link from "next/link";

import EditProfile from "../EditProfile";
import ImageSelf from "@/components/ImageSelf";

import useUserType from "@/hooks/useUserType";
import FollowBtn from "@/components/FollowBtn";
import { useAsync, useLocation } from "react-use";
import { shareTwitter } from "@/utils";
/**
 * 用户信息模块
 */
export default function ComPersonInfo() {
  const location = useLocation();
  const [isEditShow, setEditShow] = useState(false);
  const { personInfo, isMySelf, pid, getUserInfo, token, expiration, account } = useUserType();
  function toLocalNumber(num: number) {
    return num.toLocaleString("en-US");
  }
  // 每次进来都要刷新，因为信息随时会改变，尤其是follow相关
  useAsync(async () => {
    if (token && expiration) {
      await getUserInfo(token, expiration);
    }
  }, [location.pathname, token, expiration]);

  return (
    <div className={cs.root}>
      <ImageSelf className={cs.back} src={personInfo.cover_photo} />
      {
        isMySelf ? <img className={cs.share} src="/static/nff/icon-share.png" alt="share" onClick={() => shareTwitter(account ?? '')}/>
        : null
      }
      <div className={cs.infoBox}>
        <div className={cs.photoBox}>
          <ImageSelf className={cs.photo} src={personInfo.avatar} default="/static/nff/custom.png" />
          <div className={cs.tip}>
            <img className={cs.left} src="/static/nff/icon-star-little.png" alt="star" />
            <div>
              <span>NO.{personInfo.space_id}</span>
              <span> Space Owner</span>
            </div>
            <img className={cs.right} src="/static/nff/icon-star-little.png" alt="star" />
          </div>
        </div>

        <div className={cs.infos}>
          <div className={cs.name}>
            <span>{personInfo.username || "_"}</span>
            {isMySelf === 1 ? (
              <div className={cs.btn} onClick={() => setEditShow(true)}>
                Edit Profile
              </div>
            ) : (
              <FollowBtn pid={pid} />
            )}
          </div>
          <div className={cs.did}>
            <img src="/static/nff/icon-did.png" alt="did" />
            <span>DID: {personInfo.address}</span>
          </div>
          <div className={cs.msg}>{personInfo.bio}</div>
          <div className={cs.follow}>
            <Link href="/visitor">
              <a>
                <span>{toLocalNumber(personInfo.visitor || 0)}</span>
                <span>Influence</span>
              </a>
            </Link>
            <Link href="/visitor">
              <a>
                <span>{toLocalNumber(personInfo.followers || 0)}</span>
                <span>Followers</span>
              </a>
            </Link>
            <Link href="/visitor">
              <a>
                <span>{toLocalNumber(personInfo.following || 0)}</span>
                <span>Follow</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <EditProfile isShow={isEditShow} onClose={() => setEditShow(false)} />
    </div>
  );
}
