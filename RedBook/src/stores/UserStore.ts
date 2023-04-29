import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api/apis";
import { save } from '../utils/Storage';
import Toast from "../components/widget/Toast";
import Loading from "../components/widget/Loading";

// 登录
export const requestLogin = createAsyncThunk('users/requestLogin', async ({name,pwd}:{name:string,pwd:string}) => {
  const re = await login(name, pwd);
  return re.data;
})

const initialState: {
  state: boolean,
  userInfo: {}
} = {
  state: false,
  userInfo: {}
}

const userStore = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(requestLogin.pending, () => {
        Loading.show()
      })
      // 登录成功
      .addCase(requestLogin.fulfilled, (state, action) => {
        const data = action.payload;
        Loading.hide()
        if(!data){
          state.state = false;
          Toast.show("登录失败，请检查用户名和密码");
        }else{
          state.state = true;
          state.userInfo = data;// 储存用户登录信息
          save('userInfo',JSON.stringify(data));
        }
      })
      // 登录失败
      .addCase(requestLogin.rejected, (state) => {
        state.state = false;
        Loading.hide()
        Toast.show("登录失败，请检查网络");
      })
  }
})

export default userStore.reducer;
export const state = (state: {
  users: typeof initialState
}) => state.users;