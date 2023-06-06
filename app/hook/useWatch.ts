import { useCallback, useEffect, useState } from 'react'
import {
  getIsPaired,
  getIsWatchAppInstalled,
  useReachability,
} from 'react-native-watch-connectivity'

const useWatch = () => {
  const [isConnected, setIsConnected] = useState(false)
  const isReachability = useReachability()
  const checkConnect = useCallback(async () => {
    const connect = await Promise.all([getIsPaired(), getIsWatchAppInstalled()])
    setIsConnected((prev) => connect.every((item) => item))
  }, [])
  useEffect(() => {
    checkConnect()
  }, [])
  return {
    isConnected,
    isReachability,
  }
}

export default useWatch
