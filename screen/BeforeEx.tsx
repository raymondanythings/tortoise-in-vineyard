import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../components/globalStyle'
import NextButton from '../components/NextButton'
import Text from '../components/Text'

const BeforeEx = ({ navigation }: { navigation: any }) => {
  return (
    <View style={globalStyle.container}>
      <SafeAreaView style={globalStyle.safeAreaContainer}>
        <Text style={globalStyle.heading}>준비운동, 잊지 않았죠?</Text>
        <Text style={globalStyle.subheading}>
          달리기 전 몸이 놀라지 않게 {'\n'}
          가벼운 스트레칭은 필수에요!
        </Text>
        <View style={styles.characterContainer}>
          <Text style={globalStyle.heading}>준비운동 캐릭터</Text>
        </View>
        <NextButton text='준비운동 완료' onPress={() => navigation.push('watchcheck')} />
      </SafeAreaView>
    </View>
  )
}

export default BeforeEx

const styles = StyleSheet.create({
  characterContainer: {
    borderColor: '#C2D1D9',
    backgroundColor: '#C2D1D9',
    width: 263,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
})
