import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import { Image, View } from 'react-native'
import Text from '../components/Text'
import Img from '../constants/Img'
import MinHeart from '../components/Lotties/MinHeart'

const MinHeartRateCheck = () => {
  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer, { backgroundColor: '#FFF8FB' }]}>
      <View style={[globalStyle.header, {}]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center', lineHeight: 44 }]}>
          {`잠시만 움직이지 말고
기다려주세요`}
        </Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          {`최대 60초가 소요되며, 심박수 측정은 1회만 진행해요`}
        </Text>
      </View>
      <View style={globalStyle.center}>
        <MinHeart />
      </View>
    </SafeAreaView>
  )
}

export default MinHeartRateCheck
