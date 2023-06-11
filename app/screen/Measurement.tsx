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
import useGetHeartRateRange from '../hook/useGetHeartRateRange'
import { screenWidth, screenHeight } from '../constants/screen'

const Measurement = () => {
  const { user } = useGetUser('cache-only')
  const heartRateRange = useGetHeartRateRange()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>달리기 준비 완료!</Text>
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: 'row' }}>
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
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <Text
              style={[
                globalStyle.gaeguEmotion,
                globalStyle.Pretendard,
                { marginRight: 20, color: '#FF77B8' },
              ]}
            >
              목표 심박수
            </Text>
            {heartRateRange ? (
              <Text style={[globalStyle.gaeguEmotion, globalStyle.Pretendard]}>
                {heartRateRange} BPM
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={[globalStyle.center, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={[{ position: 'relative' }]}>
          <Image
            source={Icon.BOX}
            style={{
              position: 'absolute',
              width: screenWidth * 0.8,
              height: screenHeight * 0.4,
              left: -screenWidth * 0.4,
              top: -screenHeight * 0.28,
            }}
            resizeMode='contain'
          />
        </View>
        <View style={{ width: '60%', height: '60%', marginBottom: '10%' }}>
          <Success />
        </View>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
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
            backgroundColor: '#A0A0A0',
          }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'watchcheck',
                  params: {
                    retry: true,
                  },
                },
              ],
            })
          }
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
