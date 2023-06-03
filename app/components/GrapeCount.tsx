import React, { FunctionComponent } from 'react'
import { Image, View } from 'react-native'
import Icon from '../constants/Icon'
import Text from './Text'
import { Font } from '../common/globalStyle'
import colors from '../constants/colors'

interface GrapeCountProps {
  count: number
}
const TOTAL_COUNT = 6
const GrapeCount: FunctionComponent<GrapeCountProps> = ({ count }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 12,
        columnGap: 10,
        position: 'relative',
        alignItems: 'center',
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Image key={'fill' + index} source={Icon.GRAPECIRCLE} />
      ))}
      {Array.from({ length: TOTAL_COUNT - count }, (v, i) => i + TOTAL_COUNT - count + 1).map(
        (c) => (
          <View
            key={c}
            style={{
              width: 30,
              height: 30,
              backgroundColor: 'rgba(160, 160, 160,0.15)',
              borderRadius: 9999,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 24, color: colors.TEXT_MAIN }}>{c}</Text>
          </View>
        ),
      )}

      <Text
        style={{
          position: 'absolute',
          right: '-13%',
          fontFamily: Font.RF,
          fontSize: 18,
          lineHeight: 24,
          color: colors.TEXT_MAIN,
          letterSpacing: -2,
        }}
      >
        {count} / 6
      </Text>
    </View>
  )
}

export default GrapeCount
