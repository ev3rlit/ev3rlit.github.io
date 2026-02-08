import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';

const TrackingContainerArchitecture = () => (
    <div className="w-full bg-white dark:bg-stone-950 p-8 font-mono text-sm text-stone-900 dark:text-stone-100">
        <div className="max-w-3xl mx-auto space-y-10">

            {/* AS-IS / TO-BE 비교 */}
            <div className="text-center text-stone-900 dark:text-stone-100 text-xs tracking-widest mb-8">AS-IS / TO-BE 비교</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AS-IS */}
                <div className="border border-stone-300 dark:border-stone-600 p-5">
                    <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-4 font-bold">AS-IS</div>
                    <div className="space-y-2 text-center">
                        <div className="border border-stone-200 dark:border-stone-700 p-2">요청 수신</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">DB Read</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2">비즈니스 로직 처리</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">DB Write</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2">응답</div>
                    </div>
                    <div className="mt-3 text-stone-500 dark:text-stone-400 text-xs text-center">
                        매 요청마다 DB Round-trip 반복
                    </div>
                </div>

                {/* TO-BE */}
                <div className="border border-stone-300 dark:border-stone-600 p-5">
                    <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-4 font-bold">TO-BE</div>
                    <div className="space-y-2 text-center">
                        <div className="border border-stone-200 dark:border-stone-700 p-2">요청 수신</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">인메모리 Read / Write</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2">비즈니스 로직 처리</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs flex justify-center gap-8">
                            <span>↓</span>
                            <span>↓</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="border border-stone-200 dark:border-stone-700 p-2 text-xs">
                                <span className="font-bold">Diff</span>만 전송
                                <div className="text-stone-400 dark:text-stone-500 mt-1">→ 클라이언트</div>
                            </div>
                            <div className="border border-stone-200 dark:border-stone-700 p-2 text-xs">
                                주기적 <span className="font-bold">Write-back</span>
                                <div className="text-stone-400 dark:text-stone-500 mt-1">→ DB</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 text-stone-500 dark:text-stone-400 text-xs text-center">
                        DB 접근 제거, 변경분만 전송
                    </div>
                </div>
            </div>

            {/* 구분선 */}
            <div className="border-t border-dashed border-stone-300 dark:border-stone-600" />

            {/* 인터셉터 연동 시퀀스 */}
            <div className="text-center text-stone-900 dark:text-stone-100 text-xs tracking-widest mb-6">인터셉터 연동 시퀀스</div>

            {/* 요청 처리 흐름 */}
            <div className="border border-stone-300 dark:border-stone-600 p-5">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-4 font-bold">요청 처리 흐름</div>

                {/* 1. 요청 수신 */}
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs">
                        <div className="border border-stone-200 dark:border-stone-700 p-2">클라이언트 요청</div>
                        <span className="text-stone-400 dark:text-stone-500">→</span>
                        <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">웹소켓 인터셉터</div>
                        <span className="text-stone-400 dark:text-stone-500">→</span>
                        <div className="border border-stone-200 dark:border-stone-700 p-2">핸들러</div>
                        <span className="text-stone-400 dark:text-stone-500">→</span>
                        <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">TrackingContainer</div>
                        <span className="text-stone-500 dark:text-stone-400 text-xs">(인메모리 읽기/쓰기)</span>
                    </div>

                    <div className="text-center text-stone-400 dark:text-stone-500 text-xs">↓ 핸들러 처리 완료 후 ↓</div>

                    {/* 2. 성공 / 에러 분기 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 성공 경로 */}
                        <div className="border border-stone-300 dark:border-stone-600 p-4">
                            <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3 font-bold">성공 시</div>
                            <div className="space-y-2 text-center text-xs">
                                <div className="border border-stone-200 dark:border-stone-700 p-2">인터셉터 → <span className="font-bold">CommitPatch()</span></div>
                                <div className="text-stone-400 dark:text-stone-500">↓</div>
                                <div className="border border-stone-200 dark:border-stone-700 p-2">원본과 작업본 비교 → 변경분 추출</div>
                                <div className="text-stone-400 dark:text-stone-500">↓</div>
                                <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">BSON Patch → 클라이언트 전송</div>
                                <div className="text-stone-400 dark:text-stone-500">↓</div>
                                <div className="border border-stone-200 dark:border-stone-700 p-2">원본을 작업본으로 갱신</div>
                            </div>
                        </div>

                        {/* 에러 경로 */}
                        <div className="border border-stone-300 dark:border-stone-600 p-4">
                            <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3 font-bold">에러 시</div>
                            <div className="space-y-2 text-center text-xs">
                                <div className="border border-stone-200 dark:border-stone-700 p-2">인터셉터 → <span className="font-bold">Rollback()</span></div>
                                <div className="text-stone-400 dark:text-stone-500">↓</div>
                                <div className="border border-stone-200 dark:border-stone-700 p-2">작업본을 원본으로 복원</div>
                                <div className="text-stone-400 dark:text-stone-500">↓</div>
                                <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">변경 전 상태로 원복</div>
                                <div className="mt-2 text-stone-500 dark:text-stone-400 text-xs">다중 컬렉션 변경사항 일괄 원복</div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-stone-400 dark:text-stone-500 text-xs">↓ 응답 ↓</div>

                    {/* 3. 클라이언트 동기화 */}
                    <div className="border border-stone-300 dark:border-stone-600 p-4">
                        <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3 font-bold">클라이언트 데이터 동기화</div>
                        <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs">
                            <div className="border border-stone-200 dark:border-stone-700 p-2">Patch 수신</div>
                            <span className="text-stone-400 dark:text-stone-500">→</span>
                            <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">로컬 데이터에 Patch 적용</div>
                            <span className="text-stone-400 dark:text-stone-500">→</span>
                            <div className="border border-stone-200 dark:border-stone-700 p-2">응답 수신</div>
                        </div>
                        <div className="mt-3 text-stone-500 dark:text-stone-400 text-xs text-center">
                            응답 시점에 이미 동기화 완료 — 별도 동기화 코드 불필요
                        </div>
                    </div>

                    {/* 4. DB Write-back (비동기) */}
                    <div className="border border-dashed border-stone-300 dark:border-stone-600 p-4">
                        <div className="text-xs tracking-widest text-stone-500 dark:text-stone-400 mb-3">비동기 — 주기적 DB 동기화</div>
                        <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs">
                            <div className="border border-stone-200 dark:border-stone-700 p-2">DB 원본과 작업본 비교</div>
                            <span className="text-stone-400 dark:text-stone-500">→</span>
                            <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">Write-back</div>
                            <span className="text-stone-400 dark:text-stone-500">→</span>
                            <div className="border border-stone-200 dark:border-stone-700 p-2">DB 반영</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const Detail_TrackingContainer = () => (
    <SwissProjectDetail
        projectInfo={{
            number: "016",
            title: "유저 데이터\n동기화 시스템",
            description: "유저 데이터를 인메모리로 전환하고, Write-back 캐싱과 BSON Patch Diff로 DB 접근을 제거하여 요청 처리 시간을 90% 단축한 사례입니다.",
            role: "Backend Engineer",
            period: "2024.04 — 2024.04",
            status: "운영 중",
            links: {}
        }}
        overview={{
            intro: "컨텐츠가 추가되면서 유저당 컬렉션과 도큐먼트 수가 늘어났고, 매 요청마다 여러 컬렉션에 읽기-쓰기를 반복하는 구조에서 요청당 약 50ms 지연이 발생했습니다.",
            goals: "DB 접근 제거, 에러 시 자동 롤백, 변경분만 추출하여 클라이언트 자동 동기화",
            strategy: "데이터를 인메모리로 전환 → Write-back 캐싱 + BSON Patch Diff 설계 → 인터셉터 연동으로 자동 커밋/롤백"
        }}
        keywords={[
            { category: "언어", items: ["Go"] },
            { category: "인프라", items: ["MongoDB"] },
            { category: "패턴", items: ["Write-back Cache", "BSON Patch", "Diff/Patch"] },
            { category: "기능", items: ["인메모리 캐싱", "자동 동기화", "자동 롤백"] }
        ]}
        architecture={<TrackingContainerArchitecture />}
        architectureDescription={[
            "## 왜 인메모리로 전환했는가",
            "",
            "WebSocket으로 클라이언트 연결은 stateful하게 유지하면서, 유저 데이터는 매 요청마다 DB에서 새로 읽어오는 **구조적 모순**이 근본 원인이었습니다. 몬스터 처치 1건이 발생하면 퀘스트·CRM·업적 등 여러 컬렉션에 걸쳐 Read-then-Write가 반복되고, 이 과정이 초당 수십~수백 회 누적되면서 요청당 ~50ms 지연이 발생했습니다.",
            "",
            "첫 로그인 시 접근 빈도가 높은 컬렉션을 선행 로딩하여 접속 시간이 다소 증가하지만, 이후 모든 요청에서 DB Round-trip이 제거되므로 **초기 비용을 감수하고 이후 성능을 확보**하는 트레이드오프입니다.",
            "",
            "## 원본을 왜 두 벌로 분리했는가",
            "",
            "클라이언트 동기화는 **매 응답마다** Patch를 보내고, DB 동기화는 **일정 주기마다** Write-back을 수행합니다. 이 주기 차이 때문에 단일 원본으로는 \"어디까지 보냈는지\"를 정확히 추적할 수 없었습니다.",
            "",
            "| 원본 | 역할 | 갱신 시점 |",
            "| --- | --- | --- |",
            "| `patchSource` | 클라이언트 Diff 기준 | CommitPatch() 호출 시 |",
            "| `dbSource` | DB Diff 기준 | Write-back 완료 시 |",
            "| `inner` | 현재 변경 중인 데이터 | 비즈니스 로직 실행 시 |",
            "",
            "## 핵심 코드",
            "",
            "```go",
            "// MongoTrackingStruct: 단일 엔티티 추적",
            "type MongoTrackingStruct[T ue.Comparable[T]] struct {",
            "    inner       T  // 변경된 데이터",
            "    patchSource T  // 클라이언트 동기화용 원본",
            "    dbSource    T  // DB 동기화용 원본",
            "}",
            "",
            "// MongoTrackingContainer: 컬렉션(Map) 추적",
            "type MongoTrackingContainer[K comparable, T Containee[K, T]] struct {",
            "    src   stagedSources[K, T]  // 원본 데이터 (patchStage, dbStage)",
            "    inner map[K]T              // 변경된 데이터",
            "}",
            "```",
            "",
            "`TrackingStruct`는 단일 엔티티를, `TrackingContainer`는 Map 형태의 컬렉션을 추적합니다. 두 구조 모두 제네릭으로 타입 안전성을 보장하면서, `Comparable` 인터페이스를 통해 Diff/Copy 동작을 강제합니다.",
            "",
            "## Diff/Copy 성능 설계",
            "",
            "매 요청마다 Diff 비교와 Deep Copy가 호출되는 구조에서 런타임 리플렉션(`reflect`)을 사용하면 인메모리 처리의 성능 이점이 상쇄될 위험이 있었습니다.",
            "",
            "**코드 자동 생성으로 컴파일 타임에 해결**: 구조체별 비교·복사 함수를 코드 자동 생성으로 미리 구현하여 리플렉션 오버헤드를 완전히 제거했습니다. 새 엔티티가 추가될 때마다 자동 생성 스크립트를 실행하면 해당 구조체의 Diff/Copy 함수가 생성됩니다.",
            "",
            "## 인터셉터 연동",
            "",
            "`UserDocumentTransactioner` 미들웨어가 모든 RPC 요청에서 TrackingContainer의 커밋/롤백을 자동으로 호출합니다.",
            "",
            "1. 핸들러가 정상 반환하면 → `CommitPatch()` → 클라이언트에 변경분 전송",
            "2. 핸들러가 에러를 반환하면 → `Rollback()` → 변경 전 상태로 복원",
            "",
            "```go",
            "func (bc *LocalTrackingContainer[K, T]) Rollback() {",
            "    bc.inner = make(map[K]T)",
            "    var nt T",
            "    for k, v := range bc.src {",
            "        if v == nt { continue }",
            "        bc.inner[k] = v.Copy()",
            "    }",
            "}",
            "```",
            "",
            "비즈니스 로직 개발자는 트랜잭션이나 동기화 코드를 작성할 필요 없이, 인메모리 데이터를 직접 변경하기만 하면 됩니다.",
            "",
            "## 회고",
            "",
            "### Write-back 캐싱의 데이터 불일치 트레이드오프",
            "",
            "인메모리와 DB 사이에 데이터 불일치 구간이 본질적으로 발생합니다. 유저가 WebSocket에 연결된 동안 외부 DB 접근을 차단하여 단일 진입점을 보장하는 방식으로 대응했지만, 서버 장애 시 Write-back 되지 않은 데이터가 유실될 수 있는 위험이 남아 있습니다.",
            "",
            "### 자체 개발의 유지보수 비용",
            "",
            "라이브러리 없이 직접 구현한 BSON Patch Diff/Apply 로직은 엣지 케이스가 많아 지속적으로 버그가 발생했습니다. 다만 이 과정에서 Go 제네릭, BSON 직렬화, 분산 시스템의 일관성 문제에 대해 깊이 이해하게 되었고, 이후 유사한 설계 판단에서 트레이드오프를 보다 정확하게 평가할 수 있는 기반이 되었습니다."
        ].join("\n")}
        mainTasks={[
            {
                title: "인메모리 데이터 전환 설계",
                description: "유저 데이터를 인메모리에 적재하고 Write-back 방식으로 DB에 동기화하는 아키텍처 설계"
            },
            {
                title: "추적 인터페이스 구현",
                description: "원본 2벌(클라이언트용, DB용)을 분리하여 각 동기화 주기를 독립 관리하는 TrackingStruct/TrackingContainer 구현"
            },
            {
                title: "Diff 로직 구현 및 엣지 케이스 해결",
                description: "코드 자동 생성 기반 비교·복사 함수 구현, 단위 테스트로 엣지 케이스 반복 개선"
            },
            {
                title: "롤백 및 인터셉터 연동",
                description: "에러 시 변경 전 상태로 복원하는 롤백 구현, 웹소켓 인터셉터와 연동하여 자동 커밋/롤백"
            }
        ]}
        challenges={[
            {
                problem: "다중 동기화 기준점 관리: 클라이언트 동기화와 DB 동기화의 주기가 달라, 단일 원본으로는 정확한 변경분을 생성할 수 없었음",
                solution: "원본 2벌 분리 설계: 클라이언트 Diff 기준 원본과 DB Diff 기준 원본을 분리하여 각 동기화 주기에 맞는 정확한 변경분 추출"
            },
            {
                problem: "Diff 엣지 케이스 반복 발생: 개발자마다 엔티티 구조와 사용 방식이 달라, 중첩 구조체 부분 변경·배열 순서 변경·nil/zero value 혼재 등 예상치 못한 케이스가 지속 발생",
                solution: "테스트 우선 반복 개선: 새 엣지 케이스 발견 시 재현 테스트를 먼저 추가하고 Diff 로직을 수정하는 방식으로 회귀 방지 체계 구축"
            },
            {
                problem: "리플렉션 기반 비교의 성능 우려: 매 요청마다 비교·복사가 호출되는 구조에서 런타임 리플렉션 오버헤드가 인메모리 처리의 성능 이점을 상쇄할 위험",
                solution: "코드 자동 생성으로 컴파일 타임 해결: 구조체별 비교·복사 함수를 코드 자동 생성으로 미리 구현하여 리플렉션 오버헤드 제거"
            }
        ]}
    />
);
