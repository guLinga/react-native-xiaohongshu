import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';

export default function PageB() {

  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{fontSize: 30}}>456</Text>
      <Button
        title='点击'
        onPress={()=>{
          navigation.push('PageA');
        }}
      />
      <Button
        title='返回'
        onPress={()=>{
          if(navigation.canGoBack()){
            navigation.goBack();
          }
        }}      
      />
    </View>
  )
}
