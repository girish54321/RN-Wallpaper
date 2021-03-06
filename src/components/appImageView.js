import React from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
const width = Dimensions.get('window').width

export const AppImageView = (url, fun) => (
  <TouchableOpacity
    onPress={() => {
      fun()
    }}>
    <AutoHeightImage
      width={width / 2}
      style={{ margin: 4 }}
      source={{ uri: url }}
    />
  </TouchableOpacity>
)

export const MarginView = () => <View style={styles.loadingMore}></View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  loadingMore: {
    margin: 25
  }
})
