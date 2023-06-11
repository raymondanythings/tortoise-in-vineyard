import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from './app/screen/Home'
import OnBoard from './app/screen/OnBoard'
import WatchCheck from './app/screen/WatchCheck'
import BeforeEmotion from './app/screen/BeforeEmotion'
import AfterEmotion from './app/screen/AfterEmotion'
import Check from './app/screen/Check'
import Birthday from './app/screen/Birthday'
import Complete from './app/screen/Complete'
import MinHeartRateCheck from './app/screen/MinHeartRateCheck'
import Measurement from './app/screen/Measurement'
import Attention from './app/screen/Attention'
import SubscriptionWrapper from './app/screen/SubscriptionWrapper'
import WatchAppCheck from './app/screen/WatchAppCheck'
import Grapes from './app/screen/Grapes'
import Letter from './app/screen/Letter'
import NextStory from './app/screen/NextStory'
import GrapeTreeHome from './app/screen/GrapeTreeHome'
import RecordGrape from './app/screen/RecordGrape'
import { Image, Pressable, View } from 'react-native'
import Icon from './app/constants/Icon'
import { hasNotch } from 'react-native-device-info'
import WebView from 'react-native-webview'

const MainStack = createStackNavigator()
const Stack = createStackNavigator()

const Modal = ({ route }: { route: { params: { uri: string } } }) => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri:
            route.params?.uri ||
            'https://private-ketchup-05c.notion.site/6947dff37f674221a1c70738494f699b',
        }}
      />
    </View>
  )
}

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
      screenOptions={({ navigation, route }) => ({
        header(props) {
          return props.back ? (
            <Pressable
              onPress={navigation.goBack}
              style={{ position: 'absolute', left: 30, top: hasNotch() ? 60 : 30 }}
            >
              <Image source={Icon.ARROW} />
            </Pressable>
          ) : null
        },
      })}
    >
      <MainStack.Group>
        <MainStack.Screen
          options={
            {
              // gestureEnabled: false,
              // animationEnabled: false,
            }
          }
          name='home'
          component={Home}
        />
        <MainStack.Screen name='birthday' component={Birthday} />
        <MainStack.Screen name='onboard' component={OnBoard} />
        <MainStack.Screen name='watchcheck' component={WatchCheck} />
        <MainStack.Screen name='minheartratecheck' component={MinHeartRateCheck} />
        <MainStack.Screen name='measurement' component={Measurement} />
        <MainStack.Screen name='beforeemotion' component={BeforeEmotion} />
        <MainStack.Screen name='attention' component={Attention} />
        <MainStack.Screen name='run' component={SubscriptionWrapper} />
        <MainStack.Screen name='afteremotion' component={AfterEmotion} />
        <MainStack.Screen name='complete' component={Complete} />
        <MainStack.Screen name='watchappcheck' component={WatchAppCheck} />
        <MainStack.Screen name='grapes' component={Grapes} />
        <MainStack.Screen name='letter' component={Letter} />
        <MainStack.Screen name='nextstory' component={NextStory} />
        <MainStack.Screen name='grapetreehome' component={GrapeTreeHome} />
        <MainStack.Screen name='recordgrape' component={RecordGrape} />
      </MainStack.Group>
      <MainStack.Group>
        <MainStack.Screen
          name='modal'
          component={Modal}
          options={{ presentation: 'modal', headerShown: false }}
        />
      </MainStack.Group>
    </MainStack.Navigator>
  )
}

export default Router
