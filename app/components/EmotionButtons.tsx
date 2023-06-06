import React, { useState } from 'react'
import { Pressable, StyleSheet, View, Image, FlatList, PressableProps } from 'react-native'
import Text from './Text'
import Icon from '../constants/Icon'
import globalStyle from '../common/globalStyle'
import { Emotion as E } from '../../graphql/generated'

export interface Emotion {
  value: E | ''
  text: string
  bgColor: string
  color: string
}

export const emotions: Emotion[] = [
  { value: E.Pleased, text: '기쁜', bgColor: '#FFFBE0', color: '#FFE231' },
  { value: E.Proud, text: '뿌듯한', bgColor: '#FFF5EA', color: '#FCBC72' },
  { value: E.Happy, text: '행복한', bgColor: '#FDF6F5', color: '#F3C4BE' },
  { value: E.Excited, text: '신나는', bgColor: '#F6F3F9', color: '#C2B1D5' },
  { value: E.Irritated, text: '짜증나는', bgColor: '#F5F7F8', color: '#BCCACD' },
  { value: E.Unstable, text: '불안한', bgColor: '#FAF1EC', color: '#DDA17D' },
  { value: E.Lethargic, text: '무기력한', bgColor: '#F3F8F5', color: '#AFD1B9' },
  { value: E.Gloomy, text: '우울한', bgColor: '#EFF8FA', color: '#92CEDE' },
  { value: E.Angry, text: '화나는', bgColor: '#FFEAE3', color: '#FD7247' },
]

interface EmotionButtons {
  value?: Emotion['value']
  onIconPress?: (selected: Emotion) => void
}

const EmotionButtons = ({ onIconPress, value }: EmotionButtons) => {
  const [selected, setSelected] = useState<string | undefined>(value)

  return (
    <FlatList
      data={emotions}
      numColumns={3}
      style={{
        flexGrow: 1,
      }}
      columnWrapperStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      keyExtractor={(item) => item.value}
      ItemSeparatorComponent={(props) => {
        return <View style={{ padding: 10 }} />
      }}
      renderItem={({ item, index, separators }) => {
        return (
          <Pressable
            style={{
              alignItems: 'center',
              rowGap: 8.6,
              opacity: !selected || selected === item.value ? 1 : 0.5,
            }}
            onPress={() => {
              if (selected && selected === item.value) {
                setSelected('')
                onIconPress && onIconPress({ bgColor: '', color: '', text: '', value: '' })
              } else {
                setSelected(item.value)
                onIconPress && onIconPress(item)
              }
            }}
          >
            <View
              style={[
                styles.emotionButton,
                {
                  backgroundColor: selected
                    ? selected === item.value
                      ? item.color
                      : '#E2E2E2'
                    : item.color,
                },
              ]}
            >
              <Image source={Icon.EMOTION[item.value]} />
            </View>
            <Text style={globalStyle.gaeguEmotion}>{item.text}</Text>
          </Pressable>
        )
      }}
    />
  )
}

export default EmotionButtons

const styles = StyleSheet.create({
  emotionButton: {
    width: 81,
    height: 81,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
