import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, Image, Dimensions } from 'react-native'
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

const WatchAppCheck = () => {
  const { user } = useGetUser('cache-only')
  const navigation = useNavigation()
  const setRunState = useSetRecoilState(runAtom)
  const { isConnected, isReachability } = useWatch()
  useEffect(() => {
    if (isReachability) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'minheartratecheck',
          },
        ],
      })
    }
  }, [isReachability])
  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.header, {}]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          애플워치에서 어플을 켜주세요
        </Text>
      </View>
      <View style={globalStyle.center}>
        {/* <Image source={Img.WATCH_APP} style={{ width: Dimensions.get('window').width }} /> */}
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
          }}
          disabled={isConnected && isReachability}
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

export default WatchAppCheck
