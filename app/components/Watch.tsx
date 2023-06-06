import React, { PropsWithChildren, useEffect } from 'react'
import { useReachability, watchEvents } from 'react-native-watch-connectivity'
import { useRecoilState } from 'recoil'
import { watchAtom } from '../store/watchAtom'
import useWatch from '../hook/useWatch'

const Watch = ({ children }: PropsWithChildren) => {
  const { isConnected, isReachability } = useWatch()
  const [_, setWatchState] = useRecoilState(watchAtom)
  const messageListener = () => {
    isConnected &&
      watchEvents.on<{ heartRate?: number; isConnected?: boolean }>('message', (message) => {
        const { heartRate, isConnected: watchC } = message || {}
        console.log(heartRate, '<<<<<<')
        if (heartRate) {
          setWatchState((prev) => ({
            ...prev,
            heartRate: heartRate,
            isConnected,
          }))
        }
      })
  }

  useEffect(() => {
    messageListener()
  }, [isConnected, isReachability])
  return <>{children}</>
}

export default Watch
