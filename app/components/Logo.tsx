import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from '../constants/Icon'

const Logo = () => {
  return (
    <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <FastImage style={{ width: 230, height: 129 }} source={Icon.LOGO} />
    </View>
  )
}
export default Logo
