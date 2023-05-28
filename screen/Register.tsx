import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { SafeAreaView } from 'react-native-safe-area-context'

const Register = () => {
  const navigation = useNavigation()
  const registUser = useCallback(async () => {
    const id = await DeviceInfo.getUniqueId()
    await AsyncStorage.setItem('pacemaker-id', id)
    navigation.dispatch(StackActions.push('home'))
  }, [])

  return (
    <SafeAreaView>
      <Text>
        Register
        <TouchableOpacity onPress={async () => registUser()}>
          <Text>다음</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  )
}

export default Register
