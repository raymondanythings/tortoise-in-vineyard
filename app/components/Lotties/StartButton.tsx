import React from 'react'
import Text from '../Text'
import { Pressable, PressableProps, View } from 'react-native'
import LottieView from 'lottie-react-native'
import Startbutton from '../../assets/lotties/start_button.json'

const StartButton = (props: PressableProps) => {
  return (
    <Pressable {...props}>
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LottieView
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          source={Startbutton}
          speed={1}
          autoPlay
        />
        <Text style={{ color: '#fff', fontSize: 28, zIndex: 1 }}>START</Text>
      </View>
    </Pressable>
  )
}

export default StartButton
