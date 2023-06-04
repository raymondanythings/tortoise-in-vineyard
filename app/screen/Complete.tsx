import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import Text from '../components/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Confetti from '../components/Lotties/Confetti'
import { StackActions, useNavigation } from '@react-navigation/native'
import Icon from '../constants/Icon'
import EMOTION from '../constants/bigEmotion'
import bigEmotion from '../constants/bigEmotion'

const Complete = () => {
  const navigation = useNavigation()
  // 3초 뒤에 다른 페이지로 이동
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.dispatch(StackActions.push('home'))
  //   }, 3000)
  // }, [])

  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer]}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>포도알을 획득했어요</Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          오늘 열심히 달렸으니, 내일 또 만나요~
        </Text>
      </View>
      <View style={[{ flex: 20, justifyContent: 'center', alignItems: 'center' }]}>
        <Confetti />
        <Image
          style={{ position: 'absolute', width: 214, height: 214 }}
          source={Icon.GRAPEFORCONFETTI}
        />
        <Image
          source={bigEmotion.PROUD}
          style={{ position: 'absolute', width: 214, height: 214 }}
        />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}></View>
    </SafeAreaView>
  )
}

export default Complete
