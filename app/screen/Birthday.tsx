import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import Text from '../components/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle, { Font } from '../common/globalStyle'
import Img from '../constants/Img'
import Button from '../components/Button'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { useUpdateBirthMutation } from '../../graphql/generated'
import useGetUser from '../hook/useGetUser'

const START_YEAR = 1900
const END_YEAR = new Date().getFullYear()
const Birthday = () => {
  const navigation = useNavigation()
  const [birthday, setBirthday] = useState(1994)
  const { updateQuery, user } = useGetUser('network-only')
  const [update] = useUpdateBirthMutation({
    onCompleted(data) {
      updateQuery((prev, option) => ({
        ...prev,
        me: {
          ...prev.me,
          birthYear: data.updateBirthYear.birthYear,
        },
      }))
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'watchcheck',
          },
        ],
      })
    },
  })
  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <View style={[globalStyle.header, {}]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          태어난 연도를 알려주세요
        </Text>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          나에게 알맞은 심박수 계산을 위해 필요해요.
        </Text>
      </View>
      <View style={[globalStyle.center, { width: '100%' }]}>
        <View style={{ position: 'relative', justifyContent: 'center' }}>
          <Picker
            selectedValue={birthday}
            selectionColor={'transparent'}
            mode='dropdown'
            prompt='????'
            onValueChange={(item) => {
              setBirthday(item)
            }}
          >
            {Array.from(
              { length: END_YEAR - START_YEAR + 1 },
              (_, index) => START_YEAR + index,
            ).map((item) => (
              <Picker.Item key={item} label={item + ''} value={item} />
            ))}
          </Picker>
          <Text
            style={{
              position: 'absolute',
              right: '18%',
              fontFamily: Font.Pretendard,
              fontSize: 20,
              fontWeight: '500',
            }}
          >
            년생
          </Text>
        </View>
      </View>

      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
          }}
          onPress={() =>
            update({
              variables: {
                birthYear: birthday,
              },
            })
          }
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            입력했어요
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Birthday
