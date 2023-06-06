import React from 'react'
import { View, Image } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Button from '../components/Button'
import Img from '../constants/Img'
import Icon from '../constants/Icon'
import bigEmotion from '../constants/bigEmotion'
import { Emotion } from '../../graphql/generated'

const Grapes = (route: any) => {
  const navigation = useNavigation()
  const { emotion } = route.params || {}

  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer]}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          {`대단해요! 
포도알을 총 1개 모았어요`}
        </Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          포도알 5개를 더 모으면, 한 송이가 완성돼요
        </Text>
      </View>
      <View style={globalStyle.center}>
        <Image source={Img.GRAPE} />
        <Image
          style={{
            position: 'absolute',
            width: '33%',
            height: '33%',
            top: '13%',
            left: '1%',
            resizeMode: 'contain',
          }}
          source={Icon.GRAPEFORCONFETTI}
        />
        <Image
          source={Icon.EMOTION.PLEASED}
          style={{
            position: 'absolute',
            width: '25%',
            height: '25%',
            top: '50%',
            left: '50%',
            resizeMode: 'contain',
          }}
        />
        <Image
          style={{
            position: 'absolute',
            width: '33%',
            height: '33%',
            top: '15.5%',
            left: '32%',
            resizeMode: 'contain',
          }}
          source={Icon.GRAPEFORCONFETTI}
        />
        <Image
          source={Icon.EMOTION.PLEASED}
          style={{
            position: 'absolute',
            width: '25%',
            height: '25%',
            top: '50%',
            left: '50%',
            resizeMode: 'contain',
          }}
        />
        <Image
          style={{
            position: 'absolute',
            width: '33%',
            height: '33%',
            top: '19%',
            left: '63%',
            resizeMode: 'contain',
          }}
          source={Icon.GRAPEFORCONFETTI}
        />
        <Image
          source={Icon.EMOTION.PLEASED}
          style={{
            position: 'absolute',
            width: '25%',
            height: '25%',
            top: '50%',
            left: '50%',
            resizeMode: 'contain',
          }}
        />
        <Image
          style={{
            position: 'absolute',
            width: '33%',
            height: '33%',
            top: '33%',
            left: '11%',
            resizeMode: 'contain',
          }}
          source={Icon.GRAPEFORCONFETTI}
        />
        <Image
          source={Icon.EMOTION.PLEASED}
          style={{
            position: 'absolute',
            width: '25%',
            height: '25%',
            top: '50%',
            left: '50%',
            resizeMode: 'contain',
          }}
        />
        <Image
          style={{
            position: 'absolute',
            width: '33%',
            height: '33%',
            top: '%',
            left: '11%',
            resizeMode: 'contain',
          }}
          source={Icon.GRAPEFORCONFETTI}
        />
        <Image
          source={Icon.EMOTION.PLEASED}
          style={{
            position: 'absolute',
            width: '25%',
            height: '25%',
            top: '50%',
            left: '50%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
          }}
          onPress={() => navigation.dispatch(StackActions.push('home'))}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            포도밭 확인하기
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Grapes
