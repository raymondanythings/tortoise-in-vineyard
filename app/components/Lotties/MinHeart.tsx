import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import Img from '../../constants/Img'
import AnimatedLottieView from 'lottie-react-native'
import heartcheck from '../../assets/lotties/min_heartrate.json'
import useWatch from '../../hook/useWatch'
import { getApplicationContext, watchEvents } from 'react-native-watch-connectivity'

const MinHeart = () => {
  const { isConnected } = useWatch()
  const messageListener = async () => {
    isConnected &&
      watchEvents.on<{ heartRate?: number; distance?: number }>('message', (message) => {
        const { heartRate: heart, distance } = message
        if (heart) {
          console.log(heart)
        }
      })

    const context = await getApplicationContext()
    console.log(context, ' ???')
  }

  useEffect(() => {
    messageListener()
  }, [])
  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Image source={Img.HEART} />
      <AnimatedLottieView
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={heartcheck}
        autoPlay
        loop
      />
    </View>
  )
}

export default MinHeart
