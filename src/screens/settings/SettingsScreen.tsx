import React from 'react'
import { View } from 'react-native'
import { List, Switch } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from '../../redux/themeStore/action'

const SettingsScreen = () => {
  const data = useSelector(state => state)
  const darkTheme = data.themeReducer.isDarkTheme
  const themeDispatch = useDispatch()

  const toggleSwitch = value => {
    themeDispatch(changeTheme(value))
  }

  return (
    <View
      style={{
        flex: 1
      }}>
      <List.Item
        onPress={() => {
          themeDispatch(changeTheme(!darkTheme))
        }}
        title="Dark / Ligt Mode"
        description="Change App Theme"
        left={props => <List.Icon {...props} icon="theme-light-dark" />}
        right={props => (
          <Switch value={darkTheme} onValueChange={toggleSwitch} />
        )}
      />
    </View>
  )
}

export default SettingsScreen
