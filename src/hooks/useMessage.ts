import { useState, useEffect} from 'react';
import { getMessage, postMessage, delMessage } from './useData';
import { message } from 'antd';

export default function useMessage(account: string, token: string) {
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

    async function getData(account: string | null | undefined, page: number) {
        if (!account) return;
        setLoading(true);
        let res: any = {};
        try {
            res = await getMessage(account, page, 10);
        } catch {
            setLoading(false);
            return [];
        }
        
        if (res.code !== 200 || !res.data) return [];
        
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

    // 留言
    async function postMessages(msg: string, to_address: string) {
        setLoading(true);
        let res: any;
        try {
            res = await postMessage(to_address,  msg, token);
            if (res.code !== 200) {
                message.error(res.msg);
            }
        } catch {
            message.error('error');
        } finally {
            setLoading(false);
        }
        
        return res?.code === 200;
    }

    // 删除留言
    async function deleteMessage(id: string) {
        setLoading(true);
        const res: any = await delMessage(id, token);
        setLoading(false);
        return res?.code === 200;
    }

    return { data, loading, total, isDone, getNext, refresh, postMessages, deleteMessage };
}