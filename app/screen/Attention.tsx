import React, { useMemo } from 'react'
import { Image, Pressable, View } from 'react-native'
import Text from '../components/Text'
import { sendMessage } from 'react-native-watch-connectivity'
import { SafeAreaView } from 'react-native-safe-area-context'
import StartButton from '../components/Lotties/StartButton'
import globalStyle from '../common/globalStyle'
import Img from '../constants/Img'
import useGetUser from '../hook/useGetUser'
import useWatch from '../hook/useWatch'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useGetHeartRateRageQuery } from '../../graphql/generated'
import useGetHeartRateRange from '../hook/useGetHeartRateRange'
const Attention = () => {
  const { isReachability } = useWatch()
  const navigation = useNavigation()
  const heartRateRange = useGetHeartRateRange()

  const startRunning = () => {
    if (isReachability) {
      sendMessage({ action: 'startRunning' }, (payload) => {})
    }
    navigation.dispatch(StackActions.replace('run'))
  }
  const { user } = useGetUser('cache-only')
  const targetHeartRate = useMemo(() => {
    const thisYear = new Date().getFullYear()
    const userYear = user?.birthYear || thisYear
    const age = thisYear - userYear
    const maxSubAge = 208 - 0.8 * age
    return `${(maxSubAge * 0.4).toFixed()} ~ ${(maxSubAge * 0.6).toFixed()}`
  }, [user?.birthYear])
  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer]}>
      <View
        style={{
          position: 'relative',
          flex: 4,
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          {`나에게 맞는 속도로
함께 가보자고!`}
        </Text>
      </View>
      <View style={[globalStyle.center]}>
        {user?.minHeartRate && (
          <View
            style={{
              // flexDirection: 'row',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'yellow',
              // width: '100%',
              maxHeight: 90,
            }}
          >
            <View style={{ position: 'absolute' }}>
              <Image source={Img.SENDBOX_BLACK} style={{ height: 90 }} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                width: 260,
              }}
            >
              <Text
                style={[
                  globalStyle.gaeguEmotion,
                  globalStyle.Pretendard,
                  { color: '#A1AEB7', textAlign: 'center', flex: 1 },
                ]}
              >
                평균 심박수
              </Text>
              <Text style={[globalStyle.gaeguEmotion, globalStyle.Pretendard, { flex: 1 }]}>
                {user?.minHeartRate} BPM
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4, width: 260 }}>
              {heartRateRange ? (
                <>
                  <Text
                    style={[
                      globalStyle.gaeguEmotion,
                      globalStyle.Pretendard,
                      { color: '#8C46FF', textAlign: 'center', flex: 1 },
                    ]}
                  >
                    목표 심박수
                  </Text>
                  <Text style={[globalStyle.gaeguEmotion, globalStyle.Pretendard, { flex: 1 }]}>
                    {heartRateRange} BPM
                  </Text>
                </>
              ) : null}
            </View>
          </View>
        )}
        <View
          style={{
            flex: 2,
            marginTop: '20%',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <StartButton
            onPress={() => {
              startRunning()
            }}
          />
          <Text style={{ position: 'absolute', color: '#fff', fontSize: 60 }}>START</Text>
        </View>
      </View>
      <View style={globalStyle.footer}>{/* <StartButton /> */}</View>
    </SafeAreaView>
  )
}

export default Attention
