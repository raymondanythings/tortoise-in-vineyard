import React from 'react'
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
const Attention = () => {
  const { isReachability } = useWatch()
  const navigation = useNavigation()
  const startRunning = () => {
    if (isReachability) {
      sendMessage({ action: 'startRunning' }, (payload) => {})
    }
    navigation.dispatch(StackActions.replace('run'))
  }
  const { user } = useGetUser('cache-only')
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
              backgroundColor: 'yellow',
              // width: '100%',
            }}
          >
            <View style={{ position: 'absolute' }}>
              <Image source={Img.SENDBOX_BLACK} style={{ height: 90 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={[
                  globalStyle.gaeguEmotion,
                  globalStyle.Pretendard,
                  { color: '#A1AEB7', marginRight: 20 },
                ]}
              >
                평균 심박수
              </Text>
              <Text style={[globalStyle.gaeguEmotion, globalStyle.Pretendard]}>
                {user?.minHeartRate} BPM
              </Text>
            </View>
          </View>
        )}
        <Pressable
          style={{
            flex: 2,
            marginTop: '20%',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            startRunning()
          }}
        >
          <StartButton />
          <Text style={{ position: 'absolute', color: '#fff', fontSize: 60 }}>START</Text>
        </Pressable>
      </View>
      <View style={globalStyle.footer}>{/* <StartButton /> */}</View>
    </SafeAreaView>
  )
}

export default Attention
