import {
  SET_SEARCH_IMAGE,
  SET_SEARCH_IMAGE_ERROR,
  SET_SEARCH_IMAGE_LOADING,
  CLEAR_SEARCH_IMAGE
} from './actionTypes'
const initialState = {
  isLoading: true,
  error: null,
  images: [],
  page: 1
}

export const searchImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_IMAGE:
      let data = action.payload
      return {
        ...state,
        images: [...state.images, ...data.images],
        isLoading: false,
        error: null,
        page: data.page
      }

    case SET_SEARCH_IMAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    case SET_SEARCH_IMAGE_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case CLEAR_SEARCH_IMAGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        images: []
      }

    default:
      return state
  }
}
