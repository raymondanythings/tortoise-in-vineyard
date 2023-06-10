import React, { useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle, { Font } from '../common/globalStyle'
import { Image, View } from 'react-native'
import Text from '../components/Text'
import Img from '../constants/Img'
import MinHeart from '../components/Lotties/MinHeart'
import Icon from '../constants/Icon'
import useHearkRateTraking from '../hook/useHearkRateTraking'
import useGetUser from '../hook/useGetUser'
import { StackActions, useNavigation } from '@react-navigation/native'
import useWatch from '../hook/useWatch'
import { useUpdateMinHeartRateMutation } from '../../graphql/generated'
import { sendMessage } from 'react-native-watch-connectivity'
const STD_THRESHOLD = 5
const MinHeartRateCheck = () => {
  const { heartRate, heartRateData } = useHearkRateTraking()
  const { updateQuery } = useGetUser('cache-only')
  const navigation = useNavigation()
  const { isReachability } = useWatch()
  const [updateMinHeart] = useUpdateMinHeartRateMutation({
    onCompleted({ updateMinHeartRate: { minHeartRate } }) {
      updateQuery((prev) => ({
        ...prev,
        me: {
          ...prev.me,
          minHeartRate,
        },
      }))
      sendMessage({ action: 'stopWorkout' }, (payload) => {
        navigation.dispatch(StackActions.replace('measurement'))
      })
    },
  })

  const isHeartRateConverged = useCallback(() => {
    const heartRateFilterdList = heartRateData.filter((n) => n > 0)
    const mean =
      heartRateFilterdList.reduce((acc, cur) => acc + cur, 0) / heartRateFilterdList.length
    const variance =
      heartRateFilterdList.reduce((acc, cur) => acc + Math.pow(cur - mean, 2), 0) /
      heartRateFilterdList.length
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
      variables: { minHeartRate: Math.round(stableHeartRate) },
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
    if (isReachability) {
      getHeart()
    }
  }, [isReachability])

  useEffect(() => {
    determineStableHeartRate()
  }, [heartRateData])

  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer, { backgroundColor: '#FFF0F7' }]}>
      <View style={[globalStyle.header, {}]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center', lineHeight: 44 }]}>
          {`움직이지 말고 기다려주세요`}
        </Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          {`최대 60초가 소요되며,
심박수 측정은 1회만 진행해요`}
        </Text>
      </View>
      <View style={[globalStyle.center, { justifyContent: 'center' }]}>
        <MinHeart heartRate={heartRate || 0} />
      </View>
      <View
        style={[
          {
            width: '70%',
            flex: 5,
          },
        ]}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Image
            source={Icon.BOX_SMALL}
            style={{ position: 'absolute', width: '100%' }}
            resizeMode='contain'
          />
          <View style={{ flexDirection: 'row', zIndex: 1 }}>
            <Text
              style={[
                { fontFamily: Font.Pretendard, fontSize: 32, fontWeight: 'bold' },
                globalStyle.Pretendard,
              ]}
            >
              {heartRate.toFixed()} BPM
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MinHeartRateCheck
