import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Button from '../components/Button'
import GrapeBoard from '../components/GrapeBoard'
import { GrapeById } from '../components/GrapeTree'
import { useGetGrapeLazyQuery, useGetGrapeQuery } from '../../graphql/generated'

const RecordGrape = ({ route }: { route: { params: { grape: GrapeById; index: number } } }) => {
  const { params: { grape, index } = {} } = route
  const navigation = useNavigation()
  const [getGrape, { data }] = useGetGrapeLazyQuery({
    variables: {
      id: grape?.id || '',
    },
  })
  useEffect(() => {
    if (!grape) {
      navigation.goBack()
    } else {
      getGrape({
        variables: {
          id: grape.id,
        },
      })
    }
  }, [])
  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer, { backgroundColor: '#95B26D' }]}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          {`내가 모은 
${(index || 0) + 1}번째 포도송이예요!`}
        </Text>
        <Text style={[globalStyle.subheadingwhite, { textAlign: 'center' }]}>
          포도알을 누르면, 그날의 기록을 볼 수 있어요
        </Text>
      </View>
      <View style={globalStyle.center}>
        {data?.grape?.runs ? <GrapeBoard runs={data?.grape?.runs} /> : null}
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
            홈 화면으로 갈게요
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default RecordGrape
