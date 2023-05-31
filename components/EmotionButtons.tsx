import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

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
        <Pressable
          key={index}
          style={[
            styles.emotionButton,
            (index === 1 || 4 || 7) && { marginHorizontal: 10, marginBottom: 15 },
          ]}
          onPress={emotion.onPress}
        >
          <Text>{emotion.text}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export default EmotionButtons

const styles = StyleSheet.create({
  emotionContainer: {
    borderColor: '#C2D1D9',
    backgroundColor: '#ccd495b9',
    width: 305,
    height: 291,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
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
