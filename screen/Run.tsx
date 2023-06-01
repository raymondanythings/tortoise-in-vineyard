import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { watchEvents } from 'react-native-watch-connectivity'
import { getHealthKit } from '../utils/Healthkit'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always')
    }
  } catch (e) {
    console.log(e)
  }
}

const Run = ({ navigation }: { navigation: any }) => {
  const [messageFromWatch, setMessageFromWatch] = useState('Waiting...')
  // Listener when receive message

  const messageListener = () =>
    watchEvents.on('message', (message) => {
      setMessageFromWatch(message.watchMessage as any)
    })
  useEffect(() => {
    messageListener()
    getHealthKit()
  }, [])

  // 구글맵 코드
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | undefined>() // 현재 위치로 초기 설정을 위한 상태값

  // 사용자의 현재 위치 받아오기
  useEffect(() => {
    requestPermission().then((result) => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (pos: any) => {
            setLocation(pos.coords)
          },
          (error) => {
            console.log(error)
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        )
      }
    })
  }, [])

  // 로케이션을 받아올 수 없을 때 뜨는 화면
  if (!location) {
    return (
      <SafeAreaView>
        <Text>위치를 불러오는 중입니다...</Text>
      </SafeAreaView>
    )
  }
  // 로케이션 허용 후 뜨는 화면
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      />
      {/* <Text style={{ backgroundColor: 'black', color: 'white' }}>{messageFromWatch}</Text> */}
      <Pressable
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'greenyellow',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.push('afteremotion')}
      >
        <Text>달리기 완료</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Run
