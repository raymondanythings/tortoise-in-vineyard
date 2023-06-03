import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import heartAnimation from '../../assets/lotties/heart.json'

const Heart = () => {
  return (
    <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <LottieView style={{ width: '100%', height: '100%' }} source={heartAnimation} autoPlay loop />
    </View>
  )
}

export default Heart
