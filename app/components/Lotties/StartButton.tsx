import React from 'react'
import { Pressable, PressableProps, View } from 'react-native'
import LottieView from 'lottie-react-native'
import Startbutton from '../../assets/lotties/start_button.json'

const StartButton = (props: PressableProps) => {
  return (
    <Pressable {...props}>
      <LottieView
        style={{ width: '100%', height: '100%' }}
        source={Startbutton}
        speed={0.4}
        autoPlay
      />
    </Pressable>
  )
}

export default StartButton
