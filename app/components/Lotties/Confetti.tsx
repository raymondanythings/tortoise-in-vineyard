import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import confetti from '../../assets/lotties/confetti.json'

const Confetti = () => {
  return (
    <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <LottieView style={{ width: '100%', height: '100%' }} source={confetti} autoPlay loop />
    </View>
  )
}

export default Confetti