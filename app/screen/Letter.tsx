import React, { useState, useEffect, useRef } from 'react'
import { Animated, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackActions, useNavigation } from '@react-navigation/native'
import globalStyle from '../common/globalStyle'
import Img from '../constants/Img'
import Text from '../components/Text'
import Button from '../components/Button'
import { screenWidth, screenHeight } from '../constants/screen'
import SplashScreen from 'react-native-splash-screen'

const Letter = () => {
  const animation = useRef(new Animated.Value(1)).current
  const [isFolded, setIsFolded] = useState(true)
  const navigation = useNavigation()
  const fadeTransition = () => {
    Animated.timing(animation, {
      toValue: isFolded ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const onImagePress = () => {
    if (isFolded) {
      setIsFolded(false)
    } else {
      navigation.dispatch(StackActions.replace('nextstory'))
    }
  }

  useEffect(() => {
    fadeTransition()
  }, [isFolded])

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        SplashScreen.hide()
      }, 3000)
    }).then(() => {
      return setTimeout(() => {
        setIsFolded(false)
      }, 5000)
    })
  }, [])
  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer, { backgroundColor: '#FEF9AE' }]}>
      <View
        style={[
          {
            flex: globalStyle.center.flex + globalStyle.header.flex,
            marginTop: 40,
            justifyContent: 'center',
          },
        ]}
      >
        <Pressable
          onPress={onImagePress}
          style={{ flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ position: 'absolute', alignItems: 'center' }}>
            <Animated.Text
              style={[
                {
                  opacity: animation,
                },
                globalStyle.letter,
                globalStyle.grapeColorFont,
              ]}
            >
              사부작 사부작
            </Animated.Text>
            <Animated.Image
              source={Img.FOLD}
              style={{
                // width: screenWidth * 0.9,
                height: screenWidth * 0.6,
                resizeMode: 'contain',
                opacity: animation,
              }}
            />
          </View>
          <Animated.Image
            source={Img.UNFOLD}
            style={{
              // width: screenWidth * 1,
              resizeMode: 'contain',
              height: screenHeight * 0.6,
              position: 'absolute',
              // top: '-30%',
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          />
        </Pressable>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        {!isFolded && (
          <Button
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#8C46FF',
              columnGap: 8,
            }}
            onPress={() => navigation.dispatch(StackActions.push('nextstory'))}
          >
            <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
              네, 궁금해요
            </Text>
          </Button>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Letter
