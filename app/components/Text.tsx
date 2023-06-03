import React, { ForwardedRef, MutableRefObject, forwardRef } from 'react'
import { Text as T, TextProps } from 'react-native'
import globalStyle from '../common/globalStyle'

const Text = forwardRef<T, TextProps>(({ children, ...rest }, ref) => {
  return (
    <T {...rest} ref={ref} style={[globalStyle.text, rest.style]}>
      {children}
    </T>
  )
})

export default Text
