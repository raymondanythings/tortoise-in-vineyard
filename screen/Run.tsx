import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Pressable, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getIsPaired, getIsWatchAppInstalled, watchEvents } from 'react-native-watch-connectivity'
import { getHealthKit } from '../utils/Healthkit'
import MapView, { Camera, MapMarker, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import NextButton from '../components/NextButton'
import globalStyle, { Font } from '../components/globalStyle'
import Text from '../components/Text'
import CUSTOM_MAP from '../constants/customMap'
import Icon from '../constants/Icon'
import colors from '../constants/colors'
import { generateColor } from '../utils/linearGradient'

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
  const [tracking, setTracking] = useState(false)
  const [heartRate, setHeartRate] = useState(0)
  // Listener when receive message

  const messageListener = async () => {
    const paired = await getIsPaired()
    const installed = await getIsWatchAppInstalled()
    paired &&
      installed &&
      watchEvents.on<{ heartRate?: number; distance?: number }>('message', (message) => {
        const { heartRate: heart, distance } = message
        if (heart) {
          setHeartRate(() => heart)
        }
      })
  }

  useEffect(() => {
    messageListener()
    getHealthKit()
  }, [])

  // 지도 관련 코드
  const mapViewRef = useRef<MapView>(null) // MapView 컴포넌트를 제어하기 위한 ref
  const userMarker = useRef<MapMarker>()

  const watchId = useRef<number>()
  const [locations, setLocations] = useState<Array<ILocation>>([])
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 37.78825,
    longitude: -122.4324,
  })

  useEffect(() => {
    requestPermission().then((result) => {
      if (result === 'granted') {
        if (!tracking) {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              setLocation((prev) => ({ latitude, longitude }))
              setLocations((prevLocations) => [...prevLocations, { latitude, longitude }])
            },
            (error) => {
              console.log(error)
            },
            {
              enableHighAccuracy: true,
            },
          )
        } else {
          watchId.current = Geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              setLocation((prev) => ({ latitude, longitude }))
              setLocations((prevLocations) => [...prevLocations, { latitude, longitude }])
              if (mapViewRef.current) {
                // mapViewRef.current.animateToRegion(
                //   {
                //     latitude,
                //     longitude,
                //     latitudeDelta: 0,
                //     longitudeDelta: 0,
                //   },
                //   1000,
                // )
                const camera: Camera = {
                  center: { latitude, longitude },
                  zoom: 18,
                  heading: 0,
                  pitch: 10,
                }
                mapViewRef.current.animateCamera(camera, { duration: 1000 })
              }
            },
            (error) => {
              console.log(error)
            },
            {
              enableHighAccuracy: true,
              distanceFilter: 10,
              interval: 1,
              fastestInterval: 1,
              accuracy: {
                ios: 'bestForNavigation',
              },
            },
          )
        }
      }
    })
    return () => {
      if (watchId.current) {
        Geolocation.clearWatch(watchId.current)
      }
    }
  }, [tracking])

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
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapViewRef}
        style={{
          flex: 1,
          position: 'relative',
        }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={CUSTOM_MAP}
        initialRegion={
          locations.length > 0
            ? {
                latitude: locations[0].latitude, // 맨 처음 위치
                longitude: locations[0].longitude, // 맨 처음 위치
                latitudeDelta: 0.0005,
                longitudeDelta: 0.0021,
              }
            : undefined
        }
        // showsUserLocation
        // followsUserLocation
        // userLocationCalloutEnabled
        loadingEnabled
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        minZoomLevel={18}
      >
        <Marker.Animated
          ref={userMarker}
          coordinate={{
            latitude: location.latitude - 0.00007,
            longitude: location.longitude + 0.0000001,
          }}
        >
          <View style={styles.radius}>
            <View style={styles.marker}></View>
          </View>
        </Marker.Animated>
        <Polyline
          coordinates={locations}
          strokeColors={
            locations.length >= 2
              ? ['#8F4BFF', ...generateColor('#8F4BFF', '#FF9E31', locations.length - 2), '#FF9E31']
              : []
          }
          strokeWidth={6}
        />
        <View
          style={{
            position: 'absolute',
            top: 60,
            height: 120,
            borderRadius: 20,
            backgroundColor: '#fff',
            overflow: 'hidden',
            width: Dimensions.get('window').width - 60,
            marginHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#333333',
            shadowRadius: 30,
            shadowOpacity: 1,
            shadowOffset: {
              height: -10,
              width: 400,
            },
          }}
        >
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: Font.Pretendard, fontSize: 46, fontWeight: '700' }}>
                {heartRate}
              </Text>
              <Text style={{ fontSize: 30, fontFamily: Font.Pretendard }}> BPM</Text>
            </View>
            <Text>1.1 km</Text>
          </View>
        </View>
      </MapView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          backgroundColor: 'white',
          height: 160,
          justifyContent: 'flex-end',
          bottom: 0,
          paddingBottom: 40,
          paddingHorizontal: 40,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#333333',
          shadowRadius: 3,
          shadowOpacity: 0.1,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        }}
      >
        <Pressable
          onPress={() => setTracking((prev) => !prev)}
          style={{
            backgroundColor: colors.PURPLE,
            width: 90,
            height: 90,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 9999,
            alignSelf: 'center',
            // position: 'absolute',
            top: -20,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Image source={tracking ? Icon.PAUSE : Icon.START} style={{ width: 21, height: 25 }} />
        </Pressable>
        <Pressable
          style={{
            borderRadius: 10,
            backgroundColor: '#222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 54,
          }}
          onPress={() => navigation.push('afteremotion')}
        >
          <Text style={[globalStyle.subheading, { color: 'white' }]}>달리기 완료</Text>
        </Pressable>
      </View>
    </View>
    // </SafeAreaView>
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
