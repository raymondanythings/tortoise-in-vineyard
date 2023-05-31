import React from 'react'
import { Text, Pressable, GestureResponderEvent } from 'react-native'

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
        paddingHorizontal: 80,
        paddingVertical: 10,
        backgroundColor: props.color ? '#EBC043' : '#4E4E4E',
        borderRadius: 50,
        width: 263,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 20,
        marginBottom: 9,
        height: 54,
      }}
    >
      <Text style={{ fontSize: 12, color: 'white', fontWeight: '400' }}>{props.text}</Text>
    </Pressable>
  )
}

export default NextButton
