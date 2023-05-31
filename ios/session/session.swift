//
//  session.swift
//  session
//
//  Created by YongHyun Yeob on 2023/05/31.
//

import AppIntents

struct session: AppIntent {
    static var title: LocalizedStringResource = "session"
    
    func perform() async throws -> some IntentResult {
        return .result()
    }
}
