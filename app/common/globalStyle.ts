import { StyleSheet } from 'react-native'
import { hasNotch } from 'react-native-device-info'

export const Font = {
  Pretendard: 'Pretendard-Regular',
  Pretendard_Semibold: 'Pretendard-SemiBold',
  RF: 'RF',
  GAEGU_M: 'JGaegujaengyi-Medium',
  GAEGU_L: 'JGaegujaengyi-Light',
  GAEGU_B: 'JGaegujaengyi-Bold',
}
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 44,
    // lineHeight: 55,
    letterSpacing: 3,
    fontFamily: Font.GAEGU_B,
    marginBottom: 4,
  },
  gaeguTitle: {
    fontSize: 29,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  gaeguSub: {
    fontSize: 16,
  },
  gaeguEmotion: {
    fontSize: 16,
  },

  subheading: {
    fontSize: 16,
    fontWeight: '400',
    color: '#A1AEB7',
    fontFamily: Font.Pretendard,
    // lineHeight: 24,
  },
  subheadingwhite: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    fontFamily: Font.Pretendard,
    // lineHeight: 24,
  },
  pretendardSub: {
    fontSize: 16,
    // lineHeight: 24,
    fontFamily: Font.Pretendard,
  },
  safeAreaContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: Font.GAEGU_M,
  },
  fullWidth: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    position: 'relative',
    flex: 2,
    marginTop: 30,
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'flex-start',
  },
  center: {
    flex: 11,
  },
  footer: {
    flex: hasNotch() ? 3 : 4,
    rowGap: 8,
  },
  fontMedium: {
    fontSize: 16,
    fontWeight: '500',
  },
  Pretendard: {
    fontFamily: Font.Pretendard,
  },
  grapeColorFont: {
    color: '#8C46FF',
  },
  letter: {
    fontSize: 22,
    // lineHeight: 28,
    letterSpacing: 3,
    fontFamily: Font.GAEGU_B,
  },
})
