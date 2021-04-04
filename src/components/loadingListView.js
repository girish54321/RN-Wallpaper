import React from 'react'
import MasonryList from 'react-native-masonry-list'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../utils/Colors'
const LoadingListView = () => {
  const appTheme = useTheme()
  const loading = require('../assets/json/loading.json')

  return (
    <MasonryList
      backgroundColor={appTheme.dark ? Colors.backgroundColor : Colors.white}
      rerender={true}
      images={loading.loading}
      onEndReachedThreshold={0.1}
      imageContainerStyle={{ backgroundColor: Colors.loadingColor }}
    />
  )
}

export default LoadingListView
