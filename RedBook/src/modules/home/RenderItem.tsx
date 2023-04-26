import React from 'react'
import { View, Dimensions, StyleSheet, Image, Text } from 'react-native';

import ResizeImage from '../../components/ResizeImage';
import Heart from '../../components/Heart';

const {width} = Dimensions.get('window')

export default function RenderItem({item,index}:{item:ArticleSimple,index:number}) {
  return (
    <View style={styles.item}>
      <ResizeImage uri={item.image} />
      <Text style={styles.titleTxt}>{item.title}</Text>
      <View style={styles.nameLayout}>
        <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
        <Text style={styles.nameTxt}>{item.userName}</Text>
        <Heart value={item.isFavorite} onValueChange={(value)=>{
          console.log(value);
        }} />
        <Text style={styles.countTxt}>{item.favoriteCount}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: (width - 18) / 2,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden'
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 12,
    marginVertical: 4
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  avatarImg: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
  nameTxt: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
    flex: 1
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4
  }
})