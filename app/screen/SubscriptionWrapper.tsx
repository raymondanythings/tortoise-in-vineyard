import React, { useEffect, useCallback } from 'react'
import Run from './Run'
import usePaceMakerMessage from '../hook/usePaceMakerMessage'
import TrackPlayer from 'react-native-track-player'
const SubscriptionWrapper = () => {
  const { runPaceMaker } = usePaceMakerMessage() || {}
  const playCurrentPaceMaker = useCallback(async () => {
    if (runPaceMaker) {
      console.log(runPaceMaker, '<<<')
      await TrackPlayer.reset()
      await TrackPlayer.add([
        {
          url: runPaceMaker,
        },
      ])
      await TrackPlayer.play()
    }
  }, [runPaceMaker])
  useEffect(() => {
    playCurrentPaceMaker()
  }, [runPaceMaker])
  return <Run />
}

export default SubscriptionWrapper
