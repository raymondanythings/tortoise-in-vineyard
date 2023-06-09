import React, { FC } from 'react'
import { Image, Dimensions, StyleSheet } from 'react-native'
import Img from '../constants/Img'

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
    width: Dimensions.get('window').width * 0.17,
    height: Dimensions.get('window').height * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.43,
    left: -Dimensions.get('window').width * 0.11,
  },
  {
    width: Dimensions.get('window').width * 0.17,
    height: Dimensions.get('window').height * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.4,
    right: -Dimensions.get('window').width * 0.25,
  },
  {
    width: Dimensions.get('window').width * 0.17,
    height: Dimensions.get('window').height * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.35,
    right: Dimensions.get('window').width * 0.07,
    transform: [{ scaleX: -1 }],
  },
  {
    width: Dimensions.get('window').width * 0.17,
    height: Dimensions.get('window').height * 0.1,
    zIndex: 1,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.34,
    right: -Dimensions.get('window').width * 0.12,
  },
  {
    width: Dimensions.get('window').width * 0.14,
    height: Dimensions.get('window').height * 0.08,
    zIndex: 1,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.33,
    right: -Dimensions.get('window').width * 0.3,
  },
  {
    width: Dimensions.get('window').width * 0.14,
    height: Dimensions.get('window').height * 0.08,
    zIndex: 1,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.3,
    right: Dimensions.get('window').width * 0.22,
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
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
    top: -Dimensions.get('window').height * 0.04,
    left: -Dimensions.get('window').width * 0.45,
    zIndex: 1,
  },
})
