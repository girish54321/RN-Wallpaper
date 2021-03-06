import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import MasonryList from 'react-native-masonry-list'
import { URL, PHOTOS, CLIENT_ID } from '../../constants/constants'
import { LoadingView } from '../../constants/loadingView'
import { AppAlert } from '../../constants/appAlert'
import { Colors } from '../../utils/Colors'
import { useTheme } from '@react-navigation/native'
const Trending = ({ navigation }) => {
  const appTheme = useTheme()
  const [apiData, setapiData] = useState(null)
  const [pageNumber, setpageNumber] = useState(1)
  const [, setloading] = useState(true)
  useEffect(() => {
    getImages(pageNumber)
  }, [])

  const getImages = page => {
    console.log('PAGE NUMBER  TRENDING', page)
    setloading(true)
    RNFetchBlob.fetch(
      'GET',
      `${URL}${PHOTOS}${CLIENT_ID}&order_by=popular&per_page=30&page=${pageNumber}`
    )
      .then(res => {
        let status = res.info().status
        if (status == 200) {
          setpageNumber(pageNumber + 1)
          setloading(false)
          let json = res.json()
          console.log('JSONE TRENDING', json.length)
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

  return apiData == null ? (
    <LoadingView />
  ) : (
    <MasonryList
      onPressImage={item => {
        navigation.navigate('ImageViewScreen', { item })
      }}
      backgroundColor={appTheme.dark ? Colors.backgroundColor : Colors.white}
      rerender={true}
      images={apiData}
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        console.log('ON END TERNDING')
        getImages(pageNumber)
      }}
    />
  )
}

export default Trending
