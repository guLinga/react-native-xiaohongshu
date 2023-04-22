import {flow} from 'mobx'
import { login } from '../api/apis';
import { save } from '../utils/Storage';

class UserStore {

  userInfo: any

  requestLogin = flow(function* (
    this:UserStore, 
    name:string,
    pwd:string,
    callback:(success:boolean)=>void
  ){
    try {
      const { data } = yield login(name,pwd);
      // 储存登录信息
      save('userInfo',JSON.stringify(data));
      this.userInfo = data || null;
      callback?.(data?true:false);
    } catch (error) {
      console.log(error);
      this.userInfo = null;
      callback?.(false);
    }
  })

}

// ES6单例导出
export default new UserStore();