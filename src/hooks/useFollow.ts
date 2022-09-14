import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../models/store";
import { getRelation, postFollow, postUnFollow } from './useData';

export enum FollowType {
  Self = "self",              // 登陆者自己
  Stranger = "stranger",      // 陌生人互相不关注
  Following = "following",    // 正在关注
  Fans = 'fans',              // 被对方关注
  Friend = 'friend',          // 相互关注
  Unknown = ''                // 未登录状态查不出
}

/**
 * @params pid 别人的account
*/
export default function useFollow(pid?: string, needCheck?: boolean) {
    const dispatch = useDispatch<Dispatch>();
    const isCancelShow: boolean = useSelector((state: RootState) => state.follow.isCancelShow);
    const cancelPid: string = useSelector((state: RootState) => state.follow.pid);
    const cancelUsername: string = useSelector((state: RootState) => state.follow.username);
    const token: string = useSelector((state: RootState) => state.app.token);

    const [loading, setLoading] = useState(false);
    // 控制取消关注确认框的显示，全局只有1个
    function setCancelShow(isShow: boolean, pid?: string, cancelname?: string) {
        dispatch({
            type: 'follow/setFollowCancelShow',
            payload: { isShow, pid: isShow ? pid : '', username: cancelname }
        });
    }

    // 得到关系 unknown未知， stranger陌生人 followed已关注
    const [relationType, setRelationType] = useState(FollowType.Unknown);

    // 查询关系
    async function checkFollowType() {
        if (!pid || !token || loading) return;
        setLoading(true);
        const resInfo: any = await getRelation(pid, token);
        setLoading(false);
        setRelationType(resInfo.data || FollowType.Unknown);
    }

    useEffect(() => {
        if (pid && token && needCheck) {
            checkFollowType();
        }
    }, [pid, token, needCheck]);

    // 关注,
    async function onFollow(pid: string) {
        if (!pid || !token) return false;
        setLoading(true);
        const res: any = await postFollow(pid, token);
        setLoading(false);
        if (res.code===200) {
            dispatch({ type: 'follow/setFollowRefresh' });
            checkFollowType(); // 关注完毕后刷新状态
            return true;
        }
        return false;
    }

    // 取消关注
    async function onUnFollow() {
        if (!cancelPid || !token) return false;
        setLoading(true);
        const res: any = await postUnFollow(cancelPid, token)
        setLoading(false);
        setCancelShow(false);
        if (res.code===200) {
            dispatch({ type: 'follow/setFollowRefresh' });
            checkFollowType(); // 关注完毕后刷新状态
            return true;
        }
        return false;
    }

    return {isCancelShow, setCancelShow, relationType, onFollow, cancelPid, cancelUsername, onUnFollow, checkFollowType, loading}
}