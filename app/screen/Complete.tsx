import React from 'react'
import { View, Image } from 'react-native'
import Text from '../components/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Confetti from '../components/Lotties/Confetti'
import Icon from '../constants/Icon'

const Complete = () => {
  return (
    <SafeAreaView style={globalStyle.safeAreaContainer}>
      <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>포도알을 획득했어요</Text>
      <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
        오늘 열심히 달렸으니, 내일 또 만나요~
      </Text>
      <View>
        {/* <View style={{ position: 'absolute' }}>
          <Image source={Icon.GRAPECIRCLE} />
        </View> */}
        <Confetti />
      </View>
    </SafeAreaView>
  )
}

export default Complete
