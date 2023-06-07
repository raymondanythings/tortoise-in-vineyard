import {
  RunPaceMakerSubscription,
  RunPaceMakerSubscriptionVariables,
  useRunPaceMakerSubscription,
} from '../../graphql/generated'
import * as Apollo from '@apollo/client'
const usePaceMakerMessage = (
  options: Apollo.SubscriptionHookOptions<
    RunPaceMakerSubscription,
    RunPaceMakerSubscriptionVariables
  > = {},
) => {
  const { data: { runPaceMaker: paceMakerMessage } = {} } = useRunPaceMakerSubscription(options)
  return {
    paceMakerMessage,
  }
}

export default usePaceMakerMessage
