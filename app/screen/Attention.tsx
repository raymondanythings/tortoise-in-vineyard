import React, { useMemo } from 'react'
import { Image, Dimensions, Pressable, View } from 'react-native'
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

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

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
          flex: 2,
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 28,
            fontWeight: 'bold',
            lineHeight: 36,
            position: 'absolute',
          }}
        >
          {`나만의 속도로
달리기 가보자고!`}
        </Text>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={Img.SENDBOX_BLACK} resizeMode='contain' />
        </View>
      </View>
      <View style={[globalStyle.center, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image
          source={Img.ATTENTIONTURTLE}
          style={{ width: screenWidth * 0.7, height: screenHeight * 0.22 }}
        />
      </View>
      <View style={globalStyle.footer}>
        <View
          style={{
            // backgroundColor: 'green',
            // marginTop: '80%',
            width: screenWidth * 0.44,
            height: screenHeight * 0.2,
            bottom: screenHeight * 0.1,
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
          <Text style={{ position: 'absolute', color: '#fff', fontSize: 28 }}>START</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Attention
