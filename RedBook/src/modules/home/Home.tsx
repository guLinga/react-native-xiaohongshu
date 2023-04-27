import React,{useEffect} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { homeState } from '../../stores/HomeStore';
import { requestHomeList, resetPage } from '../../stores/HomeStore';
import RenderItem from './RenderItem';
import FlowList from '../../components/FlowList/FlowList';
import RenderTitle from './components/TitleBar';

export default function Home() {
  
  const dispatch = useDispatch<any>();
  const home = useSelector(homeState);

  useEffect(()=>{
    dispatch(requestHomeList());
  },[])

  // 上拉刷新
  const refreshNewData = () => {
    dispatch(resetPage());
    dispatch(requestHomeList());
  }

  // 触底加载
  const loadMoreData = () => {
    dispatch(requestHomeList());
  }

  const Footer = () => {
    return <Text style={styles.footerTxt}>没有更多数据了</Text>
  }

  return (
    <View style={styles.root}>
      <RenderTitle 
        tab={1}
        onTabChange={(tab) => {
          console.log(tab);
        }}
      />
      <FlowList
        data={home.homeList}
        style={styles.flatList}
        renderItem={RenderItem}
        numColumns={2}
        contentContainerStyle={styles.container}
        refreshing={home.refreshing}// 下拉刷新
        onRefresh={refreshNewData}// 下拉刷新
        onEndReachedThreshold={0.1}// 触底加载
        onEndReached={loadMoreData}// 触底加载
        ListFooterComponent={<Footer/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  container:{
    paddingTop: 6
  },
  flatList: {
    width: '100%',
    height: '100%'
  },
  footerTxt: {
    textAlign: 'center'
  }
})