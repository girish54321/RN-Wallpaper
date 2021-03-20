import React, { useState } from 'react'
import { StatusBar, Image, SafeAreaView } from 'react-native'
import { URL, PHOTOS, CLIENT_ID, SEARCH } from '../../constants/constants'
import MasonryList from 'react-native-masonry-list'
import { View } from 'native-base'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../../utils/Colors'
import DismissKeyboardView from '../../components/DismissKeyboard'
import { Searchbar, Subheading } from 'react-native-paper'
import ErrorText from '../../components/errorText'
import styles from './Search.style'
const axios = require('axios')
const SearchScreen = ({ navigation }) => {
  const appTheme = useTheme()
  const [apiData, setapiData] = useState(null)
  const [loading, setloading] = useState(false)
  const [pageNumber, setpageNumber] = useState(1)
  const [searchText, setsearchText] = useState('')
  const [errorObj, seterrorObj] = useState({
    isError: false,
    errorMeesage: ''
  })

  const clearError = () => {
    seterrorObj({
      isError: false,
      errorMeesage: ''
    })
  }

  const getImages = () => {
    setloading(true)
    axios
      .get(
        `${URL}${SEARCH}/${PHOTOS}${CLIENT_ID}&per_page=30&query=${searchText}&page=${String(
          pageNumber
        )}`
      )
      .then(function (response) {
        setpageNumber(pageNumber + 1)
        if (response.data.results.length == 0) {
          seterrorObj({
            isError: true,
            errorMeesage: 'No Image Found.'
          })
          return
        }
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
          setapiData(list)
          setloading(false)
          clearError()
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
          clearError()
        }
      })
      .catch(function (error) {
        seterrorObj({
          isError: true,
          errorMeesage: String(error)
        })
        console.log(error)
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={appTheme.colors.background}
        barStyle={appTheme.dark ? 'light-content' : 'dark-content'}
      />
      <DismissKeyboardView style={{ flex: 1 }}>
        <SafeAreaView>
          <Searchbar
            icon="arrow-left"
            autoFocus={true}
            style={{ margin: 14 }}
            onSubmitEditing={() => {
              getImages(pageNumber)
            }}
            placeholder="Search Your Image Here"
            onChangeText={setsearchText}
            value={searchText}
            onIconPress={() => {
              navigation.goBack()
            }}
          />
        </SafeAreaView>
        {apiData ? (
          <MasonryList
            rerender={false}
            images={apiData}
            backgroundColor={
              appTheme.dark ? Colors.backgroundColor : Colors.white
            }
            style={{ flex: 1 }}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
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
        ) : (
          <View>
            <Image
              style={[
                styles.imageIcon,
                { tintColor: appTheme.dark ? Colors.white : '#000' }
              ]}
              source={require('../../assets/images/search_iamge.png')}
            />
            {errorObj.isError ? (
              <ErrorText errorMeesage={errorObj.errorMeesage} />
            ) : null}
          </View>
        )}
      </DismissKeyboardView>
    </View>
  )
}

export default SearchScreen
