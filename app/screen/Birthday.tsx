import React, { useState } from 'react'
import { Image, View } from 'react-native'
import Text from '../components/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Img from '../constants/Img'
import Button from '../components/Button'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'

const Birthday = () => {
  const navigation = useNavigation()
  const [birthday, setBirthday] = useState()
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
      <View style={globalStyle.center}>
        {/* <Image source={Img.WATCH} /> */}
        <Picker
          selectedValue={birthday}
          onValueChange={(item) => {
            setBirthday((prev) => item)
          }}
        >
          <Picker.Item label='1' value={1} />
          <Picker.Item label='2' value={2} />
          <Picker.Item label='3' value={3} />
          <Picker.Item label='4' value={4} />
          <Picker.Item label='5' value={5} />
          <Picker.Item label='6' value={6} />
          <Picker.Item label='7' value={7} />
        </Picker>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 8,
          }}
          onPress={() => navigation.dispatch(StackActions.push('watchcheck'))}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            착용 완료
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Birthday
