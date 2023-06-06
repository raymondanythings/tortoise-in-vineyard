import { atom } from 'recoil'
import { Emotion } from '../constants/bigEmotion'

export const emotionState = atom<Emotion>({
  key: 'emotionState',
  default: { bgColor: '', color: '', text: '', value: '' },
})
