import axios from '@/utils/axios';
import { useState } from 'react';
import Big from '@/utils/big';
export interface MintProgress {
  orderTime: number;
  tokenId: number | string;
  caller: string;
  txHash: string;
  id: number;
  image: string;
  name: string;
  count: number;
  amount: number;
  subTotal: number; // 总价 amount * count
}

// 分页获取交易记录
export const useOrders = (account="", limit=10, type?: string) => {
  const [orders, setOrders] = useState<MintProgress[]>([]);
  const [lastOne, setLastOne] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDone, setDone] = useState(false); // 是否全部加载完毕

  async function getData() {
    try {
      setLoading(true);

      let prefix = "";
      if (type === 'hero') prefix = "/pa";

      const res: any = await axios.get(`${prefix}/purchaseHistory?account=${account}&cursor_id=${lastOne}&limit=${limit}`);
      if (res.code !== 200 || !res.data) {
        return;
      }

      const resList = res.data.data || [];
      if (resList.length < limit || !res.data.has_next) {
        setDone(true);
      }

      const list: MintProgress[] = [];

      resList.forEach((item: any) => {
        const obj: MintProgress = {
          id: item.id,
          orderTime: item.created_at,
          caller: item.caller,
          txHash: item.tx_hash,
          count: item.count,
          tokenId: 0,
          image: '',
          name: '',
          amount:  Big.div(item.amount , item.count),
          subTotal: item.amount,
        }

        // 总列表展示地图，用户订单展示mint记录
        if (account == '') {
          let datas = item.maps;
          if (type === 'hero') datas = item.pa;
          datas?.forEach((itemSon: any) => {
            const objRes = { ...obj };
            objRes.image = itemSon.image;
            objRes.tokenId = itemSon.token_id;
            objRes.name = itemSon.name;
            list.push(objRes);
          })
        } else {
          list.push(obj);
        }
      })

      if (!lastOne) {
        setOrders(list);
      } else {
        setOrders([...orders, ...list]);
      }
      setLastOne(list[list.length - 1].id);
      // console.log('last:', list);
    } catch {
      // console.log('get history error');
    } finally {
      setLoading(false);
    }
  }
  
  // 刷新
  function refresh() {
    setLastOne(0);
    setDone(false);
    getData();
  }

  // 加载更多
  function loadMore() {
    getData();
  }

  return { orders, refresh, loadMore, loading, isDone };
}