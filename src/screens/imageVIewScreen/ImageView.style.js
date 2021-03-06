import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  SafeAreaView1: { flex: 1, backgroundColor: '#000' },
  ImageView: { flex: 1 },
  FlotingButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 10
  },
  closeButton: {
    width: 50,
    height: 50,
    margin: 8,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
})
