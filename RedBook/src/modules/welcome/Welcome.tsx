import React,{useEffect} from 'react'
import {
  StyleSheet,
  View,
  Image
} from "react-native"
import {useNavigation} from '@react-navigation/native'

import { StackNavigationProp } from '@react-navigation/stack';
import { load } from '../../utils/Storage';
import iconMainLogo from '../../assets/icon_main_logo.png'

export default function Welcome() {

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(()=>{
    setTimeout(()=>{
      getUserInfo();
    },3000)
  },[])

  const getUserInfo =async () => {
    const cacheUserInfo = await load('userInfo');
    if(cacheUserInfo && JSON.parse(cacheUserInfo)){
      startHome();
    }else{
      startLogin();
    }
  }

  const startLogin = () => {
    navigation.replace('Login');
  }

  const startHome = () => {
    navigation.replace('HomeTab');
  }

  return (
    <View style={styles.root}>
      <Image source={iconMainLogo} style={styles.logoMain} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logoMain: {
    width: 200,
    height: 110,
    resizeMode: 'contain',
    marginTop: 200
  }
})