import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health'
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.HeartRate],
  },
} as HealthKitPermissions

export const getHealthKit = () => {
  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!')
    }

    /* Can now read or write to HealthKit */

    const options = {
      startDate: new Date().toISOString(),
    }
    AppleHealthKit.getHeartRateSamples(options, (callbackError: string, results: HealthValue[]) => {
      console.log(results, '<<<results')
      /* Samples are now collected from HealthKit */
    })
  })
}

export const getIsAvailable = () =>
  AppleHealthKit.isAvailable((err: Object, available: boolean) => {
    return {
      available,
      err,
    }
  })
