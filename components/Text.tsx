import React from 'react'
import { Text as T, TextProps } from 'react-native'
import globalStyle from './globalStyle'

const Text = ({ children, ...rest }: TextProps) => {
  return (
    <T {...rest} style={[rest.style, globalStyle.text]}>
      {children}
    </T>
  )
}

export default Text
