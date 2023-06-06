import React, { useEffect } from 'react'
import Router from './router'
import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import ApolloWrapper from './app/layout/ApolloWrapper'
import { NativeEventEmitter, NativeModules } from 'react-native'
import healthKit from './utils/Healthkit'
import Watch from './app/components/Watch'

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <Watch>
        <ApolloWrapper>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </ApolloWrapper>
      </Watch>
    </RecoilRoot>
  )
}

export default App
