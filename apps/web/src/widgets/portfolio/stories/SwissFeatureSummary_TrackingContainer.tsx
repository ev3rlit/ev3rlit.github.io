import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_TrackingContainer = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Legacy Migration"
            title="유저 데이터 동기화 시스템"
            subtitle="요청 응답 속도를 50ms → 5ms로 10배 개선한 인메모리 최적화 (핵심 설계)"
            step01_intro="실시간 방치형 게임의 과도한 DB 부하를 줄이기 위해, Write-back 방식의 데이터 동기화 시스템을 설계했습니다."
            step02_background="매 API 요청마다 DB를 읽고 쓰는 구조로 인해, 트래픽이 몰릴 때마다 DB CPU 사용량이 치솟고 응답 지연이 발생했습니다."
            step03_problem="요청당 평균 50ms의 지연은 빠른 반응이 필요한 게임에서 '렉'으로 느껴졌고, 이는 사용자 이탈로 이어질 위험이 있었습니다."
            step03_solution="Tracking Container라 불리는 인메모리 객체 매니저를 도입하여, 트랜잭션 중에는 메모리만 수정하고 일정 주기마다 변경분(Diff)만 DB에 반영하는 구조로 변경했습니다."
            step04_action="MongoDB의 BSON Patch 기능을 활용하여 변경된 필드만 추출해 업데이트 쿼리를 최적화하고, 자동 롤백 기능을 구현하여 데이터 무결성을 보장했습니다."
            step05_result="DB 접근 횟수를 획기적으로 줄여 응답 속도를 1/10 수준으로 단축하고, 클라이언트에게는 항상 최신 상태를 보장."
            step06_performance="API 평균 응답 시간: 50ms → 5ms 미만 (10배 개선), DB 부하 감소"
            kpiList={[
                { label: "응답 속도", value: "10배↑" },
                { label: "평균 지연", value: "<5ms" },
                { label: "DB 부하", value: "최소화" }
            ]}
            step07_capability="대규모 트래픽 처리를 위한 캐싱 전략과 DB 부하 분산 설계를 경험했습니다. 성능 병목 지점을 찾아 아키텍처 레벨에서 해결책을 제시할 수 있습니다."
            storyId="tracking-container"
        />
    );
};
