import { atom } from 'recoil'

export const watchAtom = atom({
  key: 'watch',
  default: {
    heartRate: 0,
    isConnected: false,
  },
})
