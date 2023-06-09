import React from 'react'
import { Image, View } from 'react-native'
import Img from '../../constants/Img'
import AnimatedLottieView from 'lottie-react-native'
import heartcheck from '../../assets/lotties/min_heartrate.json'

import Text from '../Text'
import globalStyle from '../../common/globalStyle'

const MinHeart = ({ heartRate }: { heartRate: number }) => {
  return (
    <View
      style={{
        position: 'relative',
      }}
    >
      <Image source={Img.WATCH_HEART} />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          top: '-18%',
        }}
      >
        <Text
          style={[
            globalStyle.pretendardSub,
            {
              color: '#fff',
            },
          ]}
        >
          심박수
        </Text>
      </View>
      <AnimatedLottieView
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0%',
        }}
        source={heartcheck}
        autoPlay
        loop
      />
    </View>
  )
}

export default MinHeart
