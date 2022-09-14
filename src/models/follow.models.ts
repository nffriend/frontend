/**
 * 用于粉丝，关注, 取消关注
 * 在src/store/index.js 中被挂载到store上，命名为 app
 * **/

//  import axios from "../utils/axios"; // 自己写的工具函数，封装了请求数据的通用接口
//  import { message } from "antd";
 import { Dispatch } from "./store";
 

export interface State{
  isCancelShow: boolean,
  pid: string,
  username: string,
  refresh: number,
}

 const defaultState: State = {
   isCancelShow: false,
   pid: "",
   username: "",
   refresh: 0,
 };
 
 const app = {
   state: defaultState,
   reducers: {
     setFollowCancelShow(state: any, payload: any) {
       return {
         ...state,
         isCancelShow: payload.isShow,
         pid: payload.pid,
         username: payload.username
       }
     },
     setFollowRefresh(state: any) {
       return {
         ...state,
         refresh: state.refresh + 1
       }
     }
   },
 
   effects: (dispatch: Dispatch) => ({
 
   }),
 };
 
 export default app;