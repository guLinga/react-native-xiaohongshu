import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { allStyles as styles } from './CategoryModal'

import iconArrow from '../../../assets/icon_arrow.png'
import iconDelete from '../../../assets/icon_delete.png'

type props = {
  myList: Category[]
  onMyItemPress: (item: Category) => () => void
  hide: () => void
  saveList: () => void
  edit: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default React.memo(function CategoryModalMyList({myList, onMyItemPress, hide, saveList, edit, setEdit}:props) {


  return (
    <>
      <View style={styles.row}>
        <Text style={styles.titleText}>我的频道</Text>
        <Text style={styles.subTitleTxt}>点击进入频道</Text>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={()=>{
            setEdit(n => {
              if(n){
                saveList();
                return false;
              }else{
                return true;
              }
            });
          }}
        >
          <Text style={styles.editTxt}>{edit ? '完成编辑' : '进入编辑'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={hide}
        >
          <Image style={styles.closeImg} source={iconArrow} />
        </TouchableOpacity>
      </View>
      <View style={styles.listContent}>
        {
          myList.map((item,index) => {
            return (
              <TouchableOpacity
                style={item.default ? styles.itemLayoutDefault : styles.itemLayout}
                key={index}
                onPress={()=>{
                  if(!edit)return;
                  onMyItemPress(item)()
                }}
              >
                <Text style={styles.itemTxt}>{item.name}</Text>
                {edit && !item.default && <Image style={styles.deleteImg} source={iconDelete} />}
              </TouchableOpacity>
            )
          })
        }
      </View>
    </>
  )
})
