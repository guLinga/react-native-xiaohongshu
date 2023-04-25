import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { homeList } from '../api/apis';

// 首页列表
export const requestHomeList = createAsyncThunk('home/requestHomeList',async ({page}:{page: number}) => {
  const {data} = await homeList(page,initialState.SIZE);
  return data;
})

const initialState:{
  SIZE: 10
  page: number,
  homeList: ArticleSimple[]
} = {
  SIZE: 10,
  page: 1,
  homeList: []
}

const HomeStore = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers(builder){
    // 首页列表成功
    builder.addCase(requestHomeList.fulfilled,(state,action)=>{
      console.log('success',state,action.payload);
      state.homeList = state.homeList.concat(action.payload);
    })
    // 首页列表失败
    builder.addCase(requestHomeList.rejected,(state,action)=>{
      console.log('error',state,action.payload);
    })
  }
})

export default HomeStore.reducer
export const homeState = (state:{
  home: typeof initialState
}) => state.home