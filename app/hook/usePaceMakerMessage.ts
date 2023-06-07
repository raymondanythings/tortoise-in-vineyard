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
  // console.log(runState.id, '<<runState.id')
  const { data, error, loading } = Apollo.useSubscription(RunPaceMakerDocument, {
    variables: {
      runId: runState.id,
    },
    shouldResubscribe: true,
    fetchPolicy: 'network-only',
  })

  return data
}

export default usePaceMakerMessage
