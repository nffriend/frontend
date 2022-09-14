import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../models/store";

export default function useLocal():[  string,  (local: string) => void ] {
    const dispatch = useDispatch<Dispatch>();
    const local: string = useSelector((state: RootState) => state.app.local);
    function setLocal(local: string) {
        dispatch({
            type: 'app/setLocal',
            payload: local
        });
    }

    return [local, setLocal ];
}