import axios from "axios";
import { baseUrl } from "./config";

// 默认基础请求地址
axios.defaults.baseURL = baseUrl;
// 请求是否带上cookie
axios.defaults.withCredentials = false;
// 对返回的结果做处理
axios.interceptors.response.use(response => {
  return response.data;
});

export default axios;
