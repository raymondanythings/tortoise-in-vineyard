import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { watchEvents } from 'react-native-watch-connectivity'
import { getHealthKit } from '../utils/Healthkit'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import { Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import NextButton from '../components/NextButton'
import globalStyle from '../components/globalStyle'

// 위치 권한 요청
async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always')
    }
  } catch (e) {
    console.log(e)
  }
}
// 위도, 경도를 위한 인터페이스
interface ILocation {
  latitude: number
  longitude: number
}

interface IGeolocation {
  latitude: number
  longitude: number
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
  const [locations, setLocations] = useState<Array<ILocation>>([])
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 37.78825,
    longitude: -122.4324,
  })
  let _watchId: number

  // 트래킹을 위한 watchPosition 메소드로 변경
  useEffect(() => {
    _watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        // console.log('pp', position)
        setLocations([...locations, { latitude, longitude }])
      },
      (error) => {
        console.log(error)
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // 10m 마다 위치 추적
        accuracy: {
          ios: 'bestForNavigation', // ios 전용 세부 정확도(최상)
        },
      },
    )
  }, [locations]) // 위치 변화할때 마다

  useEffect(() => {
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId)
      }
    }
  }, [])

  // 로케이션을 받아올 수 없을 때 뜨는 화면
  if (!locations) {
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
        // provider={PROVIDER_GOOGLE}
        initialRegion={
          locations.length > 0
            ? {
                latitude: locations[0].latitude, // 맨 처음 위치
                longitude: locations[0].longitude, // 맨 처음 위치
                latitudeDelta: 0.0009,
                longitudeDelta: 0.009,
              }
            : undefined
        }
        // showsUserLocation
        userLocationAnnotationTitle='me'
        followsUserLocation
        userLocationCalloutEnabled
        showsCompass={false}
        // showsBuildings={false}
        onRegionChange={(region) => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          })
        }}
        onRegionChangeComplete={(region) => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          })
        }}
      >
        {/* start 마커 위치 */}
        {/*
        <Marker
          coordinate={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
          }}
        /> */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title='this is a marker'
          description='this is a marker example'
        />
        <Polyline
          coordinates={locations}
          strokeColor='#000' // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={6}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '20%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={globalStyle.heading}>1.1km</Text>
          <Text style={globalStyle.subheading}>1.1km</Text>
        </View>
      </MapView>
      <View
        style={{
          position: 'absolute',
          bottom: 50, // distance from the bottom
          right: '15%', // distance from the right
        }}
      >
        <NextButton text='달리기 완료' onPress={() => navigation.push('afteremotion')} />
      </View>
    </SafeAreaView>
  )
}

export default Run
