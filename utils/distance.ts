import { ILocation } from '../app/screen/Run'

export const calculateDistance = (coordinates: ILocation[]) => {
  if (coordinates.length < 2) {
    return 0
  }

  let totalDistance = 0

  for (let i = 1; i < coordinates.length; i++) {
    const prevCoord = coordinates[i - 1]
    const currCoord = coordinates[i]

    const distance = getDistance(
      prevCoord.latitude,
      prevCoord.longitude,
      currCoord.latitude,
      currCoord.longitude,
    )
    totalDistance += distance
  }

  return totalDistance
}

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

const deg2rad = (angle: number) => {
  return (angle * Math.PI) / 180
}
