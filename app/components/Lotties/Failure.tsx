import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import failure from '../../assets/lotties/failure.json'

const Failure = () => {
  return (
    <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <LottieView style={{ width: '100%', height: '100%' }} source={failure} autoPlay loop />
    </View>
  )
}

export default Failure
