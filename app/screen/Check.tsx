import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect } from 'react'
import Text from '../components/Text'
import { AUTH_HEADER } from '../constants/constants'
import { useSetRecoilState } from 'recoil'
import { authState } from '../store/auth'

const Check = ({ navigation }: { navigation: any }) => {
  const setAuth = useSetRecoilState(authState)
  const checkUser = useCallback(async () => {
    const token = await AsyncStorage.getItem(AUTH_HEADER)
    if (token) {
      setAuth(token)
    }
    navigation.navigate('mainScreen', { screen: 'home' })
  }, [])

  useEffect(() => {
    checkUser()
  }, [])
  return <Text>Loading..</Text>
}

export default Check
