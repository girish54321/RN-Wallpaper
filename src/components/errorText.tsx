import React from 'react'
import { Subheading } from 'react-native-paper'
const ErrorText = ({ errorMeesage }) => {
  return (
    <Subheading style={{ justifyContent: 'center', textAlign: 'center' }}>
      {errorMeesage}
    </Subheading>
  )
}

export default ErrorText
