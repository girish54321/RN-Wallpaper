import {
  SET_TRENDING_IMAGE,
  SET_TRENDING_IMAGE_ERROR,
  SET_TRENDING_IMAGE_LOADING
} from './actionTypes'
import { URL, PHOTOS, CLIENT_ID } from '../../constants/constants'
import { setImageWithData } from '../../utils/helper'
const axios = require('axios')
export const setTrendingImages = payload => async (dispatch, getState) => {
  let pageNumber = getState().trendingImageReducer.page
  dispatch({
    type: SET_TRENDING_IMAGE_LOADING
  })
  try {
    const response = await axios.get(
      `${URL}${PHOTOS}${CLIENT_ID}&order_by=popular&per_page=30&page=${pageNumber}`
    )
    if (response.status == 200) {
      let data = {
        images: setImageWithData(response.data),
        page: pageNumber + 1
      }
      dispatch({
        type: SET_TRENDING_IMAGE,
        payload: data
      })
    } else {
      dispatch({
        type: SET_TRENDING_IMAGE,
        payload: `${response.status}`
      })
    }
  } catch (error) {
    dispatch({
      type: SET_TRENDING_IMAGE_ERROR,
      payload: `${error}`
    })
  }
}

export const setTrendingError = payload => ({
  type: SET_TRENDING_IMAGE_ERROR,
  payload
})

export const setTrendingLoading = payload => ({
  type: SET_TRENDING_IMAGE_LOADING,
  payload
})
