import { emotions, Emotion } from '../app/constants/bigEmotion'

export const formatDate = (isoDateString: Date) => {
  const date = new Date(isoDateString)
  const year = date.getFullYear().toString().slice(2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}. ${month}. ${day}`
}

export const formatDistance = (distanceInMeters: number): string => {
  if (distanceInMeters >= 1000) {
    return `${(distanceInMeters / 1000).toFixed(2)}KM`
  }
  return `${distanceInMeters}M`
}

// 모달에 넣을 감정 찾기
export const findEmotionDetails = (emotionValue: string): Emotion => {
  return emotions.find((emotion) => emotion.value === emotionValue) || emotions[0]
}
