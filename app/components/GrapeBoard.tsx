import React, { useMemo } from 'react'
import { Image, ImageStyle } from 'react-native'
import Img from '../constants/Img'
import Icon from '../constants/Icon'

const GrapeBoard = ({ renderGrape }: { renderGrape: number }) => {
  const imageStyles = useMemo(
    () => [
      {
        position: 'absolute',
        width: '33%',
        height: '33%',
        top: '13%',
        left: '1%',
        resizeMode: 'contain',
      } as ImageStyle,
      {
        position: 'absolute',
        width: '33%',
        height: '33%',
        top: '15.5%',
        left: '32%',
        resizeMode: 'contain',
      } as ImageStyle,
      {
        position: 'absolute',
        width: '33%',
        height: '33%',
        top: '19%',
        left: '63%',
        resizeMode: 'contain',
      } as ImageStyle,
      {
        position: 'absolute',
        width: '33%',
        height: '33%',
        top: '33%',
        left: '11%',
        resizeMode: 'contain',
      } as ImageStyle,
      {
        position: 'absolute',
        width: '33%',
        height: '33%',
        top: '37%',
        left: '44%',
        resizeMode: 'contain',
      } as ImageStyle,
      {
        position: 'absolute',
        width: '33%',
        height: '33%',
        top: '54%',
        left: '23%',
        resizeMode: 'contain',
      } as ImageStyle,
    ],
    [],
  )

  return (
    <>
      <Image source={Img.GRAPE} />
      {Array.from({ length: renderGrape }).map((_, i) => (
        <Image key={i} style={imageStyles[i % imageStyles.length]} source={Icon.GRAPEFORCONFETTI} />
      ))}
    </>
  )
}

export default GrapeBoard
