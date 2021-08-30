import React, { useEffect } from 'react'
import ImageByTopic from '../screens/ImageByTopic/ImageByTopic.screen'
import { createStackNavigator } from '@react-navigation/stack'
import ImageViewScreen from '../screens/imageVIewScreen/ImageVIew.screen'
import SearchScreen from '../screens/Search/Search.screen'
import SettingsScreen from '../screens/settings/SettingsScreen'
import HomeMain from '../screens/Home/HomeMain'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from '../utils/Colors'
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from '../redux/themeStore/action'
import { THEME } from '../constants/constants'
const Stack = createStackNavigator()

const MainNavigation = () => {
  const data: any = useSelector(state => state)
  const darkTheme = data.themeReducer.isDarkTheme
  const themeDispatch = useDispatch()

  useEffect(() => {
    checkUserTheme()
  }, [])

  const checkUserTheme = () => {
    AsyncStorage.getItem(THEME)
      .then(value => {
        if (value) {
          let data = JSON.parse(value)
          themeDispatch(changeTheme(data.isDarkTheme))
        } else {
          themeDispatch(changeTheme(false))
        }
      })
      .catch(() => {
        themeDispatch(changeTheme(false))
      })
  }

  let CustomDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      ...NavigationDefaultTheme.colors,
      accent: Colors.primary,
      primary: Colors.primary,
      card: 'rgb(255, 255, 255)',
      background: '#ffffff',
      text: '#333333'
    }
  }

  let CustomDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      ...NavigationDarkTheme.colors,
      accent: Colors.primary,
      primary: Colors.primary,
      card: 'rgb(18, 18, 18)',
      background: '#333333',
      text: '#ffffff'
    }
  }

  return (
    <PaperProvider theme={darkTheme ? CustomDarkTheme : CustomDefaultTheme}>
      <NavigationContainer
        theme={darkTheme ? CustomDarkTheme : CustomDefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary,
              elevation: 0
            },
            headerTintColor: '#fff'
          }}>
          <Stack.Screen
            name="Home"
            component={HomeMain}
            options={({ navigation }) => ({
              headerRight: () => (
                <Ionicons
                  style={{ marginRight: 16 }}
                  color="#fff"
                  onPress={() => navigation.navigate('Search Image')}
                  name="search"
                  size={24}
                />
              ),
              headerLeft: () => (
                <Ionicons
                  style={{ marginLeft: 16 }}
                  color="#fff"
                  onPress={() => navigation.navigate('SettingsScreen')}
                  name="settings"
                  size={24}
                />
              )
            })}
          />
          <Stack.Screen
            name="ImageViewScreen"
            options={{ headerShown: false }}
            component={ImageViewScreen}
          />
          <Stack.Screen name="ImageByTopic" component={ImageByTopic} />
          <Stack.Screen
            name="Search Image"
            options={{ headerShown: false }}
            component={SearchScreen}
          />
          <Stack.Screen
            name="SettingsScreen"
            options={{ title: 'Settings' }}
            component={SettingsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default MainNavigation
