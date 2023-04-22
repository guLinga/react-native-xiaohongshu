import { login } from '../api/apis';


class UserStore {

  userInfo: any

  requestLogin = async (name:string,pwd:string,callback:(success:boolean)=>void) => {
    try {
      const { data } = await login(name,pwd);
      this.userInfo = data || null;
      callback?.(data?true:false)
    } catch (error) {
      console.log(error);
      this.userInfo = null;
      callback?.(false);
    }
  }
}

// ES6单例导出
export default new UserStore();