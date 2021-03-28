import React, { useEffect } from 'react'
import { View, StatusBar } from 'react-native'
import MasonryList from 'react-native-masonry-list'
import { Colors } from '../../utils/Colors'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import AppListFooterComponent from '../../components/appListFooterComponent'
import { setHomeImages } from '../../redux/homeImageStore/action'
import style from './Home.style'
const Home = ({ navigation }) => {
  const appTheme = useTheme()
  const data = useSelector(state => state)
  let images = data.homeImageReducer
  const homeDispatch = useDispatch()

  useEffect(() => {
    homeDispatch(setHomeImages())
  }, [])

  return (
    <View style={style.mainView}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <MasonryList
        backgroundColor={appTheme.dark ? Colors.backgroundColor : Colors.white}
        onPressImage={item => {
          navigation.navigate('ImageViewScreen', { item })
        }}
        rerender={true}
        images={images.images}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (!images.isLoading) {
            homeDispatch(setHomeImages())
          }
        }}
        ListFooterComponent={() => {
          return <AppListFooterComponent isError={false} message={''} />
        }}
      />
    </View>
  )
}

export default Home
