import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../components/globalStyle'
import NextButton from '../components/Button'
import EmotionButtons from '../components/EmotionButtons'
import Text from '../components/Text'

const Emotion = ({ navigation }: { navigation: any }) => {
  return (
    <View style={globalStyle.container}>
      <SafeAreaView style={globalStyle.safeAreaContainer}>
        <Text style={globalStyle.heading}>오늘 하루 어땠나요?</Text>
        <Text style={globalStyle.subheading}>달리기 전, 오늘의 기분을 알려주세요</Text>
        <EmotionButtons />
        <NextButton text='오늘의 기분을 저장할게요' onPress={() => navigation.push('run')} />
      </SafeAreaView>
    </View>
  )
}

export default Emotion
