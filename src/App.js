import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import rootReducer from './redux/rootReducer'
import RNBootSplash from 'react-native-bootsplash'
import ReduxThunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
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
