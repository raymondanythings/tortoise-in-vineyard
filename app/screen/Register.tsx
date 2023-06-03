import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from '../components/Text'
import {
  getProfile as getKakaoProfile,
  login,
  logout as l,
  unlink,
} from '@react-native-seoul/kakao-login'

const Register = () => {
  const navigation = useNavigation()
  const registUser = useCallback(async () => {
    await login()
    const token = await getKakaoProfile()
    console.log(token, '<<<')
  }, [])

  const logout = async () => {
    await unlink()
    await l()
  }

  return (
    <SafeAreaView>
      <Text>
        Register
        <TouchableOpacity onPress={async () => registUser()}>
          <Text>다음</Text>
        </TouchableOpacity>
        <Pressable onPress={async () => await logout()}>
          <Text>로그아웃</Text>
        </Pressable>
      </Text>
    </SafeAreaView>
  )
}

export default Register
