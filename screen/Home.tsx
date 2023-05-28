import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = ({ navigation }: { navigation: any }) => {
  // const getId = async () => {
  //   await AsyncStorage.getItem('')
  // }
  return (
    <SafeAreaView>
      <Text>
        Home
        <TouchableOpacity onPress={() => navigation.push('onboard')}>
          <Text>다음</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
          <Text>스토리지 지우기</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  )
}

export default Home
