import {
  SET_IMAGE_BY_TOPIC_IMAGE,
  SET_IMAGE_BY_TOPIC_IMAGE_ERROR,
  SET_IMAGE_BY_TOPIC_IMAGE_LOADING,
  SET_IMAGE_BY_TOPIC_IMAGE_CLERAR
} from './actionTypes'
const initialState = {
  isLoading: true,
  error: null,
  images: [],
  page: 1
}

export const topicImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE_BY_TOPIC_IMAGE:
      let data = action.payload
      return {
        ...state,
        images: [...state.images, ...data.images],
        isLoading: false,
        error: null,
        page: data.page
      }

    case SET_IMAGE_BY_TOPIC_IMAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    case SET_IMAGE_BY_TOPIC_IMAGE_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case SET_IMAGE_BY_TOPIC_IMAGE_CLERAR:
      return {
        ...state,
        images: []
      }

    default:
      return state
  }
}
