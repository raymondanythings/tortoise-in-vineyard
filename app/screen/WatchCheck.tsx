import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Img from '../constants/Img'
import Button from '../components/Button'
import useWatch from '../hook/useWatch'
import useGetUser from '../hook/useGetUser'
import { useSetRecoilState } from 'recoil'
import { runAtom } from '../store/run'
import { RunType } from '../../graphql/generated'
import { screenWidth, screenHeight } from '../constants/screen'

const WatchCheck = ({ route }) => {
  const { user } = useGetUser('cache-only')
  const navigation = useNavigation()
  const setRunState = useSetRecoilState(runAtom)
  const { isConnected, isReachability } = useWatch()
  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          애플워치 착용하셨나요?
        </Text>
      </View>
      <View style={[globalStyle.center, { justifyContent: 'center' }]}>
        <Image source={Img.WATCH_PREV} style={{ width: screenWidth }} />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
          }}
          disabled={!isConnected}
          onPress={() => {
            setRunState((prev) => ({
              ...prev,
              type: RunType.HeartRate,
            }))
            if (!route?.params?.retry && user?.minHeartRate) {
              navigation.dispatch(StackActions.push('beforeemotion'))
            } else {
              if (isReachability) {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'minheartratecheck',
                    },
                  ],
                })
              } else {
                navigation.dispatch(StackActions.push('watchappcheck'))
              }
            }
          }}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            착용했어요
          </Text>
        </Button>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
          }}
          disabled={isConnected}
          onPress={() => {
            setRunState((prev) => ({
              ...prev,
              type: RunType.Distance,
            }))
            navigation.dispatch(StackActions.push('beforeemotion'))
          }}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            거리로 측정할게요
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default WatchCheck
