import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client'
import React, { PropsWithChildren, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '../store/auth'
import { setContext } from '@apollo/client/link/context'
import { AUTH_HEADER, BASE_URL } from '../constants/constants'
const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const token = useRecoilValue(authState)
  const clinet = useMemo(() => {
    const authLink = setContext((operation, { headers }) => {
      return {
        headers: {
          [AUTH_HEADER]: token,
        },
      }
    })
    const httpLink = new HttpLink({
      uri: BASE_URL,
    })
    return new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
    })
  }, [token])
  return <ApolloProvider client={clinet}>{children}</ApolloProvider>
}

export default ApolloWrapper
