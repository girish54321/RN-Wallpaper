import {
  SET_TRENDING_IMAGE,
  SET_TRENDING_IMAGE_ERROR,
  SET_TRENDING_IMAGE_LOADING
} from './actionTypes'
const initialState = {
  isLoading: true,
  error: null,
  images: [],
  page: 1
}

export const trendingImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRENDING_IMAGE:
      let data = action.payload
      return {
        ...state,
        images: [...state.images, ...data.images],
        isLoading: false,
        error: null,
        page: data.page
      }

    case SET_TRENDING_IMAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    case SET_TRENDING_IMAGE_LOADING:
      return {
        ...state,
        isLoading: true
      }

    default:
      return state
  }
}
