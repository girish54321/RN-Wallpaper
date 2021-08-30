import { CHECK_THEME, CHNAGE_THEME } from './actionTypes'
import { THEME } from '../../constants/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState = {
  isDarkTheme: false
}

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHNAGE_THEME:
      const jsonValue = JSON.stringify({ isDarkTheme: action.payload })
      AsyncStorage.setItem(THEME, jsonValue)
      return {
        ...state,
        isDarkTheme: action.payload
      }

    default:
      return state
  }
}
