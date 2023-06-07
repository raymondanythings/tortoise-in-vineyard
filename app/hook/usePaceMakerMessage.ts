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
  console.log(runState.id, '<<runState.id')
  const {
    data: { runPaceMaker: paceMakerMessage } = {},
    error,
    loading,
  } = Apollo.useSubscription(RunPaceMakerDocument, {
    variables: {
      runId: runState.id,
    },
  })

  console.log(paceMakerMessage, '<<<paceMakerMessage')
  console.log(error, '<<<error')

  const returnValue = useMemo(() => ({ paceMakerMessage }), [paceMakerMessage])
  return returnValue
}

export default usePaceMakerMessage
