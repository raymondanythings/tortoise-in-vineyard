//
//  ControlsView.swift
//  WatchApp Watch App
//
//  Created by YongHyun Yeob on 2023/06/01.
//

import SwiftUI

struct ControlsView: View {
  @EnvironmentObject var workoutManager : WorkoutManager
  @EnvironmentObject var sessionManager: SessionManager
    var body: some View {
      HStack {
        VStack {
          Button {
            workoutManager.endWorkout()
          }label: {
            Image(systemName: "xmark")
          
          }.tint(Color.red).font(.title2)
          Text("End")
        }.onChange(of: sessionManager.shouldStopRunning){
          shouldStopRunning in
          if shouldStopRunning {
            workoutManager.endWorkout()
          }
        }
        VStack {
          Button {
            workoutManager.togglePause()
          } label: {
            Image(systemName: workoutManager.running ? "pause" : "play")
          }
          .tint(Color.yellow).font(.title2)
          Text(workoutManager.running ? "Pause" : "Resume")
        }
        
      }
    }
}

struct ControlsView_Previews: PreviewProvider {
    static var previews: some View {
        ControlsView()
    }
}
