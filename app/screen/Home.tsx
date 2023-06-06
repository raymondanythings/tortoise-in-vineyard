import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect, useRef } from 'react'
import { Image, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Button from '../components/Button'
import Text from '../components/Text'
import {
  getProfile as getKakaoProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login'
import Icon from '../constants/Icon'
import { AccountProvider, useGetMeLazyQuery, useLoginMutation } from '../../graphql/generated'
import { AUTH_HEADER } from '../constants/constants'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { authState } from '../store/auth'
import Logo from '../components/Logo'
import Img from '../constants/Img'

const Home = () => {
  const [token, setToken] = useRecoilState(authState)
  const navigation = useNavigation()
  const isNavigate = useRef(true)
  const [getMe, { data: userData }] = useGetMeLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted({ me }) {
      validateUserAndPush()
    },
  })

  const validateUserAndPush = () => {
    if (isNavigate.current) {
      if (userData?.me) {
        isNavigate.current = false
        return navigation.dispatch(
          StackActions.push(userData?.me.birthYear ? 'onboard' : 'birthday'),
        )
      } else {
        getMe()
      }
    }
  }
  const [loginMutaion, { error }] = useLoginMutation({
    async onCompleted(data) {
      if (data?.signIn.accessToken) {
        const {
          signIn: { accessToken },
        } = data
        await AsyncStorage.setItem(AUTH_HEADER, accessToken)
        setToken(accessToken)
        validateUserAndPush()
      }
    },
  })
  const kakaoLogin = useCallback(async () => {
    try {
      const token = await loginWithKakaoAccount()
      // const token = await login()
      if (token) {
        const { email } = await getKakaoProfile()
        loginMutaion({
          variables: { email, provider: AccountProvider.Kakao },
        })
      }
    } catch (err) {
      console.error(err, '????')
    }
  }, [])
  const canNavigateHandler = () => {
    isNavigate.current = true
  }

  console.log(Text)
  useEffect(() => {
    navigation.addListener('blur', canNavigateHandler)
    return () => {
      navigation.removeListener('blur', canNavigateHandler)
    }
  }, [])

  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.fullWidth, globalStyle.header, { flex: 6 }]}>
        <Logo />
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          {`남들과 비교하지 않고, 나만의 기준으로 운동해요.
나만의 적정 심박수를 찾아서
AI가 페이스메이킹을 해줄 거예요.`}
        </Text>
      </View>
      <View
        style={[{ marginVertical: 20, justifyContent: 'center', marginLeft: '10%' }, { flex: 6 }]}
      >
        <Image source={Img.LOGO_MOVING} />
      </View>
      {/* <Image source={Img.GRAPE} /> */}
      <View style={[globalStyle.fullWidth, { flex: 2.5 }]}>
        {token ? (
          <Button
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#222222',
              columnGap: 8,
            }}
            onPress={validateUserAndPush}
          >
            <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
              시작하기
            </Text>
          </Button>
        ) : (
          <Button
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FEE500',
              columnGap: 8,
            }}
            onPress={kakaoLogin}
          >
            <Image source={Icon.KAKAO} />
            <Text style={[globalStyle.fontMedium, globalStyle.Pretendard]}>카카오로 시작하기</Text>
          </Button>
        )}

        <Pressable style={{ paddingVertical: 8 }}>
          <Text
            style={[
              globalStyle.fontMedium,
              globalStyle.Pretendard,
              {
                textDecorationLine: 'underline',
                fontWeight: '300',
                color: '#A0A0A0',
              },
            ]}
          >
            서비스 약관 읽어보기
          </Text>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            AsyncStorage.clear()
            setToken('')
          }}
        >
          <Text>초기화</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  )
}

export default Home
