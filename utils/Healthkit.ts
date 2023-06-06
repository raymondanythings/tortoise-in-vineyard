import AppleHealthKit, {
  HealthKitPermissions,
  HealthObserver,
  HealthUnit,
} from 'react-native-health'
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
class healthKit {
  private heartRate = 0

  requestPermission() {
    return AppleHealthKit.initHealthKit(permissions, (error: string, result) => {
      return !!result
    })
  }
  connectHeartRate() {
    AppleHealthKit.getHeartRateSamples(
      {
        ascending: false,
        startDate: new Date(new Date().getTime() - 10000).toISOString(),
        endDate: new Date().toISOString(),
      },
      (err, result) => {
        console.log(result, '<<getHeartRateSamples')
      },
    )
    NativeAppEventEmitter.addListener('healthKit:HeartRate:sample', (data) => {
      console.log('NativeAppEventEmitter', data)
    })
    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      'healthKit:HeartRate:new',
      async (event) => {
        console.log(event, '--> observer triggered')
        this.heartRate = event
        console.log(this.heartRate), ' <<this.heartRate'
      },
    )
  }

  getHeartRate() {
    return this.heartRate
  }

  reset() {
    this.heartRate = 0
  }
}

export default new healthKit()
