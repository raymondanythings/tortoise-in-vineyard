import React, { useMemo } from 'react'
import { View, Image, ImageStyle } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Button from '../components/Button'
import Img from '../constants/Img'
import Icon from '../constants/Icon'
import bigEmotion from '../constants/bigEmotion'
import useGetUser from '../hook/useGetUser'
import { Emotion } from '../../graphql/generated'
import GrapeCount from '../components/GrapeCount'
import GrapeBoard from '../components/GrapeBoard'

const TOTAL_COUNT = 6

const Grapes = (route: any) => {
  const navigation = useNavigation()
  const { user } = useGetUser('cache-only')
  const totalRun = user?.totalRun
  const renderGrape = totalRun ? (totalRun % 6 === 0 ? 6 : totalRun % 6) : 0

  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer]}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          {`대단해요! 
포도알을 총 ${totalRun}개 모았어요`}
        </Text>
      </View>
      <View style={globalStyle.center}>
        <GrapeBoard renderGrape={renderGrape} />
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
