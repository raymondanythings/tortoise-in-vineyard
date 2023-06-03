import React from 'react'
import { View } from 'react-native'
import colors from '../constants/colors'
import Text from './Text'
import globalStyle from '../common/globalStyle'

interface GrapeBedgeProps {
  type?: 'whole' | 'single'
}

const GrapeBedge = ({ type = 'whole' }: GrapeBedgeProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: '-12%',
        backgroundColor: colors.TEXT_MAIN_2,
        borderRadius: 999,
        height: 24,
        aspectRatio: '3/1',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={[{ color: '#fff' }, globalStyle.gaeguSub]}>
        {type === 'single' ? '포도알' : '포도송이'}
      </Text>
    </View>
  )
}

export default GrapeBedge
