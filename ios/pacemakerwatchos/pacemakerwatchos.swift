//
//  pacemakerwatchos.swift
//  pacemakerwatchos
//
//  Created by YongHyun Yeob on 2023/05/28.
//

import AppIntents

struct pacemakerwatchos: AppIntent {
  typealias PerformResult = <#type#>
  
  typealias SummaryContent = <#type#>
  
    static var title: LocalizedStringResource = "pacemakerwatchos"
    
    func  b() async throws -> some IntentResult {
        return .result()
    }
}
