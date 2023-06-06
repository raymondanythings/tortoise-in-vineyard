import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import Img from '../../constants/Img'
import AnimatedLottieView from 'lottie-react-native'
import heartcheck from '../../assets/lotties/min_heartrate.json'
import useWatch from '../../hook/useWatch'
import { sendMessage } from 'react-native-watch-connectivity'
import { useRecoilValue } from 'recoil'
import { watchAtom } from '../../store/watchAtom'
import { useUpdateMinHeartRateMutation } from '../../../graphql/generated'
import useGetUser from '../../hook/useGetUser'
import { useNavigation } from '@react-navigation/native'
const STD_THRESHOLD = 5
const MinHeart = () => {
  const [heartRateData, setHeartRateData] = useState<number[]>([])
  const { updateQuery } = useGetUser('cache-only')
  const navigation = useNavigation()
  const [updateMinHeart] = useUpdateMinHeartRateMutation({
    onCompleted({ updateMinHeartRate: { minHeartRate } }) {
      updateQuery((prev) => ({
        ...prev,
        me: {
          ...prev.me,
          minHeartRate,
        },
      }))
      sendMessage({ action: 'stopWorkout' }, (payload) => console.log(payload?.isSuccess, '<<<'))
    },
  })
  const watchState = useRecoilValue(watchAtom)

  const isHeartRateConverged = useCallback(() => {
    const mean = heartRateData.reduce((acc, cur) => acc + cur, 0) / heartRateData.length
    const variance =
      heartRateData.reduce((acc, cur) => acc + Math.pow(cur - mean, 2), 0) / heartRateData.length
    const std = Math.sqrt(variance)

    return std < STD_THRESHOLD
  }, [heartRateData.length])

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
    updateMinHeart({
      variables: { minHeartRate: stableHeartRate },
    })
  }

  const getHeart = () => {
    try {
      sendMessage({ action: 'startWorkout' }, (payload) => console.log(payload?.isSuccess, '<<<'))
    } catch (err) {
      console.log(err, 'err')
    }
  }
  useEffect(() => {
    getHeart()
  }, [])

  useEffect(() => {
    setHeartRateData((prev) => [...prev, watchState.heartRate])
    console.log(watchState.heartRate, '<<??')
    determineStableHeartRate()
  }, [watchState])
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
