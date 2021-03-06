import React, { useState } from 'react'
import { StatusBar, Text, Image } from 'react-native'
import { URL, PHOTOS, CLIENT_ID, SEARCH } from '../../constants/constants'
import MasonryList from 'react-native-masonry-list'
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  View,
  Button
} from 'native-base'
import AppHeader from '../../components/appHeader'
import styles from './Search.style'
const axios = require('axios')
const SearchScreen = ({ navigation }) => {
  const [apiData, setapiData] = useState(null)
  const [loading, setloading] = useState(false)
  const [pageNumber, setpageNumber] = useState(1)
  const [searchText, setsearchText] = useState('')

  const getImages = () => {
    console.log('PAGE NUMBER SEARCH', pageNumber)
    setloading(true)
    axios
      .get(
        `${URL}${SEARCH}/${PHOTOS}${CLIENT_ID}&per_page=30&query=${searchText}&page=${String(
          pageNumber
        )}`
      )
      .then(function (response) {
        console.log('SUSUS', response)
        // handle success
        if (apiData == null) {
          let list = response.data.results.map(data => {
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
          console.log('list', list)
          setapiData(list)
          setloading(false)
        } else {
          setloading(false)
          let oldList = apiData
          let list = response.data.results.map(data => {
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
        // console.log(response.data.results)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }

  return (
    <>
      <StatusBar barStyle="default" />
      <View style={{ flex: 1 }}>
        <Container>
          <Content>
            <View style={{ margin: 8, borderRadius: 8, marginHorizontal: 16 }}>
              <Item>
                <Icon active name="search" />
                <Input
                  placeholder="Search Image"
                  value={searchText}
                  onChangeText={setsearchText}
                  onSubmitEditing={() => {
                    console.log('GET TH EIAMG')
                    getImages(pageNumber)
                  }}
                />
                <Icon
                  active
                  name="close"
                  onPress={() => {
                    setapiData(null)
                    console.log('HHH')
                    setsearchText('')
                    setpageNumber(1)
                  }}
                />
              </Item>
            </View>

            {apiData ? (
              <MasonryList
                rerender={false}
                images={apiData}
                style={{ flex: 1 }}
                keyExtractor={(item, index) => index.toString()}
                enableEmptySections={true}
                onEndReachedThreshold={0.1}
                onPressImage={item => {
                  navigation.navigate('ImageViewScreen', { item })
                }}
              />
            ) : (
              <Image
                style={styles.imageIcon}
                source={require('../../assets/images/search_iamge.png')}
              />
            )}
            {apiData != null && !loading ? (
              <View style={styles.loadBtnStyle}>
                <Button
                  primary
                  onPress={() => {
                    if (!loading) {
                      setpageNumber(pageNumber + 1)
                      console.log('GET IAMGE')
                      getImages()
                    }
                  }}>
                  <Text> Load More </Text>
                </Button>
              </View>
            ) : null}
          </Content>
        </Container>
      </View>
    </>
  )
}

export default SearchScreen
