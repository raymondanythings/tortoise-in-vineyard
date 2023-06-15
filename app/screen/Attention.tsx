import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Text from '../components/Text'
import { sendMessage } from 'react-native-watch-connectivity'
import { SafeAreaView } from 'react-native-safe-area-context'
import StartButton from '../components/Lotties/StartButton'
import globalStyle from '../common/globalStyle'
import Img from '../constants/Img'
import useWatch from '../hook/useWatch'
import { StackActions, useNavigation } from '@react-navigation/native'
import Icon from '../constants/Icon'
import { screenWidth, screenHeight } from '../constants/screen'
import { useRecoilState } from 'recoil'
import { emotionState } from '../store/emotionState'
import { runAtom } from '../store/run'
import { useStartRunMutation } from '../../graphql/generated'

const loadingTextList = [
  `갈매기로부터 
몸 숨기는중..`,
  `잠시 물 마시고
목 축이는 중...`,
  `주변 환경
살피는 중...`,
  `발에 묻은
모래 터는 중...`,
  `거북이 등껍질
정비 중...`,
  `거북이가
같이 달릴 준비 중...`,
]

const Attention = () => {
  const { isReachability } = useWatch()
  const navigation = useNavigation()
  const [emotion, setEmotion] = useRecoilState(emotionState)
  const [runState, setRunState] = useRecoilState(runAtom)
  const [startRun, { loading }] = useStartRunMutation({
    onCompleted(data) {
      if (data.startRun) {
        const {
          startRun: { id },
        } = data
        setRunState((prev) => ({
          ...prev,
          id,
          isRunning: true,
        }))
        // 뮤테이션 성공시 run 화면으로 이동
        if (isReachability) {
          sendMessage({ action: 'startRunning' }, (payload) => {})
        }
        navigation.dispatch(StackActions.replace('run'))
      } else {
        console.log('뮤테이션 실패!!!')
      }
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleButtonClick = () => {
    if (emotion.value !== '') {
      startRun({
        variables: {
          input: {
            type: runState.type,
            emotionBefore: emotion.value,
          },
        },
      })
    }
  }
  return (
    <SafeAreaView
      style={{
        ...globalStyle.safeAreaContainer,
        backgroundColor: loading ? 'yellow' : globalStyle.safeAreaContainer.backgroundColor,
      }}
    >
      <View style={[globalStyle.header]}>
        <View style={[{ position: 'relative', justifyContent: 'center', alignItems: 'center' }]}>
          <Image source={Icon.BOX} style={styles.boxStyle} resizeMode='contain' />
          <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
            {`나만의 속도로
달리기 가보자고!`}
          </Text>
        </View>
      </View>
      <View style={[globalStyle.center, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image source={Img.ATTENTIONTURTLE} style={{ transform: [{ scale: 0.7 }] }} />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <View style={styles.startBtn}>
          <StartButton onPress={handleButtonClick} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Attention

const styles = StyleSheet.create({
  boxStyle: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,
    // left: -screenWidth * 0.4,
    // top: -screenHeight * 0.35,
  },
  startBtn: {
    width: screenWidth * 0.44,
    height: screenHeight * 0.2,
    bottom: screenHeight * 0.1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
