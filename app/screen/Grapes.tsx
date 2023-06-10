import React, { useMemo } from 'react'
import { View } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Button from '../components/Button'
import GrapeCount from '../components/GrapeCount'
import GrapeBoard from '../components/GrapeBoard'
import useGetUser from '../hook/useGetUser'
import { useRecoilValue } from 'recoil'
import { runAtom } from '../store/run'
import { RunFragment, useGetGrapeLazyQuery, useRunQuery } from '../../graphql/generated'

const Grapes = ({
  route,
}: {
  route: {
    params: {
      grape: {
        id: string
        createdAt: string
        runs: RunFragment[]
      }
    }
  }
}) => {
  const navigation = useNavigation()
  const { user } = useGetUser('cache-only')

  const totalRun = useMemo(() => user?.totalRun || 0, [user?.totalRun])

  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer]}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          {`대단해요! 
포도알을 총 ${totalRun}개 모았어요`}
        </Text>
      </View>
      <View style={[globalStyle.center, { justifyContent: 'center' }]}>
        {route?.params?.grape ? <GrapeBoard runs={route.params.grape.runs} /> : null}
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
          }}
          onPress={() => navigation.dispatch(StackActions.push('grapetreehome'))}
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
