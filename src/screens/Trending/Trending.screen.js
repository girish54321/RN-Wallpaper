import React, { useEffect } from 'react'
import MasonryList from 'react-native-masonry-list'
import { Colors } from '../../utils/Colors'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { setTrendingImages } from '../../redux/trendingImageStore/action'
const Trending = ({ navigation }) => {
  const appTheme = useTheme()
  const data = useSelector(state => state)
  let images = data.trendingImageReducer
  const homeDispatch = useDispatch()

  useEffect(() => {
    homeDispatch(setTrendingImages())
  }, [])
  return (
    <MasonryList
      onPressImage={item => {
        navigation.navigate('ImageViewScreen', { item })
      }}
      backgroundColor={appTheme.dark ? Colors.backgroundColor : Colors.white}
      rerender={true}
      images={images.images}
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        if (images.isLoading) {
          homeDispatch(setTrendingImages())
        }
      }}
    />
  )
}

export default Trending
