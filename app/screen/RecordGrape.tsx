import React, { useEffect, useState } from 'react'
import { View, Modal, StyleSheet, Image, Pressable } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Button from '../components/Button'
import GrapeBoard from '../components/GrapeBoard'
import { GrapeById } from '../components/GrapeTree'
import { useGetGrapeLazyQuery, useGetGrapeQuery } from '../../graphql/generated'
import { RunFragment } from '../../graphql/generated'
import { Emotion, emotions } from '../constants/bigEmotion'
import Icon from '../constants/Icon'
import { formatDate, formatDistance, findEmotionDetails } from '../../utils/modalUtils'

const RecordGrape = ({ route }: { route: { params: { grape: GrapeById; index: number } } }) => {
  const { params: { grape, index } = {} } = route
  const navigation = useNavigation()
  const [getGrape, { data }] = useGetGrapeLazyQuery({
    variables: {
      id: grape?.id || '',
    },
  })

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRun, setSelectedRun] = useState<RunFragment | null>(null)

  const emotionBeforeDetails = findEmotionDetails(selectedRun?.emotionBefore || '')
  const emotionAfterDetails = findEmotionDetails(selectedRun?.emotionAfter || '')

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

  const handleRunPress = (run: RunFragment) => {
    setSelectedRun(run)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedRun(null)
  }

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
      <View style={[globalStyle.center, { justifyContent: 'center' }]}>
        {data?.grape?.runs ? (
          <GrapeBoard runs={data?.grape?.runs} onPressRun={handleRunPress} />
        ) : null}
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
      {/* 모달창 부분 */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View style={styles.modalHeader}>
              <Text style={[globalStyle.Pretendard, styles.modalTitle]}>감정 일기장</Text>
              <Pressable style={{ position: 'absolute', right: 0 }} onPress={handleCloseModal}>
                <Image source={Icon.CLOSE} style={{ width: 35, height: 35 }} resizeMode='contain' />
              </Pressable>
            </View>
            <View style={styles.recordContainer}>
              <View style={{ flexDirection: 'row', width: 110 }}>
                <Text style={[globalStyle.Pretendard, styles.category]}>날짜</Text>
                <Text style={[globalStyle.Pretendard, styles.value]}>
                  {formatDate(selectedRun?.createdAt)}
                </Text>
              </View>
              <View style={styles.line} />
              <View style={{ flexDirection: 'row', width: 80 }}>
                <Text style={[globalStyle.Pretendard, styles.category]}>거리</Text>
                <Text style={[globalStyle.Pretendard, styles.value]}>
                  {selectedRun?.runMeters !== undefined && selectedRun?.runMeters !== null
                    ? formatDistance(selectedRun.runMeters)
                    : 'N/A'}
                </Text>
              </View>
            </View>
            <View style={styles.emotionContainer}>
              <View style={{ alignItems: 'center' }}>
                <View
                  style={[
                    styles.emotionButton,
                    {
                      backgroundColor: emotionBeforeDetails.color,
                      marginBottom: 11,
                    },
                  ]}
                >
                  <Image source={Icon.EMOTION[emotionBeforeDetails.value]} />
                </View>
                <Text style={styles.emotionText}>{emotionBeforeDetails.text}</Text>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                <Image
                  source={Icon.POLYGON}
                  style={{ width: 20, height: 14 }}
                  resizeMode='contain'
                />
              </View>

              <View style={{ alignItems: 'center' }}>
                <View
                  style={[
                    styles.emotionButton,
                    {
                      backgroundColor: emotionAfterDetails.color,
                      marginBottom: 11,
                    },
                  ]}
                >
                  <Image source={Icon.EMOTION[emotionAfterDetails.value]} />
                </View>
                <Text style={styles.emotionText}>{emotionAfterDetails.text}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default RecordGrape

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: 304,
    height: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  emotionButton: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 21,
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: 24,
    flex: 1,
    textAlign: 'center',
  },
  recordContainer: {
    flexDirection: 'row',
    width: 212,
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 16,
    lineHeight: 24,
    color: '#A0A0A0',
    marginRight: 8,
  },
  line: {
    borderLeftWidth: 1,
    borderColor: '#A0A0A0',
    height: '70%',
    justifyContent: 'center',
    marginTop: 4,
  },
  value: {
    fontSize: 16,
    lineHeight: 24,
  },
  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  emotionText: {
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: -2,
  },
})
