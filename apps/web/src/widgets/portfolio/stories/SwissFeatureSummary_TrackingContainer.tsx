import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_TrackingContainer = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Performance · Cache"
            title="요청 처리 시간 개선"
            subtitle="인메모리 전환으로 요청당 50ms → 5ms 달성 (1개월)"
            step01_intro="데이터베이스 반복 조회로 인한 응답 지연을, 서버 메모리 기반 처리로 전환하여 해결했습니다."
            step02_background={[
                "실시간 게임 특성상 유저 행동 하나가 퀘스트·업적 등 여러 데이터에 동시에 영향",
                "데이터베이스 조회가 초당 수십~수백 회 반복되어 응답 지연 발생"
            ]}
            step03_problem="WebSocket으로 연결은 유지하면서 데이터는 매번 DB에서 읽어오는 구조적 모순이 근본 원인이었습니다. 또한 다중 컬렉션 업데이트 중 에러가 발생해도 롤백 수단이 없어 데이터 무결성 보장이 어려웠습니다."
            step03_solution="유저 데이터를 서버 메모리에서 관리하고, 변경분만 추출하여 클라이언트와 DB에 자동 동기화하는 구조로 전환했습니다."
            step04_action="접속 시 데이터를 서버 메모리에 선행 로딩 → 변경분만 추출하여 클라이언트에 자동 전송 → 일정 주기마다 DB에 반영 → 에러 발생 시 자동 롤백으로 데이터 무결성 보장."
            step05_result={[
                "평균 요청 처리 시간 50ms → 5ms 이내로 단축 (90% 개선)",
                "팀원은 비즈니스 로직만 작성하면 동기화·롤백이 자동 처리",
                "클라이언트도 별도 동기화 코드 없이 응답 시점에 최신 데이터 보장"
            ]}
            step06_performance="요청 처리 시간이 50ms에서 5ms 이내로 단축되어 체감 렉이 사라졌고, DB Round-trip 최소화로 서버 부하가 크게 감소했습니다."
            kpiList={[
                { label: "평균 응답 속도", value: "50ms→5ms" },
                { label: "DB 접근", value: "최소화" },
                { label: "에러 롤백", value: "자동화" }
            ]}
            step07_capability="성능 병목을 아키텍처 레벨에서 분석하고, 팀원이 핵심 로직에만 집중할 수 있는 자동화 기반을 설계·구현할 수 있습니다."
            storyId="tracking-container"
        />
    );
};
