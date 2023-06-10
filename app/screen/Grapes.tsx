import React, { useMemo, useState } from 'react'
import { View, Modal, StyleSheet, Image, Pressable } from 'react-native'
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
import Icon from '../constants/Icon'
import { Emotion, emotions } from '../constants/bigEmotion'
import { formatDate, formatDistance, findEmotionDetails } from '../../utils/modalUtils'
import modalStyle from '../common/modalStyle'
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
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRun, setSelectedRun] = useState<RunFragment | null>(null)

  const emotionBeforeDetails = findEmotionDetails(selectedRun?.emotionBefore || '')
  const emotionAfterDetails = findEmotionDetails(selectedRun?.emotionAfter || '')

  const handleRunPress = (run: RunFragment) => {
    setSelectedRun(run)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedRun(null)
  }

  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer]}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          {`대단해요! 
포도알을 총 ${totalRun}개 모았어요`}
        </Text>
      </View>
      <View style={[globalStyle.center, { justifyContent: 'center' }]}>
        {route?.params?.grape ? (
          <GrapeBoard runs={route.params.grape.runs} onPressRun={handleRunPress} />
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
            포도밭 확인하기
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
        <View style={modalStyle.centeredView}>
          <View style={[modalStyle.modalView]}>
            <View style={modalStyle.modalHeader}>
              <Text style={[globalStyle.Pretendard, modalStyle.modalTitle]}>감정 일기장</Text>
              <Pressable style={{ position: 'absolute', right: 0 }} onPress={handleCloseModal}>
                <Image source={Icon.CLOSE} style={{ width: 35, height: 35 }} resizeMode='contain' />
              </Pressable>
            </View>
            <View style={modalStyle.recordContainer}>
              <View style={{ flexDirection: 'row', width: 110 }}>
                <Text style={[globalStyle.Pretendard, modalStyle.category]}>날짜</Text>
                <Text style={[globalStyle.Pretendard, modalStyle.value]}>
                  {formatDate(selectedRun?.createdAt)}
                </Text>
              </View>
              <View style={modalStyle.line} />
              <View style={{ flexDirection: 'row', width: 80 }}>
                <Text style={[globalStyle.Pretendard, modalStyle.category]}>거리</Text>
                <Text style={[globalStyle.Pretendard, modalStyle.value]}>
                  {selectedRun?.runMeters !== undefined && selectedRun?.runMeters !== null
                    ? formatDistance(selectedRun.runMeters)
                    : 'N/A'}
                </Text>
              </View>
            </View>
            <View style={modalStyle.emotionContainer}>
              <View style={{ alignItems: 'center' }}>
                <View
                  style={[
                    modalStyle.emotionButton,
                    {
                      backgroundColor: emotionBeforeDetails.color,
                      marginBottom: 11,
                    },
                  ]}
                >
                  <Image source={Icon.EMOTION[emotionBeforeDetails.value]} />
                </View>
                <Text style={modalStyle.emotionText}>{emotionBeforeDetails.text}</Text>
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
                    modalStyle.emotionButton,
                    {
                      backgroundColor: emotionAfterDetails.color,
                      marginBottom: 11,
                    },
                  ]}
                >
                  <Image source={Icon.EMOTION[emotionAfterDetails.value]} />
                </View>
                <Text style={modalStyle.emotionText}>{emotionAfterDetails.text}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Grapes
