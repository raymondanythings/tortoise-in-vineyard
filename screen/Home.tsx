import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../components/globalStyle'
import NextButton from '../components/NextButton'
import Text from '../components/Text'

const Home = ({ navigation }: { navigation: any }) => {
  return (
    <View style={globalStyle.container}>
      <SafeAreaView style={globalStyle.safeAreaContainer}>
        <Text style={globalStyle.heading}>달리는 포도</Text>
        <Text style={globalStyle.subheading}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>
        <View style={styles.characterContainer}>
          <Text style={globalStyle.heading}>메인 캐릭터</Text>
        </View>
        <NextButton text='서비스 이용하기' onPress={() => navigation.push('onboard')} />
        <Pressable onPress={async () => await AsyncStorage.clear()}>
          <Text>스토리지 지우기</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  characterContainer: {
    borderColor: '#C2D1D9',
    backgroundColor: '#C2D1D9',
    width: 263,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
})
