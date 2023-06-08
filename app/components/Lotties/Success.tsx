import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import checkPink from '../../assets/lotties/checkPink.json'

const Failure = () => {
  return (
    <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        style={{ width: '100%', height: '100%' }}
        source={checkPink}
        autoPlay
        loop={false}
      />
    </View>
  )
}

export default Failure
