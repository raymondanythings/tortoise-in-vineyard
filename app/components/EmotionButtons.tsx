import React, { useState } from 'react'
import { Pressable, StyleSheet, View, Image, FlatList, PressableProps } from 'react-native'
import Text from './Text'
import Icon from '../constants/Icon'
import globalStyle from '../common/globalStyle'
import { Emotion, emotions } from '../constants/bigEmotion'

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
