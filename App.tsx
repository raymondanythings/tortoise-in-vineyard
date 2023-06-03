import React, { useCallback, useEffect } from 'react'
import Router from './router'
import { NavigationContainer } from '@react-navigation/native'
// import DeviceInfo from 'react-native-device-info'
// import asyncStorage from '@react-native-async-storage/async-storage'
// import WebView from 'react-native-webview'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { BASE_URL } from './constants/constants'

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

export default App
