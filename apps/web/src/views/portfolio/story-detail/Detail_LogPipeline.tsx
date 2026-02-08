import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
import { getFeatureNumber } from '@/widgets/portfolio/swissminimal/ui/featureData';

const LogPipelineArchitecture = () => (
    <div className="w-full bg-white dark:bg-stone-950 p-8 font-mono text-sm text-stone-900 dark:text-stone-100">
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center text-stone-900 dark:text-stone-100 text-xs tracking-widest mb-8">스키마리스 로그 파이프라인 — 트랜잭션 로거 + 배치 발송</div>

            {/* 비즈니스 로직 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">비즈니스 로직</div>
                <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <div className="font-bold text-xs">Go 구조체 정의</div>
                        <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">ActLoggable 구현</div>
                    </div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <div className="font-bold text-xs">ctx.AddLog()</div>
                        <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">CommonLog 자동 주입</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 로그 임시 보관 ↓</div>

            {/* 트랜잭션 로거 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">트랜잭션 로거 (요청 단위 트랜잭션)</div>
                <div className="space-y-2">
                    <div className="border border-stone-200 dark:border-stone-700 p-2 text-center">
                        로그 임시 보관
                        <span className="text-stone-400 dark:text-stone-500 mx-2">→</span>
                        <span className="font-bold">요청 성공?</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="border border-stone-200 dark:border-stone-700 p-2">
                            <div className="font-bold text-xs">Commit</div>
                            <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">로그 발송</div>
                        </div>
                        <div className="border border-stone-200 dark:border-stone-700 p-2">
                            <div className="font-bold text-xs">Rollback</div>
                            <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">로그 폐기</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 비동기 배치 발송 ↓</div>

            {/* 배치 발송 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">배치 발송 (Kinesis Producer)</div>
                <div className="flex items-center justify-center gap-3 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">버퍼 수집</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="border border-stone-200 dark:border-stone-700 p-2 font-bold">배치 전송</div>
                    <span className="text-stone-400 dark:text-stone-500">→</span>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">실패 시 재시도</div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓ 스트리밍 ↓</div>

            {/* 분석 시스템 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">분석 시스템</div>
                <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <div className="font-bold text-xs">OpenSearch</div>
                        <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">실시간 인덱싱</div>
                    </div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <div className="font-bold text-xs">백오피스 검색</div>
                        <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">RequestID 그룹 조회</div>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-6 border-t border-dashed border-stone-300 dark:border-stone-600 pt-4 space-y-2 text-center text-stone-500 dark:text-stone-400">
                <div><span className="text-stone-900 dark:text-stone-100">Before</span> — 로그 추가 0.5일 (MySQL 스키마 + SP + C++ 연동)</div>
                <div><span className="text-stone-900 dark:text-stone-100">After</span> — Go 구조체 정의 + AddLog() 호출 = 1시간 이내</div>
                <div><span className="text-stone-900 dark:text-stone-100">Scale</span> — 1,000만 건/일, ~7,000 건/분</div>
            </div>
        </div>
    </div>
);

export const Detail_LogPipeline = () => (
    <SwissProjectDetail
        projectInfo={{
            number: getFeatureNumber("log-pipeline"),
            title: "로그 프로세스 개선",
            description: "기존 C++ 게임 서버의 로그 추가 작업 시간(0.5일)을 1시간 이내로 단축한 스키마리스 트랜잭션 로깅 시스템.",
            role: "Backend Engineer",
            period: "2024.08",
            links: {}
        }}
        overview={{
            intro: "기존 C++ 게임 서버에서는 로그 하나를 추가하는 데 MySQL 스키마 설계, SP 작성, C++ 연동 등 비즈니스 로직만큼의 시간이 소요되었습니다. 특히 비정형 데이터(가변 길이 배열, 중첩 구조)를 RDBMS 스키마로 표현하는 과정이 병목이었습니다.",
            goals: "로그 추가 작업 시간을 0.5일에서 1시간 이내로 단축할 필요가 있었고, 개발자가 비즈니스 로직에서 로그 데이터만 채우면 나머지는 자동 처리되는 구조로 직접 개선하고자 했습니다.",
            strategy: "Go 구조체 기반 스키마리스 설계 + TransactionLogger 패턴으로 요청 단위 트랜잭션 보장 + AWS Kinesis 비동기 배치 발송 + OpenSearch 실시간 검색 파이프라인을 구축했습니다."
        }}
        keywords={[
            { category: "Language", items: ["Go"] },
            { category: "Infra", items: ["AWS Kinesis", "OpenSearch"] },
            { category: "Pattern", items: ["Transaction Logger", "Batch Producer", "Schema-less"] },
            { category: "Data", items: ["JSON", "Streaming"] }
        ]}
        architecture={<LogPipelineArchitecture />}
        mainTasks={[
            {
                title: "TransactionLogger 구현",
                description: "요청 처리 중 로그를 임시 보관하고, 성공 시 Commit / 실패 시 Rollback으로 데이터 무결성 보장"
            },
            {
                title: "ActLoggable 인터페이스 설계",
                description: "모든 로그가 공통 인터페이스를 구현하고, CommonLog(RequestID, AccountID 등)를 자동 주입"
            },
            {
                title: "Context.AddLog API",
                description: "비즈니스 로직에서 한 줄 호출로 로그 발송. 공통 정보 자동 생성"
            },
            {
                title: "Kinesis 비동기 배치 발송",
                description: "Producer 버퍼에 로그를 수집 후 배치 전송. 실패 시 재시도 처리"
            }
        ]}
        challenges={[
            {
                problem: "비정형 데이터 스키마 설계: 가변 길이 배열, 중첩 객체 등을 RDBMS 스키마로 표현하기 어려워 매번 0.5일~1일이 소요됨",
                solution: "스키마리스 JSON 전환: Go 구조체 → JSON 자동 변환으로 스키마 관리를 제거하고, 타입 안전성은 Go 컴파일 타임에서 확보"
            },
            {
                problem: "요청 실패 시 로그 정합성: 비즈니스 로직 중간에 발송된 로그가 실패한 요청의 데이터를 포함하면 분석 데이터 오염 발생",
                solution: "트랜잭션 로거 패턴: 로그를 메모리에 임시 보관하고 요청 성공 시에만 Commit하여 발송. Rollback으로 실패 요청의 로그를 폐기"
            },
            {
                problem: "로그 발송 성능 병목: 매 로그마다 동기 네트워크 호출 시 API 응답 시간에 직접적 영향",
                solution: "비동기 배치 발송: Kinesis Producer 버퍼에 로그를 수집하고 일정 시간/개수 단위로 배치 전송하여 네트워크 오버헤드 최소화"
            }
        ]}
    />
);
