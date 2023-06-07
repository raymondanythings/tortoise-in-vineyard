import React, { useEffect, useCallback } from 'react'
import Run from './Run'
import usePaceMakerMessage from '../hook/usePaceMakerMessage'
import TrackPlayer from 'react-native-track-player'
const SubscriptionWrapper = () => {
  const { paceMakerMessage } = usePaceMakerMessage()
  console.log(paceMakerMessage, '<<')
  const playCurrentPaceMaker = useCallback(async () => {
    if (paceMakerMessage) {
      await TrackPlayer.reset()
      await TrackPlayer.add([
        {
          url: paceMakerMessage,
        },
      ])
      await TrackPlayer.play()
    }
  }, [paceMakerMessage])
  useEffect(() => {
    playCurrentPaceMaker()
  }, [paceMakerMessage])
  return <Run />
}

export default SubscriptionWrapper
