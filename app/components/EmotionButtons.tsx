import React from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import Text from './Text'
import Img from '../constants/Img'
import Icon from '../constants/Icon'
import { useRecoilState } from 'recoil'
import { emotionState } from '../store/emotionState'

const EmotionButtons = () => {
  const [emotion, setEmotion] = useRecoilState(emotionState)

  // 각 버튼의 텍스트와 눌렀을 때의 동작을 정의
  const emotions = [
    { text: '기쁜', bgcolor: '#FFFBE0' },
    { text: '뿌듯한', bgcolor: '#FFF5EA' },
    { text: '행복한', bgcolor: '#FDF6F5' },
    { text: '신나는', bgcolor: '#F6F3F9' },
    { text: '짜증나는', bgcolor: '#F5F7F8' },
    { text: '불안한', bgcolor: ' #FAF1EC' },
    { text: '무기력한', bgcolor: '#F3F8F5' },
    { text: '우울한', bgcolor: '#EFF8FA' },
    { text: '화나는', bgcolor: '#FFEAE3' },
  ]

  // 버튼을 누르면 해당되는 배경색으로, 동일한 버튼을 다시 누르면 배경색이 흰색으로
  const handlePress = (emotionText: string, bgcolor: string) => {
    if (emotion.emotion === emotionText) {
      setEmotion({ bgcolor: '#FFFFFF', emotion: '' })
      console.log('똑같은 거 누름')
    } else {
      setEmotion({ bgcolor, emotion: emotionText })
      console.log(`감정: ${emotionText}, ${bgcolor}`)
    }
  }

  return (
    <View style={styles.emotionContainer}>
      {emotions.map((emotion, index) => (
        <View key={index}>
          <Pressable
            style={[
              styles.emotionButton,
              (index === 1 || 4 || 7) && { marginBottom: 8.5 },
              index === 0 && { backgroundColor: '#FFE231' },
              index === 1 && { backgroundColor: '#FCBC72' },
              index === 2 && { backgroundColor: '#F3C4BE' },
              index === 3 && { backgroundColor: '#C2B1D5', marginTop: 15.5 },
              index === 4 && { backgroundColor: '#BCCACD', marginTop: 15.5 },
              index === 5 && { backgroundColor: '#DDA17D', marginTop: 15.5 },
              index === 6 && { backgroundColor: '#AFD1B9', marginTop: 15.5 },
              index === 7 && { backgroundColor: '#92CEDE', marginTop: 15.5 },
              index === 8 && { backgroundColor: '#FD7247', marginTop: 15.5 },
            ]}
            onPress={() => handlePress(emotion.text, emotion.bgcolor)}
          >
            {index === 0 && <Image source={Icon.EMOTION.PLEASED} />}
            {index === 1 && <Image source={Icon.EMOTION.PROUD} />}
            {index === 2 && <Image source={Icon.EMOTION.HAPPY} />}
            {index === 3 && <Image source={Icon.EMOTION.EXITED} />}
            {index === 4 && <Image source={Icon.EMOTION.IRRITATED} />}
            {index === 5 && <Image source={Icon.EMOTION.UNSTABLE} />}
            {index === 6 && <Image source={Icon.EMOTION.LETHARGIC} />}
            {index === 7 && <Image source={Icon.EMOTION.GLOOMY} />}
            {index === 8 && <Image source={Icon.EMOTION.ANGRY} />}
          </Pressable>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Text>{emotion.text}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default EmotionButtons

const styles = StyleSheet.create({
  emotionContainer: {
    // backgroundColor: '#ccd495b9',
    // width: 279,
    // height: 359.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row', // 요소들을 가로 방향으로 배치
    flexWrap: 'wrap', // 요소들이 넘칠 경우 자동으로 다음 줄로 이동
  },
  emotionButton: {
    width: 81,
    height: 81,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
