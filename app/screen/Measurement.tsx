import React from 'react'
import globalStyle from '../common/globalStyle'
import { View, Image } from 'react-native'
import Text from '../components/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import Success from '../components/Lotties/Success'
import Button from '../components/Button'
import { StackActions, useNavigation } from '@react-navigation/native'
import useGetUser from '../hook/useGetUser'
import Icon from '../constants/Icon'

const Measurement = () => {
  const { user } = useGetUser('cache-only')
  const navigation = useNavigation()

  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>측정 완료!</Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          {`실시간으로 심박수를 계산해서
더 오래 달리도록 옆에서 도와줄게요!`}
        </Text>
      </View>
      <View style={globalStyle.center}>
        <View style={{ width: '60%', height: '60%', marginBottom: '10%' }}>
          <Success />
        </View>
        <View
          style={[
            {
              alignItems: 'center',
              height: '30%',
              position: 'relative',
            },
          ]}
        >
          <Image
            source={Icon.BOX}
            style={{ position: 'absolute', width: '100%', height: '100%', top: '-30%' }}
            resizeMode='contain'
          />
          <View style={{ flexDirection: 'row', zIndex: 1 }}>
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
          <View style={{ flexDirection: 'row', zIndex: 1 }}>
            <Text
              style={[
                globalStyle.gaeguEmotion,
                globalStyle.Pretendard,
                globalStyle.grapeColorFont,
                { marginRight: 20 },
              ]}
            >
              목표 심박수
            </Text>
            <Text style={[globalStyle.gaeguEmotion, globalStyle.Pretendard]}>111 BPM</Text>
          </View> */}
        </View>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
            backgroundColor: '#A0A0A0',
          }}
          onPress={() => navigation.dispatch(StackActions.push('beforeemotion'))}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            확인했어요
          </Text>
        </Button>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
          }}
          onPress={() => navigation.dispatch(StackActions.pop())}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            다시 측정할게요
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Measurement
