import React, { FC, useMemo } from 'react'
import { Image, ImageProps, StyleSheet, StyleProp, Pressable } from 'react-native'
import Img from '../constants/Img'
import { screenWidth, screenHeight } from '../constants/screen'
import { Grape } from '../../graphql/generated'
export type GrapeById = Pick<Grape, '__typename' | 'id' | 'isFull' | 'createdAt'>
const grapeStyles: ImageProps['style'][] = [
  {
    width: screenWidth * 0.17,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.43,
    left: -screenWidth * 0.108,
  },
  {
    width: screenWidth * 0.17,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.401,
    right: -screenWidth * 0.234,
    transform: [
      {
        rotateZ: '10deg',
      },
      {
        scale: 0.85,
      },
    ],
  },
  {
    width: screenWidth * 0.17,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.36,
    right: screenWidth * 0.07,
    transform: [{ rotate: '-30deg' }],
  },
  {
    width: screenWidth * 0.17,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.33,
    right: -screenWidth * 0.12,
    transform: [
      {
        scale: 0.85,
      },
      {
        rotate: '-20deg',
      },
    ],
  },
  {
    width: screenWidth * 0.14,
    height: screenHeight * 0.08,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.335,
    right: -screenWidth * 0.29,
    transform: [
      {
        rotate: '30deg',
      },
    ],
  },
  {
    width: screenWidth * 0.14,
    height: screenHeight * 0.08,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.3,
    right: screenWidth * 0.22,
    transform: [
      {
        rotate: '-18deg',
      },
      {
        scale: 1.05,
      },
    ],
  },
  {
    width: screenWidth * 0.14,
    height: screenHeight * 0.08,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.27,
    right: screenWidth * 0.001,
    transform: [
      {
        rotate: '-28deg',
      },
      {
        scale: 1.05,
      },
    ],
  },
  {
    width: screenWidth * 0.14,
    height: screenHeight * 0.08,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.26,
    right: -screenWidth * 0.37,
    transform: [
      {
        rotate: '15deg',
      },
      {
        scale: 1.05,
      },
    ],
  },
  {
    width: screenWidth * 0.18,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.23,
    right: -screenWidth * 0.2,
    transform: [
      {
        rotate: '0deg',
      },
    ],
  },
  {
    width: screenWidth * 0.18,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.2,
    right: screenWidth * 0.094,
    transform: [
      {
        rotate: '-40deg',
      },
      {
        scale: 0.9,
      },
    ],
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
    <>
      <Image source={Img.TREE} style={styles.tree} />
      {grapesData.map((grape, index) => (
        <Pressable
          key={grape.id}
          style={[grapeStyles[index % grapeStyles.length]]}
          onPress={() => onPress && onPress(grape, index)}
        >
          <Image
            source={Img.GRAPEFULL}
            style={{
              width: grapeStyles[index % grapeStyles.length]!.width,
              height: grapeStyles[index % grapeStyles.length]!.height,
            }}
          />
        </Pressable>
      ))}
    </>
  )
}

export default GrapeTree

const styles = StyleSheet.create({
  tree: {
    position: 'absolute',
    width: screenWidth * 0.9,
    height: screenHeight * 0.5,
    top: -screenHeight * 0.04,
    left: -screenWidth * 0.45,
    zIndex: 1,
  },
})
