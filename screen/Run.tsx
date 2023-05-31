import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { watchEvents } from 'react-native-watch-connectivity'
const Run = ({ navigation }: { navigation: any }) => {
  const [messageFromWatch, setMessageFromWatch] = useState('Waiting...')
  // Listener when receive message
  const messageListener = () =>
    watchEvents.on('message', (message) => {
      setMessageFromWatch(message.watchMessage as any)
    })
  useEffect(() => {
    messageListener()
  }, [])
  return (
    <SafeAreaView>
      <Text>
        Run
        {messageFromWatch}
        <TouchableOpacity onPress={() => navigation.push('afteremotion')}>
          <Text>다음</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  )
}

export default Run
