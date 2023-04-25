import React,{useEffect} from 'react'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { homeState } from '../../stores/HomeStore';

import { requestHomeList } from '../../stores/HomeStore';

export default function Home() {
  
  const dispatch = useDispatch<any>();
  const home = useSelector(homeState);

  useEffect(()=>{
    dispatch(requestHomeList({page: home.page}));
  },[])

  return (
    <View>
      <Text>首页</Text>
    </View>
  )
}
