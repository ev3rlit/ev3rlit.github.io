import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_GuildMineCqrs = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Architecture · CQRS"
            title="실시간 길드 컨텐츠 — 도메인 설계와
CQRS 아키텍처"
            subtitle="4개 도메인 분리 + 20개 API 아키텍처 설계 (Backend Engineer, 6개월)"
            step01_intro="연합원들이 함께 광산을 개발하고 자원을 이송·약탈하는 실시간 멀티플레이어 콘텐츠에서, 4개 하위 시스템의 도메인을 분리하고 CQRS + 이벤트 소싱 아키텍처를 설계했습니다."
            step02_background={[
                "채광·이송·약탈·방어 4개 시스템이 하나의 게임 캐릭터 데이터를 공유하는 구조",
                "길드원 탈퇴·캐릭터 레벨업 등 외부 이벤트가 모든 시스템에 강결합으로 전파",
                "20개 이상의 API와 다양한 UI 화면을 제공해야 하는 요구사항 존재"
            ]}
            step03_problem={[
                "게임 캐릭터 데이터가 모든 시스템에 걸쳐 있어, 상태 변경 시 길드 관리 코드가 광산·이송·약탈 시스템을 직접 참조하는 강결합 발생",
                "하나의 정규화된 모델로는 20개 이상의 서로 다른 API를 효율적으로 처리 불가"
            ]}
            step03_solution="기획팀과 협의하여 도메인을 분리하고, CQRS + 이벤트 소싱으로 읽기/쓰기를 분리했습니다."
            step04_action="기획팀에 캐릭터 상태 소유권 분석표를 제안하여 캐릭터 중복 사용 허용으로 규칙 변경 → Mining/Transport/Looting 도메인 물리적 분리 → 이벤트 기반 느슨한 결합으로 도메인 간 통신 설계 → 화면 목적별 ReadModel 설계로 20개 이상 API 효율적 처리 → 총 18개 도메인 이벤트 설계."
            step05_result={[
                "4개 하위 시스템이 독립적으로 개발·배포 가능한 구조 달성",
                "이벤트 기반 통신으로 새로운 시스템 추가 시 기존 코드 변경 없이 이벤트 구독만으로 확장 가능",
                "Command는 비즈니스 로직에만 집중, Query는 조회 성능을 독립 최적화하여 읽기/쓰기 트래픽 분리",
                "기획 요구사항 추가 시 Aggregate 로직만 수정하여 데이터 마이그레이션 없이 즉시 반영"
            ]}
            step06_performance="Command/Query 분리로 읽기 트래픽이 쓰기에 영향을 주지 않는 구조를 완성했습니다."
            kpiList={[
                { label: "도메인 이벤트", value: "18개" },
                { label: "지원 API", value: "20개+" },
                { label: "도메인 분리", value: "4개" }
            ]}
            step07_capability="기획팀과의 협의를 통해 도메인을 분리하고, CQRS + 이벤트 소싱 아키텍처를 설계·구현한 경험이 있습니다. 복잡한 비즈니스 요구사항을 확장 가능한 구조로 풀어낼 수 있습니다."
            storyId="guild-mine-cqrs"
        />
    );
};
