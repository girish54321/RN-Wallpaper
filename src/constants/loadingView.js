import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export const LoadingView = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" />
  </View>
)

export const LoadingMoreView = () => (
  <View style={styles.loadingMore}>
    <ActivityIndicator size="large" />
  </View>
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
