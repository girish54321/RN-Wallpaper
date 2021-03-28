// import moment from 'moment'
// export const FormatData = date => moment(date).format('MMM Do YY')
export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const setImageWithData = imageData => {
  return imageData.map(data => {
    return {
      uri: data.urls.small,
      dimensions: { width: data.width, height: data.height },
      data: [
        { name: 'Small', data: data.urls.small },
        { name: 'Regular', data: data.urls.regular },
        { name: 'Full', data: data.urls.full },
        { name: 'Raw', data: data.urls.raw }
      ]
    }
  })
}
