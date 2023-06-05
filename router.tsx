import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import Home from './app/screen/Home'
import OnBoard from './app/screen/OnBoard'
import WatchCheck from './app/screen/WatchCheck'
import BeforeEmotion from './app/screen/BeforeEmotion'
import Run from './app/screen/Run'
import AfterEmotion from './app/screen/AfterEmotion'
import Check from './app/screen/Check'
import Birthday from './app/screen/Birthday'
import Complete from './app/screen/Complete'
import MinHeartRateCheck from './app/screen/MinHeartRateCheck'
import Measurement from './app/screen/Measurement'

const MainStack = createStackNavigator()
const Stack = createStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName='check'
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name='check' component={Check} />
      <Stack.Screen name='mainScreen' component={MainScreen} />
    </Stack.Navigator>
  )
}

const MainScreen = () => {
  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen
        options={{
          gestureEnabled: false,
          // animationEnabled: false,
        }}
        name='home'
        component={Home}
      />
      <MainStack.Screen name='birthday' component={Birthday} />
      <MainStack.Screen name='onboard' component={OnBoard} />
      <MainStack.Screen name='watchcheck' component={WatchCheck} />
      <MainStack.Screen name='minheartratecheck' component={MinHeartRateCheck} />
      <MainStack.Screen name='measurement' component={Measurement} />
      <MainStack.Screen name='beforeemotion' component={BeforeEmotion} />
      <MainStack.Screen
        name='run'
        // options={{
        //   gestureEnabled: false,
        // }}
        component={Run}
      />
      <MainStack.Screen name='afteremotion' component={AfterEmotion} />
      <MainStack.Screen name='complete' component={Complete} />
    </MainStack.Navigator>
  )
}

export default Router
