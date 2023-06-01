//
//  WorkoutManager.swift
//  WatchApp Watch App
//
//  Created by YongHyun Yeob on 2023/06/01.
//

import Foundation
import HealthKit

class WorkoutManager : NSObject, ObservableObject {
  var selectedWorkout : HKWorkoutActivityType? {
    didSet {
      guard let selectedWorkout = selectedWorkout else {return}
      startWorkout(workoutType: selectedWorkout)
    }
  }
  
  let healthstore = HKHealthStore()
  var session : HKWorkoutSession?
  var builder : HKLiveWorkoutBuilder?
  
  func startWorkout(workoutType : HKWorkoutActivityType){
    let configuration = HKWorkoutConfiguration()
    configuration.activityType = workoutType
    configuration.locationType = .outdoor
    
    do {
      session = try HKWorkoutSession(healthStore: healthstore, configuration: configuration)
      builder = session?.associatedWorkoutBuilder()
    } catch {
      return
    }
    builder?.dataSource = HKLiveWorkoutDataSource(healthStore: healthstore, workoutConfiguration: configuration)
    
    let startDate = Date()
    session?.startActivity(with: startDate)
    builder?.beginCollection(withStart: startDate){
      (success,errror) in
    // TODO: workout 시작 모바일 전송로직 추가
    }
  }
  
  func requestAuthorization(){
    let typesToShare :Set = [
      HKQuantityType.workoutType()]
    
    let typesToRead : Set = [
      HKQuantityType.quantityType(forIdentifier: .heartRate)!,
      HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned)!,
      HKQuantityType.quantityType(forIdentifier: .distanceWalkingRunning)!,
      HKQuantityType.quantityType(forIdentifier: .distanceCycling)!,
      HKObjectType.activitySummaryType()
    ]
    
    healthstore.requestAuthorization(toShare: typesToShare, read:typesToRead) {
      (success , error) in
      // error handle
    }
  }
  
}
