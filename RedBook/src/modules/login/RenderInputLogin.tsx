import React, { useMemo, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import {useNavigation} from '@react-navigation/native'
import { Image, LayoutAnimation, Linking, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";

import { AllStyles } from './Login';
import { props } from './RenderQuickLogin'

import iconTriangle from '../../assets/icon_triangle.png'
import iconEyeOpen from '../../assets/icon_eye_open.png'
import iconEyeClose from '../../assets/icon_eye_close.png'
import iconExchange from '../../assets/icon_exchange.png'
import iconUnselected from '../../assets/icon_unselected.png'
import iconSelected from '../../assets/icon_selected.png'
import iconWx from '../../assets/icon_wx.png'
import iconQq from '../../assets/icon_qq.webp'
import iconCloseModal from '../../assets/icon_close_modal.png'
import UserStore from "../../stores/UserStore";

// 账号密码登录
export default function RenderInputLogin({setLoginType}:props){

  const navigation = useNavigation<StackNavigationProp<any>>();

  const [eyeOpen,setEyeOpen] = useState<boolean>(true);
  const [check,setCheck] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const canLogin = useMemo(()=>{
    return phone.length == 11 && pwd.length == 6 && check;
  },[phone,pwd,check])

  // 登录
  const onLoginPress =async () => {
    if(!canLogin)return;
    UserStore.requestLogin(phone,pwd,(success)=>{
      if(success){
        navigation.replace("HomeTab");
      }else{
        ToastAndroid.show("登录失败，请检查用户名和密码",ToastAndroid.LONG);
      }
    });
  }

  return (
    <View style={styles.root}>


      <Text style={styles.pwdLogin}>密码登录</Text>
      <Text style={styles.tip}>未注册的手机号登录成功后将自动注册</Text>


      {/* 手机号输入框 */}
      <View style={styles.phoneLayout}>
        <Text style={styles.pre86}>+86</Text>
        <Image source={iconTriangle} style={styles.triangle} />
        <TextInput
          style={styles.phoneIpt}
          placeholderTextColor="#ddd"
          placeholder="请输入手机号码"
          keyboardType="number-pad"
          maxLength={11}
          value={phone}
          onChangeText={(txt)=>{
            setPhone(txt);
          }}
        />
      </View>


      {/* 密码输入框 */}
      <View style={styles.pwdLayout}>
        <TextInput
          style={[styles.phoneIpt,styles.pwdIpt]}
          placeholderTextColor="#ddd"
          placeholder="请输入密码"
          keyboardType="number-pad"
          maxLength={6}
          value={pwd}
          textContentType="password"
          secureTextEntry={eyeOpen}
          onChangeText={(txt)=>{
            setPwd(txt);
          }}
        />
        <TouchableOpacity
          onPress={()=>{
            setEyeOpen(n => !n);
          }}
        >
          <Image 
            source={!eyeOpen ? iconEyeOpen : iconEyeClose}
            style={styles.iconEye} 
          />
        </TouchableOpacity>
      </View>


      <View style={styles.changeLayout}>
        <Image source={iconExchange} style={styles.exchangeIcon} />
        <Text style={styles.codeLoginTxt}>验证码登录</Text>
        <Text style={styles.forgetPwdTxt}>忘记密码?</Text>
      </View>


      {/* 登录 */}
      <TouchableOpacity
        style={canLogin ? styles.loginButton : styles.loginButtonDissable}
        activeOpacity={canLogin ? 0.7 : 1}
        onPress={onLoginPress}
      >
        <Text style={styles.loginTxt}>登录</Text>
      </TouchableOpacity>


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

      {/* qq和微信图标 */}
      <View style={styles.chatLayout}>
          <Image style={styles.iconWx} source={iconWx} />
          <Image style={styles.iconQq} source={iconQq} />
      </View>


      {/* 关闭 */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={()=>{
          LayoutAnimation.easeInEaseOut();
          setLoginType("quick")
        }}
      >
        <Image source={iconCloseModal} style={styles.closeImg} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 48
  },
  pwdLogin: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 56
  },
  tip: {
    fontSize: 14,
    color: '#999',
    marginTop: 8
  },
  phoneLayout: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 28
  },
  pre86: {
    fontSize: 24,
    color: '#999'
  },
  triangle: {
    width: 12,
    height: 6,
    marginLeft: 4
  },
  phoneIpt: {
    flex: 1,
    height: 60,
    backgroundColor: 'transparent',
    textAlignVertical: 'center',
    textAlign: 'left',
    fontSize: 24,
    color: '#333',
    marginLeft: 16
  },
  pwdLayout:{
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 8
  },
  pwdIpt:{
    marginLeft: 0,
    marginRight: 16
  },
  iconEye: {
    width: 30,
    height: 30
  },
  changeLayout: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',

  },
  exchangeIcon: {
    width: 16,
    height: 16
  },
  codeLoginTxt: {
    fontSize: 14,
    color: '#303080',
    flex: 1
  },
  forgetPwdTxt: {
    fontSize: 14,
    color: '#303080',
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'red',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  loginButtonDissable: {
    width: '100%',
    height: 56,
    backgroundColor: '#d9d9d9',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  loginTxt: {
    fontSize: 20,
    color: 'white',
  },
  chatLayout: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 54,
    justifyContent: 'center'
  },
  iconWx:{
    width: 56,
    height: 56,
    marginRight: 50
  },
  iconQq: {
    width: 56,
    height: 56,
    marginLeft: 50
  },
  closeButton: {
    position: 'absolute',
    left: 36,
    top: 24
  },
  closeImg: {
    width: 28,
    height: 28
  }
})