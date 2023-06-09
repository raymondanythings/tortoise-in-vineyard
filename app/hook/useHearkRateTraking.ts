import { useRecoilValue } from 'recoil'
import { watchAtom } from '../store/watchAtom'
import { useEffect, useState } from 'react'

const useHearkRateTraking = (intervalTime = 1000) => {
  const watchState = useRecoilValue(watchAtom)
  const [heartRateData, setHeartRateData] = useState<number[]>([])
  const updateHeartRate = () => {
    setHeartRateData((prev) => [...prev, watchState.heartRate])
  }
  useEffect(() => {
    const id = setInterval(() => {
      updateHeartRate()
    }, intervalTime)
    return () => {
      clearInterval(id)
    }
  })
  return { heartRateData, heartRate: watchState.heartRate }
}

export default useHearkRateTraking
