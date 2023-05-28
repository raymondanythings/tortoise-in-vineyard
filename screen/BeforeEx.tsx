import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const BeforeEx = () => {
  const route = useNavigation()
  return (
    <SafeAreaView>
      <Text>
        BeforeEx
        <TouchableOpacity onPress={() => route.dispatch(StackActions.replace('run'))}>
          <Text>다음</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  )
}

export default BeforeEx
