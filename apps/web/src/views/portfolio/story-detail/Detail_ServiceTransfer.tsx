import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';

const InfraArchitecture = () => (
    <div className="w-full bg-stone-50 dark:bg-stone-900 p-8 font-mono text-xs">
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center text-stone-400 text-[10px] uppercase tracking-widest mb-8">Service Infrastructure — Naver Cloud</div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="col-span-3 border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800">
                    <span className="text-stone-500">Client</span> — App / Web
                </div>
            </div>

            <div className="flex justify-center text-stone-300">|</div>

            <div className="grid grid-cols-1 gap-4 text-center">
                <div className="border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800">
                    Load Balancer — <span className="text-indigo-600 dark:text-indigo-400">Reverse Proxy (HTTP / WebSocket)</span>
                </div>
            </div>

            <div className="flex justify-center text-stone-300">|</div>

            <div className="grid grid-cols-5 gap-2 text-center">
                {['Gateway', 'Auth', 'Game', 'Ranking', 'Admin'].map((s) => (
                    <div key={s} className="border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800">
                        <span className="text-indigo-600 dark:text-indigo-400">{s}</span>
                        <br />Server
                    </div>
                ))}
            </div>

            <div className="flex justify-center text-stone-300">|</div>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800">
                    <span className="text-amber-600 dark:text-amber-400">MongoDB</span>
                    <br />Primary + Secondary x2
                </div>
                <div className="border border-stone-300 dark:border-stone-600 p-3 bg-white dark:bg-stone-800">
                    <span className="text-amber-600 dark:text-amber-400">Redis</span>
                    <br />Master + Slave
                </div>
            </div>

            <div className="mt-6 border-t border-dashed border-stone-300 dark:border-stone-600 pt-4 text-center text-stone-400">
                <span className="text-stone-500">Deploy</span> — Jenkins + Object Storage (CI/CD)
            </div>
        </div>
    </div>
);

export const Detail_ServiceTransfer = () => (
    <SwissProjectDetail
        projectInfo={{
            number: "009",
            title: "앱 서비스 이관\n(Self-Publishing)",
            description: "퍼블리셔 계약 종료로 인한 서비스 종료 위기에서, 만 2개월 내 전체 서비스(인프라/DB/인증)를 자체 플랫폼으로 긴급 이관하여 서비스를 지켜냈습니다.",
            role: "Backend Engineer",
            period: "2개월 준비 + 8시간 Cut-over",
            status: "이관 완료",
            links: {}
        }}
        overview={{
            intro: "라이브 중인 게임 서비스의 퍼블리싱 계약 종료에 따라, 기존 퍼블리셔가 제공하던 모든 기술적 인프라(인증, 결제, 로그, 서버)를 자체 서비스로 이관(Self-Publishing)해야 했습니다.",
            goals: "단 2개월의 준비 기간과 8시간의 컷오버(Cut-over) 내에 모든 데이터와 시스템을 교체하고, 이관 직후부터 비즈니스 연속성을 보장해야 했습니다.",
            strategy: "AWS → Naver Cloud로의 인프라 전환, Firebase CLI를 활용한 계정 이관, Apple Transfer API를 활용한 인증 마이그레이션, 그리고 환율 불변성을 갖춘 통합 매출 데이터 웨어하우스 구축을 병행 수행했습니다."
        }}
        keywords={[
            { category: "Language", items: ["Go", "Shell Script"] },
            { category: "Database", items: ["MongoDB", "Redis"] },
            { category: "Infra", items: ["Naver Cloud", "Jenkins"] },
            { category: "Auth", items: ["Firebase", "Apple Transfer API"] },
            { category: "Pattern", items: ["Bucket Pattern", "Account Linking"] }
        ]}
        architecture={<InfraArchitecture />}
        architectureDescription={[
            "## 핵심 설계 포인트",
            "",
            "1. **도메인 분리** — 서버 간 통신 없이 각 서비스(Gateway, Auth, Game, Admin)가 독립적으로 동작하여, 트래픽에 따라 서비스별로 개별 스케일링이 가능합니다.",
            "2. **Stateless 설계** — 세션과 상태는 Redis에 위임하여 서버 스케일링이 용이합니다.",
            "3. **Ranking Server** — 외부 통신 없는 백그라운드 스케줄러로 DB에 직접 접근합니다.",
            "",
            "## 왜 Naver Cloud(NCP)인가 — 운영 효율화를 위한 기술 스택 통일",
            "",
            "AWS가 아닌 **Naver Cloud Platform(NCP)**을 선택한 이유는 이미 사내의 다른 서비스들이 NCP를 기반으로 운영되고 있었기 때문입니다.",
            "",
            "1. **운영 효율성(Operational Excellence)** — 기존 사내 인프라와 기술 스택을 통일하여 유지보수 및 모니터링 관리 비용을 최소화했습니다.",
            "2. **성능 및 비용 최적화** — 기존 레거시(AWS)를 그대로 복제하지 않고, NCP의 PaaS 서비스(GamePot, ELSA 등)를 적극 활용하여 비용 구조를 개선했습니다.",
            "",
            "### 인프라 매핑",
            "",
            "| AS-IS (AWS) | TO-BE (NCP) | 비고 |",
            "| --- | --- | --- |",
            "| DocumentDB | MongoDB | `mongodump/restore`로 이관 |",
            "| S3 | Object Storage | 빌드 아티팩트 저장소 활용 |",
            "| EC2 | Compute Server | 서버 댓수를 대폭 축소하여 운영 비용 절감 |",
            "| Kinesis+OpenSearch | ELSA | 파이프라인 신규 구축 |",
            "| Oqupie | GamePot | 고객센터 및 CS 관리 |"
        ].join("\n")}
        mainTasks={[
            {
                title: "Firebase 계정 이관",
                description: "Firebase CLI(auth:export/import)로 수십만 유저 데이터를 이관. Password Hash(Scrypt) 파라미터를 정확히 유지하여 비밀번호 변경 없이 로그인 가능하도록 정합성 보장"
            },
            {
                title: "Apple Login 마이그레이션",
                description: "Transfer API를 활용해 이전/신규 Team 간 계정 매핑(transfer_sub)을 수행. 기존 Apple 연동을 유지한 채 신규 sub를 같은 게임 계정에 추가 연동하여 무중단 마이그레이션 달성"
            },
            {
                title: "결제 내역 스키마 마이그레이션",
                description: "자체 매출 집계 기능이 필요하여 3개 스토어(Google, Apple, Galaxy Store) 결제 내역을 통합 관리. 버킷 패턴으로 환율 저장, On-Demand 캐싱 전략으로 외부 API 호출 최소화"
            },
            {
                title: "인프라 전환 (AWS → NCP)",
                description: "DocumentDB→MongoDB, S3→Object Storage, EC2→Compute Server, Kinesis+OpenSearch→ELSA로 전환. 서버 댓수를 대폭 축소하여 운영 비용 절감"
            }
        ]}
        challenges={[
            {
                problem: "Apple 'Pending State' 함정: QA에서 정상 동작으로 오판했으나, 이관 완료 시점에 신규 Team ID 기반 sub가 발급되며 기존 유저 계정이 유실되는 초대형 장애 발생",
                solution: "Transfer API 기반 계정 복구: transfer_sub로 신/구 Team 간 계정을 매핑하고, 기존 계정을 덮어쓰지 않고 신규 Apple sub를 '추가 연동'하는 방식으로 12시간 내 전체 유저 복구 완료"
            },
            {
                problem: "환율 변동 리스크: 과거 매출 리포트 수치가 현재 환율에 따라 변동될 위험. 3개 스토어의 다국적 통화 결제 데이터를 신뢰할 수 있게 통합해야 하는 과제",
                solution: "불변성 보장 설계: 결제 시점의 환율로 변환된 원화 금액을 영수증 데이터에 박제(exchangedMicroPrice). Go-Redis 다계층 캐싱과 errgroup 병렬 쿼리로 조회 속도 수 초 이내 달성"
            }
        ]}
    />
);
