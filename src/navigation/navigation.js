import React from 'react'
import Home from '../screens/Home/Home.screen'
import Trending from '../screens/Trending/Trending.screen'
import Category from '../screens/Category/Category.screen'
import ImageByTopic from '../screens/ImageByTopic/ImageByTopic.screen'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ImageViewScreen from '../screens/imageVIewScreen/ImageVIew.screen'
import SearchScreen from '../screens/Search/Search.screen'
import SettingsScreen from '../screens/settings/SettingsScreen'
import { Colors } from '../utils/Colors'
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../components/context'
const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const MainNavigation = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false)
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: Colors.backgroundColor,
      text: '#ffffff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme
  const themContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme)
        console.log('Change theme')
        console.log('theme', theme)
      }
    }),
    []
  )

  const MyTabs = () => {
    return (
      <Tab.Navigator
        lazy={true}
        tabBarOptions={{
          tabStyle: {
            backgroundColor: isDarkTheme ? Colors.backgroundColor : Colors.white
          }
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Trending" component={Trending} />
        <Tab.Screen name="Category" component={Category} />
      </Tab.Navigator>
    )
  }
  return (
    <ThemeContext.Provider value={themContext}>
      <NavigationContainer theme={theme}>
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
            component={MyTabs}
            // options={({ navigation }) => ({})}
            options={({ navigation }) => ({
              headerRight: () => (
                <Ionicons
                  style={{ marginRight: 16 }}
                  color="#fff"
                  onPress={() => navigation.navigate('SearchScreen')}
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
            options={{
              headerStyle: {
                backgroundColor: '#000',
                elevation: 0
              },
              headerTintColor: '#fff',
              title: ''
            }}
            component={ImageViewScreen}
          />
          <Stack.Screen
            name="ImageByTopic"
            options={{}}
            component={ImageByTopic}
          />
          <Stack.Screen
            name="SearchScreen"
            options={{ title: 'SearchScreen' }}
            component={SearchScreen}
          />
          <Stack.Screen
            name="SettingsScreen"
            options={{ title: 'Settings' }}
            component={SettingsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  )
}

export default MainNavigation
