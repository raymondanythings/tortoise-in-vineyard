import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from, split } from '@apollo/client'
import React, { PropsWithChildren, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '../store/auth'
import { setContext } from '@apollo/client/link/context'
import { AUTH_HEADER, BASE_URL } from '../constants/constants'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const token = useRecoilValue(authState)
  console.log(token)
  const wsLink = new WebSocketLink(
    new SubscriptionClient('wss://sesacthon-server.lucas-gong.dev/graphql', {
      reconnect: true,
    }),
  )

  // Log any GraphQL errors or network error that occurred
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })
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
      link: from([errorLink, authLink, splitLink]),
      cache: new InMemoryCache(),
    })
  }, [token])
  return <ApolloProvider client={clinet}>{children}</ApolloProvider>
}

export default ApolloWrapper
