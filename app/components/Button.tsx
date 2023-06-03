import React from 'react'
import { Pressable, GestureResponderEvent, View, PressableProps, ViewStyle } from 'react-native'
import Text from './Text'
import colors from '../constants/colors'

interface ButtonProps extends PressableProps {
  onPress?: (event: GestureResponderEvent) => void
  color?: string
  style?: ViewStyle
}

const Button: React.FunctionComponent<ButtonProps> = ({ color, onPress, children, ...rest }) => {
  const { style, disabled } = rest
  const backgroundColor = disabled ? colors.TEXT_MAIN : '#222222'
  return (
    <View style={{ width: '100%' }}>
      <Pressable
        onPress={(event) => onPress && onPress(event)}
        {...rest}
        style={{
          borderRadius: 10,
          display: 'flex',
          width: '100%',
          height: 54,
          backgroundColor,
          ...(style ?? {}),
        }}
      >
        {children}
      </Pressable>
    </View>
  )
}

export default Button
