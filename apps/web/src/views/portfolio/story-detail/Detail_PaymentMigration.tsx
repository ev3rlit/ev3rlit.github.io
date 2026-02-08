import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
import { getFeatureNumber } from '@/widgets/portfolio/swissminimal/ui/featureData';

const MigrationArchitecture = () => (
    <div className="w-full bg-white dark:bg-stone-950 p-8 font-mono text-base">
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center text-stone-500 dark:text-stone-400 text-xs uppercase tracking-widest mb-8">무중단 스키마 마이그레이션 — 이중 기록 전략</div>

            {/* Before */}
            <div className="border border-stone-300 dark:border-stone-600 p-4 bg-white dark:bg-stone-900">
                <div className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">Before (기존 스키마)</div>
                <div className="border border-stone-200 dark:border-stone-700 p-3 bg-white dark:bg-stone-800 text-center text-stone-900 dark:text-white">
                    <span className="text-stone-500 dark:text-stone-400">billing_receipt</span> — 영수증 원본만 저장
                </div>
                <div className="mt-2 text-stone-500 dark:text-stone-400 text-xs text-center">
                    구매일자 없음 / 통화 없음 / 가격 없음
                </div>
            </div>

            <div className="flex justify-center text-stone-400 text-lg">↓</div>

            {/* After */}
            <div className="border border-stone-900 dark:border-white p-4 bg-white dark:bg-stone-900">
                <div className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">After (플랫폼별 분리 + 통합 인덱스)</div>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    {['GooglePlay', 'AppStore', 'GalaxyStore'].map((t) => (
                        <div key={t} className="border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800">
                            <span className="text-stone-900 dark:text-white">{t}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center text-stone-400">↓ 공통 필드 추출 ↓</div>
                <div className="mt-2 border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800 text-center">
                    <span className="text-indigo-600 dark:text-indigo-400">통합 결제 인덱스</span> <span className="text-stone-900 dark:text-white">— 구매일자, 통화, 가격</span>
                </div>
            </div>

            {/* Process */}
            <div className="mt-6 border-t border-dashed border-stone-300 dark:border-stone-600 pt-4 space-y-2 text-center text-stone-700 dark:text-stone-300 text-sm">
                <div><span className="text-indigo-600 dark:text-indigo-400">1단계</span> — 배포 전: 기존 10만 건 백그라운드 병렬 마이그레이션</div>
                <div><span className="text-indigo-600 dark:text-indigo-400">2단계</span> — 배포 후: 신규 결제 → 새 스키마로 직접 기록 (이중 기록)</div>
                <div><span className="text-indigo-600 dark:text-indigo-400">3단계</span> — 검증: 거래 ID 차집합 비교 (누락 0건)</div>
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
            links: {}
        }}
        overview={{
            intro: "퍼블리셔가 매출 대시보드를 제공하던 시절, 우리는 영수증 원본만 DB에 저장했습니다. 퍼블리셔 계약 해지 후 자체 매출 집계가 필요해졌으나, 구매일자·통화·가격 등 핵심 필드가 스키마에 존재하지 않는 치명적 결함을 발견했습니다.",
            goals: "라이브 서비스 무중단 상태에서 10만 건 이상의 기존 영수증을 신규 스키마로 마이그레이션하고, 3개 스토어 API를 호출하여 누락된 구매일자를 역으로 복원해야 했습니다.",
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
                title: "플랫폼별 스토어 API 역추적",
                description: "Google Play, App Store, Galaxy Store 각각의 API를 호출하여 영수증 원본에서 누락된 구매일자를 역으로 복원"
            },
            {
                title: "플랫폼별 테이블 + 통합 결제 인덱스 설계",
                description: "스토어별 원본 데이터를 개별 테이블에 저장하고, 공통 필드(거래 ID, 구매일자, 통화, 가격)를 추출한 통합 인덱스로 조회가 가능하도록 설계"
            },
            {
                title: "워커 풀 기반 병렬 마이그레이션",
                description: "배치 조회를 지원하지 않는 스토어 API를 워커 풀로 병렬 처리. 1만 건 단위 DB 조회, 100건 단위 일괄 저장으로 DB 부하 최소화"
            },
            {
                title: "차집합 기반 정합성 검증",
                description: "기존 영수증의 거래 ID 목록과 신규 테이블의 거래 ID를 차집합 비교하여 누락 데이터 0건을 확인. 누락 발견 시 자동 재처리하는 파이프라인 구축"
            }
        ]}
        challenges={[
            {
                problem: "구매일자 전면 누락: 초기 스키마에 DB 저장 시점만 기록하고 실제 구매 완료 시점을 저장하지 않아, 일일 매출 통계를 산출할 수 없는 상태",
                solution: "스토어 API 역추적 복원: 기존 영수증에서 거래 식별자를 추출하고, 각 플랫폼 API를 호출하여 10만 건의 구매일자를 역으로 복원 완료"
            },
            {
                problem: "Google Play API 호출 제한: 대량 조회 시 요청 초과 에러가 빈번하게 발생하여 마이그레이션 프로세스가 반복 중단",
                solution: "지수 백오프 + 무작위 지연 전략: 최대 20회 재시도에 기본 대기 시간을 지수적으로 증가시키고, 무작위 지연을 추가하여 호출 제한 내 최대 처리량 달성"
            }
        ]}
    />
);
