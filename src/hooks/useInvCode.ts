import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../models/store";
import { postInvAddress } from "./useData";
import useWallet from '@/hooks/useWallet';

export default function useInvCode() {
    const dispatch = useDispatch<Dispatch>();
    const { account } = useWallet()
    const invCodeShow: boolean = useSelector((state: RootState) => state.app.invCodeShow);
    const tempToken: string = useSelector((state: RootState) => state.app.tempToken);
    const stepType: number = useSelector((state: RootState) => state.app.stepType);

    function setInvCodeShow(isShow: boolean) {
        dispatch({
            type: 'app/setInvCodeShow',
            payload: isShow
        });
    }

    // stepType变了时，自动show
    useEffect(() => {
        if (stepType) {
            setInvCodeShow(true);
        }
    }, [stepType]);

    async function postInv(invCode: string) {
        const res: any = await postInvAddress(tempToken, invCode);

        if (res.code === 200 && res.data) {
            dispatch({
                type: 'app/setUserInfo',
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            });
            localStorage.setItem(
              `auth-${account}`,
              JSON.stringify({ token: res.data.token, expiration: res.data.expiration })
            )
            return true;
        }
        return false;
    }
    

    return { invCodeShow, tempToken, setInvCodeShow, stepType, postInv };
}