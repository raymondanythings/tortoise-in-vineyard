import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Pressable, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getIsPaired, getIsWatchAppInstalled, watchEvents } from 'react-native-watch-connectivity'
import { getHealthKit } from '../utils/Healthkit'
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import NextButton from '../components/NextButton'
import globalStyle from '../components/globalStyle'
import Text from '../components/Text'
import CUSTOM_MAP from '../constants/customMap'
import Icon from '../constants/Icon'
import colors from '../constants/colors'

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
  const [buttonText, setButtonText] = useState('START')

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

  // 지도 관련 코드
  const mapViewRef = useRef<MapView | null>(null) // MapView 컴포넌트를 제어하기 위한 ref

  const userMarker = useRef<MapMarker>()
  const [locations, setLocations] = useState<Array<ILocation>>([])
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 37.78825,
    longitude: -122.4324,
  })

  useEffect(() => {
    let _watchId: number | null = null

    if (tracking) {
      requestPermission().then((result) => {
        if (result === 'granted') {
          _watchId = Geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              userMarker.current?.animateMarkerToCoordinate(
                {
                  latitude,
                  longitude,
                },
                300,
              )
              setLocation({ latitude, longitude })
              setLocations((prevLocations) => [...prevLocations, { latitude, longitude }])
              if (mapViewRef.current) {
                mapViewRef.current.animateToRegion(
                  {
                    latitude,
                    longitude,
                    latitudeDelta: 0.0005,
                    longitudeDelta: 0.00021,
                  },
                  1000,
                )
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
    }

    // 클린업 함수
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId)
      }
    }
  }, [tracking])

  // start 누르기 전 초기 사용자 위치를 위한 함수
  useEffect(() => {
    if (!tracking) {
      requestPermission().then((result) => {
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              setLocation({ latitude, longitude })
              setLocations((prevLocations) => [...prevLocations, { latitude, longitude }])
            },
            (error) => {
              console.log(error)
            },
            {
              enableHighAccuracy: true,
            },
          )
        }
      })
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
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <MapView
        style={{
          flex: 1,
          // position: 'absolute',
          // top: 0,
          // left: 0,
          // height: Dimensions.get('window').height,
          // width: Dimensions.get('window').width,
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
        showsUserLocation
        followsUserLocation
        userLocationCalloutEnabled
        loadingEnabled
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        minZoomLevel={18}
        // onRegionChange={(region) => {
        //   setLocation({
        //     latitude: region.latitude,
        //     longitude: region.longitude,
        //   })
        // }}
        // onRegionChangeComplete={(region) => {
        //   setLocation({
        //     latitude: region.latitude,
        //     longitude: region.longitude,
        //   })
        // }}
      >
        {/* start 마커 위치 */}
        {/*
        <Marker
          coordinate={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
          }}
        /> */}
        {/* <Marker.Animated
          ref={userMarker}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        >
          <View style={styles.radius}>
            <View style={styles.marker}></View>
          </View>
        </Marker.Animated> */}
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
        {/* <View
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
          <Pressable
            style={{
              position: 'absolute',
              top: 0,
              backgroundColor: 'greenyellow',
              borderRadius: 30,
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setTracking(!tracking)
              setButtonText(buttonText === 'START' ? 'PAUSE' : 'START')
            }}
          >
            <Text>{buttonText}</Text>
          </Pressable>
        </View> */}
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
        <View
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
          <Image source={Icon.PAUSE} style={{ width: 21, height: 25 }} />
        </View>
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
