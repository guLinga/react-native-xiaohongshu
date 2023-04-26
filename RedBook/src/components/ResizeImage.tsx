import React,{useEffect, useState} from 'react'
import { Image, Dimensions } from 'react-native';

const {width} = Dimensions.get('window');
const SHOW_WIDTH = (width - 18) / 2;

type props = {
  uri: string
}

// 显示宽度 / 显示高度 = 图片宽度 / 图片高度
// 显示高度 = 显示宽度 * 图片高度 / 图片宽度

export default function ResizeImage({uri}:props) {

  const [height, setHeight] = useState<number>(200);

  useEffect(()=>{
    Image.getSize(uri,(width,height)=>{
      const showHeight = SHOW_WIDTH * height / width;
      setHeight(showHeight);
    })
  },[uri])

  return (
    <Image 
      style={{
        width: SHOW_WIDTH,
        height: height,
        resizeMode: 'cover'
      }}
      source={{uri: uri}} 
    />
  )
}