import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 55,
  },
  nextButton: {
    paddingHorizontal: 80,
    paddingVertical: 10,
    backgroundColor: '#4E4E4E',
    borderRadius: 50,
    width: 263,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 9,
    height: 54,
  },
  btnInnerText: { fontSize: 12, color: 'white', fontWeight: '400' },
})
