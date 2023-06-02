import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect } from 'react'
import Text from '../components/Text'

const Check = ({ navigation }: { navigation: any }) => {
  const checkUser = useCallback(async () => {
    const id = await AsyncStorage.getItem('pacemaker-id')
    console.log(id)
    if (id) {
      navigation.navigate('mainScreen', { screen: 'home' })
    } else {
      navigation.navigate('mainScreen', { screen: 'register' })
    }
  }, [])

  useEffect(() => {
    checkUser()
  }, [])
  return <Text>Loading..</Text>
}

export default Check
