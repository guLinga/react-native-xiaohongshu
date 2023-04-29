import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { homeList } from '../api/apis';
import { load } from '../utils/Storage';
import Loading from '../components/widget/Loading';

// 首页列表
export const requestHomeList = createAsyncThunk('home/requestHomeList',async (_,store:any) => {
  const {page, SIZE, refreshing} = store.getState().home;
  // 如果 refreshing 为 true 说明有请求正在执行就直接返回
  if(refreshing)return Promise.reject("");
  store.dispatch(modifyRefreshing())// 将 refreshing 修改成true
  const {data} = await homeList(page,SIZE);
  return data;
})

// 返回 DEFAULT_CATEGORY_LIST 数据
export const getCategoryList = createAsyncThunk('home/getCategoryList', async (_,store:any) => {
  const cacheListStr = await load('categoryList');
  const cacheList = JSON.parse(cacheListStr || 'null');
  if(cacheList){
    return cacheList;
  }else{
    return store.getState().home.DEFAULT_CATEGORY_LIST
  }
})

const initialState:{
  SIZE: 10
  page: number,
  homeList: ArticleSimple[],
  refreshing: boolean,
  CategoryList: Category[],
  DEFAULT_CATEGORY_LIST: Category[]
} = {
  SIZE: 10,
  page: 1,
  homeList: [],
  refreshing: false,
  CategoryList: [],
  DEFAULT_CATEGORY_LIST: [
    // 默认添加频道
    { name: '推荐', default: true, isAdd: true },
    { name: '视频', default: true, isAdd: true },
    { name: '直播', default: true, isAdd: true },
    { name: '摄影', default: false, isAdd: true },

    { name: '穿搭', default: false, isAdd: true },
    { name: '读书', default: false, isAdd: true },
    { name: '影视', default: false, isAdd: true },
    { name: '科技', default: false, isAdd: true },

    { name: '健身', default: false, isAdd: true },
    { name: '科普', default: false, isAdd: true },
    { name: '美食', default: false, isAdd: true },
    { name: '情感', default: false, isAdd: true },

    { name: '舞蹈', default: false, isAdd: true },
    { name: '学习', default: false, isAdd: true },
    { name: '男士', default: false, isAdd: true },
    { name: '搞笑', default: false, isAdd: true },

    { name: '汽车', default: false, isAdd: true },
    { name: '职场', default: false, isAdd: true },
    { name: '运动', default: false, isAdd: true },
    { name: '旅行', default: false, isAdd: true },

    { name: '音乐', default: false, isAdd: true },
    { name: '护肤', default: false, isAdd: true },
    { name: '动漫', default: false, isAdd: true },
    { name: '游戏', default: false, isAdd: true },

    // 默认添加频道
    { name: '家装', default: false, isAdd: false },
    { name: '心理', default: false, isAdd: false },
    { name: '户外', default: false, isAdd: false },
    { name: '手工', default: false, isAdd: false },

    { name: '减脂', default: false, isAdd: false },
    { name: '校园', default: false, isAdd: false },
    { name: '社科', default: false, isAdd: false },
    { name: '露营', default: false, isAdd: false },

    { name: '文化', default: false, isAdd: false },
    { name: '机车', default: false, isAdd: false },
    { name: '艺术', default: false, isAdd: false },
    { name: '婚姻', default: false, isAdd: false },

    { name: '家居', default: false, isAdd: false },
    { name: '母婴', default: false, isAdd: false },
    { name: '绘画', default: false, isAdd: false },
    { name: '壁纸', default: false, isAdd: false },

    { name: '头像', default: false, isAdd: false },
  ]
}

const HomeStore = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // 修改 refreshing 为 true
    modifyRefreshing(state){
      state.refreshing = true;
    },
    // 重置 page
    resetPage(state){
      state.page = 1;
    }
  },
  extraReducers(builder){
    builder.addCase(requestHomeList.pending,()=>{
      Loading.show()
    })
    // 首页列表成功
    builder.addCase(requestHomeList.fulfilled,(state,action)=>{
      if(state.page === 1){
        state.homeList = action.payload;
      }else{
        state.homeList = state.homeList.concat(action.payload);
      }
      state.page++;
      state.refreshing = false;
      Loading.hide()
    })
    // 首页列表失败
    builder.addCase(requestHomeList.rejected,(state)=>{
      state.refreshing = false;
      Loading.hide()
    })

    // 首页频道列表
    builder.addCase(getCategoryList.fulfilled, (state,action) => {
      state.CategoryList = action.payload;
    })
    builder.addCase(getCategoryList.rejected, (_,action) => {
      console.log('error',action.payload);
    })
  }
})

export default HomeStore.reducer
export const homeState = (state:{
  home: typeof initialState
}) => state.home
export const {modifyRefreshing,resetPage} = HomeStore.actions