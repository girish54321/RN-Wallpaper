import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Colors } from '../utils/Colors'

import { Button } from 'react-native-paper'
const AppListFooterComponent = ({ isError, message, loadMore }) => {
  return (
    <View style={{ margin: 14, flex: 1, alignItems: 'center' }}>
      {isError ? (
        <Text style={{ color: 'red' }}>Error Loading More Pics</Text>
      ) : (
        <ActivityIndicator size="large" color={Colors.primary} />
      )}

      {!isError ? <Text>{message ? message : 'Loding More Pics'}</Text> : null}
      {isError ? (
        <Button
          mode="contained"
          onPress={() => {
            if (loadMore) {
              loadMore()
            }
          }}>
          Try again
        </Button>
      ) : null}
      <SizedBox size={6} />
    </View>
  )
}

export default AppListFooterComponent
