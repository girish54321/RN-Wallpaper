import React, { useEffect, useState } from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import MasonryList from 'react-native-masonry-list'
import { View } from 'native-base'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../../utils/Colors'
import DismissKeyboardView from '../../components/DismissKeyboard'
import { Searchbar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import LoadingListView from '../../components/loadingListView'
import {
  setSearchImages,
  clearSearch
} from '../../redux/searchImageStore/action'
import style from './Search.style'

const SearchScreen = ({ navigation }) => {
  const appTheme = useTheme()
  const data = useSelector(state => state)
  let images = data.searchImageReducer
  const searchDispatch = useDispatch()
  const [searchText, setsearchText] = useState('')

  useEffect(() => {
    searchDispatch(clearSearch())
  }, [])

  return (
    <View style={style.f1}>
      <StatusBar
        backgroundColor={appTheme.colors.background}
        barStyle={appTheme.dark ? 'light-content' : 'dark-content'}
      />
      <DismissKeyboardView style={style.f1}>
        <SafeAreaView>
          <Searchbar
            icon="arrow-left"
            autoFocus={true}
            style={style.searchView}
            onSubmitEditing={() => {
              searchDispatch(setSearchImages({ searchText: searchText }))
            }}
            placeholder="Search Your Image Here"
            onChangeText={setsearchText}
            value={searchText}
            onIconPress={() => {
              navigation.goBack()
            }}
          />
        </SafeAreaView>
        {images.isLoading && images.images.length === 0 ? (
          <LoadingListView />
        ) : (
          <MasonryList
            rerender={false}
            images={images.images}
            backgroundColor={
              appTheme.dark ? Colors.backgroundColor : Colors.white
            }
            style={style.f1}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (!images.isLoading && images.total_pages !== images.page) {
                searchDispatch(setSearchImages({ searchText: searchText }))
              }
            }}
            onPressImage={item => {
              navigation.navigate('ImageViewScreen', { item })
            }}
          />
        )}
      </DismissKeyboardView>
    </View>
  )
}

export default SearchScreen
