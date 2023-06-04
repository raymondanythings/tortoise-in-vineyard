import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health'
import { watchEvents } from 'react-native-watch-connectivity'
import { NativeAppEventEmitter, NativeEventEmitter, NativeModules } from 'react-native'
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Workout,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
  },
} as HealthKitPermissions
const healthKit = {
  heartRate: 0,
  requestPermission: () => {
    AppleHealthKit.initHealthKit(permissions, (error: string, result) => {
      console.log(result, '<<result')
    })
    AppleHealthKit.getAnchoredWorkouts
  },

  connectHeartRate() {
    AppleHealthKit.setObserver({ type: 'HeartRate' })
    NativeAppEventEmitter.addListener('healthKit:HeartRate:sample', (data) => {
      console.log('NativeAppEventEmitter', data)
    })
    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      'healthKit:HeartRate:new',
      async (event) => {
        console.log(event, '--> observer triggered')
        this.heartRate = event
      },
    )
  },
}

export default healthKit
