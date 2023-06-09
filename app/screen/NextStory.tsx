import React, { useState, useEffect } from 'react'
import { Animated, Dimensions, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackActions, useNavigation } from '@react-navigation/native'
import globalStyle from '../common/globalStyle'
import Img from '../constants/Img'
import Text from '../components/Text'
import Button from '../components/Button'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const NextStory = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.fullWidth, globalStyle.header, { flex: 6 }]}></View>
      <View style={[{ justifyContent: 'center' }, { flex: 20 }]}>
        <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Image
              source={Img.NEXTSTORY}
              style={{
                width: screenWidth * 0.8,
                height: screenHeight * 0.8,
                resizeMode: 'contain',
                // backgroundColor: 'blue',
                position: 'absolute',
                top: '-30%',
              }}
            />
          </View>
        </Pressable>
      </View>
      <View style={[globalStyle.fullWidth, { flex: 5 }]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8C46FF',
            columnGap: 8,
          }}
          onPress={() => navigation.dispatch(StackActions.push('home'))}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            이해했어요
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default NextStory
