import React from 'react'
import { Pressable, GestureResponderEvent } from 'react-native'
import Text from './Text'

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void
  text: string
  color?: string
}

const NextButton: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        backgroundColor: props.color ? props.color : '#4E4E4E',
        borderRadius: 50,
        width: 263,
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
      }}
    >
      <Text style={{ fontSize: 12, color: 'white', fontWeight: '400' }}>{props.text}</Text>
    </Pressable>
  )
}

export default NextButton
