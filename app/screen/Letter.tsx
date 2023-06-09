import React, { useState, useEffect, useRef } from 'react'
import { Animated, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackActions, useNavigation } from '@react-navigation/native'
import globalStyle from '../common/globalStyle'
import Img from '../constants/Img'
import Text from '../components/Text'
import Button from '../components/Button'
import { screenWidth, screenHeight } from '../constants/screen'

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
      navigation.dispatch(StackActions.replace('home'))
    }
  }

  useEffect(() => {
    fadeTransition()
  }, [isFolded])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFolded(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])
  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer, { backgroundColor: '#FEF9AE' }]}>
      <View style={[globalStyle.fullWidth, globalStyle.header, { flex: 6 }]}>
        <Animated.Text
          style={[
            {
              opacity: animation,
              position: 'absolute',
              bottom: '-90%',
            },
            globalStyle.letter,
            globalStyle.grapeColorFont,
          ]}
        >
          사부작 사부작
        </Animated.Text>
      </View>
      <View style={[{ justifyContent: 'center' }, { flex: 20 }]}>
        <Pressable
          onPress={onImagePress}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Image
              source={Img.FOLD}
              style={{
                width: screenWidth * 0.9,
                height: screenHeight * 0.3,
                resizeMode: 'contain',
                opacity: animation,
                position: 'absolute',
              }}
            />
            <Animated.Image
              source={Img.UNFOLD}
              style={{
                width: screenWidth * 1,
                height: screenHeight * 0.7,
                resizeMode: 'contain',
                position: 'absolute',
                top: '-30%',
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              }}
            />
          </View>
        </Pressable>
      </View>
      <View style={[globalStyle.fullWidth, { flex: 5 }]}>
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
