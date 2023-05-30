import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const OnBoard = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text style={styles.heading}>아직은 포도알이 없어요</Text>
        <Text style={styles.subheading}>포도알 6개를 모으면, 한 송이가 완성돼요!</Text>
        <View style={styles.characterContainer}>
          <Text style={styles.heading}>나무 이미지</Text>
        </View>
        <Pressable style={styles.nextButton} onPress={() => navigation.push('beforeex')}>
          <Text style={styles.btnInnerText}>달리기 시작</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  )
}

export default OnBoard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 55,
  },
  characterContainer: {
    borderColor: '#C2D1D9',
    backgroundColor: 'yellowgreen',
    width: 263,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  nextButton: {
    paddingHorizontal: 80,
    paddingVertical: 10,
    backgroundColor: '#4E4E4E',
    borderRadius: 50,
    width: 263,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 9,
  },
  btnInnerText: { fontSize: 12, color: 'white', fontWeight: '400' },
})
