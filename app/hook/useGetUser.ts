import { WatchQueryFetchPolicy } from '@apollo/client'
import { GetMeQuery, useGetMeQuery } from '../../graphql/generated'
type GetMeOption = Parameters<typeof useGetMeQuery>['0']
type GetMeResult = ReturnType<typeof useGetMeQuery>

interface ReturnValue extends GetMeResult {
  user?: GetMeQuery['me']
}
interface UseGetUser {
  (option: GetMeOption): GetMeResult
  (policy: WatchQueryFetchPolicy): ReturnValue
}
const useGetUser: UseGetUser = (policy) => {
  const isPolicy = typeof policy === 'string'
  const values = useGetMeQuery({
    fetchPolicy: isPolicy ? policy ?? 'network-only' : 'network-only',
    ...(isPolicy ? {} : policy),
  })
  return {
    ...values,
    user: values.data?.me,
  }
}

export default useGetUser
