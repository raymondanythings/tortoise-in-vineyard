import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../components/globalStyle'

const BeforeEx = () => {
  const route = useNavigation()
  return (
    <View style={globalStyle.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text style={globalStyle.heading}>준비운동, 잊지 않았죠?</Text>
        <Text style={globalStyle.subheading}>
          달리기 전 몸이 놀라지 않게 {'\n'}
          가벼운 스트레칭은 필수에요!
        </Text>
        <View style={styles.characterContainer}>
          <Text style={globalStyle.heading}>준비 영상</Text>
        </View>
        <Pressable
          style={globalStyle.nextButton}
          onPress={() => route.dispatch(StackActions.replace('run'))}
        >
          <Text style={globalStyle.btnInnerText}>준비운동 완료</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  )
}

export default BeforeEx

const styles = StyleSheet.create({
  safeAreaContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
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
