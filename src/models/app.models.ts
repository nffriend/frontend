/**
 * 基础model
 * 在src/store/index.js 中被挂载到store上，命名为 app
 * **/

 import { Dispatch } from "./store";
 

export interface UserInfo{
  address?: string,
  avatar?: string | null,
  bio?: string | null,
  cover_photo?: string | null,
  level?: {level: number, points_to_upgrade: number, upgrading_need_points: number},
  pass_points?: number,
  space_id?: number,
  username?: string | null,
  [key: string]: any
}

export interface State{
  userInfo: UserInfo,
  local: string,
  isWalletShow: boolean,
  menuType: { isClose: boolean, isEdit: boolean }
  isMySelf: number, // -1检测中，0不是， 1是
  token: string,
  expiration: string,
  pid: string,
  myNftData: {
    data: any[],
    total: number,
    pageKey: string,
    isDone: boolean
  },
  otherInfo: UserInfo,
  tempToken: string,
  invCodeShow: boolean,
  stepType: number,
  auth: string,
  com2Datas: any[],
  com2HotDatas: any[],
  DIY2Info: {id: string, sourceData: any, w: number} | null
}

 const defaultState: State = {
   userInfo: {},   // 当前用户基本信息
   local: 'en', // 语言
   isWalletShow: false,    // 钱包弹窗是否显示
   menuType: { isClose: false, isEdit: false }, // 左侧菜单是否关闭/是否处于编辑模式
   isMySelf: -1, // 是否是访问自己的页面
   token: '', // 当前用户登录后的token
   expiration: '',
   pid: '', // 访问别人的页面时获得的account, 别人的account
   myNftData: { // 当前用户自己的nft
     data: [], // 原始数据
     total: 0, // 总数
     pageKey: '', // 请求下一页的标识
     isDone: false // 是否全部请求完毕
   }, 
   otherInfo: {},
   tempToken: '', // 临时token, 仅用于填写邀请码
   invCodeShow: false, // 邀请码弹框是否显示
   stepType: 0, // 邀请码页面type， 0未知， 202有邀请码，203没有邀请码
   auth: '', // 授权码

   com2Datas: [], // 组件2.0列表数据
   com2HotDatas: [], // 组件2.0列表数据

   DIY2Info: null,
 };
 
 const app = {
   state: defaultState,
   reducers: {
     setLocal(state: any, payload: any) {
       localStorage.setItem("local", payload);
       return {
         ...state,
         local: payload
       }
     },
     setUserInfo(state: any, payload: any) {
       return {
         ...state,
         token: payload.token,
          expiration: payload.expiration,
         userInfo: payload.user,
       };
     },
     updateUserInfo(state: any, payload: any) {
      return {
        ...state,
        userInfo: payload,
      };
     },
     setWalletShow(state: any, payload: any) {
       return {
         ...state,
         isWalletShow: payload
       }
     },
     setMenuType(state: any, payload: any) {
      return {
        ...state,
        menuType: payload
       }
    },
     setIsMySelf(state: any, payload: any) {
      return {
        ...state,
        isMySelf: ~~!payload,
        pid: payload
       }
     },
     setMyNftData(state: any, payload: any) {
      return {
        ...state,
        myNftData: payload
       }
     },
     setOtherInfo(state: any, payload: any) {
       return {
         ...state,
         otherInfo: payload
       }
     },
     setInvCodeInfo(state: any, payload: any) {
       return {
         ...state,
         tempToken: payload.tempToken || '',
         stepType: payload.stepType,
       }
     },
     setInvCodeShow(state: any, payload: any) {
       return {
         ...state,
         invCodeShow: payload,
       }
     },
     setAuth(state: any, payload: any) {
        return {
          ...state,
          auth: payload
        }
     },
     setCom2Datas(state: any, payload: any) {
      return {
        ...state,
        com2Datas: payload
      }
     },
     setCom2HotDatas(state: any, payload: any) {
      return {
        ...state,
        com2HotDatas: payload
      }
     },
     saveDIY2Info(state: any, payload: any) {
       return {
         ...state,
         DIY2Info: payload
       }
     }
   },
 
   effects: (dispatch: Dispatch) => ({
 
   }),
 };
 
 export default app;