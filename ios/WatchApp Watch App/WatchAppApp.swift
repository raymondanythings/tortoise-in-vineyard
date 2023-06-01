//
//  WatchAppApp.swift
//  WatchApp Watch App
//
//  Created by YongHyun Yeob on 2023/05/31.
//

import SwiftUI

@main
struct WatchApp_Watch_AppApp: App {
    @StateObject var workoutManager = WorkoutManager()
    @StateObject var sessionManager = SessionManager.sharedManager
    @SceneBuilder var body: some Scene {
      WindowGroup {
        NavigationView {
            StartView()
        }
        .sheet(isPresented: $workoutManager.showingSummaryView) {
          SummaryView()
        }
        .onAppear{
          sessionManager.startSession()
        }
        .environmentObject(workoutManager)
        .environmentObject(sessionManager)
      }
    }
}
