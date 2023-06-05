import React, { useEffect, useState } from 'react'
import { View, Image, Animated } from 'react-native'
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
  const [animation, setAnimation] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      tension: 20,
      friction: 2,
      useNativeDriver: true,
    }).start()
  }, [])

  const bounceAnimation = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -150, 0],
  })

  // 3초 뒤에 다른 페이지로 이동
  // 다음 페이지가 현재 없어서 home으로 가게 해둠
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.push('home'))
    }, 3000)
  }, [])

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
        <Animated.View
          style={{
            position: 'absolute',
            backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ translateY: bounceAnimation }],
          }}
        >
          <Image
            style={{ position: 'absolute', width: 214, height: 214 }}
            source={Icon.GRAPEFORCONFETTI}
          />
          <Image
            source={bigEmotion.PROUD}
            style={{ position: 'absolute', width: 214, height: 214 }}
          />
        </Animated.View>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}></View>
    </SafeAreaView>
  )
}

export default Complete
