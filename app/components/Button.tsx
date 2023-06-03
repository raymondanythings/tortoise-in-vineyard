import React from 'react'
import { Pressable, GestureResponderEvent, View, PressableProps, ViewStyle } from 'react-native'
import Text from './Text'

interface ButtonProps extends PressableProps {
  onPress: (event: GestureResponderEvent) => void
  color?: string
  style?: ViewStyle
}

const Button: React.FunctionComponent<ButtonProps> = ({ color, onPress, children, ...rest }) => {
  const { style } = rest
  return (
    <View style={{ width: '100%' }}>
      <Pressable
        onPress={(event) => onPress && onPress(event)}
        {...rest}
        style={{
          backgroundColor: color ? color : '#4E4E4E',
          borderRadius: 10,
          display: 'flex',
          width: '100%',
          height: 54,
          ...(style ?? {}),
        }}
      >
        {children}
      </Pressable>
    </View>
  )
}

export default Button
