import React,{useState, useEffect} from 'react'
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native'

import iconArrow from '../../../assets/icon_arrow.png'

type props = {
  categoryList: Category[],
  onCategoryChange: (category: Category) => void
}

export default function CategoryList({categoryList, onCategoryChange}:props) {

  const [category,setCategory] = useState<Category>();

  const onCategoryPress = (category: Category) => {
    setCategory(category);
    onCategoryChange(category);
  }

  useEffect(()=>{
    setCategory(categoryList.find(i => i.name === '推荐'));
  },[categoryList])
  
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {
          categoryList.map((item)=>{
            const isSelected = item.name === category?.name;
            return (
              <TouchableOpacity
                style={styles.tabItem}
                key={item.name}
                onPress={()=>{
                  onCategoryPress(item)
                }}
              >
                <Text style={isSelected ? styles.tabItenSelectedTxt : styles.tabItemText}>{item.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      <TouchableOpacity style={styles.openBtn}>
        <Image style={styles.openImg} source={iconArrow} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row'
  },
  scrollView: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white'
  },
  openBtn: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  openImg: {
    width: 20,
    height: 20,
    transform: [{rotate: '-90deg'}]
  },
  tabItem: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabItemText: {
    fontSize: 16,
    color: '#999'
  },
  tabItenSelectedTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  }
})