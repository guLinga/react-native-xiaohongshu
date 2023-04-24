import axios, { AxiosResponse } from 'axios'
// import apiConfig from '../api/apis';

const instance = axios.create({
  baseURL: 'http://192.168.193.102:7001',
  timeout: 10 * 1000
  
});

// 响应拦截
instance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if(response){
      const { status } = response;
      if(status >= 500){
        // return '服务端报错'
      }else if(status === 400){
        // return '接口参数异常'
      }else if(status === 401){
        // return '登录过期'
      }else{
        // return '其他错误类型'
      }
    }else{
      // return '忘了异常'
    }
    return Promise.reject(error);
  }
)

// export const request = (name:string,params:string):Promise<AxiosResponse<any,any>> => {
//   const api = (apiConfig as any)[name]
//   const {url, method} = api;
//   if(method === 'get' || method === undefined){
//     return get(url, params);
//   }else{
//     return post(url,params);
//   }
// }

export const get = (url:string,params:any = undefined):Promise<AxiosResponse<any,any>> => {
  return instance.get(url,{
    params
  })
}

export const post = (url:string,params:any = undefined):Promise<AxiosResponse<any,any>> => {
  return instance.post(url,params)
}