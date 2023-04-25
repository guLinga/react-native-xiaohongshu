import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api/apis";
import { save } from '../utils/Storage';
import { ToastAndroid } from "react-native";

// 登录
export const requestLogin = createAsyncThunk('users/requestLogin', async ({name,pwd}:{name:string,pwd:string}) => {
  console.log(`name=${name},pwd=${pwd}`);
  
  const re = await login(name, pwd);
  console.log('re',re.data)
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
      // 登录成功
      .addCase(requestLogin.fulfilled, (state, action) => {
        const data = action.payload;
        console.log('payload',data);
        if(!data){
          state.state = false;
          ToastAndroid.show("登录失败，请检查用户名和密码", ToastAndroid.LONG);
        }else{
          state.state = true;
          state.userInfo = data;// 储存用户登录信息
          save('userInfo',JSON.stringify(data));
        }
      })
      // 登录失败
      .addCase(requestLogin.rejected, (state) => {
        state.state = false;
        ToastAndroid.show("登录失败，请检查网络", ToastAndroid.LONG);
      })
  }
})

export default userStore.reducer;
export const state = (state: {
  users: typeof initialState
}) => state.users;