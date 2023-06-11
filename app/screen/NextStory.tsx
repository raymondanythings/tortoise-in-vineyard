import React from 'react'
import { Image, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackActions, useNavigation } from '@react-navigation/native'
import globalStyle from '../common/globalStyle'
import Img from '../constants/Img'
import Text from '../components/Text'
import Button from '../components/Button'
import { screenWidth, screenHeight } from '../constants/screen'

const NextStory = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer, { backgroundColor: '#FFF0F7' }]}>
      <View style={[globalStyle.fullWidth, globalStyle.header]}></View>
      <View style={[{ justifyContent: 'center' }, globalStyle.center]}>
        <Pressable style={{ flex: 1, justifyContent: 'center' }}>
          <Image
            source={Img.NEXTSTORY}
            style={{
              width: screenWidth * 0.9,
              resizeMode: 'contain',
            }}
          />
        </Pressable>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8C46FF',
            columnGap: 8,
          }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'home',
                },
              ],
            })
          }
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
