import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import purpleDots from '../../assets/lotties/purpleDots.json'

const PurpleDots = () => {
  return (
    <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        style={{ width: '100%', height: '100%' }}
        source={purpleDots}
        speed={0.4}
        autoPlay
      />
    </View>
  )
}

export default PurpleDots
