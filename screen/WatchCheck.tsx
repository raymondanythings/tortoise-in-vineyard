import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../components/globalStyle'
import NextButton from '../components/NextButton'

const BeforeEx = () => {
  const route = useNavigation()
  return (
    <View style={globalStyle.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text style={globalStyle.heading}>워치 착용하셨나요?</Text>
        <Text style={globalStyle.subheading}>
          심박수 측정을 위해 기기를 착용해주세요 없다면, {'\n'}
          거리로 측정해드릴게요!
        </Text>
        <View style={styles.characterContainer}>
          <Text style={globalStyle.heading}>워치 이미지</Text>
        </View>
        <NextButton
          color='noWatch'
          text='워치 없어요'
          onPress={() => route.dispatch(StackActions.replace('run'))}
        />
        <NextButton text='착용했어요' onPress={() => route.dispatch(StackActions.replace('run'))} />
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
