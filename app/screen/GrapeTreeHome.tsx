import React, { useMemo } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Button from '../components/Button'
import GrapeCount from '../components/GrapeCount'
import useGetUser from '../hook/useGetUser'
import Img from '../constants/Img'
import GrapeTree from '../components/GrapeTree'
import { screenWidth, screenHeight } from '../constants/screen'
import colors from '../constants/colors'
import { hasNotch } from 'react-native-device-info'

const GrapeTreeHome = () => {
  const navigation = useNavigation()
  const { user } = useGetUser('cache-only')
  const grapeCircleCount = useMemo(() => user?.totalRun ?? 0 % 6, [user?.totalRun])
  const totalRun = useMemo(() => user?.totalRun || 0, [user?.totalRun])
  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer]}>
      <View style={[globalStyle.header]}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
            {`포도알을 총 ${totalRun}개 모았어요!`}
          </Text>
          <Text
            style={[
              globalStyle.pretendardSub,
              { color: colors.TEXT_MAIN_1, marginVertical: hasNotch() ? 10 : 4 },
            ]}
          >
            모아둔 포도송이를 클릭해보세요
          </Text>
          <GrapeCount count={grapeCircleCount} />
        </View>
      </View>
      <View style={[globalStyle.center, { justifyContent: 'center' }]}>
        <View style={{ transform: [{ scale: hasNotch() ? 1 : 0.8 }] }}>
          {user?.grapesOnTree ? (
            <GrapeTree
              onPress={(grape, index) =>
                navigation.dispatch(StackActions.push('recordgrape', { grape, index }))
              }
              grapes={user.grapesOnTree}
            />
          ) : null}
          {user?.canRunToday ? (
            <Image source={Img.BEFORERUNTURTLE} style={styles.turtle} />
          ) : (
            <Image source={Img.SLEEPTURTLE} style={styles.turtle} />
          )}
        </View>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            ...styles.button,
            backgroundColor: user?.canRunToday ? '#222222' : '#A1AEB7',
          }}
          onPress={() => {
            navigation.dispatch(StackActions.push('watchcheck'))
            if (user?.canRunToday) {
            }
          }}
          // disabled={!user?.canRunToday}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            {user?.canRunToday ? '달리기 시작' : '내일 만나요!'}
          </Text>
        </Button>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          포도알은 하루 한 번만 획득할 수 있어요
        </Text>
      </View>
      <View style={styles.intersect}>
        <Image style={{ width: screenWidth, height: screenHeight * 0.4 }} source={Img.INTERSECT} />
      </View>
    </SafeAreaView>
  )
}

export default GrapeTreeHome

const styles = StyleSheet.create({
  intersect: {
    position: 'absolute',
    height: screenHeight * 0.34,
    width: screenWidth,
    zIndex: -1,
    bottom: 0,
  },
  turtle: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    resizeMode: 'contain',
    transform: [
      {
        scale: 0.8,
      },
    ],
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
})
