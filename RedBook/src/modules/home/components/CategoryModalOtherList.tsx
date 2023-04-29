import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';

import { allStyles as styles } from './CategoryModal'

type props = {
  otherList: Category[]
  onOtherItemPress: (item: Category) => () => void
  edit: boolean
}

export default React.memo(function CategoryModalOtherList({otherList, onOtherItemPress, edit}:props) {

  return (
    <>
      <View style={[styles.row, {marginTop: 32}]}>
        <Text style={styles.titleText}>推荐频道</Text>
        <Text style={styles.subTitleTxt}>点击添加频道</Text>
      </View>
      <View style={styles.listContent}>
        {
          otherList.map((item,index) => {
            return (
              <TouchableOpacity
                style={styles.itemLayout}
                key={index}
                onPress={() => {
                  if(!edit)return;
                  onOtherItemPress(item)()
                }}
              >
                <Text style={styles.itemTxt}>{edit && '+ '}{item.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </>
  )
})
