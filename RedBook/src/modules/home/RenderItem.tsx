import React from 'react'
import { View, Dimensions, StyleSheet, Image, Text } from 'react-native';

import iconHeader from '../../assets/icon_heart.png'
import iconHeartEmpty from '../../assets/icon_heart_empty.png'

const {width} = Dimensions.get('window')

export default function RenderItem({item,index}:{item:ArticleSimple,index:number}) {
  return (
    <View style={styles.item}>
      <Image style={styles.itemImage} source={{uri: item.image}} />
      <Text style={styles.titleTxt}>{item.title}</Text>
      <View style={styles.nameLayout}>
        <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
        <Text style={styles.nameTxt}>{item.userName}</Text>
        <Image style={styles.heart} source={iconHeartEmpty} />
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
  itemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover'
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
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4
  }
})