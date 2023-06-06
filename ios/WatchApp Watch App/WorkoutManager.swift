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
      guard selectedWorkout != nil else {return}
      startWorkout()
    }
  }
  
  @Published var showingSummaryView : Bool = false{
    didSet {
      // Sheet dismissed
      if showingSummaryView == false {
        resetWorkout()
      }
    }
  }
  
  let healthstore = HKHealthStore()
  var session : HKWorkoutSession?
  var builder : HKLiveWorkoutBuilder?
  func stopWorkout() -> Bool {
    if let session = session {
        session.end()
        return true
    } else {
        return false
    }
  }
  func startWorkout() ->  Bool  {
    let configuration = HKWorkoutConfiguration()
    configuration.activityType = .running
    configuration.locationType = .outdoor
    do {
      session = try HKWorkoutSession(healthStore: healthstore, configuration: configuration)
      builder = session?.associatedWorkoutBuilder()
    } catch {
      return false
    }
    builder?.dataSource = HKLiveWorkoutDataSource(healthStore: healthstore, workoutConfiguration: configuration)
    
    
    session?.delegate = self
    builder?.delegate = self
    
    var isSuccess = true
    let startDate = Date()
    session?.startActivity(with: startDate)
    builder?.beginCollection(withStart: startDate){
      (success,error) in
      if (error != nil) {
        isSuccess = false
      }
    }
    return isSuccess
  }
  
  func requestAuthorization(){
    let typesToShare :Set = [
      HKQuantityType.workoutType()]
    
    let typesToRead : Set = [
      HKQuantityType.quantityType(forIdentifier: .heartRate)!,
      HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned)!,
      HKQuantityType.quantityType(forIdentifier: .distanceWalkingRunning)!,
      HKObjectType.activitySummaryType()
    ]
    
    healthstore.requestAuthorization(toShare: typesToShare, read:typesToRead) {
      (success , error) in
      // error handle
    }
  }
  // state control
  @Published var running = false
  
  func pause() -> Bool {
    if let session = session {
      session.pause()
      return true
    }
    
    
    return false
  }
  
  func resume() -> Bool {
    if let session = session {
      session.resume()
      return true
    }
    return false
  }
  
  func togglePause() -> Bool {
    if running == true {
      return pause()
    } else {
      return resume()
    }
  }
  
  func endWorkout(){
    session?.end()
    showingSummaryView = true
  }
  
  // MARK: - Workout Metrics
  @Published var averageHeartRate : Double = 0
  @Published var heartRate : Double = 0 {
    didSet {
      SessionManager.sharedManager.sendMessage(message:["heartRate" : heartRate])
    }
  }
  @Published var activeEnergy : Double = 0
  @Published var distance : Double = 0{
    didSet {
      SessionManager.sharedManager.sendMessage(message:["distance" : distance])
    }
  }
  @Published var workout : HKWorkout?
  
  func updateForStatistics(_ statistics: HKStatistics?) {
    guard let statistics = statistics else { return }
    
    DispatchQueue.main.async {
      switch statistics.quantityType {
      case HKQuantityType.quantityType(forIdentifier: .heartRate):
        let heartRateUnit = HKUnit.count().unitDivided(by: HKUnit.minute())
        self.heartRate = statistics.mostRecentQuantity()?.doubleValue(for: heartRateUnit) ?? 0
        self.averageHeartRate = statistics.averageQuantity()?.doubleValue(for: heartRateUnit) ?? 0
      case HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned):
        let energyUnit = HKUnit.kilocalorie()
        self.activeEnergy = statistics.sumQuantity()?.doubleValue(for: energyUnit) ?? 0
      // CHANGE: cycling
      case HKQuantityType.quantityType(forIdentifier: .distanceWalkingRunning):
        let meterUnit = HKUnit.meter()
        self.distance = statistics.sumQuantity()?.doubleValue(for: meterUnit) ?? 0
      default:
        return
      }
    }
  }
  
  
  func resetWorkout (){
    selectedWorkout = nil
    builder = nil
    session = nil
    workout = nil
    activeEnergy = 0
    averageHeartRate = 0
    heartRate = 0
    distance = 0
  }
}

// MARK: - HKWorkoutSessionDelegate
extension WorkoutManager: HKWorkoutSessionDelegate {
  func workoutSession(_ workoutSession: HKWorkoutSession, didFailWithError error: Error) {
    return
  }
  

  func workoutSession(_ workoutSession: HKWorkoutSession, didChangeTo toState : HKWorkoutSessionState, from fromState : HKWorkoutSessionState, date: Date)  {
    DispatchQueue.main.async {
      self.running = toState == .running
    }
    if toState == .ended {
      builder?.endCollection(withEnd: date) {
        (success, error) in
        self.builder?.finishWorkout {
          (workout, error) in
          DispatchQueue.main.async {
            self.workout = workout
          }
        }
      }
    }
  }
}


extension WorkoutManager : HKLiveWorkoutBuilderDelegate {
  func workoutBuilderDidCollectEvent(_ workoutBuilder: HKLiveWorkoutBuilder) {
  }
  
  func workoutBuilder(_ workoutBuilder: HKLiveWorkoutBuilder, didCollectDataOf collectedTypes: Set<HKSampleType>) {
    for type in collectedTypes {
      guard let quantityType = type as? HKQuantityType else {return}
      
      let statistics = workoutBuilder.statistics(for: quantityType)
      
      // update the published values
      updateForStatistics(statistics)
    }
    
  }
}

extension Double {
  var km : Double { return self * 1_000.0}
}
