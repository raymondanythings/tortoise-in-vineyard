import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import pinkDots from '../../assets/lotties/pinkDots.json'

const PinkDots = () => {
  return (
    <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        style={{ width: '100%', height: '100%' }}
        source={pinkDots}
        speed={0.4}
        autoPlay
      />
    </View>
  )
}

export default PinkDots
