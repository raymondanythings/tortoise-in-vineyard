import React, { FC, useMemo } from 'react'
import { Image, ImageProps, StyleSheet, StyleProp, Pressable, View } from 'react-native'
import Img from '../constants/Img'
import { screenWidth, screenHeight } from '../constants/screen'
import { Grape } from '../../graphql/generated'
import Icon from '../constants/Icon'
export type GrapeById = Pick<Grape, '__typename' | 'id' | 'isFull' | 'createdAt'>
const grapeStyles: ImageProps['style'][] = [
  {
    zIndex: 1,
    position: 'absolute',
    top: '6%',
    left: '38%',
  },
  {
    zIndex: 1,
    position: 'absolute',
    top: '12%',
    left: '57%',
  },
  {
    zIndex: 1,
    position: 'absolute',
    top: '18.5%',
    left: '19.5%',
  },
  {
    zIndex: 1,
    position: 'absolute',
    top: '26%',
    left: '44%',
  },
  {
    zIndex: 1,
    position: 'absolute',
    top: '26%',
    left: '62%',
  },
  {
    top: '34%',
    left: '8%',
    zIndex: 1,
    position: 'absolute',
  },
  {
    top: '38.8%',
    left: '30.2%',
    zIndex: 1,
    position: 'absolute',
  },
  {
    top: '42%',
    left: '74%',
    zIndex: 1,
    position: 'absolute',
  },
  {
    top: '45%',
    left: '52%',
    zIndex: 1,
    position: 'absolute',
  },
  {
    top: '50%',
    left: '16%',
    zIndex: 1,
    position: 'absolute',
  },
  // ... add more styles if needed
]

interface GrapeTreeImageProps {
  grapes: GrapeById[]
  onPress?: (grape: GrapeById, index: number) => void
}

const GrapeTree: FC<GrapeTreeImageProps> = ({ grapes, onPress }) => {
  const grapesData = useMemo(() => grapes.slice(0, 10), [grapes])

  return (
    <View style={{ position: 'relative' }}>
      <Image source={Img.TREE} />
      {grapesData.map((grape, index) => (
        <Pressable
          key={grape.id}
          style={[grapeStyles[index % grapeStyles.length]]}
          onPress={() => onPress && onPress(grape, index)}
        >
          <Image source={Icon.GRAPES[index]} />
        </Pressable>
      ))}
    </View>
  )
}

export default GrapeTree

const styles = StyleSheet.create({
  tree: {
    position: 'absolute',
    width: screenWidth * 0.9,
    // height: screenHeight * 0.5,
    top: -screenHeight * 0.02,
    left: -screenWidth * 0.45,
    zIndex: 1,
  },
})
