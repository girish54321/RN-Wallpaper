import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  View,
  FlatList,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Platform
} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import styles from './ImageView.style'
import Icon from 'react-native-vector-icons/Ionicons'
import BottomSheet from '@gorhom/bottom-sheet'
import { AppAlert } from '../../constants/appAlert'
import AutoHeightImage from 'react-native-auto-height-image'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions'
import CameraRoll from '@react-native-community/cameraroll'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { useTheme } from '@react-navigation/native'
const ImageViewScreen = ({ route, navigation }) => {
  const { item } = route.params
  const appTheme = useTheme()
  const bottomSheetRef = useRef(null)
  const snapPoints = useMemo(() => ['1%', '35%'], [])
  console.log('item', appTheme)
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index)
  }, [])

  const requestiOSermission = async () => {
    var result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    var permissionGranted
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)'
        )
        permissionGranted = false
        break
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable'
        )
        request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
          permissionGranted = true
        })
        break
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible')
        permissionGranted = false
        break
      case RESULTS.GRANTED:
        console.log('The permission is granted')
        permissionGranted = true
        break
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore')
        permissionGranted = false
        break
    }
    return permissionGranted
  }

  const requestAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

    const hasPermission = await PermissionsAndroid.check(permission)
    if (hasPermission) {
      return true
    } else {
      const status = await PermissionsAndroid.request(permission)
      return status == 'granted' ? true : false
    }
  }

  const downlodImage = async imageUrl => {
    let permission =
      Platform.OS == 'ios'
        ? await requestiOSermission()
        : await requestAndroidPermission()

    if (permission) {
      if (Platform.OS == 'ios') {
        CameraRoll.save(imageUrl).then(() => {
          AppAlert('Saved!', 'Image Downloaded Successfully.')
        })
      } else {
        let date = new Date()
        let image_URL = imageUrl
        const { config, fs } = RNFetchBlob
        let PictureDir = fs.dirs.PictureDir
        let ext = '.jpg'
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              '/image_' +
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
            description: 'Image'
          }
        }
        config(options)
          .fetch('GET', image_URL)
          .then(res => {
            console.log('res -> ', JSON.stringify(res))
            AppAlert('Saved!', 'Image Downloaded Successfully.')
          })
      }
    } else {
      AppAlert('Error', 'Cant Downlod Image')
    }
  }

  return (
    <>
      <StatusBar backgroundColor={'#000'} />
      <SafeAreaView style={styles.SafeAreaView1}>
        <AutoHeightImage
          width={width}
          style={styles.ImageView}
          resizeMode="contain"
          source={{ uri: item.source.uri }}
        />
        <TouchableOpacity
          style={styles.FlotingButton}
          onPress={() => {
            bottomSheetRef.current.expand()
          }}>
          <Icon name={'arrow-down-circle-outline'} size={25} color={'blue'} />
        </TouchableOpacity>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View
            style={[
              styles.contentContainer,
              { backgroundColor: appTheme.colors.background }
            ]}>
            <FlatList
              data={item.data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    downlodImage(item.data)
                    bottomSheetRef.current.close()
                  }}
                  style={{
                    height: 56,
                    width: width,
                    flex: 1
                  }}>
                  <View
                    style={{
                      flex: 1,
                      padding: 16,
                      justifyContent: 'space-between',
                      flexDirection: 'row'
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        color: appTheme.colors.text
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </BottomSheet>
      </SafeAreaView>
    </>
  )
}

export default ImageViewScreen
