import { useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../models/store";
import useAccount from "@/hooks/useAccount";

export default function useWallet(){
    const dispatch = useDispatch<Dispatch>();
    const isWalletShow: boolean = useSelector((state: RootState) => state.app.isWalletShow);
    const { account } = useAccount();
    
    function setWalletShow(type: boolean) {
        dispatch({
            type: 'app/setWalletShow',
            payload: type
        });
    }
    
    const isConnected = useMemo(() => {
        return !!account;
    }, [account]);
    
    return {
        account,
        isConnected,
        isWalletShow,
        setWalletShow
    }
}