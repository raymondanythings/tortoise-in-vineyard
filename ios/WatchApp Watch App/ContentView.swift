import SwiftUI
import WatchConnectivity

class ContentViewWrapper: NSObject {
    private var isSessionActivated = false
    
    override init() {
        super.init()
        
        activateWCSession()
    }
    
    private func activateWCSession() {
        guard WCSession.isSupported() else {
            print("WCSession is not supported on this device.")
            return
        }
        
        let session = WCSession.default
        session.delegate = self
        session.activate()
        
        isSessionActivated = session.isReachable
    }
    
    func sendMessage() {
        guard WCSession.default.isReachable else {
            print("WCSession is not reachable.")
            return
        }
        
        let message: [String: Any] = ["watchMessage": "Hello from WatchOS!"]
        
        WCSession.default.sendMessage(message, replyHandler: { replyMessage in
            // iOS 앱에서 보낸 응답 처리
            if let response = replyMessage["response"] as? String {
                print("Received response from iOS: \(response)")
            }
        }, errorHandler: { error in
            print("Error sending message to iOS: \(error.localizedDescription)")
        })
    }
}

extension ContentViewWrapper: WCSessionDelegate {
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        isSessionActivated = activationState == .activated
    }
    
    // iOS 앱에서 WatchOS로 데이터를 전송했을 때 동작하는 메서드
    func session(_ session: WCSession, didReceiveMessage message: [String: Any]) {
        // WatchOS에서 iOS 앱으로부터 메시지를 받았을 때 동작하는 코드
        
        // 수신한 데이터 처리
        if let watchMessage = message["watchMessage"] as? String {
            print("Received data from iOS: \(watchMessage)")
            
            // iOS 앱에 응답 전송
            let responseMessage: [String: Any] = ["response": "Message received on WatchOS!"]
            session.sendMessage(responseMessage, replyHandler: nil, errorHandler: { error in
                print("Error sending response to iOS: \(error.localizedDescription)")
            })
        }
    }
}

struct ContentView: View {
    let wrapper = ContentViewWrapper()
    
    var body: some View {
        VStack {
            Text("Send to iOS")
            
            Button(action: {
                wrapper.sendMessage()
            }) {
                Text("Send")
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
