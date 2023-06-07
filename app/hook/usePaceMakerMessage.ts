import { useMemo } from 'react'
import {
  RunPaceMakerSubscription,
  RunPaceMakerSubscriptionVariables,
  useRunPaceMakerSubscription,
} from '../../graphql/generated'
import * as Apollo from '@apollo/client'
import { useRecoilValue } from 'recoil'
import { runAtom } from '../store/run'
import { RunPaceMakerDocument } from '../../graphql/generated'
const usePaceMakerMessage = (
  options: Apollo.SubscriptionHookOptions<
    RunPaceMakerSubscription,
    RunPaceMakerSubscriptionVariables
  > = {},
) => {
  const runState = useRecoilValue(runAtom)

  const { data, error, loading } = Apollo.useSubscription(RunPaceMakerDocument, {
    variables: {
      runId: runState.id,
    },
  })
  console.log(runState.id, '<<runState.id')
  console.log(data, '<<<paceMakerMessage')
  console.log(error, '<<<error')

  return data
}

export default usePaceMakerMessage
