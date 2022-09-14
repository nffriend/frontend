import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../models/store";

interface MenuType{
    isClose: boolean,
    isEdit: boolean,
}
export default function useMenu():[  MenuType,  (newV: any) => void ] {
    const dispatch = useDispatch<Dispatch>();
    const menuType = useSelector((state: RootState) => state.app.menuType);
    function setMenuType(newV: any) {
        dispatch({
            type: 'app/setMenuType',
            payload: {...menuType, ...newV}
        });
    }

    return [menuType, setMenuType ];
}