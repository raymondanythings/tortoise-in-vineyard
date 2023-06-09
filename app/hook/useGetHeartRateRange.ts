import { useGetHeartRateRageQuery } from '../../graphql/generated'

const useGetHeartRateRange = () => {
  const { data } = useGetHeartRateRageQuery()

  return data?.getHeartRateRange.join(' ~ ') || []
}

export default useGetHeartRateRange
