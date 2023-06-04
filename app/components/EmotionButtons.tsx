import React from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import Text from './Text'
import Img from '../constants/Img'
import Icon from '../constants/Icon'

const EmotionButtons = () => {
  // 각 버튼의 텍스트와 눌렀을 때의 동작을 정의
  const emotions = [
    { text: '기쁜', onPress: () => console.log('기쁜 눌림') },
    { text: '뿌듯한', onPress: () => console.log('뿌듯한 눌림') },
    { text: '행복한', onPress: () => console.log('행복한 눌림') },
    { text: '신나는', onPress: () => console.log('신나는 눌림') },
    { text: '짜증나는', onPress: () => console.log('짜증나는 눌림') },
    { text: '불안한', onPress: () => console.log('불안한 눌림') },
    { text: '무기력한', onPress: () => console.log('무기력한 눌림') },
    { text: '우울한', onPress: () => console.log('우울한 눌림') },
    { text: '화나는', onPress: () => console.log('화나는 눌림') },
  ]
  return (
    <View style={styles.emotionContainer}>
      {emotions.map((emotion, index) => (
        <View>
          <Pressable
            key={index}
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
            onPress={emotion.onPress}
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
