import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { screenHeight, screenWidth } from '../constants/screen'
import appleAuth from '@invertase/react-native-apple-authentication'
import jwtDecode from 'jwt-decode'
import colors from '../constants/colors'
import SplashScreen from 'react-native-splash-screen'

interface AppleJwt {
  aud: string
  auth_time: number
  c_hash: string
  email: string
  email_verified: string
  exp: number
  iat: number
  is_private_email: string
  iss: string
  nonce: string
  nonce_supported: boolean
  sub: string
}

const Home = () => {
  const [token, setToken] = useRecoilState(authState)
  const navigation = useNavigation()
  const isNavigate = useRef(true)
  const [getMe, { data: userData }] = useGetMeLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted({ me }) {
      validateUserAndPush()
    },
    onError(error) {
      console.log('login error : ', error)
    },
  })

  const validateUserAndPush = () => {
    if (isNavigate.current) {
      if (userData?.me) {
        const {
          me: { totalRun, birthYear },
        } = userData
        isNavigate.current = false
        return navigation.dispatch(
          StackActions.replace(totalRun ? 'grapetreehome' : !birthYear ? 'birthday' : 'watchcheck'),
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
    // loginMutaion({
    //   variables: { email: 'qpp123@wsdsd.cdcsc', provider: AccountProvider.Kakao },
    // })
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

  const appleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      )
      if (credentialState === appleAuth.State.AUTHORIZED) {
        let email = appleAuthRequestResponse.email
        if (!email) {
          const decode = jwtDecode(appleAuthRequestResponse.identityToken!) as AppleJwt
          email = decode.email
        }
        loginMutaion({
          variables: { email, provider: AccountProvider.Apple },
        })
      }
    } catch (error: any) {
      console.log(error, ' ????')
      if (error.code === appleAuth.Error.CANCELED) {
        // login canceled
      } else {
        // login error
      }
    }
  }

  const canNavigateHandler = () => {
    isNavigate.current = true
  }

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 3000)
    navigation.addListener('blur', canNavigateHandler)
    return () => {
      navigation.removeListener('blur', canNavigateHandler)
    }
  }, [])

  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.fullWidth, globalStyle.header, { flex: 6 }]}>
        <Image
          source={Img.CLOUD}
          style={{
            position: 'absolute',
            bottom: 90,
            zIndex: -1,
          }}
        />
        <Logo />
        <Text
          style={[
            {
              lineHeight: 30,
              letterSpacing: -2,
              textAlign: 'center',
              fontSize: 24,
              color: '#8C46FF',
              fontWeight: 'bold',
            },
          ]}
        >
          {`거북이와 함께
나만의 속도로 달려봐요!`}
        </Text>
      </View>
      <View
        style={[{ marginVertical: 20, justifyContent: 'center', marginLeft: '10%' }, { flex: 6 }]}
      >
        <Image source={Img.LOGO_MOVING} style={{ width: 250, height: 173, top: -40 }} />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Pressable
          style={{ position: 'absolute', top: '-20%' }}
          onPress={() => {
            navigation.dispatch(
              StackActions.push('modal', {
                uri: 'https://private-ketchup-05c.notion.site/6947dff37f674221a1c70738494f699b',
              }),
            )
          }}
        >
          <Text
            style={{
              fontSize: 14,
              textDecorationLine: 'underline',
              color: colors.TEXT_MAIN_1,

              fontFamily: globalStyle.Pretendard.fontFamily,
            }}
          >
            서비스 약관 읽어보기
          </Text>
        </Pressable>
        {token ? (
          <Button
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#8C46FF',
              columnGap: 8,
            }}
            onPress={validateUserAndPush}
          >
            <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
              시작할게요
            </Text>
          </Button>
        ) : (
          <View style={{ width: '100%', rowGap: 8 }}>
            <Button
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 8,
                backgroundColor: '#FEE500',
              }}
              onPress={kakaoLogin}
            >
              <View style={{ width: 35, alignItems: 'center' }}>
                <Image source={Icon.KAKAO} />
              </View>
              <Text style={[globalStyle.fontMedium, globalStyle.Pretendard]}>카카오로 로그인</Text>
            </Button>
            <Button
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 8,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#000000',
              }}
              onPress={appleLogin}
            >
              <View style={{ width: 35, alignItems: 'center' }}>
                <Image source={Icon.APPLE} />
              </View>
              <Text style={[globalStyle.fontMedium, globalStyle.Pretendard]}>Apple로 로그인</Text>
            </Button>
          </View>
        )}
        {/* <Pressable
          onPress={async () => {
            AsyncStorage.clear()
            setToken('')
          }}
        >
          <Text>초기화</Text>
        </Pressable> */}
      </View>
      <Image
        source={Img.INTERSECT}
        style={{
          position: 'absolute',
          width: screenWidth,
          height: screenHeight * 0.39,
          bottom: 0,
          zIndex: -1,
        }}
      />
    </SafeAreaView>
  )
}

export default Home
