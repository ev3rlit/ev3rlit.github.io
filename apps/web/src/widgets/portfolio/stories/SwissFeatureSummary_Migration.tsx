import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_Migration = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="DevOps"
            title="대규모 서비스 이관 및 장애 대응"
            subtitle="8시간의 골든타임, 인프라부터 데이터까지 완벽한 이관 (메인 담당, 3개월)"
            step01_intro="퍼블리셔로부터 독립하여 자체 서비스(Self-publishing)로 전환하는 대형 프로젝트를 수행했습니다."
            step02_background="인증, 결제, 서버 인프라(AWS) 등 모든 기술적 제공자가 퍼블리셔였기에, 이를 자체 기술(Naver Cloud, 자체 인증/결제)로 대체해야 했습니다."
            step03_problem="애플 로그인 이관 시 'Transfer Pending' 상태의 함정을 인지하지 못해, 점검 종료 후 유저 접속 불가(계정 유실) 장애 발생."
            step03_solution="패닉에 빠지지 않고 애플 문서를 재분석, 'Multi-Auth' 구조를 활용해 기존 계정에 신규 애플 ID를 추가 연동하는 스크립트로 12시간 만에 전원 복구."
            step04_action="장애 대응뿐 아니라, Jenkins 기반 CI/CD 구축, ELK(ELSA) 로그 파이프라인 구축 등 인프라 전반을 내재화했습니다."
            step05_result="자체 서비스 인프라 100% 구축 완료. 장애 발생 12시간 내 복구 및 유저 이탈 방지."
            step06_performance="인프라 비용 최적화 및 배포 자동화로 운영 효율성 증대."
            kpiList={[
                { label: "복구 시간", value: "12h" },
                { label: "유저 이탈", value: "0%" },
                { label: "인프라", value: "100% 자립" }
            ]}
            step07_capability="위기 상황에서 침착하게 원인을 분석하고 해결책을 제시하며, 클라우드 인프라를 바닥부터 설계하고 구축할 수 있습니다."
            storyId="migration"
        />
    );
};
