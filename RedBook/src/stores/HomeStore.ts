import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { homeList } from '../api/apis';

// 首页列表
export const requestHomeList = createAsyncThunk('home/requestHomeList',async (_,store:any) => {
  const {page, SIZE, refreshing} = store.getState().home;
  // 如果 refreshing 为 true 说明有请求正在执行就直接返回
  if(refreshing)return Promise.reject("");
  store.dispatch(modifyRefreshing())// 将 refreshing 修改成true
  const {data} = await homeList(page,SIZE);
  return data;
})

const initialState:{
  SIZE: 10
  page: number,
  homeList: ArticleSimple[],
  refreshing: boolean,
} = {
  SIZE: 10,
  page: 1,
  homeList: [],
  refreshing: false
}

const HomeStore = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // 修改 refreshing 为 true
    modifyRefreshing(state){
      console.log('modify');
      state.refreshing = true;
    },
    // 重置 page
    resetPage(state){
      state.page = 1;
    }
  },
  extraReducers(builder){
    // 首页列表成功
    builder.addCase(requestHomeList.fulfilled,(state,action)=>{
      console.log('success',state);
      if(state.page === 1){
        state.homeList = action.payload;
      }else{
        state.homeList = state.homeList.concat(action.payload);
      }
      state.page++;
      state.refreshing = false;
    })
    // 首页列表失败
    builder.addCase(requestHomeList.rejected,(state,action)=>{
      console.log('error',state,action.payload);
      state.refreshing = false;
    })
  }
})

export default HomeStore.reducer
export const homeState = (state:{
  home: typeof initialState
}) => state.home
export const {modifyRefreshing,resetPage} = HomeStore.actions