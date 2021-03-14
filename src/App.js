import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/rootReducer'
import RNBootSplash from 'react-native-bootsplash'
const store = createStore(rootReducer)
enableScreens()

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true })
  }, [])
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App
