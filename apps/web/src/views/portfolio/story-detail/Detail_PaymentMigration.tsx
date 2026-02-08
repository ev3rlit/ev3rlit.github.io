import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
import { getFeatureNumber } from '@/widgets/portfolio/swissminimal/ui/featureData';

const MigrationArchitecture = () => (
    <div className="w-full bg-stone-50 dark:bg-stone-900 p-8 font-mono text-xs">
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center text-stone-400 text-[10px] uppercase tracking-widest mb-8">Zero-Downtime Schema Migration — Dual-Write Strategy</div>

            {/* Before */}
            <div className="border border-red-300 dark:border-red-700 p-4 bg-red-50 dark:bg-red-950/30">
                <div className="text-[10px] uppercase tracking-widest text-red-400 mb-3">Before (기존 스키마)</div>
                <div className="border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800 text-center">
                    <span className="text-stone-500">billing_receipt</span> — base64 영수증 원본만 저장
                </div>
                <div className="mt-2 text-red-400 text-[10px] text-center">
                    purchased_at 없음 / currency 없음 / price 없음
                </div>
            </div>

            <div className="flex justify-center text-stone-300 text-lg">↓ Migration ↓</div>

            {/* After */}
            <div className="border border-green-300 dark:border-green-700 p-4 bg-green-50 dark:bg-green-950/30">
                <div className="text-[10px] uppercase tracking-widest text-green-500 mb-3">After (플랫폼별 분리 + 통합 인덱스)</div>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    {['GooglePlay\nTransaction', 'AppStore\nTransaction', 'GalaxyStore\nTransaction'].map((t) => (
                        <div key={t} className="border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800">
                            <span className="text-indigo-600 dark:text-indigo-400 whitespace-pre-line">{t}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center text-stone-300">↓ 공통 필드 추출 ↓</div>
                <div className="mt-2 border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800 text-center">
                    <span className="text-amber-600 dark:text-amber-400">TransactionIndex</span> — purchasedAt, currency, microPrice
                </div>
            </div>

            {/* Process */}
            <div className="mt-6 border-t border-dashed border-stone-300 dark:border-stone-600 pt-4 space-y-2 text-center text-stone-400">
                <div><span className="text-stone-500">Phase 1</span> — 배포 전: 기존 10만 건 백그라운드 마이그레이션 (8 Goroutines)</div>
                <div><span className="text-stone-500">Phase 2</span> — 배포 후: 신규 결제 → 새 스키마로 직접 기록 (Dual-Write)</div>
                <div><span className="text-stone-500">Phase 3</span> — 검증: TransactionId 차집합 비교 (누락 0건)</div>
            </div>
        </div>
    </div>
);

export const Detail_PaymentMigration = () => (
    <SwissProjectDetail
        projectInfo={{
            number: getFeatureNumber("payment-migration"),
            title: "결제 스키마\n무중단 마이그레이션",
            description: "초기 설계 결함으로 구매일자가 누락된 영수증 10만 건을 서비스 중단 없이 신규 스키마로 마이그레이션한 사례입니다.",
            role: "Backend Engineer",
            period: "2025.04 — 2025.06",
            status: "마이그레이션 완료",
            links: {}
        }}
        overview={{
            intro: "퍼블리셔가 매출 대시보드를 제공하던 시절, 우리는 영수증 원본(base64)만 DB에 저장했습니다. 퍼블리셔 계약 해지 후 자체 매출 집계가 필요해졌으나, 구매일자(PurchasedAt)·통화·가격 등 핵심 필드가 스키마에 존재하지 않는 치명적 결함을 발견했습니다.",
            goals: "라이브 서비스 무중단(Zero Downtime) 상태에서 10만 건 이상의 기존 영수증을 신규 스키마로 마이그레이션하고, 3개 스토어 API를 호출하여 누락된 구매일자를 역으로 복원해야 했습니다.",
            strategy: "배포 시점을 기준으로 '기존 데이터'와 '신규 데이터'를 분리하는 이중 기록(Dual-Write) 전략을 적용했습니다. 기존 데이터는 백그라운드 프로세스가 Store API를 호출하여 마이그레이션하고, 배포 이후 신규 결제는 새 스키마에 직접 기록했습니다."
        }}
        keywords={[
            { category: "Language", items: ["Go"] },
            { category: "Database", items: ["MongoDB", "BulkWrite"] },
            { category: "API", items: ["Google Play API", "App Store API", "Galaxy Store API"] },
            { category: "Pattern", items: ["Dual-Write", "Exponential Backoff", "Worker Pool"] }
        ]}
        architecture={<MigrationArchitecture />}
        mainTasks={[
            {
                title: "플랫폼별 Store API 역추적",
                description: "Google Play(PurchaseToken → PurchaseTimeMillis), App Store(TransactionID → purchaseDate), Galaxy Store(PurchaseID → PurchaseDate)를 각각 호출하여 누락된 구매일자를 복원"
            },
            {
                title: "플랫폼별 테이블 + TransactionIndex 설계",
                description: "스토어별 원본 데이터를 개별 테이블에 저장하고, 공통 필드(transactionId, purchasedAt, currency, microPrice)를 추출한 TransactionIndex로 통합 조회가 가능하도록 설계"
            },
            {
                title: "8-Goroutine 병렬 마이그레이션 엔진",
                description: "배치 조회를 지원하지 않는 Store API를 워커 풀 + 채널 기반으로 병렬 처리. 10,000건 단위 DB 조회, 100건 단위 BulkWrite로 DB 부하 최소화"
            },
            {
                title: "차집합 기반 정합성 검증",
                description: "기존 영수증의 TransactionId 목록과 신규 테이블의 TransactionId를 차집합 비교하여 누락 데이터 0건을 확인. 누락 발견 시 자동 재처리하는 파이프라인 구축"
            }
        ]}
        challenges={[
            {
                problem: "구매일자(PurchasedAt) 전면 누락: 초기 스키마에 DB 저장 시점(CreatedAt)만 기록하고 실제 구매 완료 시점을 저장하지 않아, 일일 매출 통계를 산출할 수 없는 상태",
                solution: "Store API 역추적 복원: 기존 영수증에서 PurchaseToken/TransactionID/PurchaseID를 추출하고, 각 플랫폼 API를 호출하여 10만 건의 구매일자를 역으로 복원 완료"
            },
            {
                problem: "Google Play API Rate Limit: 대량 조회 시 429(Too Many Requests) 에러가 빈번하게 발생하여 마이그레이션 프로세스가 반복 중단",
                solution: "지수 백오프 + Jitter 전략: 최대 20회 재시도에 500ms 기본 대기 × 지수 증가 + 랜덤 Jitter를 적용하고, 최대 대기 1분 상한으로 Rate Limit 내 최대 처리량 달성"
            }
        ]}
    />
);
