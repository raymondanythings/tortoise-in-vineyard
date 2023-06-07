import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from, split } from '@apollo/client'
import { AUTH_HEADER, BASE_URL } from '../constants/constants'
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://sesacthon-server.lucas-gong.dev/graphql',
    shouldRetry: () => true,
    lazy: false,
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

const authLink = setContext((operation, { headers }) => {
  return {
    headers: {
      [AUTH_HEADER]:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyMWRlNzUzLTQ1ZWUtNGNhOS04NmZlLTQ5ZjQzMWYyOTUwMiIsImlhdCI6MTY4NjA1Mjg0MX0.HgI9L8S-XMWeMQkw6E48axvjECOCdDTgbNEb7GRI564',
    },
  }
})
export const client = new ApolloClient({
  link: from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache(),
})
