import React, { useState } from "react";
import { Image, LayoutAnimation, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AllStyles } from "./Login";

import iconMainLogo from '../../assets/icon_main_logo.png'
import iconUnselected from '../../assets/icon_unselected.png'
import iconSelected from '../../assets/icon_selected.png'
import iconArrow from '../../assets/icon_arrow.png'
import iconWxSmall from '../../assets/icon_wx_small.png'

export type props = {
  setLoginType: React.Dispatch<React.SetStateAction<"quick" | "input">>
}

// 第三方登录
export default function RenderQuickLogin({setLoginType}:props){

  const [check,setCheck] = useState<boolean>(false);

  return (
    <View style={styles.root}>

      {/* 用户协议 */}
      <View style={AllStyles.protocolLayout}>
        <TouchableOpacity
          onPress={()=>{
            setCheck(n => !n);
          }}
        >
          <Image 
            source={check ? iconSelected : iconUnselected}
            style={AllStyles.radioButton}
          />
        </TouchableOpacity>
        <Text style={AllStyles.labelTxt}>我已阅读并同意</Text>
        <TouchableOpacity
          onPress={()=>{
            Linking.openURL('https://github.com/guLinga/react-native-xiaohongshu');
          }}
        >
          <Text style={AllStyles.protocolTxt}>《用户协议》和《隐私协议》</Text>
        </TouchableOpacity>
      </View>

      {/* 其他登录方式 */}
      <TouchableOpacity 
        style={styles.otherLoginBtn}
        onPress={()=>{
          LayoutAnimation.easeInEaseOut();
          setLoginType("input")
        }}
      >
          <Text style={styles.otherLoginTxt}>其他登录方式</Text>
          <Image source={iconArrow} style={styles.iconArrow} />
      </TouchableOpacity>

      {/* 微信登录 */}
      <TouchableOpacity
        style={styles.wechatBtn}
        activeOpacity={0.7}
      >
        <Image style={styles.iconWx} source={iconWxSmall} />
        <Text style={styles.wechatLoginTxt}>微信登录</Text>
      </TouchableOpacity>

      {/* 一键登录 */}
      <TouchableOpacity
        style={styles.oneKeyLoginBtn}
        activeOpacity={0.7}
      >
        <Text style={styles.oneKeyLoginTxt}>一键登录</Text>
      </TouchableOpacity>

      {/* 小红书logo */}
      <Image source={iconMainLogo} style={styles.logoMain} />
    </View>
  )
}

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  otherLoginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 100
  },
  otherLoginTxt: {
    fontSize: 16,
    color: '#303080'
  },
  iconArrow: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 6,
    transform: [{rotate: '180deg'}]
  },
  wechatBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#05c160',
    borderRadius: 28,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconWx: {
    width: 40,
    height: 40
  },
  wechatLoginTxt: {
    fontSize: 18,
    color: 'white'
  },
  oneKeyLoginBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#ff2442',
    borderRadius: 28,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  oneKeyLoginTxt: {
    fontSize: 18,
    color: 'white'
  },
  logoMain: {
    width: 180,
    height: 95,
    resizeMode: 'contain',
    position: 'absolute',
    top: 170
  }
})