import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect } from 'react'
import Text from '../components/Text'

const Check = ({ navigation }: { navigation: any }) => {
  const checkUser = useCallback(async () => {
    navigation.navigate('mainScreen', { screen: 'home' })
  }, [])

  useEffect(() => {
    checkUser()
  }, [])
  return <Text>Loading..</Text>
}

export default Check
