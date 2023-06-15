import {
  useReachability,
  useInstalled,
  usePaired,
  useApplicationContext,
} from 'react-native-watch-connectivity'

const useWatch = () => {
  const isPaired = usePaired()
  const isInstalled = useInstalled()
  const isReachability = useReachability()

  return {
    isConnected: isInstalled && isPaired,
    isReachability,
  }
}

export default useWatch
