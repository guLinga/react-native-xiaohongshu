import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import iconTabPublish from '../../assets/icon_tab_publish.png'

export default function RedBookTabBar({state, descriptors,navigation}:BottomTabBarProps){

  const {routes,index} = state;

  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route,i)=>{
        const {options} = (descriptors as any)[route.key]
        const label = options.title;
        const isFocused = index === i;
        if(i == 2){
          return <TouchableOpacity
          key={label}
          style={styles.tabItem}
          onPress={()=>{
            
          }}
          >
            <Image style={styles.publishImg} source={iconTabPublish} />
          </TouchableOpacity>
        }
        return <TouchableOpacity
          key={label}
          style={styles.tabItem}
          onPress={()=>{
            navigation.navigate(route.name);
          }}
        >
          <Text style={{
            fontSize: isFocused ? 18 : 16,
            color: isFocused ? "#333" : "#999",
            fontWeight: isFocused ? 'bold' : "normal"
          }}>{label}</Text>
        </TouchableOpacity>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  publishImg: {
    width: 58,
    height: 40,
    resizeMode: 'contain'
  }
})