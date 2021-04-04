import React, { useEffect } from 'react'
import { View } from 'react-native'
import styles from './ImageByTopic.style'
import MasonryList from 'react-native-masonry-list'
import { Colors } from '../../utils/Colors'
import { useTheme } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import LoadingListView from '../../components/loadingListView'
import {
  setImageByTopicImages,
  setImageByTopicClear
} from '../../redux/imageByTopicStore/action'
const ImageByTopic = ({ navigation, route }) => {
  const { item } = route.params
  const appTheme = useTheme()
  const data = useSelector(state => state)
  let images = data.topicImageReducer
  const imageByTopicDispatch = useDispatch()

  useEffect(() => {
    navigation.setOptions({ title: item.title })
    imageByTopicDispatch(setImageByTopicImages({ id: item.id }))
    return () => {
      imageByTopicDispatch(setImageByTopicClear())
    }
  }, [])
  const renderContent = () => (
    <MasonryList
      backgroundColor={appTheme.dark ? Colors.backgroundColor : Colors.white}
      rerender={true}
      images={images.images}
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        if (!images.isLoading) {
          imageByTopicDispatch(setImageByTopicImages({ id: item.id }))
        }
      }}
      onPressImage={item => {
        navigation.navigate('ImageViewScreen', { item })
      }}
    />
  )

  const lodingView = () => {
    return <LoadingListView />
  }

  return (
    <View style={styles.SafeAreaView1}>
      {images.isLoading && images.images.length === 0
        ? lodingView()
        : renderContent()}
    </View>
  )
}

export default ImageByTopic
