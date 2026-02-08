import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
import { getFeatureNumber } from '@/widgets/portfolio/swissminimal/ui/featureData';

const RevenueArchitecture = () => (
    <div className="w-full bg-white dark:bg-stone-950 p-8 font-mono text-sm text-stone-900 dark:text-stone-100">
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center text-stone-900 dark:text-stone-100 text-xs tracking-widest mb-8">3단계 환율 캐싱 · 온디맨드 매출 집계</div>

            {/* 매출 조회 API */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">매출 조회 API</div>
                <div className="grid grid-cols-2 gap-2 text-center">
                    {['상품별 일자 매출', '상품별 기간 매출', '일별 총 매출', '기간별 총 매출'].map((t) => (
                        <div key={t} className="border border-stone-200 dark:border-stone-700 p-2">
                            {t}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 병렬 집계 ↓</div>

            {/* 집계 서비스 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">집계 서비스</div>
                <div className="flex items-center justify-center gap-3 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">거래 내역 조회</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">환율 환산</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">플랫폼별 분류</div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 환율 조회 ↓</div>

            {/* 3단계 환율 캐시 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">환율 서비스 — 3단계 캐시</div>
                <div className="space-y-2">
                    {[
                        { tier: '1단계', label: 'Redis', detail: '주요 통화 1h / 기타 3h' },
                        { tier: '2단계', label: 'MongoDB', detail: '날짜별 버킷 패턴 영구 저장' },
                        { tier: '3단계', label: '외부 API', detail: '폴백 (지수 백오프)' }
                    ].map((t) => (
                        <div key={t.tier} className="flex items-center gap-3">
                            <div className="w-14 text-right text-stone-400 dark:text-stone-500">{t.tier}</div>
                            <div className="flex-1 border border-stone-200 dark:border-stone-700 p-2 flex justify-between">
                                <span className="font-bold">{t.label}</span>
                                <span className="text-stone-500 dark:text-stone-400">{t.detail}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 결과 저장 ↓</div>

            {/* 온디맨드 집계 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">온디맨드 집계 — 스케줄러 없음</div>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-16 text-right text-stone-400 dark:text-stone-500 text-xs">조회 시</div>
                        <div className="flex-1 border border-stone-200 dark:border-stone-700 p-2 text-center">
                            Redis 캐시
                            <span className="text-stone-400 dark:text-stone-500 mx-2">→</span>
                            MongoDB
                            <span className="text-stone-400 dark:text-stone-500 mx-2">→</span>
                            <span className="font-bold">실시간 계산</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-16 text-right text-stone-400 dark:text-stone-500 text-xs">계산 후</div>
                        <div className="flex-1 border border-stone-200 dark:border-stone-700 p-2 text-center">
                            집계 결과
                            <span className="text-stone-400 dark:text-stone-500 mx-2">→</span>
                            <span className="font-bold">MongoDB 저장 + Redis 캐싱</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 버킷 패턴 요약 */}
            <div className="mt-6 border-t border-dashed border-stone-300 dark:border-stone-600 pt-4 space-y-2 text-center text-stone-500 dark:text-stone-400">
                <div><span className="text-stone-900 dark:text-stone-100">구조</span> — 날짜별 1개 도큐먼트에 전체 통화 환율을 버킷으로 저장</div>
                <div><span className="text-stone-900 dark:text-stone-100">조회</span> — 필요한 통화만 projection으로 추출</div>
                <div><span className="text-stone-900 dark:text-stone-100">이점</span> — 통화쌍별 도큐먼트 대비 관리 단순화</div>
            </div>
        </div>
    </div>
);

export const Detail_RevenueApi = () => (
    <SwissProjectDetail
        projectInfo={{
            number: getFeatureNumber("revenue-api"),
            title: "매출 집계 API",
            description: "3개 스토어의 다통화 결제 데이터를 원화로 환산하고, 상품별·기간별·플랫폼별 매출 통계를 제공하는 운영툴 API",
            role: "Backend Engineer",
            period: "2025.04 — 2025.06",
            links: {}
        }}
        overview={{
            intro: "퍼블리셔 의존에서 벗어나 자체 매출 집계 시스템이 필요해졌습니다. Google Play, App Store, Galaxy Store 3개 스토어의 영수증에는 각 결제 건의 현지 통화로 금액이 기록됩니다. 이 다양한 통화의 결제 데이터를 원화(KRW)로 환산하고, 상품별·기간별 매출 통계를 제공해야 하는 과제였습니다.",
            goals: "상품별/일별/기간별/플랫폼별 매출 조회 REST API 구축과, 글로벌 다통화 결제를 원화로 자동 환산하는 환율 시스템 개발",
            strategy: "3-Tier 환율 캐싱(Redis → MongoDB → Free Exchange API)으로 외부 의존도를 최소화하고, On-Demand 방식으로 필요한 시점에만 환율을 조회합니다. 환율 데이터는 기준 통화 대비 상대 통화 수가 많아 통화쌍별 도큐먼트 대신 날짜별 버킷 패턴으로 관리하고, errgroup 병렬 집계로 응답 시간을 단축했습니다."
        }}
        keywords={[
            { category: "Language", items: ["Go"] },
            { category: "Database", items: ["MongoDB", "Redis"] },
            { category: "API", items: ["Free Exchange API (fawazahmed0)"] },
            { category: "Pattern", items: ["3-Tier Cache", "On-Demand Exchange", "errgroup Parallel"] }
        ]}
        architecture={<RevenueArchitecture />}
        architectureDescription={[
            "## On-Demand 집계 전략",
            "",
            "별도의 스케줄러나 배치 잡 없이, **조회 시점에 매출을 계산하고 결과를 DB에 기록**하는 방식을 선택했습니다.",
            "",
            "백오피스 매출 대시보드는 하루에 수백 번 조회되는 기능이 아니므로, 구조의 단순함과 유지보수 용이성을 우선했습니다. 스케줄러를 두면 장애 포인트가 늘어나고, 집계 주기와 데이터 정합성을 별도로 관리해야 합니다.",
            "",
            "### 조회 흐름 (3단계 캐시 전략)",
            "",
            "1. **Redis 캐시** — 동일 조건의 최근 조회 결과가 있으면 즉시 반환 (상품별 10분 / 당일 1분 TTL)",
            "2. **MongoDB 영구 저장** — 캐시 미스 시 DB에 저장된 집계 결과 조회",
            "3. **실시간 계산** — DB에도 없으면 TransactionIndex를 순회하며 집계 후 MongoDB Upsert + Redis Set",
            "",
            "일별 총 매출 집계 시 특정 상품의 환율 변환이 실패하면 해당 상품을 매출에서 제외하고 나머지만 합산합니다. 3단계 캐시를 모두 거친 뒤의 예외이므로 실제로 발생할 가능성은 거의 없지만, 하나의 실패가 전체 집계를 막지 않도록 한 안전장치입니다.",
            "",
            "### 집계 결과 스키마",
            "",
            "```go",
            "// 상품별 일일 매출 통계",
            "type ProductIndexSalesStat struct {",
            "    AggregatedAt       time.Time  // 집계일 (UTC)",
            "    ProductIndex       int64      // 상품 식별자",
            "    CurrencyCode       string     // ISO 4217 (KRW)",
            "    TotalSalesMicroPrices int64   // 원화 환산 매출 (×10⁶)",
            "    TransactionCount   int64      // 거래 수",
            "    RefundCount        int64      // 환불 수",
            "    PurchasingUser     int64      // 구매 유저 수 (PU)",
            "    SalesSharePercent  float64    // 매출 비중 (%)",
            "    PlatformSales      map[string]ProductIndexSalesByPlatform",
            "}",
            "",
            "// 일별 총 매출 통계",
            "type DailySalesStat struct {",
            "    AggregatedAt          time.Time",
            "    CurrencyCode          string     // KRW",
            "    TotalSalesMicroPrices int64",
            "    TotalTransactionCount int64",
            "    UniquePurchasingUser  int64",
            "    PlatformSales         map[string]DailySalesByPlatform",
            "}",
            "```",
            "",
            "한번 계산된 결과는 MongoDB에 Upsert되므로, 동일 날짜를 재조회하면 DB에서 즉시 반환됩니다. ForceRefresh 옵션을 사용하면 캐시를 무시하고 재계산할 수 있습니다."
        ].join("\n")}
        mainTasks={[
            {
                title: "3-Tier 환율 캐싱 시스템",
                description: "Redis(주요 통화 1시간 / 기타 3시간 TTL) → MongoDB(날짜별 영구 저장) → Free Exchange API(외부 폴백) 순서로 환율을 조회. On-Demand 방식으로 필요한 시점에 환율을 가져오고 자동 캐싱하여 외부 API 호출을 최소화"
            },
            {
                title: "환율 데이터 버킷 패턴 설계",
                description: "기준 통화 대비 상대 통화 수가 압도적으로 많아, 통화쌍마다 도큐먼트를 관리하는 것은 비효율적이라 판단. 날짜별 하나의 도큐먼트에 전체 환율을 버킷으로 통합하고, 필요한 통화만 projection으로 조회하여 데이터 관리를 단순화"
            },
            {
                title: "errgroup 기반 병렬 매출 집계",
                description: "날짜 범위 조회 시 최대 8 워커로 날짜별 통계를 병렬 계산. 캐시 → DB → 실시간 계산의 3단계 조회 전략으로 반복 조회를 최적화하고 응답 시간을 단축"
            },
            {
                title: "REST API 엔드포인트 (4개)",
                description: "상품별 일자 매출, 상품별 기간 매출, 일별 총 매출, 기간별 총 매출 4개 API를 제공. ForceRefresh 옵션으로 캐시 무효화를 지원하여 실시간 데이터 조회 가능"
            }
        ]}
        challenges={[
            {
                problem: "환율 데이터 모델링: 기준 통화 대비 상대 통화가 수십 개에 달해, 통화쌍별로 도큐먼트를 생성하면 일자당 수십 건이 생기고 조회·갱신이 복잡해지는 문제",
                solution: "버킷 패턴 적용: 날짜별 하나의 도큐먼트에 모든 환율을 내장 배열로 저장. 필요한 통화만 projection으로 꺼내고, 하루치 환율 갱신도 단일 Upsert로 처리하여 데이터 관리와 조회를 단순화"
            },
            {
                problem: "외부 환율 API 의존성: Free Exchange API 장애 시 환율 조회 실패로 매출 집계 전체가 중단되는 위험",
                solution: "3-Tier 캐싱 폴백: Redis(빠른 조회) → MongoDB(날짜별 영구 저장) → 외부 API(최후 수단) 순서로 조회. 한번 조회된 환율은 영구 저장되어 외부 API 장애 시에도 과거 데이터 조회 가능. 3단계 모두 실패하면 환산을 건너뛰고 원본 통화·가격을 그대로 반환"
            }
        ]}
    />
);
