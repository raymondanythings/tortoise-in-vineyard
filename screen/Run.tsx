import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Run = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView>
      <Text>
        Run
        <TouchableOpacity onPress={() => navigation.push('afteremotion')}>
          <Text>다음</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  )
}

export default Run
