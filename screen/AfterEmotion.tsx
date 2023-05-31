import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../components/globalStyle'
import NextButton from '../components/NextButton'
import EmotionButtons from '../components/EmotionButtons'

const AfterEmotion = ({ navigation }: { navigation: any }) => {
  return (
    <View style={globalStyle.container}>
      <SafeAreaView style={globalStyle.safeAreaContainer}>
        <Text style={globalStyle.heading}>뛰고 나니 어떤가요?</Text>
        <Text style={globalStyle.subheading}>달리기 후, 지금의 기분을 알려주세요</Text>
        <EmotionButtons />
        <NextButton text='오늘의 기분을 저장할게요' onPress={() => navigation.push('run')} />
      </SafeAreaView>
    </View>
  )
}

export default AfterEmotion
