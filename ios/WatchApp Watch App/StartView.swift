import SwiftUI
import HealthKit

struct StartView: View {
    @EnvironmentObject var workoutManager: WorkoutManager
    @EnvironmentObject var sessionManager: SessionManager
    var workoutTypes: [HKWorkoutActivityType] = [.running]
    
    var body: some View {
        
      GeometryReader { geometry in
        NavigationView {
            VStack {
                Image("watch_main")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: geometry.size.width * 0.7)
                .listStyle(.carousel)
              NavigationLink(destination: SessionPagingView(),tag: .running,selection: $workoutManager.selectedWorkout) {
                  Text("운동 시작")
                      .font(.custom("Pretendard-Regular", size: 20))
                      .cornerRadius(10)
              }
            }.frame(alignment: .center)
        }
        
      }
      .onAppear {
          workoutManager.requestAuthorization()
          sessionManager.startSession()
      }
      .onChange(of: sessionManager.shouldStartRunning) { shouldStartRunning in
        print("shouldStartRunning change")
        print(shouldStartRunning)
          if shouldStartRunning {
              workoutManager.selectedWorkout = .running
          }
      }
      .onAppear() {
          sessionManager.shouldStopRunning = false
          sessionManager.shouldStopRunning = false
      }
    }
}

struct StartView_Previews: PreviewProvider {
    static var previews: some View {
      StartView().environmentObject(WorkoutManager()).environmentObject(SessionManager.sharedManager)
    }
}

extension HKWorkoutActivityType: Identifiable {
    public var id: UInt {
        rawValue
    }
    
    var name: String {
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
