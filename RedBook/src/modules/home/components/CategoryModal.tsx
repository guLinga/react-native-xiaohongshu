import React,{useState, forwardRef, useImperativeHandle, useEffect, useCallback} from 'react'
import { Modal, View, StyleSheet, Dimensions, LayoutAnimation } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { homeState, getCategoryList } from '../../../stores/HomeStore';
import { save } from '../../../utils/Storage';

import CategoryModalMyList from './CategoryModalMyList';
import CategoryModalOtherList from './CategoryModalOtherList';

const {width} = Dimensions.get('window')

type props = {}

export interface CategoryModalRed {
  show: () => void
  hide: () => void
}

export default forwardRef(function CategoryModal(props: props, ref) {

  const dispatch = useDispatch<any>();

  const [visible, setVisible] = useState<boolean>(false)

  const [myList, setMyList] = useState<Category[]>([]);
  const [otherList, setOtherList] = useState<Category[]>([]);
  const [edit, setEdit] = useState<boolean>(false)
  const home = useSelector(homeState);

  // 初始化频道数据
  useEffect(()=>{
    const tempMyList = home.CategoryList.filter(i => i.isAdd)
    setMyList(tempMyList)
    const tempOtherList = home.CategoryList.filter(i => !i.isAdd)
    setOtherList(tempOtherList)
  },[home])

  // 弹窗显示
  const show = () => {
    setVisible(true);
  }

  // 弹窗关闭
  const hide = () => {
    setVisible(false);
  }

  // 导出弹窗 显示 关闭 方法
  useImperativeHandle(ref, () => {
    return {
      show, hide
    }
  })

  // 向我的频道添加数据
  const onOtherItemPress = useCallback((item: Category) => () => {
    LayoutAnimation.easeInEaseOut()
    setOtherList(n => n.filter(i => i.name !== item.name));
    setMyList(n => [...n, {...item, isAdd: true}]);
  },[myList,otherList])

  // 移除我的频道的数据
  const onMyItemPress = useCallback((item: Category) => () => {
    LayoutAnimation.easeInEaseOut()
    setMyList(n => n.filter(i => i.name !== item.name));
    setOtherList(n => [...n, {...item, isAdd: false}]);
  },[])

  // 储存数据
  const saveList = useCallback(() => {
    save('categoryList',JSON.stringify([...myList,...otherList]))
    // 更新store中的数据
    dispatch(getCategoryList());
  },[myList, otherList])

  return (
    <Modal
      transparent={true}
      visible={visible}
    >
      <View style={styles.root}>
        <View style={styles.content}>
          <CategoryModalMyList myList={myList} onMyItemPress={onMyItemPress} hide={hide} saveList={saveList} edit={edit} setEdit={setEdit} />
          <CategoryModalOtherList otherList={otherList} onOtherItemPress={onOtherItemPress} edit={edit} />
        </View>
        <View style={styles.mask}></View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 48,
    paddingBottom: 40
  },
  mask: {
    width: '100%',
    flex: 1,
    backgroundColor: '#00000060'
  }
})

export const allStyles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 16
  },
  subTitleTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 12,
    flex: 1
  },
  editBtn: {
    paddingHorizontal: 10,
    height: 28,
    backgroundColor: '#eee',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editTxt: {
    fontSize: 13,
    color: '#3050ff'
  },
  closeBtn: {
    padding: 12
  },
  closeImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}]
  },
  listContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemLayout: {
    width: (width - 80) / 4,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginLeft: 16,
    marginTop: 12
  },
  itemLayoutDefault: {
    width: (width - 80) / 4,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#eee',
    borderRadius: 6,
    marginLeft: 16,
    marginTop: 12
  },
  itemTxt: {
    fontSize: 16,
    color: '#666'
  },
  deleteImg: {
    width: 14,
    height: 14,
    position: 'absolute',
    top: -6,
    right: -6
  }
})