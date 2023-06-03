import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Register from './screen/Register'
import Home from './screen/Home'
import OnBoard from './screen/OnBoard'
import BeforeEx from './screen/BeforeEx'
import WatchCheck from './screen/WatchCheck'
import BeforeEmotion from './screen/BeforeEmotion'
import Run from './screen/Run'
import AfterEmotion from './screen/AfterEmotion'
import Check from './screen/Check'
import Apollo from './screen/Apollo'

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
      initialRouteName='register'
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name='register' component={Register} />
      <MainStack.Screen
        options={{
          gestureEnabled: false,
          // animationEnabled: false,
        }}
        name='home'
        component={Home}
      />
      <MainStack.Screen name='apollo' component={Apollo} />
      <MainStack.Screen name='onboard' component={OnBoard} />
      <MainStack.Screen name='beforeex' component={BeforeEx} />
      <MainStack.Screen name='watchcheck' component={WatchCheck} />
      <MainStack.Screen name='beforeemotion' component={BeforeEmotion} />
      <MainStack.Screen
        name='run'
        // options={{
        //   gestureEnabled: false,
        // }}
        component={Run}
      />
      <MainStack.Screen name='afteremotion' component={AfterEmotion} />
    </MainStack.Navigator>
  )
}

export default Router
