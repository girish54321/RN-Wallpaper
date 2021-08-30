import {
  SET_HOME_IMAGE,
  SET_HOME_IMAGE_ERROR,
  SET_HOME_IMAGE_LOADING
} from './actionTypes'
import { URL, PHOTOS, CLIENT_ID } from '../../constants/constants'
import { setImageWithData } from '../../utils/helper/navigation'
const axios = require('axios')

export const setHomeImages = (payload: any) => async (dispatch: any, getState: any) => {
  let pageNumber = getState().homeImageReducer.page
  dispatch({
    type: SET_HOME_IMAGE_LOADING
  })
  try {
    const response = await axios.get(
      `${URL}${PHOTOS}${CLIENT_ID}&order_by=latest&per_page=30&page=${pageNumber}`
    )
    if (response.status == 200) {
      let data = {
        images: setImageWithData(response.data),
        page: pageNumber + 1
      }
      dispatch({
        type: SET_HOME_IMAGE,
        payload: data
      })
    } else {
      dispatch({
        type: SET_HOME_IMAGE,
        payload: `${response.status}`
      })
    }
  } catch (error) {
    dispatch({
      type: SET_HOME_IMAGE_ERROR,
      payload: `${error}`
    })
  }
}

export const setHomeError = (payload: any) => ({
  type: SET_HOME_IMAGE_ERROR,
  payload
})

export const setHomeLoading = (payload: any) => ({
  type: SET_HOME_IMAGE_LOADING,
  payload
})
