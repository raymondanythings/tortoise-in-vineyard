import React from 'react'
import { View, StyleSheet, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import NextButton from '../components/Button'
import Text from '../components/Text'
import Img from '../constants/Img'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Icon from '../constants/Icon'
import GrapeCount from '../components/GrapeCount'

const OnBoard = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.header, {}]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>포도알을 모아보세요</Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          포도알 6개를 모으면, 한 송이가 완성돼요!
        </Text>
        <GrapeCount count={3} />
      </View>
      <View style={globalStyle.center}>
        <Image source={Img.GRAPE} />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}></View>
    </SafeAreaView>
  )
}

export default OnBoard

const styles = StyleSheet.create({
  characterContainer: {
    borderColor: '#C2D1D9',
    backgroundColor: 'yellowgreen',
    width: 263,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
})
