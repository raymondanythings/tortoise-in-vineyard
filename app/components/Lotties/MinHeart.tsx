import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import Img from '../../constants/Img'
import AnimatedLottieView from 'lottie-react-native'
import heartcheck from '../../assets/lotties/min_heartrate.json'
import useWatch from '../../hook/useWatch'
import { sendMessage, useReachability, watchEvents } from 'react-native-watch-connectivity'
const STD_THRESHOLD = 5
const MinHeart = () => {
  const { isConnected } = useWatch()
  const [heartRateData, setHeartRateData] = useState<number[]>([])
  const messageListener = () => {
    isConnected &&
      watchEvents.on<{ heartRate?: number }>('message', (message) => {
        const { heartRate } = message || {}
        if (heartRate) {
          setHeartRateData((prev) => [...prev, heartRate])
        }
      })
  }

  const isHeartRateConverged = useCallback(() => {
    const mean = heartRateData.reduce((acc, cur) => acc + cur, 0) / heartRateData.length
    const variance =
      heartRateData.reduce((acc, cur) => acc + Math.pow(cur - mean, 2), 0) / heartRateData.length
    const std = Math.sqrt(variance)

    return std < STD_THRESHOLD
  }, [heartRateData])

  const determineStableHeartRate = () => {
    if (heartRateData.length < 10) return

    if (isHeartRateConverged()) {
      // 수렴헀다면, 최근 10초간의 평균 심박수를 구해서 저장
      // 마지막으로 수신한 심박수를 그대로 반환해도 무관
      const lastTenSecondsHeartRate = heartRateData.slice(-10)

      const stableHeartRate =
        lastTenSecondsHeartRate.reduce((acc, cur) => acc + cur, 0) / lastTenSecondsHeartRate.length

      onStable(stableHeartRate)
    }
  }

  const onStable = (stableHeartRate: number) => {
    console.log(stableHeartRate, '<<stableHeartRate')
  }

  const getHeart = () => {
    try {
      sendMessage({ test: '123123123123' }, (payload) => console.log(payload?.success, '<<<'))
    } catch (err) {
      console.log(err, 'err')
    }
  }
  useEffect(() => {
    messageListener()
    getHeart()
  }, [])
  useEffect(() => {
    determineStableHeartRate()
  }, [heartRateData])
  return (
    <View
      style={{
        position: 'relative',
      }}
    >
      <Image source={Img.WATCH_HEART} />
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
