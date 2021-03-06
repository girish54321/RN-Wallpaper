import { Alert } from 'react-native'

export const AppAlert = (title, subTitle) =>
  Alert.alert(
    title,
    subTitle,
    [
      {
        text: 'Ok',
        onPress: () => console.log('Ok Pressed')
      }
    ],
    { cancelable: false }
  )
