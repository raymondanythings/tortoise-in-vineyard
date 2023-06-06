import React from 'react'
import { View } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import EmotionButtons from '../components/EmotionButtons'
import Text from '../components/Text'
import Button from '../components/Button'
import { useRecoilState } from 'recoil'
import { emotionState } from '../store/emotionState'
import { useStartRunMutation } from '../../graphql/generated'
import { useRecoilValue } from 'recoil'
import { Emotion, RunType } from '../../graphql/generated'
import useGetUser from '../hook/useGetUser'

const BeforeEmotion = ({ navigation }: { navigation: any }) => {
  const [emotion, setEmotion] = useRecoilState(emotionState)

  // const [startRun] = useStartRunMutation()
  const [startRun] = useStartRunMutation({
    onCompleted(data) {
      if (data.startRun) {
        // 뮤테이션 성공시 run 화면으로 이동
        navigation.dispatch(StackActions.push('run'))
      } else {
        console.log('뮤테이션 실패!!!')
      }
    },
    onError: (error) => {
      console.log(error)
    },
  })
  // useStartRunMutation 훅을 사용해서 뮤테이션을 실행하는 핸들러....
  const handleButtonClick = () => {
    if (emotion.value !== '') {
      startRun({
        variables: {
          input: {
            type: RunType.Distance,
            emotionBefore: emotion.value,
          },
        },
      })
    }
  }

  return (
    <SafeAreaView
      style={[
        globalStyle.safeAreaContainer,
        { backgroundColor: emotion.bgColor ? emotion.bgColor : '#ffffff' },
      ]}
    >
      <View style={[globalStyle.header]}>
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
          onPress={handleButtonClick}
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
