import React, { useCallback, useEffect } from 'react'
import Router from './router'
import { NavigationContainer } from '@react-navigation/native'
// import DeviceInfo from 'react-native-device-info'
// import asyncStorage from '@react-native-async-storage/async-storage'
// import WebView from 'react-native-webview'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import uri from './constants/uri'

const client = new ApolloClient({
  uri: uri.BASE_URL,
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result))

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
