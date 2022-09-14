import { useMemo } from "react";
import cs from "./index.module.scss";
import ListUser from "../components/ListUser";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Loading from "@/components/LoadingIcon";
import { useInvitedUsers } from "@/hooks/useData";
import useUserType from "@/hooks/useUserType";

import { message, Pagination, Empty } from "antd";
import { baseWeb } from "@/utils/config";
import { shareTwitter } from "@/utils";

export default function Invitations() {
  const { token, accountNow } = useUserType();
  // const { data } = useMyInvCode(token);
  const { data: usersData, total, loading, getPageData } = useInvitedUsers(token);

  const mock = [
    {
      address: "address",
      username: "username",
      avatar: 0,
      cover_photo: "string",
      bio: "/static/nff/icon-ad2.png",
      space_id: 0,
      pass_points: 0,
      level: {},
      last_login_date: "2022/02/01",
      followers: 0,
      following: 0,
      visitor: 0,
      relation: "friend",
    },
    {
      address: "address",
      username: "username",
      avatar: 0,
      cover_photo: "string",
      bio: "/static/nff/icon-ad2.png",
      space_id: 0,
      pass_points: 0,
      level: {},
      last_login_date: "2022/02/01",
      followers: 0,
      following: 0,
      visitor: 0,
      relation: "friend",
    },
    {
      address: "address",
      username: "username",
      avatar: 0,
      cover_photo: "string",
      bio: "/static/nff/icon-ad2.png",
      space_id: 0,
      pass_points: 0,
      level: {},
      last_login_date: "2022/02/01",
      followers: 0,
      following: 0,
      visitor: 0,
      relation: "friend",
    },
  ];
  // const code = useMemo(() => {
  //   return data[0] || {};
  // }, [data]);

  function onCopyed() {
    message.success("copy success");
  }

  function onPageChange(page: number) {
    console.log("page", page);
    getPageData(page);
  }

  return (
    <section className={cs.root}>
      <div className={cs.topCard}>
        <div className={cs.title}>Invitation Code</div>
        <div className={cs.codeInfo}>
          <div className={cs.code}>{accountNow || '-'}</div>
          <CopyToClipboard text={`${accountNow || ""}`} onCopy={onCopyed}>
            <img src="/static/nff/icon-copy3.png" alt="copy" />
          </CopyToClipboard>
          <div className={cs.share} onClick={() => shareTwitter(accountNow ?? '')}></div>
        </div>
        <div className={cs.tip}>Tips: Share to win NFF points</div>
      </div>
      <div className={cs.list}>
        <div className={cs.title}>
          Invited List <Loading isShow={loading} />
        </div>
        <div className={cs.listBar}>
          <span className={cs.col1}>Name</span>
          <span className={cs.col2}>Create Time</span>
          <span className={cs.col3}>Status</span>
        </div>
        {usersData.map((item: any, index: number) => {
          return <ListUser key={index} source={item} />;
        })}
        {!total && <Empty className={cs.empty} />}
        <div className={cs.pagein}>
          <Pagination className={"pagin"} size="small" disabled={loading} total={total} showSizeChanger={false} onChange={onPageChange} />
        </div>
      </div>
    </section>
  );
}
