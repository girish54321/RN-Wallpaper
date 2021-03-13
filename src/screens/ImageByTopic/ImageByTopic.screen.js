import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import styles from './ImageByTopic.style'
import RNFetchBlob from 'rn-fetch-blob'
import MasonryList from 'react-native-masonry-list'
import { LoadingView } from '../../constants/loadingView'
import { AppAlert } from '../../constants/appAlert'
import { URL, TOPICS, CLIENT_ID, PHOTOS } from '../../constants/constants'
import { Colors } from '../../utils/Colors'
import { useTheme } from '@react-navigation/native'
const ImageByTopic = ({ navigation, route }) => {
  const { item } = route.params
  const appTheme = useTheme()
  const [apiData, setapiData] = useState(null)
  const [loading, setloading] = useState(true)
  const [pageNumber, setpageNumber] = useState(1)

  useEffect(() => {
    navigation.setOptions({ title: item.title })
    getImages()
  }, [])

  const getImages = () => {
    setloading(true)
    RNFetchBlob.fetch(
      'GET',
      `${URL}${TOPICS}/${
        item.id
      }/${PHOTOS}${CLIENT_ID}&per_page=30&page=${String(pageNumber)}`
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

  const renderContent = () => (
    <MasonryList
      backgroundColor={appTheme.dark ? Colors.backgroundColor : Colors.white}
      rerender={true}
      images={apiData}
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        if (!loading) {
          getImages()
        }
      }}
      onPressImage={item => {
        navigation.navigate('ImageViewScreen', { item })
      }}
    />
  )

  return (
    <View style={styles.SafeAreaView1}>
      {apiData == null ? <LoadingView /> : renderContent()}
    </View>
  )
}

export default ImageByTopic
