import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import RedBookTabBar from './redBookTabBar';

import Home from '../home/Home';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';
const BottomTab = createBottomTabNavigator();

export default function MainTab() {

  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        tabBar={props => <RedBookTabBar {...props} />}
      >
        <BottomTab.Screen 
          name='Home'
          component={Home}
          options={{
            title: '首页'
          }}
        />
        <BottomTab.Screen 
          name='Shop'
          component={Shop}
          options={{
            title: '购物'
          }}
        />
        <BottomTab.Screen 
          name='Publish'
          component={Shop}
          options={{
            title: '发布'
          }}
        />
        <BottomTab.Screen 
          name='Message'
          component={Message}
          options={{
            title: '消息'
          }}
        />
        <BottomTab.Screen 
          name='Mine'
          component={Mine}
          options={{
            title: '我'
          }}
        />
      </BottomTab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%'
  }
})