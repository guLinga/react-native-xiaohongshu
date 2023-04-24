import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../home/Home';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';

import iconTabHomeNormal from '../../assets/icon_tab_home_normal.png'
import iconTabHomeSelected from '../../assets/icon_tab_home_selected.png'
import iconTabShopNormal from '../../assets/icon_tab_shop_normal.png'
import iconTabShopSelected from '../../assets/icon_tab_shop_selected.png'
import iconTabMessageNormal from '../../assets/icon_tab_message_normal.png'
import iconTabMessageSelected from '../../assets/icon_tab_message_selected.png'
import iconTabMineNormal from '../../assets/icon_tab_mine_normal.png'
import iconTabMineSelected from '../../assets/icon_tab_mine_selected.png'

const BottomTab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        screenOptions={({ route }) => {// 配置图标
          return {
            tabBarIcon: ({ focused, color, size }) => {
              let img;
              if(route.name === 'Home'){
                img = focused ? iconTabHomeSelected : iconTabHomeNormal
              }else if(route.name === 'Shop'){
                img = focused ? iconTabShopSelected : iconTabShopNormal
              }else if(route.name === 'Message'){
                img = focused ? iconTabMessageSelected : iconTabMessageNormal
              }else if(route.name === 'Mine'){
                img = focused ? iconTabMineSelected : iconTabMineNormal
              }
              return <Image 
                style={{
                  width: size, height: size, tintColor: color
                }}
                source={img} 
              />
            }
          }
        }}
        // @ts-ignore
        tabBarOptions={{
          activeTintColor: '#ff2442',
          inactiveTintColor: '#999'
        }}
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