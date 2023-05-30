import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = ({ navigation }: { navigation: any }) => {
  // const getId = async () => {
  //   await AsyncStorage.getItem('')
  // }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text style={styles.heading}>달리는 포도</Text>
        <Text style={styles.subheading}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>
        <View style={styles.characterContainer}>
          <Text style={styles.heading}>메인 캐릭터</Text>
        </View>
        <Pressable style={styles.nextButton} onPress={() => navigation.push('onboard')}>
          <Text style={styles.btnInnerText}>서비스 이용하기</Text>
        </Pressable>
        <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
          <Text>스토리지 지우기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 55,
  },
  characterContainer: {
    borderColor: '#C2D1D9',
    backgroundColor: '#C2D1D9',
    width: 263,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  nextButton: {
    paddingHorizontal: 80,
    paddingVertical: 10,
    backgroundColor: '#4E4E4E',
    borderRadius: 50,
    width: 263,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 9,
  },
  btnInnerText: { fontSize: 12, color: 'white', fontWeight: '400' },
})
