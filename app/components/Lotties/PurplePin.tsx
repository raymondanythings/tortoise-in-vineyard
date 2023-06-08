import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import purplePin from '../../assets/lotties/purplePin.json'

const PurplePin = () => {
  return (
    <View style={{ flex: 1, height: '65%', alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        style={{ width: '100%', height: '100%' }}
        source={purplePin}
        // speed={0.4}
        autoPlay
      />
    </View>
  )
}

export default PurplePin
