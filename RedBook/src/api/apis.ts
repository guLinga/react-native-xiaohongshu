import { get } from "../utils/request";

// 登录
export const login = (name:string,pwd:string) => {
  return get('/user/login',{name,pwd})
}

export const homeList =async () => {
  return await get('/home/list')
}