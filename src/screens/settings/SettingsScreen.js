import React from 'react'
import { View, Text, Button, StyleSheet, Switch } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { ThemeContext } from '../../components/context'
const SettingsScreen = () => {
  const appTheme = useTheme()
  const { toggleTheme } = React.useContext(ThemeContext)

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={appTheme.dark ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={appTheme.dark}
      />
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
