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
  gaeguTitle: {
    fontSize: 28,
    lineHeight: 44,
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
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: Font.RF,
  },
  fullWidth: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    flex: 5,

    paddingTop: 40,
  },
  center: {
    flex: 13,
  },
  footer: {
    flex: 4,
    rowGap: 8,
  },
  fontMedium: {
    fontSize: 14,
    fontWeight: '500',
  },
  Pretendard: {
    fontFamily: Font.Pretendard,
  },
})
