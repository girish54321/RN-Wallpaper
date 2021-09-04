import {
  SET_TRENDING_IMAGE,
  SET_TRENDING_IMAGE_ERROR,
  SET_TRENDING_IMAGE_LOADING
} from './actionTypes'
import { AppConst } from '../../constants/constants'
import { setImageWithData } from '../../utils/helper/navigation'
const axios = require('axios')

export const setTrendingImages = () => async (dispatch: any, getState: any) => {
  let pageNumber = getState().trendingImageReducer.page
  dispatch({
    type: SET_TRENDING_IMAGE_LOADING
  })
  try {
    const response = await axios.get(
      `${AppConst.URL}${AppConst.PHOTOS}${AppConst.CLIENT_ID}&order_by=popular&per_page=30&page=${pageNumber}`
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

export const setTrendingError = (payload: any) => ({
  type: SET_TRENDING_IMAGE_ERROR,
  payload
})

export const setTrendingLoading = (payload: any) => ({
  type: SET_TRENDING_IMAGE_LOADING,
  payload
})
