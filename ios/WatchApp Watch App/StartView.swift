//
//  StartView.swift
//  WatchApp Watch App
//
//  Created by YongHyun Yeob on 2023/06/01.
//

import SwiftUI
import HealthKit
struct StartView: View {
  @EnvironmentObject var workoutManager : WorkoutManager
  @EnvironmentObject var sessionManager : SessionManager
  var workoutTypes : [HKWorkoutActivityType] = [.running]
    var body: some View {
      List(workoutTypes) {
        workoutType in
        NavigationLink (workoutType.name, destination: SessionPagingView(), tag: workoutType, selection: $workoutManager.selectedWorkout).padding(EdgeInsets(top: 15, leading: 5, bottom : 15, trailing: 5))
      }.listStyle(.carousel).navigationBarTitle("Workouts").onAppear {
        workoutManager.requestAuthorization()
        sessionManager.startSession()
      }.onChange(of: sessionManager.shouldStartRunning){
        shouldStartRunning in
        if shouldStartRunning {
          workoutManager.selectedWorkout = .running
        }
      }
      .onAppear(){
        sessionManager.shouldStopRunning = false
        sessionManager.shouldStopRunning = false
      }
    }
  
  
}

struct StartView_Previews: PreviewProvider {
    static var previews: some View {
        StartView()
    }
}

extension HKWorkoutActivityType : Identifiable {
  public var id : UInt {
    rawValue
  }
  var name : String {
    switch self {
    case .running:
      return "Run"
    case .cycling:
      return "Bike"
    case .walking:
      return "Walk"
    default:
      return ""
    }
  }
}
