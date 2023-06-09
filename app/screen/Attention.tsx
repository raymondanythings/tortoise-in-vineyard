import React, { useMemo } from 'react'
import { Image, Dimensions, StyleSheet, View } from 'react-native'
import Text from '../components/Text'
import { sendMessage } from 'react-native-watch-connectivity'
import { SafeAreaView } from 'react-native-safe-area-context'
import StartButton from '../components/Lotties/StartButton'
import globalStyle from '../common/globalStyle'
import Img from '../constants/Img'
import useWatch from '../hook/useWatch'
import { StackActions, useNavigation } from '@react-navigation/native'
import Icon from '../constants/Icon'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Attention = () => {
  const { isReachability } = useWatch()
  const navigation = useNavigation()

  const startRunning = () => {
    if (isReachability) {
      sendMessage({ action: 'startRunning' }, (payload) => {})
    }
    navigation.dispatch(StackActions.replace('run'))
  }

  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center', marginTop: 80 }]}>
          {`나만의 속도로
달리기 가보자고!`}
        </Text>
      </View>
      <View style={[globalStyle.center, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={[{ position: 'relative' }]}>
          <Image source={Icon.BOX} style={styles.boxStyle} resizeMode='contain' />
        </View>
        <Image source={Img.ATTENTIONTURTLE} style={styles.attention} />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <View style={styles.startBtn}>
          <StartButton
            onPress={() => {
              startRunning()
            }}
          />
          <Text style={{ position: 'absolute', color: '#fff', fontSize: 28 }}>START</Text>
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
    left: -screenWidth * 0.4,
    top: -screenHeight * 0.35,
  },
  attention: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.22,
    marginBottom: screenHeight * 0.1,
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
