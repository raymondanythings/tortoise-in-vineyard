import SwiftUI
import HealthKit

struct StartView: View {
    @EnvironmentObject var workoutManager: WorkoutManager
    @EnvironmentObject var sessionManager: SessionManager
    var workoutTypes: [HKWorkoutActivityType] = [.running]
    
    var body: some View {
        NavigationView {
            VStack {
                Spacer()
                
                // 이미지 로고
                Image("watch_main") // 이미지 이름을 로고 이미지 파일의 이름으로 변경해야 합니다.
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 133, height: 104)
                
//                List(workoutTypes) { workoutType in
//                    NavigationLink(workoutType.name, destination: SessionPagingView(), tag: workoutType, selection: $workoutManager.selectedWorkout)
//                        .padding(EdgeInsets(top: 15, leading: 5, bottom: 15, trailing: 5))
//                }
                .listStyle(.carousel)
//                .navigationBarTitle("Workouts")
                Spacer()
              NavigationLink(destination: SessionPagingView(),tag: .running,selection: $workoutManager.selectedWorkout) {
                  Text("운동 시작")
                      .font(.custom("Pretendard-Regular", size: 20))
                      .padding()
                      .cornerRadius(10)
              }
              .padding(.bottom, 20)
//                // 하단 버튼
//                Button(action: {
//                    // 버튼 동작 구현
//                }) {
//                  Text("운동 시작").font(.custom("Pretendard-Regular", size: 20))
////                        .font(.title)
////                        .foregroundColor(.white)
//                        .padding()
//                        .cornerRadius(10)
//                }
//                .padding(.bottom, 20)
            }
        }.onAppear {
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
        StartView()
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
