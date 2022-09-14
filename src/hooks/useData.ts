import axios from "@/utils/axios";
import { useEffect, useMemo, useState } from "react";
import api from "@/apis";
import { baseUrl } from "@/utils/config";
import { useAsync } from "react-use";
import { useSelector } from "react-redux";
import { RootState } from "@/models/store";

// 获取链上最近交易记录
export function useTimeLine(account: string) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isDone, setDone] = useState(false);
  useEffect(() => {
    if (account) {
      refresh();
    }
  }, [account]);

  async function getData(account: string, page: number) {
    if (!account) return;
    setLoading(true);
    const res: any = await axios.get(api.timeLine, {
      params: { account, page },
    });
    if (res.code !== 200 || !res.data) return [];

    if (res.data.total) {
      setTotal(res.data.total);
    }

    if (page === 1) {
      const resData = res.data.data || [];
      setData(resData);
      setDone(resData.length >= total);
    } else {
      const resData = [...data, ...res.data.data];
      setData(resData);
      setDone(resData.length >= total);
    }
    setPage(page);
    setLoading(false);
    return res.data;
  }

  function getNext() {
    const nextPage = page + 1;
    getData(account, nextPage);
  }

  function refresh() {
    getData(account, 1);
  }

  return { data, loading, total, isDone, getNext, refresh };
}

//获取链上交互合约
export function useActives(account: string) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  // const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(1);
  const [isDone, setDone] = useState(false);
  useEffect(() => {
    if (account) {
      refresh();
    }
  }, [account]);

  async function getData(account: string, page: number, limit: number) {
    if (!account) return;
    setLoading(true);
    const res: any = await axios.get(api.actives, {
      params: { account, page, limit },
    });
    // if (res.data.total) {
    //     setTotal(res.data.total);
    // }
    // if (page === 1) {
    //     const resData = res.data.data || [];
    //     setData(resData);
    //     setDone(resData.length >= total);
    // } else {
    //     const resData = [...data, ...res.data.data];
    //     setData(resData);
    //     setDone(resData.length >= total);
    // }
    // setPage(page);
    const resData = res.data || [];
    setData(resData);
    setLoading(false);
  }

  // function getNext() {
  //     const nextPage = page + 1;
  //     getData(account, nextPage);
  // }

  function refresh() {
    getData(account, 1, 50);
  }

  return { data, loading };
}

// 链上交互统计
export function useStatistics(account: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalMax, setTotalMax] = useState(0);
  const [totalDefi, setTotalDefi] = useState(0);
  const [totalNft, setTotalNft] = useState(0);
  const [totalOther, setTotalOther] = useState(0);

  useEffect(() => {
    async function getData() {
      if (!account) return;
      setLoading(true);
      const sourceData: any = await axios.get(api.myActivity, {
        params: { account },
      });
      if (sourceData.code === 200 && sourceData.data) {
        setData(sourceData.data);
        const tMax = sourceData.data.reduce((res: number, item: any) => {
          return res + item.total;
        }, 0);
        const tDefi = sourceData.data.reduce((res: number, item: any) => {
          if (item._id.type === "defi") {
            return res + item.total;
          }
          return res;
        }, 0);
        const tNft = sourceData.data.reduce((res: number, item: any) => {
          if (item._id.type === "nft") {
            return res + item.total;
          }
          return res;
        }, 0);
        const tOther = sourceData.data.reduce((res: number, item: any) => {
          if (item._id.type === "other") {
            return res + item.total;
          }
          return res;
        }, 0);

        setTotalMax(tMax);
        setTotalDefi(tDefi);
        setTotalNft(tNft);
        setTotalOther(tOther);
      }
      setLoading(false);
      return sourceData.data;
    }
    getData();
  }, [account]);

  return { data, loading, totalMax, totalDefi, totalNft, totalOther };
}

// 获取余额
export function useBalance(account: string) {
  const [data, setData] = useState({
    total_nft: 0,
    total_balance: 0,
    eth_balance: 0,
    usdt_balance: 0,
    eth_price: "0",
  });

  useEffect(() => {
    async function getData(account: string) {
      const res: any = await axios.get(api.balance, { params: { account } });
      if (res.code === 200 && res.data) {
        setData(res.data);
      }
    }
    if (account) getData(account);
  }, [account]);
  return { data };
}

// 获取当前用户信息
// export function useAccountInfo(token: string) {
//     const [data, setData] = useState<any>({});
//     useEffect(() => {
//         async function getData() {
//             const res = await userSelfInfo(token)
//             if (res) {
//                 setData(res);
//             }
//         }
//         if(token) getData();
//     }, [token]);

//     return { data };
// }

// 设置当前用户信息
export async function setAccountInfo(token: string, params: any) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  const formdata = new FormData();
  formdata.append("username", params.username || "");
  formdata.append("bio", params.bio || "");
  if (params.avatar) {
    formdata.append("avatar", params.avatar, `avatar.${params.photoType}`);
  }
  if (params.cover_photo) {
    formdata.append(
      "cover_photo",
      params.cover_photo,
      `cover_photo.${params.backType}`
    );
  }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow" as RequestRedirect,
  };

  const res = await fetch(baseUrl + api.setUserInfo, requestOptions).then(
    (response) => response.text()
  );
  let resData;
  try {
    resData = JSON.parse(res);
  } catch {
    resData = {};
  }

  return JSON.parse(res);
}

export function useAccountPublicMenu() {
  const [data, setData] = useState<string>("");
  useAsync(async () => {
    const res = await axios({
      method: "get",
      url: api.getAddressMenu,
    });
    if (res.data) {
      setData(res.data);
    }
    return;
  }, []);
  return { adUser: data };
}

// 根据account获取用户信息，别人的信息
// 获取当前用户信息 force强制请求，不考虑重复
export function useAccountInfoPublic(pid: string, force = false) {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    async function getData() {
      if (force) {
        const res = await axios({
          method: "get",
          url: api.getUserInfoPublic,
          params: {
            account: pid,
          },
        });
        if (res?.data) {
          setData(res.data);
        }
        return;
      }

      const isLoading = sessionStorage.getItem("accountInfoPublicLoading");
      if (isLoading) return;

      sessionStorage.setItem("accountInfoPublicLoading", "1");
      const res = await axios({
        method: "get",
        url: api.getUserInfoPublic,
        params: {
          account: pid,
        },
      });
      sessionStorage.removeItem("accountInfoPublicLoading");

      if (res.data) {
        setData(res.data);
      }
    }
    if (pid) getData();
  }, [pid]);

  return { data };
}

// 分页粉丝列表
export function useFollowerList(account?: string | null | undefined) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isDone, setDone] = useState(false);
  const token: string = useSelector((state: RootState) => state.app.token);
  useEffect(() => {
    if (account) {
      refresh();
    }
  }, [account]);

  async function getData(account: string | null | undefined, page: number) {
    if (!account) return;
    setLoading(true);
    const res: any = await axios({
      method: "get",
      url: api.getFollowers,
      headers: {
        Authorization: token,
      },
      params: { account, page },
    });
    if (res.data?.total) {
      setTotal(res.data.total);
    }

    if (page === 1) {
      const resData = res.data.data || [];
      setData(resData);
      setDone(resData.length >= total);
    } else {
      const resData = [...data, ...res.data.data];
      setData(resData);
      setDone(resData.length >= total);
    }
    setPage(page);
    setLoading(false);
    return res.data;
  }

  function getNext() {
    const nextPage = page + 1;
    getData(account, nextPage);
  }

  function refresh() {
    getData(account, 1);
  }

  return { data, loading, total, isDone, getNext, refresh };
}

// 分页关注列表
export function useFollowingList(account?: string | null | undefined) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isDone, setDone] = useState(false);
  const token: string = useSelector((state: RootState) => state.app.token);
  useEffect(() => {
    if (account) {
      refresh();
    }
  }, [account]);

  async function getData(account: string | null | undefined, page: number) {
    if (!account) return;
    setLoading(true);
    const res: any = await axios({
      method: "get",
      url: api.getFollowing,
      headers: {
        Authorization: token,
      },
      params: { account, page },
    });
    if (res.data?.total) {
      setTotal(res.data.total);
    }

    if (page === 1) {
      const resData = res.data.data || [];
      setData(resData);
      setDone(resData.length >= total);
    } else {
      const resData = [...data, ...res.data.data];
      setData(resData);
      setDone(resData.length >= total);
    }
    setPage(page);
    setLoading(false);
    return res.data;
  }

  function getNext() {
    const nextPage = page + 1;
    getData(account, nextPage);
  }

  function refresh() {
    getData(account, 1);
  }

  return { data, loading, total, isDone, getNext, refresh };
}

// 访问者列表
export function useRecentVisitList(account?: string | null | undefined) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isDone, setDone] = useState(false);
  const token: string = useSelector((state: RootState) => state.app.token);
  useEffect(() => {
    if (account) {
      refresh();
    }
  }, [account]);

  async function getData(account: string | null | undefined, page: number) {
    if (!account) return;
    setLoading(true);
    const res: any = await axios({
      method: "get",
      url: api.getVisitors,
      headers: {
        Authorization: token,
      },
      params: { account, page },
    });
    if (res.data?.total) {
      setTotal(res.data.total);
    }

    if (page === 1) {
      const resData = res.data.data || [];
      setData(resData);
      setDone(resData.length >= total);
    } else {
      const resData = [...data, ...res.data.data];
      setData(resData);
      setDone(resData.length >= total);
    }
    setPage(page);
    setLoading(false);
    return res.data;
  }

  function getNext() {
    const nextPage = page + 1;
    getData(account, nextPage);
  }

  function refresh() {
    getData(account, 1);
  }

  return { data, loading, total, isDone, getNext, refresh };
}

// 设置邀请码
export async function postInvCode(tempToken: string, invCode: string) {
  try {
    const res = await axios({
      method: "post",
      url: api.postInvitationCode,
      headers: {
        Authorization: tempToken,
      },
      data: { invitation_code: invCode },
    });

    return res;
  } catch {
    return { code: 500 };
  }
}

// 设置邀请码地址
export async function postInvAddress(tempToken: string, invAddress: string) {
  try {
    const res = await axios({
      method: "post",
      url: api.postInvitationAddress,
      headers: {
        Authorization: tempToken,
      },
      data: { invitation_address: invAddress },
    });

    return res;
  } catch {
    return { code: 500 };
  }
}
// 获取我的邀请码
interface InvCode {
  invitation_code: string;
  invitee: string;
  created_date: string;
  updated_date: string;
}
export function useMyInvCode(token: string) {
  const [data, setData] = useState<InvCode[]>([]);

  useEffect(() => {
    async function getData() {
      if (!token) return;
      const res: any = await axios({
        method: "get",
        url: api.getInvitationCodes,
        headers: {
          Authorization: token,
        },
        params: {},
      });
      if (res.code === 200 && res.data) {
        setData(res.data);
      }
    }

    getData();
  }, [token]);

  return { data };
}

// 获取被我邀请的用户
export function useInvitedUsers(token: string) {
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useAsync(getData);

  async function getData(pageNo = 1) {
    try {
      setLoading(true);
      const res: any = await axios({
        method: "get",
        url: api.getInvitedUsers,
        headers: {
          Authorization: token,
        },
        params: { limit: 10, page: pageNo },
      });
      if (res.code === 200 && res.data) {
        setData(res.data.data);
        setTotal(res.data.total);
      } else {
        setData([]);
      }
      setPageNo(pageNo);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  function getPageData(page?: number) {
    getData(page);
  }

  return { data, loading, total, getPageData };
}

// 读取配置
export async function getKv(account: string, key: string) {
  try {
    const res = await axios({
      method: "get",
      url: api.getKv,
      params: { account, key },
    });
    return res;
  } catch {
    return false;
  }
}

// 保存配置
export async function setKv(token: string, key: string, value: any) {
  try {
    const res: any = await axios({
      method: "post",
      url: api.postKv,
      headers: {
        Authorization: token,
      },
      data: { key, value },
    });
    return !!(res.code === 200);
  } catch {
    return false;
  }
}

// 清除布局配置
export async function delKv(token: string, key: string) {
  try {
    const res: any = await axios({
      method: "delete",
      url: api.delKv,
      headers: {
        Authorization: token,
      },
      data: { key },
    });
    return !!(res.code === 200);
  } catch {
    return false;
  }
}

// livephoto 获取

// mock
// import photoData from '@/mock/photos'

export function useLivePhoto(account: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const refresh = () => setCount(count + 1);

  useAsync(async () => {
    if (!account) return;
    setLoading(true);
    let res: any = await axios({
      method: "get",
      url: api.getPhotos,
      params: { account, limit: 50 },
    });
    setLoading(false);

    // mock
    // res = { code: 200, data: photoData };

    if (res.code === 200 && res.data && res.data.data) {
      const resData = res.data.data.map((item: any) => {
        return item.nft;
      })
      setData(resData);
    }
  }, [account, count]);

  return { data, loading, refresh };
}

// livephoto 保存
export async function saveLivephoto(
  token: string,
  arr: {contract: string, token_id: string}[]
) {
  try {
    const res: any = await axios({
      method: "post",
      url: api.postPhotos,
      headers: {
        Authorization: token,
      },
      data: arr,
    });
    return !!(res.code === 200);
  } catch {
    return false;
  }
}

// livephoto 删除
export async function deleteLivephoto(token: string, index: number) {
  try {
    const res: any = await axios({
      method: "delete",
      url: api.deletePhotos,
      headers: {
        Authorization: token,
      },
      data: { index },
    });
    return !!(res.code === 200);
  } catch {
    return false;
  }
}

// 积分
export const getScore = (account: string) =>
  axios({
    method: "get",
    url: api.getScore,
    params: { account },
  });

export const postScore = (account: string, id: string, token: string) =>
  axios({
    method: "post",
    url: api.postScore,
    headers: {
      Authorization: token,
    },
    data: { id, from_account: account },
  });

// follow
export const getRelation = (pid: string, token: string) =>
  axios({
    method: "get",
    url: api.relation,
    headers: {
      Authorization: token,
    },
    params: { account: pid },
  });

export const postFollow = (pid: string, token: string) =>
  axios({
    method: "post",
    url: api.postFollow,
    headers: {
      Authorization: token,
    },
    data: { account: pid },
  });

export const postUnFollow = (pid: string, token: string) =>
  axios({
    method: "post",
    url: api.postUnfollow,
    headers: {
      Authorization: token,
    },
    data: { account: pid },
  });

// 消息
export const getMessage = (account: string, page: number, limit: number) =>
  axios({
    method: "get",
    url: api.getMessages,
    params: { account, page, limit },
  });

export const postMessage = (
  account: string,
  message: string,
  token: string
) => {
  if (!token) {
    return { code: 403, msg: "please sign in first" };
  }

  return axios({
    method: "post",
    url: api.postMessages,
    headers: {
      Authorization: token,
    },
    data: {
      message,
      to_address: account,
    },
  });
};

export const delMessage = (id: string, token: string) =>
  axios({
    method: "delete",
    url: api.deleteMessage,
    headers: {
      Authorization: token,
    },
    data: {
      _id: id,
    },
  });

export const userSelfInfo = (token: string) =>
  axios({
    method: "get",
    url: api.getUserInfo,
    headers: {
      Authorization: token,
    },
  });

// my nft 获取
export function useMyNft(account: string, token?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useAsync(getData, [account, token]);

  async function getData() {
    if (!account) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      const res: any = await axios({
        method: "get",
        url: api.getFigure,
        params: { account },
      });

      if (res.code === 200 && res.data) {
        setData(res.data);
      } else {
        setData(null);
      }
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    await getData();
  }

  return { data, loading, refresh };
}

//  my nft 保存
export async function saveMyNft(
  token: string,
  contract: string,
  token_id: string
) {
  try {
    const res: any = await axios({
      method: "post",
      url: api.postFigure,
      headers: {
        Authorization: token,
      },
      data: { contract, token_id },
    });
    return !!(res.code === 200);
  } catch {
    return false;
  }
}

//  my nft 删除
export async function deleteMyNft(token: string) {
  try {
    const res: any = await axios({
      method: "delete",
      url: api.deleteFigure,
      headers: {
        Authorization: token,
      },
      data: {},
    });
    return !!(res.code === 200);
  } catch {
    return false;
  }
}

// game 获取
export function useGames(account: string, token?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useAsync(getData, [account, token]);

  async function getData() {
    if (!account) return;

    try {
      setLoading(true);
      const res: any = await axios({
        method: "get",
        url: api.getAniPhotos,
        params: { account },
      });

      if (res.code === 200 && res.data) {
        const list = res.data.map((item: any) => ({
          ...item.nft,
          index: item.index,
        }));
        setData(list);
      }
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  function refresh() {
    getData();
  }

  return { data, loading, refresh };
}

//  game 保存
export async function saveGame(
  token: string,
  contract: string,
  token_id: string,
  index: number
) {
  try {
    const res: any = await axios({
      method: "post",
      url: api.postAniPhotos,
      headers: {
        Authorization: token,
      },
      data: { contract, token_id, index },
    });
    return !!(res.code === 200);
  } catch {
    return false;
  }
}

//  game 删除
export async function deleteGame(token: string, index: number) {
  try {
    const res: any = await axios({
      method: "delete",
      url: api.deleteAniPhotos,
      headers: {
        Authorization: token,
      },
      data: { index },
    });
    return !!(res.code === 200);
  } catch {
    return false;
  }
}

// 平台数据
export async function getStatistics() {
  try {
    const res: any = await axios({
      method: "get",
      url: api.getStatistics,
      data: {},
    });
    return res.data || {};
  } catch {
    return {};
  }
}

// 获取推荐空间列表
export function useRecommSpace() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useAsync(getData);

  async function getData() {
    try {
      setLoading(true);
      const res: any = await axios({
        method: "get",
        url: api.getRandomSpace,
        params: { },
      });
      if (res.code === 200 && res.data) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading };
}

// 获取热门空间列表
export function useHotSpace() {
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useAsync(getData);

  async function getData(pageNo = 1) {
    try {
      setLoading(true);
      const res: any = await axios({
        method: "get",
        url: api.getTopVisitors,
        params: { limit: 10, page: pageNo },
      });
      if (res.code === 200 && res.data) {
        setData(res.data.data);
        setTotal(res.data.total);
      } else {
        setData([]);
      }
      setPageNo(pageNo);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  function getNext() {
    if (pageNo * 10 > total) {
      getData(1);
    } else {
      getData(pageNo + 1);
    }
  }

  return { data, loading, getNext };
}

// 获取最新空间列表 getLatest
export function useLastSpace() {
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useAsync(getData);

  async function getData(pageNo = 1) {
    try {
      setLoading(true);
      const res: any = await axios({
        method: "get",
        url: api.getLatest,
        params: { limit: 10, page: pageNo },
      });
      if (res.code === 200 && res.data) {
        setData(res.data.data);
        setTotal(res.data.total);
      } else {
        setData([]);
      }
      setPageNo(pageNo);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  function getNext() {
    if (pageNo * 10 > total) {
      getData(1);
    } else {
      getData(pageNo + 1);
    }
  }

  return { data, loading, getNext };
}