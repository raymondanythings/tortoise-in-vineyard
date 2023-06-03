import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Text from '../components/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery, gql } from '@apollo/client'

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`

const Apollo = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {data.locations.map(({ id, name, description, photo }: any) => (
        <View key={id}>
          <Text>{name}</Text>
          <Text>About this location:</Text>
          <Text>{description}</Text>
        </View>
      ))}
    </SafeAreaView>
  )
}

export default Apollo
