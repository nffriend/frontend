import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../models/store";
import { useAsync } from "react-use";
import axios from '@/utils/axios'
import api from '@/apis';

export default function useCom2Datas() {
    
    const dispatch = useDispatch<Dispatch>();
    const list: any[] = useSelector((state: RootState) => state.app.com2Datas);
    const hot: any[] = useSelector((state: RootState) => state.app.com2HotDatas);

    const [loading, setLoading] = useState(false);

    function setList(datas: any[]) {
        dispatch({
            type: 'app/setCom2Datas',
            payload: datas
        });
    }

    function setHot(datas: any[]) {
      dispatch({
          type: 'app/setCom2HotDatas',
          payload: datas
      });
    }

   
    // type 强制刷新
    async function getData(type: boolean) {
        if (list?.length && !type) {
            return;
        }

        try {
          setLoading(true);
          const res: any = await axios({
            method: "get",
            url: api.widgets,
            params: { },
          });
    
          if (res.code === 200 && res.data) {
              setList(res.data);
          }
        } catch {
            setList([]);
        } finally {
          setLoading(false);
        }
    }

    async function getHotData(type: boolean) {
      if (list?.length && !type) {
          return;
      }

      try {
        setLoading(true);
        const res: any = await axios({
          method: "get",
          url: api.hot_widgets,
          params: { },
        });
  
        if (res.code === 200 && res.data) {
          setHot(res.data);
        }
      } catch {
        setHot([]);
      } finally {
        setLoading(false);
      }
  }

    useAsync(async() => {
      await getData(false);
      await getHotData(false);
    }, []);

    function refresh() {
        getData(true);
        getHotData(true);
    }


    
    return { list, hot, loading, refresh };
}