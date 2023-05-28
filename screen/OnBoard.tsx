import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const OnBoard = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView>
      <Text>
        OnBoard
        <TouchableOpacity onPress={() => navigation.push('beforeex')}>
          <Text>다음</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  )
}

export default OnBoard
