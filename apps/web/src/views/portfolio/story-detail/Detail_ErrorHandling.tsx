import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
import { getFeatureNumber } from '@/widgets/portfolio/swissminimal/ui/featureData';

const ErrorHandlingArchitecture = () => (
    <div className="w-full bg-white dark:bg-stone-950 p-8 font-mono text-sm text-stone-900 dark:text-stone-100">
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center text-stone-900 dark:text-stone-100 text-xs tracking-widest mb-8">AS-IS · TO-BE 에러 처리 흐름</div>

            {/* AS-IS */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">AS-IS — 무음 실패</div>
                <div className="space-y-2 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <span className="font-bold">에러 발생</span>
                    </div>
                    <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        return err / nil
                    </div>
                    <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="border border-stone-200 dark:border-stone-700 p-2">
                            <span className="text-stone-500 dark:text-stone-400 text-xs">로깅만 하고 무시</span>
                        </div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2">
                            <span className="text-stone-500 dark:text-stone-400 text-xs">에러 코드 없음 → 클라이언트 응답 불가</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ oops Fork → nope 패키지 개발 ↓</div>

            {/* TO-BE */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">TO-BE — 구조화된 에러 전파</div>
                <div className="space-y-2 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <span className="font-bold">에러 발생</span>
                    </div>
                    <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        nope.Code(code).With(context).Errorf(msg)
                    </div>
                    <div className="text-stone-400 dark:text-stone-500 text-xs">↓ 스택 트레이스 자동 수집</div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        nope.Wrap(err)
                        <span className="text-stone-500 dark:text-stone-400 ml-2 text-xs">컨텍스트 누적</span>
                    </div>
                    <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="border border-stone-200 dark:border-stone-700 p-2">
                            <span className="font-bold">서버 로그</span>
                            <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">코드 + 메시지 + 컨텍스트 + 스택</div>
                        </div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2">
                            <span className="font-bold">err.Public()</span>
                            <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">에러 코드 + 메시지만 반환</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const Detail_ErrorHandling = () => (
    <SwissProjectDetail
        projectInfo={{
            number: getFeatureNumber("error-handling"),
            title: "에러 추적 시스템 구축",
            description: "프로젝트 합류 후 에러 핸들링 부재를 발견하고, oops 라이브러리를 Fork하여 에러 코드·컨텍스트·스택 트레이스를 포함한 구조화된 에러 시스템을 구축했습니다.",
            role: "Backend Engineer",
            period: "2024.03",
            links: {}
        }}
        overview={{
            intro: "프로젝트에 한 달 늦게 합류하여 구조를 분석한 결과, 에러 코드 개념이 없고 Go 기본 에러만 사용하며, 에러를 무시하거나 로깅만 하고 넘어가는 상태를 발견했습니다.",
            goals: "에러 발생 시 \"왜, 어디서, 어떤 상황에서\" 발생했는지 체계적으로 기록하는 시스템 구축",
            strategy: "errors.Wrap 패턴 조사 → samber/oops 발견 → 정수형 에러 코드를 위해 Fork → nope 패키지 개발"
        }}
        keywords={[
            { category: "Language", items: ["Go"] },
            { category: "Library", items: ["oops (fork) → nope"] },
            { category: "Pattern", items: ["Error Wrapping", "Builder Pattern"] },
            { category: "Client", items: ["Unreal Engine (정수형 에러 코드)"] }
        ]}
        architecture={<ErrorHandlingArchitecture />}
        architectureDescription={[
            "## oops → nope Fork 과정",
            "",
            "에러 처리 방식을 조사하면서 `errors.Wrap`을 통해 에러를 상위 코드까지 전파하는 패턴을 알게 되었고, **에러 코드**, **발생 당시 인자**, **스택 트레이스**까지 모두 충족하는 `samber/oops` 패키지에 도달했습니다. 하지만 에러 코드가 **문자열 타입**이라 Unreal Engine의 정수형 enum과 호환되지 않아, Fork하여 `nope` 패키지를 개발했습니다.",
            "",
            "### 3가지 주요 변경사항",
            "",
            "| 변경 | 내용 |",
            "| --- | --- |",
            "| **에러 코드 정수형 변환** | 문자열 → int로 변경하여 Unreal Engine enum 호환 |",
            "| **Wrapping 시 코드 재정의** | cause의 코드가 아닌 wrapping한 에러의 코드를 반환하도록 수정 |",
            "| **PublicNopeError 추가** | `err.Public()` 호출 시 스택·내부 경로 제외, 에러 코드와 메시지만 반환 |",
            "",
            "### 에러 빌더 사용 예시",
            "",
            "```go",
            "// 에러 빌더 초기화 — 컨텍스트 정보 누적",
            "errBuilder := nope.With(\"productIndex\", productIndex).",
            "    With(\"quantity\", quantity)",
            "",
            "// 입력 유효성 확인 — 에러 코드 + 메시지 생성",
            "if quantity <= 0 {",
            "    return nil, errBuilder.CodeError(",
            "        ue.SBLErrorCode.PurchaseQuantityNegative,",
            "        ue.CodeText,",
            "    )",
            "}",
            "",
            "// 하위 에러 Wrapping — 스택 트레이스 + 컨텍스트 포함",
            "if err != nil {",
            "    return nil, errBuilder.Wrap(err)",
            "}",
            "```",
            "",
            "### 실제 에러 로그 JSON",
            "",
            "```json",
            "{",
            "  \"code\": 343,",
            "  \"context\": {",
            "    \"requestMethod\": \"PurchaseProduct\",",
            "    \"productIndex\": 1001,",
            "    \"quantity\": -1",
            "  },",
            "  \"stacktrace\": \"Cause: PurchaseQuantityNegative\\n  --- at shop_service.go:213\",",
            "  \"time\": \"2024-03-15T14:32:18Z\"",
            "}",
            "```",
            "",
            "## 팀 온보딩",
            "",
            "에러 라이브러리 개발 완료 후 팀원들에게 온보딩을 진행했습니다. 기존 에러 처리의 문제점을 공유하고, 실제 도메인 코드(shop_service.go)에 미리 적용한 예시를 보여주어 사용법을 안내했습니다.",
            "",
            "## 회고",
            "",
            "### 에러는 단순한 문자열이 아니다",
            "",
            "구조화된 에러는 디버깅 시간을 크게 단축시킵니다. 에러에는 \"무엇이, 어디서, 왜\" 발생했는지가 담겨야 합니다.",
            "",
            "### 오픈소스 Fork의 가치",
            "",
            "완벽한 라이브러리를 찾기보다 기존 것을 커스터마이징하는 것이 효율적입니다. Fork 시 원본과의 차이점을 명확히 문서화해야 유지보수가 용이합니다.",
            "",
            "### 클라이언트/서버 경계의 보안",
            "",
            "내부 에러와 외부 노출 에러를 명확히 구분해야 보안이 유지됩니다. `Public()` 메서드를 통한 정보 필터링 패턴이 효과적이었습니다."
        ].join("\n")}
        mainTasks={[
            {
                title: "에러 처리 라이브러리 조사 및 Fork 결정",
                description: "errors.Wrap 패턴 조사 → samber/oops 발견 → 에러 코드가 문자열 타입이라 Unreal Engine 정수형 enum과 호환되지 않아 Fork 결정"
            },
            {
                title: "nope 패키지 개발",
                description: "정수형 에러 코드 변환, Wrapping 시 에러 코드 재정의, PublicNopeError 추가 — 3가지 핵심 변경사항 구현"
            },
            {
                title: "실제 도메인 코드 적용 및 팀 온보딩",
                description: "shop_service.go 등 실제 도메인 코드에 미리 적용한 예시를 제공하고, AS-IS/TO-BE 비교로 팀의 이해도 향상"
            }
        ]}
        challenges={[
            {
                problem: "문자열 에러 코드 호환성 문제: oops의 에러 코드가 문자열 타입이라 Unreal Engine의 정수형 enum과 호환되지 않았음",
                solution: "oops Fork 및 커스터마이징: 에러 코드를 정수형으로 변경하고, Wrapping 시 에러 코드 재정의가 가능하도록 수정"
            },
            {
                problem: "에러 원인 추적 불가: 에러 발생 시 위치, 당시 파라미터, 호출 경로를 알 수 없어 재발을 기다려야 했음",
                solution: "구조화된 에러 시스템 도입: 스택 트레이스 자동 수집, With()로 컨텍스트 누적, 에러 로그에 코드·메시지·컨텍스트·스택 모두 포함"
            },
            {
                problem: "내부 에러 클라이언트 노출: 스택 트레이스, DB 에러 등 민감 정보가 그대로 전달될 위험",
                solution: "Public 에러 분리: err.Public() 호출 시 에러 코드와 메시지만 반환하도록 PublicNopeError 추가"
            }
        ]}
    />
);
