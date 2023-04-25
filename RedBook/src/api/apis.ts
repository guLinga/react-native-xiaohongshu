import { get } from "../utils/request";

// 登录
export const login = (name:string,pwd:string) => {
  return get('/user/login',{name,pwd})
}

// 首页列表
export const homeList = (page: number, size: number) => {
  return get('/home/homeList',{page,size})
}