import {
  SET_SEARCH_IMAGE,
  SET_SEARCH_IMAGE_ERROR,
  SET_SEARCH_IMAGE_LOADING,
  CLEAR_SEARCH_IMAGE
} from './actionTypes'
import { URL, PHOTOS, CLIENT_ID, SEARCH } from '../../constants/constants'
import { setImageWithData } from '../../utils/helper'
const axios = require('axios')
export const setSearchImages = payload => async (dispatch, getState) => {
  let pageNumber = getState().searchImageReducer.page
  dispatch({
    type: SET_SEARCH_IMAGE_LOADING
  })
  try {
    const response = await axios.get(
      `${URL}${SEARCH}/${PHOTOS}${CLIENT_ID}&per_page=30&query=${
        payload.searchText
      }&page=${String(pageNumber)}`
    )

    if (response.status == 200) {
      let data = {
        images: setImageWithData(response.data.results),
        page: pageNumber + 1,
        total_pages: response.data.total_pages
      }
      dispatch({
        type: SET_SEARCH_IMAGE,
        payload: data
      })
    } else {
      dispatch({
        type: SET_SEARCH_IMAGE_ERROR,
        payload: `${response.status}`
      })
    }
  } catch (error) {
    dispatch({
      type: SET_SEARCH_IMAGE_ERROR,
      payload: `${error}`
    })
  }
}

export const setSearchError = payload => ({
  type: SET_SEARCH_IMAGE_ERROR,
  payload
})

export const setSearchLoading = payload => ({
  type: SET_SEARCH_IMAGE_LOADING,
  payload
})

export const clearSearch = payload => ({
  type: CLEAR_SEARCH_IMAGE
})
