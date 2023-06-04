import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Img from '../constants/Img'
import { StackActions, useNavigation } from '@react-navigation/native'
import GrapeCount from '../components/GrapeCount'
import Button from '../components/Button'
import useGetUser from '../hook/useGetUser'
import Bedge from '../components/Bedge'

const OnBoard = () => {
  const navigation = useNavigation()
  const { user } = useGetUser('cache-only')
  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.header]}>
        <Bedge label='포도알' />
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>포도알을 모아보세요</Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          {user?.canRunToday ? '포도알 6개를 모으면, 한 송이가 완성돼요!' : '내일도 만나요!'}
        </Text>
        <GrapeCount count={3} />
      </View>
      <View style={globalStyle.center}>
        <Image source={Img.GRAPE} />
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
          }}
          disabled={!user?.canRunToday}
          onPress={() => navigation.dispatch(StackActions.push('watchcheck'))}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            {user?.canRunToday ? '달리기 시작' : '포도알 준비중'}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default OnBoard
