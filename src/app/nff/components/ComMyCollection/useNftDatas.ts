import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "@/models/store";
import { useAsync } from 'react-use';
import axios from '@/utils/axios'
import api from '@/apis';

// import myNfts from '@/mock/nft';

export default function useNftDatas(account?: string, isMain?: boolean, token?: string) {
    const dispatch = useDispatch<Dispatch>();
    const myNftData: any = useSelector((state: RootState) => state.app.myNftData);

    const [loading, setLoading] = useState(false);

    // 将数据保存到全局
    function setData(data: any, total: number, pageKey: string, isDone: boolean) {
        // console.log('setData NFT:', data, total, pageKey, isDone);
        dispatch({
            type: 'app/setMyNftData',
            payload: {data, total, pageKey, isDone}
        });
    }

    // 请求API 获取数据
    async function getData(key?: string) {
        if (!account) return;
        const params = key ? { account, pageKey: key } : { account };
        
        setLoading(true);
        const res: any = await axios.get(api.myNft, { params });
        setLoading(false);
        // mock
        // return { ownedNfts: myNfts, totalCount: 50, pageKey: '123' };

        return res.data || [];
    }

    // 获取下一页数据
    async function getNext() {
        const res: any = await getData(myNftData.pageKey);
        if (res?.ownedNfts) {
            const newDatas = [...myNftData, ...res.ownedNfts];
            setData(newDatas, res.totalCount, res.pageKey, newDatas.length >= res.totalCount);
        }
    }

    // 刷新数据 获取第一页
    async function refresh() {
        const res = await getData();
        if (res?.ownedNfts) {
            setData(res.ownedNfts, res.totalCount, res.pageKey, res.ownedNfts.length >= res.totalCount);
        } else {
            setData([], 0, "", false);
        }
    }

    // account改变后 自动刷新
    useEffect(() => {
        if (account && isMain && token) {
            refresh();
        }
    }, [account, isMain, token]);


    // TODO 需要一个接口获取自己保存的橱窗里的NFT 目前mock在本地
    // TODO 如果是获取别人的，那只能从接口获取
    const [showNfts, setShowNfts] = useState<any[]>([]); // 橱窗里展示的nft
    const [collectionCount, setCollectionCount] = useState(0);

    const refreshCollection = () => setCollectionCount(collectionCount + 1)
    // 初始化和account改变时 从本地拿去保存的橱窗信息
    useAsync(async () => {
        if (!account) return;
            // const res = localStorage.getItem(`show-nfts-${account}`);
        const res: any = await axios.get(api.getCollections, { params: { account, limit: 49 } });
            if (res.code === 200) {
                const list = res.data.data.map((item: any) => item.nft);
                setShowNfts(list);
            } else {
                setShowNfts([]);
            }
        
    }, [account, collectionCount, token]);

    // 用户更新橱窗
    async function saveShowNfts(token: string, nfts: any[]) {
        localStorage.setItem(`show-nfts-${account}`, JSON.stringify(nfts));
        const list = nfts.map(nft => {
          nft.contract = nft.contract.address;
          return nft;
        })
        const res: any = await axios({
            method: 'post',
            url: api.postCollections,
            headers: {
                "Authorization": token
            },
            data: list
        });
        if (res.code === 200) {
            setShowNfts(res.data.data);
        }
    }

    return {
        loading,
        myNftData,
        showNfts,
        refreshCollection,
        getNext,
        refresh,
        saveShowNfts
    }
}
