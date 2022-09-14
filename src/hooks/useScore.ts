import { useAsync } from "react-use";
import { useState } from "react";
import { getScore, postScore } from "./useData";

export default function useScore(account: string, token?: string) {
  const [count, setCount] = useState(0);
  const refresh = () => setCount(count + 1);

  const score = useAsync(async () => {
    const res = await getScore(account);
    return res.data;
  }, [account, count, token]);

  // const drawScore = useAsync(async () => {
  //   const res = await postScore(account, 1, token);
  //   return res.data;
  // }, [account]);

  return { score, refresh, postScore };
}
