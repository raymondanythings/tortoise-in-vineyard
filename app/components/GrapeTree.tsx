import React, { FC } from 'react'
import { Image, StyleSheet } from 'react-native'
import Img from '../constants/Img'
import { screenWidth, screenHeight } from '../constants/screen'

const grapeStyles: {
  width: number
  height: number
  zIndex: number
  position: 'absolute'
  bottom: number
  left?: number
  right?: number
  transform?: { scaleX: -1 }[]
}[] = [
  {
    width: screenWidth * 0.17,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.43,
    left: -screenWidth * 0.11,
  },
  {
    width: screenWidth * 0.17,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.4,
    right: -screenWidth * 0.25,
  },
  {
    width: screenWidth * 0.17,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.35,
    right: screenWidth * 0.07,
    transform: [{ scaleX: -1 }],
  },
  {
    width: screenWidth * 0.17,
    height: screenHeight * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.34,
    right: -screenWidth * 0.12,
  },
  {
    width: screenWidth * 0.14,
    height: screenHeight * 0.08,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.33,
    right: -screenWidth * 0.3,
  },
  {
    width: screenWidth * 0.14,
    height: screenHeight * 0.08,
    zIndex: 1,
    position: 'absolute',
    bottom: screenHeight * 0.3,
    right: screenWidth * 0.22,
    transform: [{ scaleX: -1 }],
  },
  // ... add more styles if needed
]

interface GrapeTreeImageProps {
  totalRun: number
}

const GrapeTree: FC<GrapeTreeImageProps> = ({ totalRun }) => {
  return (
    <>
      <Image source={Img.TREE} style={styles.tree} />
      {Array.from({ length: Math.floor(totalRun / 6) }, (_, index) => (
        <Image key={index} source={Img.GRAPEFULL} style={grapeStyles[index % grapeStyles.length]} />
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
