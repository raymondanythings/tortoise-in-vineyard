import { atom } from 'recoil'
import { Emotion } from '../components/EmotionButtons'

export const emotionState = atom<Emotion>({
  key: 'emotionState',
  default: { bgColor: '', color: '', text: '', value: '' },
})
