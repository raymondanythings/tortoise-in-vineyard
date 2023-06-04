import { atom } from 'recoil'

export const emotionState = atom({
  key: 'emotionState',
  default: { bgcolor: '#FFFFFF', emotion: '' },
})
