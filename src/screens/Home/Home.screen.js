import React, { useEffect, useState } from 'react'
import { View, StatusBar, Dimensions } from 'react-native'
import MasonryList from 'react-native-masonry-list'
import { Colors } from '../../utils/Colors'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { setHomeImages } from '../../redux/homeImageStore/action'
import style from './Home.style'
import LoadingListView from '../../components/loadingListView'
import DeviceInfo from 'react-native-device-info';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Home = ({ navigation }) => {
  const appTheme = useTheme()
  const data = useSelector(state => state)
  let images = data.homeImageReducer
  const homeDispatch = useDispatch()
  const [isTablet, setisTablet] = useState(false)

  useEffect(() => {
    homeDispatch(setHomeImages())
    setisTablet(DeviceInfo.isTablet())
  }, [DeviceInfo.isTablet])

  return (
    <View style={style.mainView}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {images.isLoading && images.images.length === 0 ? (
        <LoadingListView />
      ) : (
        <MasonryList
          columns={isTablet ? 4 : 2}
          backgroundColor={
            appTheme.dark ? Colors.backgroundColor : Colors.white
          }
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
        />
      )}
    </View>
  )
}

export default Home
