import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../components/globalStyle'
import NextButton from '../components/NextButton'

const Emotion = ({ navigation }: { navigation: any }) => {
  // 각 버튼의 텍스트와 눌렀을 때의 동작을 정의
  const emotions = [
    { text: '버튼 1', onPress: () => console.log('버튼 1 눌림') },
    { text: '버튼 2', onPress: () => console.log('버튼 2 눌림') },
    { text: '버튼 3', onPress: () => console.log('버튼 3 눌림') },
    // 나머지 버튼들도 정의
    // ...
  ]
  return (
    <View style={globalStyle.container}>
      <SafeAreaView style={globalStyle.safeAreaContainer}>
        <Text style={globalStyle.heading}>오늘 하루 어땠나요?</Text>
        <Text style={globalStyle.subheading}>달리기 전, 오늘의 기분을 알려주세요</Text>
        <View style={styles.emotionContainer}>
          {emotions.map((emotion, index) => (
            <TouchableOpacity key={index} style={styles.emotionButton} onPress={emotion.onPress}>
              <Text>{emotion.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <NextButton text='서비스 이용하기' onPress={() => navigation.push('run')} />
      </SafeAreaView>
    </View>
  )
}

export default Emotion
const styles = StyleSheet.create({
  emotionContainer: {
    borderColor: '#C2D1D9',
    backgroundColor: '#ccd495b9',
    width: 263,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    flexDirection: 'row', // 요소들을 가로 방향으로 배치
    flexWrap: 'wrap', // 요소들이 넘칠 경우 자동으로 다음 줄로 이동
  },
  emotionButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
})
