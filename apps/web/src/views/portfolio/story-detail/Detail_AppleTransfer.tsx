import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
import { getFeatureNumber } from '@/widgets/portfolio/swissminimal/ui/featureData';

const AppleTransferArchitecture = () => (
    <div className="w-full bg-stone-50 dark:bg-stone-900 p-8 font-mono text-sm">
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center text-stone-500 dark:text-stone-400 text-xs tracking-widest mb-8">Apple Transfer API 장애 복구 — 3단계 배치 처리</div>

            {/* Phase 1: 이전 팀 인증 */}
            <div className="border border-red-300 dark:border-red-700 p-4 bg-red-50 dark:bg-red-950/30">
                <div className="text-xs tracking-widest text-red-600 dark:text-red-400 mb-3">1단계 — 이전 팀(A) 인증 + transfer_sub 취득</div>
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3 text-center">
                        <div className="border border-stone-300 dark:border-stone-600 p-2 bg-white dark:bg-stone-800">
                            <span className="font-bold text-stone-900 dark:text-stone-100">게임 DB</span>
                            <br />
                            <span className="text-stone-600 dark:text-stone-300">이전 sub 목록</span>
                        </div>
                        <span className="text-stone-900 dark:text-stone-100">→</span>
                        <div className="border border-stone-300 dark:border-stone-600 p-2 bg-white dark:bg-stone-800">
                            <span className="font-bold text-stone-900 dark:text-stone-100">팀 A 인증</span>
                            <br />
                            <span className="text-stone-600 dark:text-stone-300">client_secret (JWT)</span>
                        </div>
                        <span className="text-stone-900 dark:text-stone-100">→</span>
                        <div className="border border-stone-300 dark:border-stone-600 p-2 bg-white dark:bg-stone-800">
                            <span className="font-bold text-stone-900 dark:text-stone-100">Transfer API</span>
                            <br />
                            <span className="text-stone-600 dark:text-stone-300">transfer_sub 발급</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-stone-900 dark:text-stone-100 text-lg">↓ transfer_sub 전달 ↓</div>

            {/* Phase 2: 신규 팀 인증 */}
            <div className="border border-indigo-300 dark:border-indigo-700 p-4 bg-indigo-50 dark:bg-indigo-950/30">
                <div className="text-xs tracking-widest text-indigo-700 dark:text-indigo-400 mb-3">2단계 — 신규 팀(B) 인증 + 신규 sub 발급</div>
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3 text-center">
                        <div className="border border-stone-300 dark:border-stone-600 p-2 bg-white dark:bg-stone-800">
                            <span className="font-bold text-stone-900 dark:text-stone-100">팀 B 인증</span>
                            <br />
                            <span className="text-stone-600 dark:text-stone-300">client_secret (JWT)</span>
                        </div>
                        <span className="text-stone-900 dark:text-stone-100">→</span>
                        <div className="border border-stone-300 dark:border-stone-600 p-2 bg-white dark:bg-stone-800">
                            <span className="font-bold text-stone-900 dark:text-stone-100">Transfer API</span>
                            <br />
                            <span className="text-stone-600 dark:text-stone-300">transfer_sub → 신규 sub</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-stone-900 dark:text-stone-100 text-lg">↓ 신규 sub 매핑 ↓</div>

            {/* Phase 3: 링크 컬렉션에 신규 sub 추가 */}
            <div className="border border-green-300 dark:border-green-700 p-4 bg-green-50 dark:bg-green-950/30">
                <div className="text-xs tracking-widest text-green-700 dark:text-green-400 mb-3">3단계 — 링크 컬렉션에 신규 sub 추가 (Account Linking)</div>
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3 text-center">
                        <div className="border border-stone-300 dark:border-stone-600 p-2 bg-white dark:bg-stone-800">
                            <span className="text-stone-900 dark:text-stone-100">링크 컬렉션</span>
                            <br />
                            <span className="text-stone-600 dark:text-stone-300">이전 sub → 계정 ID 조회</span>
                        </div>
                        <span className="text-stone-900 dark:text-stone-100">→</span>
                        <div className="border border-stone-300 dark:border-stone-600 p-2 bg-white dark:bg-stone-800">
                            <span className="text-stone-900 dark:text-stone-100">계정 컬렉션</span>
                            <br />
                            <span className="text-stone-600 dark:text-stone-300">계정 ID → 유저 확인</span>
                        </div>
                        <span className="text-stone-900 dark:text-stone-100">→</span>
                        <div className="border border-stone-300 dark:border-stone-600 p-2 bg-white dark:bg-stone-800">
                            <span className="text-stone-900 dark:text-stone-100">링크 추가</span>
                            <br />
                            <span className="text-stone-600 dark:text-stone-300">신규 sub를 같은 계정에 Upsert</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-6 border-t border-dashed border-stone-300 dark:border-stone-600 pt-4 space-y-2 text-center text-stone-700 dark:text-stone-300">
                <div><span className="font-bold text-stone-900 dark:text-stone-100">발생</span> — 앱 이관 완료 시점에 기존 유저가 신규 계정으로 생성되는 장애 발생</div>
                <div><span className="font-bold text-stone-900 dark:text-stone-100">복구</span> — Transfer API 계정 이관 + Account Linking</div>
                <div><span className="font-bold text-stone-900 dark:text-stone-100">결과</span> — 12시간 내 전체 Apple 유저 계정 복구 완료</div>
            </div>
        </div>
    </div>
);

export const Detail_AppleTransfer = () => (
    <SwissProjectDetail
        projectInfo={{
            number: getFeatureNumber("apple-transfer"),
            title: "Apple 계정 이관 장애 복구",
            description: "Apple 앱 이관 완료 시점에 기존 유저가 신규 계정으로 생성되는 장애를 12시간 내 전체 복구한 위기 대응 사례.",
            role: "Backend Engineer",
            period: "2024.06",
            links: {}
        }}
        overview={{
            intro: "애플 계정 이관 절차가 미흡하여, 이관 완료 시점에 기존 유저 계정이 아닌 새로운 계정으로 생성되는 장애가 발생했습니다.",
            goals: "장애 발생 후 최대한 빠르게 전체 유저의 Apple 계정 매핑을 복구하고, 유저들이 기존 캐릭터로 다시 접속할 수 있도록 해야 했습니다.",
            strategy: "Transfer API의 transfer_sub로 신/구 Team 간 계정을 매핑하고, 게임 서버의 Account Linking 구조를 활용하여 기존 연동을 유지한 채 신규 sub를 추가 연동하는 복구 코드를 Go로 작성하여 복구했습니다."
        }}
        keywords={[
            { category: "Language", items: ["Go"] },
            { category: "Auth", items: ["Sign in with Apple", "Transfer API"] },
            { category: "Pattern", items: ["Account Linking"] }
        ]}
        architecture={<AppleTransferArchitecture />}
        architectureDescription={[
            "## 인증 DB 구조",
            "",
            "게임 서버의 인증 구조는 세 개의 컬렉션으로 분리되어 있습니다.",
            "",
            "- **유저 컬렉션** — 게임 유저 정보",
            "- **계정 컬렉션** — 유저와 1:1 매핑 (account._id = user._id)",
            "- **링크 컬렉션** — provider, providerId를 저장. 하나의 계정이 여러 링크를 가질 수 있는 구조 (Account Linking)",
            "",
            "이 구조 덕분에 기존 Apple 링크(이전 sub)를 유지한 채, 같은 계정에 신규 Apple 링크(신규 sub)를 추가하는 것만으로 복구가 가능했습니다.",
            "",
            "## 왜 역방향 조회를 시도했는가",
            "",
            "장애 발생 직후 가장 큰 문제는, 새로운 Team ID로 생성된 계정인지 기존 계정인지 **서버 측에서 구분할 수 없다**는 점이었습니다.",
            "",
            "Apple은 이관 완료 시점에 신규 sub를 발급하지만, 이것이 기존 유저의 신규 sub인지 완전히 새로운 유저인지 판별할 수 있는 정보를 제공하지 않았습니다.",
            "",
            "### 샘플 테스트를 통한 복구 경로 발견",
            "",
            "특정 계정 샘플을 대상으로 Transfer API를 테스트한 결과, 이미 신규 sub가 발급된 계정에 transfer_sub를 요청해도 **동일한 신규 sub가 반환**된다는 사실을 확인했습니다.",
            "",
            "즉, 기존 계정과 신규 계정을 별도로 구별할 필요 없이 **전체 데이터를 일괄로 다시 처리해도 문제가 없었습니다.** 이를 통해 전체 Apple 유저를 대상으로 신규 sub를 발급받은 뒤, 기존 게임 ID에 연결(Account Linking)하면 복구할 수 있다고 판단했습니다.",
        ].join("\n")}
        mainTasks={[
            {
                title: "Transfer API 계정 이관",
                description: "Apple 공식 문서를 참고하여 이전 sub → transfer_sub → 신규 sub 흐름으로 계정 이관 수행"
            },
            {
                title: "Account Linking 활용",
                description: "기존 Apple 연동을 유지한 채 신규 sub를 같은 게임 계정에 추가 연동"
            },
            {
                title: "배치 복구 스크립트 작성",
                description: "전체 Apple 유저 대상으로 이전 sub → Game ID 조회 → 신규 sub 발급 → 추가 연동 자동화"
            }
        ]}
        challenges={[
            {
                problem: "이관 전 검증 부족: QA에서 이관 중 상태의 Apple 로그인이 정상 동작하여 별도 마이그레이션이 불필요하다고 판단. 이관 완료 시 신규 sub 발급으로 기존 유저가 신규 계정으로 생성되는 장애 발생",
                solution: "Transfer API 기반 계정 복구: transfer_sub로 신/구 계정을 매핑하고, Account Linking 구조를 활용하여 기존 연동을 유지한 채 신규 sub를 추가 연동. 12시간 내 전체 유저 복구 완료"
            },
            {
                problem: "구/신규 sub 구분 불가: 이관 완료 후 발급된 신규 sub가 기존 유저의 것인지 새 유저의 것인지 서버 측에서 구분할 수 있는 방법이 없음",
                solution: "전체 일괄 재처리: 샘플 테스트를 통해 이미 신규 sub가 발급된 계정도 transfer_sub 요청 시 동일한 신규 sub가 반환됨을 확인. 구분 없이 전체 Apple 유저를 일괄 처리하여 복구"
            }
        ]}
    />
);
