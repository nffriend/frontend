/** 全局唯一数据中心 **/

import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";


import app from "./app.models";
import follow from "./follow.models"
import hero from "./hero.models";

export interface RootModel extends Models<RootModel> {
  app: typeof app;
  follow: typeof follow;
  hero: typeof hero;
}

const rootModel: RootModel = { app, follow, hero };
const store = init({
  models: rootModel,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export default store;


export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
