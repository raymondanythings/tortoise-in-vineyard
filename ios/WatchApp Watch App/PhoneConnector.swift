//
//  PhoneConnector.swift
//  WatchApp Watch App
//
//  Created by YongHyun Yeob on 2023/05/31.
//
import WatchKit
import Foundation
import WatchConnectivity

class PhoneConnector: WKInterfaceController, WCSessionDelegate {
    var session: WCSession?
    
    override func willActivate() {
        super.willActivate()
        
        if WCSession.isSupported() {
            session = WCSession.default
            session?.delegate = self
            session?.activate()
        }
    }
    
    @IBAction func sendDataToiOS() {
        guard let session = session, session.isReachable else {
            print("WCSession is not reachable.")
            return
        }
        
        let message: [String: Any] = ["watchData": "Hello from WatchOS!"]
        session.sendMessage(message, replyHandler: { replyMessage in
            // iOS 앱에서 보낸 응답 처리
            if let response = replyMessage["response"] as? String {
                print("Received response from iOS: \(response)")
            }
        }, errorHandler: { error in
            print("Error sending message to iOS: \(error.localizedDescription)")
        })
    }
    
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        // 세션 활성화 완료 시 동작하는 코드
    }
    
    // iOS 앱에서 WatchOS로 데이터를 전송했을 때 동작하는 메서드
    func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
        // WatchOS에서 iOS 앱으로부터 메시지를 받았을 때 동작하는 코드
        
        // 수신한 데이터 처리
        if let watchData = message["watchData"] as? String {
            print("Received data from iOS: \(watchData)")
            
            // iOS 앱에 응답 전송
            let responseMessage: [String: Any] = ["response": "Message received on WatchOS!"]
            session.sendMessage(responseMessage, replyHandler: nil, errorHandler: { error in
                print("Error sending response to iOS: \(error.localizedDescription)")
            })
        }
    }
}
