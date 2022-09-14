
// 用于新人引导 步骤
import { Dispatch } from "./store";

export interface State{
  stepInfo: {
    isShow:boolean, // 全局是否显示
    steps: number[],
    stepNow: number
  }
}

 const defaultState: State = {
   stepInfo: {
      isShow: true,
     steps: [1, 2],
     stepNow: 1
   }
 };
 
 const hero = {
   state: defaultState,
   reducers: {
     setStepInfo(state: any, payload: any){
       return {
         ...state,
         stepInfo: payload
      }
    }
  },
   
    effects: (dispatch: Dispatch) => ({


  }),
 };
 
 export default hero;