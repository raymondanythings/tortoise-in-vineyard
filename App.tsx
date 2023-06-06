import React, { useEffect } from 'react'
import Router from './router'
import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import ApolloWrapper from './app/layout/ApolloWrapper'
import { NativeEventEmitter, NativeModules } from 'react-native'
import healthKit from './utils/Healthkit'

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <ApolloWrapper>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </ApolloWrapper>
    </RecoilRoot>
  )
}

export default App
