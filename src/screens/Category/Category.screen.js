import React, { useEffect, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { URL, TOPICS, CLIENT_ID } from '../../constants/constants'
import styles from './Category.style'
import RNFetchBlob from 'rn-fetch-blob'
import MasonryList from 'react-native-masonry-list'
import { LoadingView } from '../../constants/loadingView'
import AppAlert from '../../constants/appAlert'
import { Colors } from '../../utils/Colors'
import { useTheme } from '@react-navigation/native'
const Category = ({ navigation }) => {
  const [apiData, setapiData] = useState([])
  const appTheme = useTheme()
  useEffect(() => {
    getImages()
  }, [])

  const getImages = () => {
    RNFetchBlob.fetch('GET', `${URL}${TOPICS}${CLIENT_ID}&per_page=30`)
      .then(res => {
        let status = res.info().status
        if (status == 200) {
          let json = res.json()
          if (apiData.length == 0) {
            let list = json.map(data => {
              return {
                id: data.id,
                title: data.title,
                uri: data.cover_photo.urls.small,
                dimensions: { width: data.width, height: data.height },
                data: [
                  { name: 'Small', data: data.cover_photo.urls.small },
                  { name: 'Full', data: data.cover_photo.urls.full },
                  { name: 'Raw', data: data.cover_photo.urls.raw }
                ]
              }
            })
            setapiData(list)
            // setapiData(list)
          }
        } else {
          AppAlert('Error ' + String(status), 'Some Thing Went Worng')
          console.log('ERROR', status)
        }
      })
      .catch(e => {
        AppAlert('Error ', String(e))
      })
  }

  const goToIamgeView = item => {
    navigation.navigate('ImageByTopic', { item })
  }

  return (
    <>
      <View style={styles.SafeAreaView1}>
        {apiData.length == 0 ? (
          <LoadingView />
        ) : (
          <MasonryList
            backgroundColor={
              appTheme.dark ? Colors.backgroundColor : Colors.white
            }
            rerender={true}
            images={apiData}
            onPressImage={goToIamgeView}
            renderIndividualHeader={data => {
              return (
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      width: data.masonryDimensions.width,
                      margin: data.masonryDimensions.gutter / 2,
                      position: 'absolute',
                      zIndex: 10,
                      flexDirection: 'row',
                      padding: 5,
                      alignItems: 'center',
                      backgroundColor: 'rgba(000,000,000,0.4)'
                    }}>
                    <Text style={{ color: '#fff' }}>{data.title}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            }}
          />
        )}
      </View>
    </>
  )
}

export default Category
