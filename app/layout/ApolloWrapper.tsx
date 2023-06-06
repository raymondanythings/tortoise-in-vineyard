import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from, split } from '@apollo/client'
import React, { PropsWithChildren, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '../store/auth'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { AUTH_HEADER, BASE_URL } from '../constants/constants'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const token = useRecoilValue(authState)
  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'wss://sesacthon-server.lucas-gong.dev/graphql',
    }),
  )
  const httpLink = new HttpLink({
    uri: BASE_URL,
  })
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink,
  )

  const clinet = useMemo(() => {
    const authLink = setContext((operation, { headers }) => {
      return {
        headers: {
          [AUTH_HEADER]: token,
        },
      }
    })

    return new ApolloClient({
      link: from([authLink, splitLink]),
      cache: new InMemoryCache(),
    })
  }, [token])
  return <ApolloProvider client={clinet}>{children}</ApolloProvider>
}

export default ApolloWrapper
