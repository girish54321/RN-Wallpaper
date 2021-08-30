import {
  SET_IMAGE_BY_TOPIC_IMAGE,
  SET_IMAGE_BY_TOPIC_IMAGE_ERROR,
  SET_IMAGE_BY_TOPIC_IMAGE_LOADING,
  SET_IMAGE_BY_TOPIC_IMAGE_CLERAR
} from './actionTypes'
import { URL, PHOTOS, CLIENT_ID, TOPICS } from '../../constants/constants'
import { setImageWithData } from '../../utils/helper/navigation'

const axios = require('axios')
export const setImageByTopicImages = (payload: any) => async (dispatch: any, getState: any) => {
  let pageNumber = getState().topicImageReducer.page
  dispatch({
    type: SET_IMAGE_BY_TOPIC_IMAGE_LOADING
  })
  try {
    const response = await axios.get(
      `${URL}${TOPICS}/${payload.id
      }/${PHOTOS}${CLIENT_ID}&per_page=30&page=${String(pageNumber)}`
    )
    if (response.status == 200) {
      let data = {
        images: setImageWithData(response.data),
        page: pageNumber + 1
      }
      dispatch({
        type: SET_IMAGE_BY_TOPIC_IMAGE,
        payload: data
      })
    } else {
      dispatch({
        type: SET_IMAGE_BY_TOPIC_IMAGE,
        payload: `${response.status}`
      })
    }
  } catch (error) {
    dispatch({
      type: SET_IMAGE_BY_TOPIC_IMAGE_ERROR,
      payload: `${error}`
    })
  }
}

export const setImageByTopicError = (payload: any) => ({
  type: SET_IMAGE_BY_TOPIC_IMAGE_ERROR,
  payload
})

export const setImageByTopicLoading = (payload: any) => ({
  type: SET_IMAGE_BY_TOPIC_IMAGE_LOADING,
  payload
})

export const setImageByTopicClear = (payload: any) => ({
  type: SET_IMAGE_BY_TOPIC_IMAGE_CLERAR,
  payload
})
