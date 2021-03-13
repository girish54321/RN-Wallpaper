import 'react-native-gesture-handler'
import React from 'react'
import MainNavigation from './navigation/navigation'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/rootReducer'
const store = createStore(rootReducer)
enableScreens()

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App
