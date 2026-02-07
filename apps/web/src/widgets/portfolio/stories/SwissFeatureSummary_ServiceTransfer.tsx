import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_ServiceTransfer = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Infrastructure · Migration"
            title={`앱 서비스 이관 &\nSelf-Publishing 전환`}
            subtitle="AWS → Naver Cloud 전체 이관 (1인 백엔드, 2개월 + 8시간 Cut-over)"
            step01_intro="퍼블리셔 계약 종료로 서비스가 종료될 위기에서, 2개월 내 전체 인프라·데이터·인증을 자체 플랫폼으로 이관하여 서비스를 지켜냈습니다."
            step02_background="라이브 중인 게임의 퍼블리싱 계약이 종료되어, 퍼블리셔가 제공하던 인증·결제·로그·인프라를 모두 자체 서비스로 교체해야 했습니다. 서버 개발자는 본인 혼자였으며, 준비 기간은 단 2개월로 제한되었습니다."
            step03_problem="Firebase 계정 이관이 Google 정책상 자동 지원되지 않아 수십만 유저의 인증 데이터를 수동으로 마이그레이션해야 했고, AWS에서 Naver Cloud로의 인프라 전환과 Apple 로그인 마이그레이션을 동시에 진행해야 했습니다."
            step03_solution="퍼블리셔 의존 서비스를 전수 조사하고, 4단계 프로세스로 인프라·인증·결제를 병행 이관했습니다."
            step04_action="퍼블리셔 의존 서비스 전수 조사 → AWS→NCP 인프라 전환(DB·CI/CD·서버) → Firebase CLI로 수십만 유저 계정 이관 → Apple Transfer API로 인증 마이그레이션 → 자체 결제 검증·매출 집계 시스템 개발 → 8시간 점검 내 Cut-over 완료."
            step05_result="서비스 종료 위기를 넘기고 자체 플랫폼(Self-Publishing)으로 완전 전환하여, 이관 이후에도 서비스가 무중단으로 운영되었습니다. 퍼블리셔 의존 없이 인증·결제·로그·인프라를 자체 관리할 수 있는 구조를 확보했습니다."
            step06_performance="서버 댓수를 대폭 축소하여 인프라 운영 비용을 절감했고, 사내 기술 스택을 NCP로 통일하여 유지보수 부담을 줄였습니다."
            kpiList={[
                { label: "이관 소요", value: "8시간" },
                { label: "유저 데이터", value: "무손실" },
                { label: "서비스 중단", value: "0건" }
            ]}
            step07_capability="라이브 서비스의 인프라 전환과 대규모 데이터 마이그레이션을 주도한 경험이 있습니다. 제한된 시간 안에서 우선순위를 판단하고 안전하게 실행할 수 있습니다."
            storyId="service-transfer"
        />
    );
};
