import React,{ useState } from 'react'
import {
  StyleSheet,
  View,
} from "react-native"

import RenderQuickLogin from './RenderQuickLogin';
import RenderInputLogin from './RenderInputLogin';

export default function Login() {

  const [loginType,setLoginType] = useState<'quick' | 'input'>('quick');

  return (
    <View style={AllStyles.root}>
      {
        loginType === 'quick' ?
        <RenderQuickLogin setLoginType={setLoginType} /> : 
        <RenderInputLogin setLoginType={setLoginType} />
      }
    </View>
  )
}

export const AllStyles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
  protocolLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 12
  },
  radioButton: {
    width: 20,
    height: 20
  },
  labelTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6
  },
  protocolTxt: {
    fontSize: 12,
    color: 'black'
  },
})