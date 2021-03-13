import React, { useEffect, useState } from 'react'
import RNFetchBlob from 'rn-fetch-blob'
import { View, StatusBar, useWindowDimensions } from 'react-native'
import { URL, PHOTOS, CLIENT_ID } from '../../constants/constants'
import { LoadingView } from '../../constants/loadingView'
import { AppAlert } from '../../constants/appAlert'
import MasonryList from 'react-native-masonry-list'
import { Colors } from '../../utils/Colors'
import { useTheme } from '@react-navigation/native'
import { TabView, SceneMap } from 'react-native-tab-view'
const Home = ({ navigation }) => {
  const appTheme = useTheme()
  const [apiData, setapiData] = useState(null)
  const [, setloading] = useState(true)
  const [pageNumber, setpageNumber] = useState(1)

  useEffect(() => {
    getImages(pageNumber)
  }, [])

  const getImages = () => {
    setloading(true)
    RNFetchBlob.fetch(
      'GET',
      `${URL}${PHOTOS}${CLIENT_ID}&order_by=latest&per_page=30&page=${pageNumber}`
    )
      .then(res => {
        setloading(false)
        let status = res.info().status
        if (status == 200) {
          setpageNumber(pageNumber + 1)
          let json = res.json()

          if (apiData == null) {
            let list = json.map(data => {
              return {
                uri: data.urls.small,
                dimensions: { width: data.width, height: data.height },
                data: [
                  { name: 'Small', data: data.urls.small },
                  { name: 'Regular', data: data.urls.regular },
                  { name: 'Full', data: data.urls.full },
                  { name: 'Raw', data: data.urls.raw }
                ]
              }
            })
            setapiData(list)
          } else {
            setloading(false)
            let oldList = apiData
            let list = json.map(data => {
              return {
                uri: data.urls.small,
                dimensions: { width: data.width, height: data.height },
                data: [
                  { name: 'Small', data: data.urls.small },
                  { name: 'Regular', data: data.urls.regular },
                  { name: 'Full', data: data.urls.full },
                  { name: 'Raw', data: data.urls.raw }
                ]
              }
            })
            setapiData([...oldList, ...list])
          }
        } else {
          setloading(false)
          AppAlert('Error ' + String(status), 'Some Thing Went Worng')
          console.log('ERROR', status)
        }
      })
      .catch(e => {
        setloading(false)
        AppAlert('Error ', String(e))
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {apiData == null ? (
        <LoadingView />
      ) : (
        <MasonryList
          backgroundColor={
            appTheme.dark ? Colors.backgroundColor : Colors.white
          }
          onPressImage={item => {
            navigation.navigate('ImageViewScreen', { item })
          }}
          rerender={true}
          images={apiData}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            getImages(pageNumber)
          }}
        />
      )}
    </View>
  )
}

export default Home
