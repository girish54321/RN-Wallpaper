export const capitalizeFirstLetter = (string: any) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const setImageWithData = (imageData: any) => {
  return imageData.map((data: any) => {
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

export const goToScreen = (navigation: any, props: any, screenName: any) => {
  if (props) {
    return navigation.navigate(screenName, { props })
  } else {
    return navigation.navigate(screenName)
  }
}