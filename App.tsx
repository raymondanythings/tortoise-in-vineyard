import React from 'react'
import Router from './router'
import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import ApolloWrapper from './app/layout/ApolloWrapper'
import Watch from './app/components/Watch'

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <ApolloWrapper>
        <Watch>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </Watch>
      </ApolloWrapper>
    </RecoilRoot>
  )
}

export default App
