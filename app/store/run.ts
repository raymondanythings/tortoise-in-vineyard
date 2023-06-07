import { atom } from 'recoil'
import { RunType } from '../../graphql/generated'

interface RunAtom {
  isRunning: boolean
  id: string
  type: RunType
  distance: number
}

export const runAtom = atom<RunAtom>({
  key: 'runState',
  default: {
    isRunning: false,
    id: '',
    type: RunType.Distance,
    distance: 0,
  },
})
