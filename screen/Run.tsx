import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getIsPaired, getIsWatchAppInstalled, watchEvents } from 'react-native-watch-connectivity'
import { getHealthKit } from '../utils/Healthkit'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, MapViewProps } from 'react-native-maps'
import { Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import NextButton from '../components/NextButton'
import globalStyle from '../components/globalStyle'
import Text from '../components/Text'

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

  const messageListener = async () => {
    const paired = await getIsPaired()
    const installed = await getIsWatchAppInstalled()
    console.log(paired, 'paired')
    console.log(installed, 'installed')
    watchEvents.on('message', (message) => {
      console.log(message, ' <<<< message from watchos')
      setMessageFromWatch(message.watchMessage as any)
    })
  }

  useEffect(() => {
    messageListener()
    getHealthKit()
  }, [])

  // 구글맵 코드
  const mapViewRef = useRef<MapView | null>(null) // MapView 컴포넌트를 제어하기 위한 ref

  const [locations, setLocations] = useState<Array<ILocation>>([])
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 37.78825,
    longitude: -122.4324,
  })
  let _watchId: number

  useEffect(() => {
    requestPermission().then((result) => {
      if (result === 'granted') {
        _watchId = Geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setLocation({ latitude, longitude })
            setLocations((prevLocations) => [...prevLocations, { latitude, longitude }])
            if (mapViewRef.current) {
              mapViewRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.0021,
              })
            }
          },
          (error) => {
            console.log(error)
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 10,
            accuracy: {
              ios: 'bestForNavigation',
            },
          },
        )
      }
    })

    // 클린업 함수
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId)
      }
    }
  }, []) // 'locations' 의존성 제거

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
                latitudeDelta: 0.005,
                longitudeDelta: 0.0021,
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
        >
          <View style={styles.radius}>
            <View style={styles.marker}></View>
          </View>
        </Marker>
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
const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 226, 49, 0.4)',
    borderColor: 'rgba(255, 226, 49,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
  },
})
