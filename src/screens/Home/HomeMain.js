import React, { useState } from 'react'
import { TabView } from 'react-native-tab-view'
import { useWindowDimensions } from 'react-native'
import Home from '../../screens/Home/Home.screen'
import Trending from '../../screens/Trending/Trending.screen'
import Category from '../../screens/Category/Category.screen'
import { TabBar } from 'react-native-tab-view'
import { Colors } from '../../utils/Colors'
const HomeMain = ({ navigation }) => {
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'Home', title: 'Home', screen: Home },
    { key: 'Trending', title: 'Trending', screen: Trending },
    { key: 'Category', title: 'Category', screen: Category }
  ])

  const renderScene = ({ route }) => {
    return <route.screen navigation={navigation} />
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: Colors.primary }}
    />
  )

  return (
    <TabView
      lazy={true}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      navigation={navigation}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default HomeMain
