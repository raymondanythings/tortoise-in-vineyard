import React, { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackActions } from '@react-navigation/native'
import globalStyle from '../common/globalStyle'
import Button from '../components/Button'
import Text from '../components/Text'
import EmotionButtons from '../components/EmotionButtons'
import { Emotion } from '../constants/bigEmotion'
import { useEndRunMutation } from '../../graphql/generated'
import { useRecoilValue } from 'recoil'
import { runAtom } from '../store/run'

const AfterEmotion = ({ navigation }: { navigation: any }) => {
  const [emotion, setEmotion] = useState<Emotion | null>(null)
  const [endRunMutation] = useEndRunMutation({
    onCompleted(data) {
      const {
        endRun: { numLeft, totalRun },
      } = data
      if (numLeft || totalRun) {
        navigation.dispatch(
          StackActions.push('complete', {
            emotion,
          }),
        )
      }
    },
  })
  const runState = useRecoilValue(runAtom)
  const handleEmotionSelection = (selected: any) => {
    if (selected.value === '') {
      setEmotion(null)
    } else {
      setEmotion(selected)
    }
  }

  return (
    <SafeAreaView
      style={[
        globalStyle.safeAreaContainer,
        { backgroundColor: emotion?.bgColor ? emotion.bgColor : 'white' },
      ]}
    >
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>현재 감정은 어떤가요?</Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          달리기 후, 느낀 감정에 가까운 단어를 선택해주세요
        </Text>
      </View>
      <View style={[globalStyle.center, { flexDirection: 'row' }]}>
        <EmotionButtons onIconPress={handleEmotionSelection} />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
            backgroundColor: emotion ? '#222222' : '#A0A0A0',
          }}
          disabled={!emotion?.value}
          onPress={() => {
            if (emotion?.value) {
              endRunMutation({
                variables: {
                  input: {
                    runMeters: runState.distance,
                    emotionAfter: emotion.value,
                    runId: runState.id,
                  },
                },
              })
            }
          }}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            감정 기록 완료
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default AfterEmotion
