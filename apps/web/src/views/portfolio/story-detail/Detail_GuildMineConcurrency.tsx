import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';

const ConcurrencyArchitecture = () => (
    <div className="w-full bg-white dark:bg-stone-950 p-8 font-mono text-sm text-stone-900 dark:text-stone-100">
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center text-stone-900 dark:text-stone-100 text-xs tracking-widest mb-8">분산 명령 라우팅 · 쓰기 경로 분기</div>

            {/* 클라이언트 + 서버 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">클라이언트 → 서버</div>
                <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <span className="font-bold">WebSocket</span>
                        <span className="text-stone-500 dark:text-stone-400 ml-2">상태 변경</span>
                    </div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <span className="font-bold">HTTP</span>
                        <span className="text-stone-500 dark:text-stone-400 ml-2">읽기 전용</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 서버에서 유스케이스별 분기 ↓</div>

            {/* 쓰기 경로 분기 */}
            <div className="grid grid-cols-2 gap-3">
                {/* 비동기 Command 경로 */}
                <div className="border border-stone-300 dark:border-stone-600 p-4">
                    <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">시간 예약 경로</div>
                    <div className="text-stone-500 dark:text-stone-400 text-xs mb-2">이송 출발, 약탈 실행 등</div>
                    <div className="space-y-2 text-center">
                        <div className="border border-stone-200 dark:border-stone-700 p-2">이벤트 수신 → asynq 예약</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓ 시간 경과 후</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">Command 발행</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2">
                            명령 핸들러
                            <span className="text-stone-500 dark:text-stone-400 ml-1 text-xs">(멱등성 키 검증)</span>
                        </div>
                    </div>
                </div>

                {/* 직접 호출 경로 */}
                <div className="border border-stone-300 dark:border-stone-600 p-4">
                    <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">직접 Aggregate 호출</div>
                    <div className="text-stone-500 dark:text-stone-400 text-xs mb-2">약탈, 방어 등 강한 일관성</div>
                    <div className="space-y-2 text-center">
                        <div className="border border-stone-200 dark:border-stone-700 p-2">서비스 메서드 호출</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">Aggregate 직접 실행</div>
                        <div className="text-stone-400 dark:text-stone-500 text-xs">↓</div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2">
                            낙관적 동시성 재시도
                            <span className="text-stone-500 dark:text-stone-400 ml-1 text-xs">(즉시 결과 반환)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 이벤트 저장소 ↓</div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 이벤트 발행 ↓</div>

            {/* Event Bus */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">Event Bus — Watermill (Redis Stream)</div>
                <div className="flex items-center justify-center gap-3 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">이벤트 발행</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">멱등성 키 검증</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">구독자 전달</div>
                </div>
            </div>
        </div>
    </div>
);

export const Detail_GuildMineConcurrency = () => (
    <SwissProjectDetail
        projectInfo={{
            number: "015",
            title: "연합 금광 — 분산 동시성 제어",
            description: "Redis Stream 기반 명령 라우팅과 멱등성 키, 직접 Aggregate 호출로 분산 서버 환경의 데이터 일관성 확보",
            role: "Backend Engineer",
            period: "2025.04 — 2025.09",
            status: "운영 중",
            links: {}
        }}
        overview={{
            intro: "연합 금광은 분산 서버 환경에서 동작하며, 여러 서버가 동시에 같은 리소스에 명령을 보내면 낙관적 동시성 제어 재시도가 폭증하는 동시성 문제가 있었습니다. 또한 광산 3개 × 광산당 캐릭터 30명 + 이송 수레 데이터를 매번 전체 전송하는 실시간 데이터 전송의 비효율도 해결해야 했습니다.",
            goals: "분산 서버 환경에서 데이터 일관성을 확보하면서, 실시간 멀티플레이어 상태 동기화의 효율성 달성",
            strategy: "Redis Stream(Watermill)으로 분산 서버 간 명령을 단일 서버로 라우팅하고, Redis 분산 락 + 낙관적 동시성 제어를 조합했습니다. 강한 일관성이 필요한 작업은 Aggregate를 직접 호출하고, 비동기 처리가 가능한 작업만 Command로 분리하는 이중 전략을 적용했습니다."
        }}
        keywords={[
            { category: "Language", items: ["Go"] },
            { category: "Database", items: ["MongoDB", "Redis"] },
            { category: "Messaging", items: ["Redis Stream", "Watermill"] },
            { category: "Pattern", items: ["분산 락", "낙관적 동시성 제어", "멱등성 키", "asynq"] },
            { category: "Protocol", items: ["WebSocket", "HTTP"] }
        ]}
        architecture={<ConcurrencyArchitecture />}
        architectureDescription={[
            "## Redis Stream 선택 이유",
            "",
            "분산 서버 환경에서 여러 서버가 동시에 같은 리소스에 명령을 보내면 낙관적 동시성 제어 재시도가 폭증합니다. Redis Stream의 Consumer Group으로 **명령을 단일 서버로 라우팅**하여 이 문제를 해결했습니다.",
            "",
            "| 대안 | 판단 |",
            "| --- | --- |",
            "| Kafka | 인프라 복잡성 대비 오버엔지니어링 |",
            "| RabbitMQ | 추가 인프라 필요, 이미 Redis 사용 중 |",
            "| **Redis Stream** | 기존 인프라 활용, Consumer Group + 메시지 지속성 |",
            "",
            "ExactlyOnceDelivery를 지원하지 않으므로, 모든 커맨드 핸들러에서 **멱등성 키 기반 중복 처리 방지**를 어플리케이션 레벨에서 구현했습니다.",
            "",
            "### 멱등성 검증 예시",
            "",
            "모든 커맨드에 고유 ID를 포함하고, 핸들러에서 처리 전 상태를 확인하여 중복 실행을 방지합니다.",
            "",
            "```go",
            "// 약탈 실행 커맨드",
            "type ExecuteLootCommand struct {",
            "    LootID primitive.ObjectID  // 고유 ID로 멱등성 검증",
            "}",
            "",
            "func (h *LootHandler) Handle(cmd ExecuteLootCommand) error {",
            "    // 1. 이미 처리 중인지 확인",
            "    if h.repo.IsLootInProgress(cmd.LootID) {",
            "        return nil  // 중복 무시",
            "    }",
            "    // 2. 이미 완료되었는지 확인",
            "    if h.repo.IsLootCompleted(cmd.LootID) {",
            "        return nil  // 중복 무시",
            "    }",
            "    // 3. 실제 처리",
            "    return h.processLoot(cmd)",
            "}",
            "```",
            "",
            "| 커맨드 | 멱등성 키 | 검증 로직 |",
            "| --- | --- | --- |",
            "| 약탈 시작 | `LootID` | 이미 진행 중인지 확인 |",
            "| 약탈 완료 | `LootID` | 이미 완료되었는지 확인 |",
            "| 이송 참가 | `TransportID + UserID` | 이미 참가했는지 확인 |",
            "| 방어 성공 | `LootID + DefenderID` | 이미 방어 처리되었는지 확인 |",
            "",
            "## 동기 처리와 비동기 예약의 분리",
            "",
            "대부분의 사용자 요청(이송 모집, 이송 참가, 약탈 공고, 약탈 방어)은 **Aggregate를 직접 호출**하여 즉시 처리하고, 이벤트를 발행하여 ReadModel을 동기화합니다. 비동기 Command는 **시간 예약이 필요한 작업**에서만 사용했습니다.",
            "",
            "### 약탈 공고(AlertLoot) 흐름 예시",
            "",
            "```go",
            "// 1단계: Looting 도메인 — 낙관적 동시성 제어로 약탈 공고 생성",
            "lootAggregate, err := s.findOneAndUpsert(ctx, guildId,",
            "    func(agg *LootAggregate) (*LootAggregate, error) {",
            "        session, err := agg.AlertLoot(transportId, ...)",
            "        return agg, err",
            "    })",
            "",
            "// 2단계: Transport 도메인 — 낙관적 동시성 제어로 수레에 약탈 공고 등록",
            "reply, err := s.transportService.AlertLoot(ctx, transportId, ...)",
            "if err != nil {",
            "    // 실패 시 1단계 롤백",
            "    s.rollbackLootingSession(ctx, userId, guildId, alertId)",
            "}",
            "",
            "// 3단계: 이벤트 발행 → Transport ReadModel 업데이트",
            "```",
            "",
            "### 시간 예약 — asynq + Command",
            "",
            "약탈 공고 후 30분 이내에 방어하지 않으면 참여자 중 한 명을 자동으로 약탈 처리해야 합니다. `LootAlertCreatedEvent`를 수신한 스케줄 서비스가 asynq로 태스크를 예약하고, 시간이 지나면 `ExecuteLootCommand`를 발행하여 처리합니다.",
            "",
            "| 예약 작업 | 트리거 | 처리 방식 |",
            "| --- | --- | --- |",
            "| 약탈 실행 | `LootAlertCreatedEvent` → 30분 후 | asynq 예약 → `ExecuteLootCommand` 발행 |",
            "| 이송 출발 | 모집 완료 → 30분 후 | asynq 예약 → 이송 출발 Command 발행 |",
            "| 이송 완료 | 이송 출발 → 2시간 후 | asynq 예약 → 이송 완료 Command 발행 |",
            "",
            "| 작업 | 경로 | 이유 |",
            "| --- | --- | --- |",
            "| 이송 모집·참가, 약탈 공고·방어 | **Aggregate 직접 호출** + 이벤트 발행 | 즉시 결과 반환 필요 |",
            "| 이송 출발, 이송 완료, 약탈 실행 | **asynq 예약** → Command 발행 | 시간 예약 기반 비동기 처리 |",
            "",
            "사용자 요청은 즉시 처리하고, 시간 조건이 필요한 후속 작업만 asynq로 예약하여 Command를 발행합니다."
        ].join("\n")}
        mainTasks={[
            {
                title: "Redis Stream 기반 분산 명령 라우팅",
                description: "Watermill의 Redis Stream 구현체로 Consumer Group 기반 단일 서버 처리. ExactlyOnceDelivery 미지원을 멱등성 키 기반 중복 방지로 보완"
            },
            {
                title: "WebSocket/HTTP 프로토콜 분리",
                description: "읽기 전용 API는 HTTP로 분리하여 커넥션 병목 없이 병렬 처리. 상태 변경은 WebSocket으로 유지하여 CQRS 패턴과 일관성 유지"
            }
        ]}
        challenges={[
            {
                problem: "분산 서버 동시성 충돌: 다중 서버에서 동시에 같은 리소스에 명령을 보내면 낙관적 동시성 제어 재시도 폭증",
                solution: "Redis Stream 단일 서버 라우팅: Consumer Group + Redis 분산 락 + 멱등성 키 보완"
            },
            {
                problem: "실시간 데이터 전송 비효율: 광산 3개 × 광산당 캐릭터 30명 + 이송 수레 데이터(개수 제한 없음)를 매번 전체 전송하는 것은 비효율적",
                solution: "TrackingContainer 재활용: 서버에서 마지막 응답을 캐싱하고 변경분만 전송. 기존 유저 데이터 동기화 시스템을 재활용하여 트래픽 최적화"
            }
        ]}
    />
);
