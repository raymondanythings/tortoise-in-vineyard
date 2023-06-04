import React from 'react'
import { View } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import NextButton from '../components/Button'
import EmotionButtons from '../components/EmotionButtons'
import Text from '../components/Text'
import Button from '../components/Button'
import Bedge from '../components/Bedge'

const Emotion = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.header]}>
        <Bedge label='감정 기록' />
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          오늘의 감정은 어떤가요?
        </Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          달리기 전, 느낀 감정에 가까운 단어를 선택해주세요
        </Text>
      </View>
      <View style={globalStyle.center}>
        <EmotionButtons />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#222222',
            columnGap: 8,
          }}
          onPress={() => navigation.dispatch(StackActions.push('run'))}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            감정 기록 완료
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Emotion
