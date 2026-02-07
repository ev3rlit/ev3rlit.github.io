import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';

const CqrsArchitecture = () => (
    <div className="w-full bg-white dark:bg-stone-950 p-8 font-mono text-sm text-stone-900 dark:text-stone-100">
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center text-stone-900 dark:text-stone-100 text-xs tracking-widest mb-8">CQRS + Event Sourcing · 도메인 설계</div>

            {/* Command Side */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">Command Side — 쓰기</div>
                <div className="space-y-2 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        클라이언트 요청
                        <span className="text-stone-500 dark:text-stone-400 ml-1 text-xs">(상태 변경)</span>
                    </div>
                    <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">명령 핸들러 → Aggregate</div>
                    <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">이벤트 저장소에 기록</div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 도메인 이벤트 발행 ↓</div>

            {/* Event Bus */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">Event Bus — Watermill (Redis Stream)</div>
                <div className="flex items-center justify-center gap-3 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">이벤트 발행</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">도메인 간 전달</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">구독자 처리</div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ ReadModel 동기화 ↓</div>

            {/* Query Side */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">Query Side — 읽기</div>
                <div className="flex items-center gap-3 text-center">
                    <div className="flex-1 border border-stone-200 dark:border-stone-700 p-2">프로젝터</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="flex-1 border border-stone-200 dark:border-stone-700 p-2 font-bold">화면별 ReadModel</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="flex-1 border border-stone-200 dark:border-stone-700 p-2">클라이언트 응답</div>
                </div>
            </div>

            {/* Bounded Context 분리 */}
            <div className="mt-6 border-t border-dashed border-stone-300 dark:border-stone-600 pt-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3 text-center">Bounded Context 분리</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                        { name: 'Mining Domain', desc: '개발 · 채광' },
                        { name: 'Transport Domain', desc: '이송' },
                        { name: 'Looting Domain', desc: '약탈 · 방어' }
                    ].map((ctx) => (
                        <div key={ctx.name} className="border border-stone-200 dark:border-stone-700 p-3">
                            <div className="font-bold text-xs">{ctx.name}</div>
                            <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">{ctx.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export const Detail_GuildMineCqrs = () => (
    <SwissProjectDetail
        projectInfo={{
            number: "014",
            title: "연합 금광 — 도메인 설계와 CQRS",
            description: "기획팀과 협의하여 도메인을 분리하고, CQRS + 이벤트 소싱으로 20개 이상의 API를 지원하는 아키텍처를 설계",
            role: "Backend Engineer",
            period: "2025.04 — 2025.09",
            status: "운영 중",
            links: {}
        }}
        overview={{
            intro: "연합 금광은 연합원들이 함께 광산을 개발하고, 금광석을 채취·이송하며, 다른 연합의 수레를 약탈하거나 방어하는 실시간 멀티플레이어 길드 컨텐츠입니다. 여러 참여자가 동시에 같은 자원에 접근하면서 발생하는 동시성 충돌과, 외부 요인에 의한 상태 변경을 처리해야 하는 것이 핵심 난제였습니다.",
            goals: "4개 하위 시스템(채광·이송·약탈·방어)의 도메인을 분리하고, CQRS + 이벤트 소싱으로 20개 이상의 API를 지원하는 확장 가능한 아키텍처 설계",
            strategy: "기획팀과 협의하여 장수 중복 사용을 허용함으로써 Mining/Looting 도메인을 분리하고, CQRS + 이벤트 소싱으로 읽기/쓰기를 분리했습니다. 이벤트 기반으로 도메인 간 느슨한 결합을 달성하여 각 시스템이 독립적으로 확장할 수 있는 구조를 만들었습니다."
        }}
        keywords={[
            { category: "Language", items: ["Go"] },
            { category: "Database", items: ["MongoDB", "Redis"] },
            { category: "Messaging", items: ["Redis Stream", "Watermill"] },
            { category: "Pattern", items: ["CQRS", "Event Sourcing", "Bounded Context"] }
        ]}
        architecture={<CqrsArchitecture />}
        architectureDescription={[
            "## CQRS + 이벤트 소싱 도입 이유",
            "",
            "연합 금광에서 CQRS + 이벤트 소싱을 선택한 근거는 크게 세 가지입니다.",
            "",
            "### 1. 외부 요인에 의한 상태 변경",
            "",
            "광산에 배치된 장수(일꾼)는 길드원 탈퇴, 권한 변경, 장수 레벨업 등 **외부 요인에 의해 상태가 변경**되어야 합니다. 전통적인 방식으로 처리하면 길드 관리 코드가 광산·이송·약탈 시스템을 직접 참조하는 강결합 구조가 됩니다.",
            "",
            "이벤트 기반으로 전환하면 길드 서비스는 `GuildMemberLeftEvent`만 발행하고, 각 하위 시스템이 이를 독립적으로 구독하여 처리합니다.",
            "",
            "### 2. Read >> Write 비대칭",
            "",
            "연합 금광 특성상 대부분의 사용자 행동은 광산 상태 조회, 이송 현황 확인 등 **읽기**입니다. 상태를 변경하는 행위(장수 배치, 이송 시작, 약탈 시도)는 상대적으로 드뭅니다. 읽기와 쓰기를 분리하면 각각 독립적으로 최적화할 수 있습니다.",
            "",
            "### 3. 20개 이상의 API와 다양한 UI 페이지",
            "",
            "하나의 정규화된 모델로 20개 이상의 서로 다른 화면을 효율적으로 서빙하려면 결국 화면별로 별도 쿼리를 만들게 됩니다. CQRS는 이를 명시적으로 인정하여 **화면 목적별 ReadModel**을 설계할 수 있게 합니다.",
            "",
            "### 이벤트 설계 — 총 18개",
            "",
            "| 도메인 | 이벤트 수 | 대표 예시 |",
            "| --- | --- | --- |",
            "| **이송 생명주기** | 9개 | `TransportStarted`, `TransportArrived`, `TransportPausedDueToAlert` |",
            "| **약탈** | 5개 | `LootAlertCreated`, `LootAlertExecutedByScheduled`, `ParticipantLooted` |",
            "| **방어** | 3개 | `DefenseStarted`, `DefenseSucceeded`, `DefenseFailed` |",
            "| **연동** | 1개 | `LootingHistoryIntegration` |",
            "",
            "이송 이벤트가 가장 많은 이유는 약탈 공고에 의한 일시정지·재개, 전량 약탈에 의한 실패 등 **외부 요인에 의한 상태 전이**가 다양하기 때문입니다.",
            "",
            "## 회고: 완성도 vs 기한",
            "",
            "돌이켜보면, 먼저 낙관적 동시성 제어(Optimistic Concurrency Control)만으로 단순하게 시작하고 성능 병목이 실제로 발생했을 때 구조를 개선해도 늦지 않았을 것입니다. 이 경험을 통해 **동작하는 코드를 먼저 만들고 필요할 때 개선하는 접근**이, 완벽한 설계를 추구하다 기한을 놓치는 것보다 낫다는 교훈을 얻었습니다."
        ].join("\n")}
        mainTasks={[
            {
                title: "기획팀과의 도메인 분리 협의",
                description: "장수 상태 소유권 분석표를 작성하여 Mining/Looting 도메인 분리를 제안. 장수 중복 사용 허용으로 규칙을 변경하여 크로스 길드 트랜잭션 복잡성을 제거"
            },
            {
                title: "CQRS + 이벤트 소싱 아키텍처 설계 및 구현",
                description: "외부 요인에 의한 상태 변경 문제를 이벤트 기반 느슨한 결합으로 해결. 화면 목적별 ReadModel을 설계하여 20개 이상의 API를 효율적으로 서빙"
            }
        ]}
        challenges={[
            {
                problem: "도메인 간 강결합: 장수 엔티티가 모든 시스템에 걸쳐 있어 외부 이벤트 처리 시 직접 의존 구조",
                solution: "이벤트 기반 느슨한 결합: 도메인 이벤트 발행 + 기획팀과 장수 중복 사용 합의로 물리적 분리"
            }
        ]}
    />
);
