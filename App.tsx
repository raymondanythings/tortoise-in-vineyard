import React, { useCallback, useEffect } from 'react'
import Router from './router'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { BASE_URL } from './app/constants/constants'

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
})

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App
