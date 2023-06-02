//
//  WatchAppApp.swift
//  WatchApp Watch App
//
//  Created by YongHyun Yeob on 2023/05/31.
//

import SwiftUI

@main
struct WatchApp_Watch_AppApp: App {
    @StateObject var sessionManager = SessionManager.sharedManager
    @StateObject var workoutManager = WorkoutManager()
    @SceneBuilder var body: some Scene {
      WindowGroup {
        NavigationView {
            StartView()
        }
        .sheet(isPresented: $workoutManager.showingSummaryView) {
          SummaryView()
        }
        .environmentObject(workoutManager)
        .environmentObject(sessionManager)
      }
    }
}
