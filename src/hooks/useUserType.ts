import { useMemo, useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../models/store";
import { useAsync } from "react-use";

import useAccount from "@/hooks/useAccount";
import { signMessage } from "@/utils";

import axios from "@/utils/axios";
import api from "@/apis";

import { useAccountInfoPublic, userSelfInfo } from "@/hooks/useData";
import { message } from "antd";

import { getSign } from "@/utils/getSign";
import * as ethers from "ethers";
import { useWeb3React } from "@web3-react/core";
/**
 * 当前状态，是自己页面，还是访问别人页面
 * @param canLogin 是否执行登录逻辑 全局只需要一个
 */
export default function useUserType(canLogin?: boolean) {
  const { connector } = useWeb3React();
  const { account } = useAccount();

  const dispatch = useDispatch<Dispatch>();
  const isMySelf: number = useSelector(
    (state: RootState) => state.app.isMySelf
  );
  const pid: string = useSelector((state: RootState) => state.app.pid);
  const userInfo = useSelector((state: RootState) => state.app.userInfo);
  const token: string = useSelector((state: RootState) => state.app.token);
  const expiration: string = useSelector(
    (state: RootState) => state.app.expiration
  );
  const otherInfo = useSelector((state: RootState) => state.app.otherInfo);

  const { data: otherInfoSource } = useAccountInfoPublic(pid);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    dispatch({
      type: "app/setOtherInfo",
      payload: otherInfoSource || {},
    });
  }, [dispatch, otherInfoSource]);

  // 是否是访问自己的页面
  function setIsMySelf(pid: string | undefined) {
    // console.log('设置是否是自己：', pid);
    dispatch({
      type: "app/setIsMySelf",
      payload: pid, // 如果pid就是自己的account，说明就是访问自己的主页
    });
  }

  // 手动设置最新数据
  function updateAccountInfo(userInfo: any) {
    dispatch({
      type: "app/updateUserInfo",
      payload: userInfo,
    });
    sessionStorage.setItem(
      `userInfo-${account}`,
      JSON.stringify({ token, user: userInfo })
    );
  }

  // 手动获取自身的信息
  async function getUserInfo(token: string, expiration: string) {
    if (!token) return;
    const resInfo: any = await userSelfInfo(token);

    if (resInfo.code === 200 && resInfo.data) {
      dispatch({
        type: "app/setUserInfo",
        payload: {
          token,
          expiration,
          user: resInfo.data,
        },
      });
      localStorage.setItem(
        `auth-${resInfo.data.address}`,
        JSON.stringify({ token, expiration })
      );
      dispatch({
        type: "app/setAuth",
        payload: JSON.stringify({ account: resInfo.data.address, token, expiration }),
      });

      sessionStorage.setItem(
        `userInfo-${resInfo.data.address}`,
        JSON.stringify({ token, expiration, user: resInfo.data })
      );
      return;
    }
    if (resInfo.code === 403) {
      if (account) {
        localStorage.setItem(`auth-${account}`, "");
        dispatch({
          type: "app/setAuth",
          payload: "",
        });
        localStorage.setItem(
          `auth-${account}`,
          JSON.stringify({ token: "", expiration: "" })
        );
      }
      localStorage.setItem("isLogout", "1");
      setRefresh(refresh + 1);
      return;
    }
    message.error("get userinfo fail");
  }
  useAsync(async () => {
    if (!account || !canLogin) return;
    const auth = localStorage.getItem(`auth-${account}`);
    if (auth) {
      const authInfo = JSON.parse(auth);
      const now = new Date().getTime();
      dispatch({
        type: "app/setAuth",
        payload: JSON.stringify({
          account,
          token: authInfo.token,
          expiration: authInfo.expiration,
        }),
      });
      if (
        authInfo.expiration &&
        new Date(authInfo.expiration).getTime() > now + 12 * 3600 * 1000
      ) {
        await getUserInfo(authInfo.token, authInfo.expiration); // 虽然有缓存还是要获取新的数据，只是不用login了
        return;
      }
    }

    /** 正式代码开始 **/
    const msg = JSON.stringify({
      message: "NFF sends you a signature request",
      action: "Authorized login",
      timestamp: Date.now(),
    });

    // 这一步会拉起小狐狸，但用户可能拒绝
    let signature = "";
    //@ts-ignore
    const wallet = connector?.walletConnectProvider;
    try {
      if (wallet) {
        signature =
          (await getSign(
            ethers.utils.hexlify(ethers.utils.toUtf8Bytes(msg)),
            account.toLowerCase(),
            //@ts-ignore
            connector?.walletConnectProvider
          )) ?? "";
      } else {
        signature = await signMessage(msg, account);
      }
    } catch (_e) {
      message.error("sign message fail");
      localStorage.setItem("isLogout", "1");
      dispatch({
        type: "app/setAuth",
        payload: "",
      });
      if (account) localStorage.setItem(`auth-${account}`, "");
      return;
    }

    // 调接口拿token
    const res: any = await axios.post(api.login, {
      account,
      signature,
      message: msg,
    });
    /** 正式代码结束 **/

    // /** 测试代码开始 **/
    // const res: any = await axios.post('/data/test/6b6b1046-845c-4d3b-8dac-2da8a8fa0965', {
    //   account,
    // });
    // /** 测试代码结束 **/

    // 需要邀请码
    if ([202, 203].includes(res.code)) {
      dispatch({
        type: "app/setInvCodeInfo",
        payload: { tempToken: res.data.token, stepType: res.code },
      });
      return;
    }
    
    if (res.code === 400) {
      message.error(res.msg);
      localStorage.setItem("isLogout", "1");
      return;
    }

    if (res.code === 400) {
      message.error(res.msg);
      localStorage.setItem("isLogout", "1");
      return;
    }

    if (res.data.token) {
      localStorage.setItem(
        `auth-${account}`,
        JSON.stringify({
          token: res.data.token,
          expiration: res.data.expiration,
        })
      );
      // 登录后再获取一次userInfo， 因为login返回的userInfo图片路径有问题
      await getUserInfo(res.data.token, res.data.expiration);
    }
  }, [account, canLogin, refresh]);

  // 当前使用的account， 自己：account, 别人：pid
  const accountNow = useMemo(() => {
    if (isMySelf === -1) {
      return "";
    }
    return isMySelf === 1 ? account : pid;
  }, [account, pid, isMySelf]);

  // 当前使用的信息， 自己：userinfo, 别人：otherInfo
  const personInfo = useMemo(() => {
    if (isMySelf === -1) {
      return {};
    }
    return isMySelf === 1 ? userInfo : otherInfo;
  }, [isMySelf, userInfo, otherInfo]);

  return {
    isMySelf,
    setIsMySelf,
    getUserInfo,
    userInfo,
    token,
    expiration,
    account,
    updateAccountInfo,
    pid,
    accountNow,
    otherInfo,
    personInfo,
  };
}
