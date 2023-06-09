import React from 'react';
import {
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import stores from './src/stores';

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

// import PageA from './src/modules/PageA';
// import PageB from './src/modules/PageB';
import Login from './src/modules/login/Login';
import Welcome from './src/modules/welcome/Welcome';
import MainTab from './src/modules/mainTab/MainTab';

const Stack = createStackNavigator();

function App(){
  return (
    <Provider store={stores}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'white'}
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Welcome'
            screenOptions={{// 设置页面海拔，将页面海拔向上提一次，解决有时候在当前页面可以看到上一级页面的问题。
              cardStyle: {elevation: 1}
            }}
          >
            {/* <Stack.Screen
              name='PageA'
              component={PageA}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS// 跳转页面动画
              }}
            />
            <Stack.Screen
              name='PageB'
              component={PageB}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS// 跳转页面动画
              }}
            /> */}
            <Stack.Screen
              name='Login'
              component={Login}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS// 跳转页面动画
              }}
            />
            <Stack.Screen
              name='Welcome'
              component={Welcome}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS// 跳转页面动画
              }}
            />
            <Stack.Screen
              name='MainTab'
              component={MainTab}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS// 跳转页面动画
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
