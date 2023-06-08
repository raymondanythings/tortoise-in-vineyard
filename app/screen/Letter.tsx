import React, { useState, useEffect } from 'react'
import { Animated, Dimensions, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Img from '../constants/Img'
import Text from '../components/Text'
import Button from '../components/Button'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Letter = () => {
  const [animation, setAnimation] = useState(new Animated.Value(1))
  const [isFolded, setIsFolded] = useState(true)

  const fadeTransition = () => {
    Animated.timing(animation, {
      toValue: isFolded ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const onImagePress = () => {
    setIsFolded(!isFolded)
  }

  useEffect(() => {
    fadeTransition()
  }, [isFolded])

  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <Animated.Text
        style={[
          {
            opacity: animation,
            position: 'absolute',
            zIndex: 1,
            top: screenHeight * 0.3,
          },
          globalStyle.letter,
          globalStyle.grapeColorFont,
        ]}
      >
        사부작 사부작
      </Animated.Text>

      <Pressable
        onPress={onImagePress}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Animated.Image
            source={Img.FOLD}
            style={{
              width: screenWidth * 0.9,
              height: screenHeight * 0.9,
              resizeMode: 'contain',
              opacity: animation,
              position: 'absolute',
            }}
          />
          <Animated.Image
            source={Img.UNFOLD}
            style={{
              width: screenWidth * 0.9,
              height: screenHeight * 0.9,
              resizeMode: 'contain',
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default Letter
