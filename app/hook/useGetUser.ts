import { WatchQueryFetchPolicy } from '@apollo/client'
import { useGetMeQuery } from '../../graphql/generated'

const useGetUser = (policy?: WatchQueryFetchPolicy) => {
  const values = useGetMeQuery({
    fetchPolicy: policy ?? 'network-only',
  })
  return {
    ...values,
    user: values.data?.me,
  }
}

export default useGetUser
