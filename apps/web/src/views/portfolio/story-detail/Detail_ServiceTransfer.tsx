import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
import { getFeatureNumber } from '@/widgets/portfolio/swissminimal/ui/featureData';

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
            number: getFeatureNumber("service-transfer"),
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
            "## 이관 진행 과정",
            "",
            "2개월이라는 제한된 시간 안에 안전하게 이관하기 위해, 먼저 **퍼블리셔 제공 서비스를 전수 조사**하여 자체 구축이 필요한 대상을 식별했습니다.",
            "",
            "### 퍼블리셔 의존성 분석",
            "",
            "| 영역 | 퍼블리셔 의존 |",
            "| --- | --- |",
            "| 매출 통계 | 퍼블리셔 매출 대시보드 |",
            "| 인증 | 퍼블리셔 Firebase 프로젝트 |",
            "| 운영/CS | 퍼블리셔 공지사항/고객센터 |",
            "| 로그/분석 | 퍼블리셔 데이터 플랫폼 |",
            "| 인프라 | AWS(DocumentDB, S3, EC2) |",
            "| 배포 | S3 기반 빌드 배포 |",
            "",
            "### 단계별 실행 프로세스",
            "",
            "**Phase 1 — 사전 분석 및 검증**",
            "- 퍼블리셔 제공 서비스 전수 조사 및 자체 구축 대상 선별",
            "- 유저 DB 내 개인정보 유무 판별 (이관 불가 데이터 분리 및 파기 정책 수립)",
            "- 백업 및 복구 시나리오 테스트",
            "",
            "**Phase 2 — 인프라 구축 및 개발**",
            "- Naver Cloud 인프라 구축 및 Dev/QA/Prod 환경 분리",
            "- 자체 결제 검증 및 매출 집계 시스템 개발",
            "- 신규 Firebase 계정 생성 및 OAuth 인증 연동",
            "",
            "**Phase 3 — 서비스 이관 (D-Day, 8시간 점검)**",
            "- DB 백업 및 신규 인프라로 복구",
            "- 기존 Firebase SHA-1 지문 삭제 → 신규 SHA-1 등록 → Auth 데이터 Import",
            "- 3사 스토어 앱 버전 배포 및 서비스 오픈",
            "",
            "**Phase 4 — 안정화 및 대응**",
            "- 오픈 직후 Apple 로그인 장애 인지 및 Transfer API 긴급 배치 복구 수행",
            "- 스토어별 결제 검증 키 교체 및 정상 동작 확인",
            "",
            "## 이관 후 인프라 — 핵심 설계 포인트",
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
                problem: "Firebase 계정 이관 불가: Google 정책상 프로젝트 간 계정 데이터 자동 이관을 지원하지 않으며, 하나의 Bundle ID에 하나의 SHA-1 지문만 등록 가능하여 기존 프로젝트 설정을 해제하지 않으면 신규 프로젝트 연동이 불가",
                solution: "CLI 마이그레이션 + 점검 시간 활용: Firebase CLI(auth:export/import)로 수십만 유저 데이터를 이관하고, 8시간 서버 점검 동안 기존 SHA-1 삭제 → 신규 SHA-1 등록 → Auth 데이터 Import 순으로 실행하여 인증 체계 교체"
            },
            {
                problem: "2개월 내 전체 이관 완료: 퍼블리셔가 제공하던 결제, 인증, 운영툴, 로그, 인프라를 모두 자체 구축해야 하는 상황에서 준비 기간이 단 2개월로 제한",
                solution: "퍼블리셔 서비스 전수 조사: 퍼블리셔 의존 서비스를 전수 조사하여 자체 구축 대상을 식별하고, 사전 분석 → 인프라 구축 → 데이터 마이그레이션 → 서비스 오픈 → 사후 검증의 단계별 프로세스를 수립하여 순차적으로 진행"
            }
        ]}
    />
);
