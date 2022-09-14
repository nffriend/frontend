import { } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "@/models/store";

// 这个是新人引导的step
export default function useSteps() {
    const dispatch = useDispatch<Dispatch>();
    const stepInfo = useSelector((state: RootState) => state.hero.stepInfo);

    function onShow() {
        dispatch({ type: "hero/setStepInfo", payload: {...stepInfo, isShow: true} });
    }

    function onClose() {
        dispatch({ type: "hero/setStepInfo", payload: {...stepInfo, isShow: false} });
    }

    function gotoNext(nextIndex: number) {
        // console.log('nextIndex:', nextIndex);
        if (nextIndex > stepInfo.steps.length) {
            dispatch({ type: "hero/setStepInfo", payload: {...stepInfo, stepNow: 0, isShow: false} });
            return;
        }
        dispatch({ type: "hero/setStepInfo", payload: {...stepInfo, stepNow: nextIndex} });
    }

    return {
        stepInfo,
        onShow,
        onClose,
        gotoNext
    }
}