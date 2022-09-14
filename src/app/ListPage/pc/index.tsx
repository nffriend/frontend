import { useEffect, useState } from 'react'
import cs from "./index.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

import { Tabs, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ListItem from "../components/ListItem";
import NoData from "@/components/NoData";
import ImageSelf from "@/components/ImageSelf";

import useUserType from "@/hooks/useUserType";
import {
  useFollowerList,
  useFollowingList,
  useRecentVisitList,
} from "@/hooks/useData";
import { useSelector } from "react-redux";
import { RootState } from '@/models/store';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function ListPage() {
  const router = useRouter();
  const { accountNow, personInfo } = useUserType();
  const {
    data: followerData,
    getNext: getFollowerNext,
    loading: followerLoading,
    isDone: followerDown,
    refresh: followerRefresh,
  } = useFollowerList(accountNow);
  const {
    data: followingData,
    getNext: getFollowingNext,
    loading: followingLoading,
    isDone: followingDown,
    refresh: followingRefresh,
  } = useFollowingList(accountNow);
  const {
    data: visitData,
    getNext: getVisitNext,
    loading: visitLoading,
    isDone: visitDown,
    refresh: visitRefresh,
  } = useRecentVisitList(accountNow);

  const refresh: number = useSelector((state: RootState) => state.follow.refresh);

  function onReachEndVisit() {
    if (visitLoading || visitDown || !visitData.length) return;
    getVisitNext();
  }

  function onReachEndFollower() {
    if (followerLoading || followerDown || !followerData.length) return;
    getFollowerNext();
  }

  function onReachEndFollowing() {
    if (followerLoading || followerDown || !followerData.length) return;
    getFollowingNext();
  }

  useEffect(() => {
    if (refresh) {
      followerRefresh();
      followingRefresh();
      visitRefresh();
    }
  }, [refresh]);

  return (
    <div className={cs.root}>
      <div>
        <div className={cs.title}>
          <img
            className={cs.left}
            src="/static/nff/icon-left.png"
            alt="left"
            onClick={() => router.back()}
          />
          <ImageSelf
            className={cs.photo}
            src={personInfo.avatar}
            default="/static/nff/custom.png"
          />
          <span className={cs.name}>{personInfo.username ?? "-"}</span>
        </div>

        <div className={cs.tabs}>
          <Tabs className={"tabsAntd"} defaultActiveKey="1">
            <TabPane tab="Recent visit" key="1">
              {visitData.map((item: any, index: number) => {
                return <ListItem item={item} key={index} />;
              })}
              {visitDown && !visitData.length && <NoData />}
              {!visitDown &&
                (visitLoading ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <div
                    className={classNames("btn", cs.more)}
                    onClick={onReachEndVisit}
                  >
                    load more
                  </div>
                ))}
            </TabPane>
            <TabPane tab="Followers" key="2">
              {followerData.map((item: any, index: number) => {
                return <ListItem item={item} key={index} />;
              })}
              {followerDown && !followerData.length && <NoData />}
              {!followerDown &&
                (followerLoading ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <div
                    className={classNames("btn", cs.more)}
                    onClick={onReachEndFollower}
                  >
                    load more
                  </div>
                ))}
            </TabPane>
            <TabPane tab="Following" key="3">
              {followingData.map((item: any, index: number) => {
                return (
                  <ListItem item={item} key={index} />
                );
              })}
              {followingDown && !followingData.length && <NoData />}
              {!followingDown &&
                (followingLoading ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <div
                    className={classNames("btn", cs.more)}
                    onClick={onReachEndFollowing}
                  >
                    load more
                  </div>
                ))}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
