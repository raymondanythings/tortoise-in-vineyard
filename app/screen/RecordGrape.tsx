import React, { useEffect, useState } from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Button from '../components/Button'
import GrapeBoard from '../components/GrapeBoard'
import { GrapeById } from '../components/GrapeTree'
import { useGetGrapeLazyQuery, useGetGrapeQuery } from '../../graphql/generated'
import { RunFragment } from '../../graphql/generated'

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

  {
    /* Modal창 코드 (작업중!!!!!!!!!!!) */
  }
  const handleRunPress = (run: RunFragment) => {
    console.log('Emotion Before:', run.emotionBefore)
    console.log('Emotion After:', run.emotionAfter)
    console.log('Run Meters:', run.runMeters)
    console.log('Created At:', run.createdAt)

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
      <View style={globalStyle.center}>
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

      {/* Modal창 코드 (작업중!!!!!!!!!!!) */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[globalStyle.pretendardSub]}>감정 일기장</Text>
            <View style={{ flexDirection: 'row', backgroundColor: 'green' }}>
              <View style={{ flexDirection: 'row', backgroundColor: 'blue' }}>
                <Text>날짜</Text>
                <Text>11</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>거리</Text>
                <Text>22</Text>
              </View>
            </View>

            <Text>Emotion Before: {selectedRun?.emotionBefore}</Text>
            <Text>Emotion After: {selectedRun?.emotionAfter}</Text>
            <Text>Run Meters: {selectedRun?.runMeters}</Text>
            <Text>Created At: {selectedRun?.createdAt}</Text>
            <Button onPress={handleCloseModal}>
              <Text>Close</Text>
            </Button>
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
})
