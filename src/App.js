import 'react-native-gesture-handler'
import React from 'react'
import MainNavigation from './navigation/navigation'
import { enableScreens } from 'react-native-screens'
enableScreens()

const App = () => {
  return (
    <>
      <MainNavigation />
    </>
  )
}

export default App
