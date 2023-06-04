import React from 'react'
import { View } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import EmotionButtons from '../components/EmotionButtons'
import Text from '../components/Text'
import Button from '../components/Button'
import Bedge from '../components/Bedge'
import { useRecoilState } from 'recoil'
import { emotionState } from '../store/emotionState'

const BeforeEmotion = ({ navigation }: { navigation: any }) => {
  const [emotion, setEmotion] = useRecoilState(emotionState)

  return (
    <SafeAreaView
      style={[
        globalStyle.safeAreaContainer,
        { backgroundColor: emotion.bgColor ? emotion.bgColor : '#ffffff' },
      ]}
    >
      <View style={[globalStyle.header]}>
        <Bedge label='감정 기록' />
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          오늘의 감정은 어떤가요?
        </Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          달리기 전, 느낀 감정에 가까운 단어를 선택해주세요
        </Text>
      </View>
      <View style={[globalStyle.center, { flexDirection: 'row' }]}>
        <EmotionButtons onIconPress={(selected) => setEmotion(selected)} />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
            backgroundColor: emotion.value ? '#222222' : '#A0A0A0',
          }}
          disabled={!emotion.value}
          onPress={() => navigation.dispatch(StackActions.push('complete'))}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            감정 기록 완료
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default BeforeEmotion
