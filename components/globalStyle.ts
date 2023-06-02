import { StyleSheet } from 'react-native'

export const Font = {
  Pretendard: 'Pretendard-Regular',
  RF: 'RF',
}
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 54,
    lineHeight: 49,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A1AEB7',
    fontFamily: Font.Pretendard,
    lineHeight: 24,
  },
  safeAreaContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  text: {
    fontFamily: Font.RF,
  },
})
