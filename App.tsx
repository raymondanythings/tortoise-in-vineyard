import React from 'react'
import Router from './router'
import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import ApolloWrapper from './app/layout/ApolloWrapper'
import Watch from './app/components/Watch'
import CodePush, { CodePushOptions } from 'react-native-code-push'

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

const options: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
}
export default CodePush(options)(App)
