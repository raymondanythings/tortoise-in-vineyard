import React, { useCallback, useEffect } from 'react'
import Router from './router'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { BASE_URL } from './app/constants/constants'
import { RecoilRoot } from 'recoil'

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
})

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </RecoilRoot>
    </ApolloProvider>
  )
}

export default App
