import React from 'react'
import { View } from 'native-base'
import { Subheading } from 'react-native-paper'

export const ErrorView = ({ errorMessage }) => {
  return (
    <View style={{ flex: 1 }}>
      <Subheading>{errorMessage}</Subheading>
    </View>
  )
}
export const ErrorViewSmall = ({ errorMessage }) => {
  return (
    <View style={{ flex: 1 }}>
      <Subheading>{errorMessage}</Subheading>
    </View>
  )
}
