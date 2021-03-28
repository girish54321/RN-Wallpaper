import { themeReducer } from './themeStore/reducers'
import { homeImageReducer } from './homeImageStore/reducers'
import { trendingImageReducer } from './trendingImageStore/reducers'
import { topicImageReducer } from './imageByTopicStore/reducers'
import { searchImageReducer } from './searchImageStore/reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  themeReducer,
  homeImageReducer,
  trendingImageReducer,
  topicImageReducer,
  searchImageReducer
})

export default rootReducer
