import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_Documentation = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Documentation"
            title="Legacy 코드 분석 및 문서화"
            subtitle="문서 없는 C++ 서버를 해독해 팀의 시간을 아끼다 (1인 전담, 2주)"
            step01_intro="사내 다른 프로젝트의 C++ 서버 코어를 신규 프로젝트에 적용하기 위해, 전무했던 문서를 직접 작성했습니다."
            step02_background="팀 내 C++ 개발자만 있어 기존 Java Spring 서버 대신 사내 프로젝트의 C++ 서버 코어를 가져와 사용하기로 결정. 하지만 서버 실행 방법, 아키텍처, 각 서버 역할에 대한 문서가 전무한 상황이었습니다."
            step03_problem="레거시 코드를 이해하는 데만 시간이 과도하게 소요되어 실제 개발 진행이 지연됨."
            step03_solution="코드를 직접 읽고 분석하여 전체 아키텍처를 도식화하고, 신규 팀원도 따라할 수 있는 실행 가이드 문서 작성."
            step04_action="단순히 코드를 읽는 것에 그치지 않고, '왜 이렇게 설계되었는가?'를 추론하며 각 서버 모듈의 역할과 의존 관계를 정리했습니다."
            step05_result="서버 아키텍처 다이어그램 및 각 서버별 역할 정의 문서, 로컬 개발 환경 세팅 가이드 (Step-by-step)"
            step06_performance="신규 입사자 온보딩 시간 단축 (구두 설명 의존 → 문서 기반 셀프 학습 가능). '코드를 읽고 이해하는 법'을 체득."
            kpiList={[
                { label: "온보딩", value: "Self" },
                { label: "문서화", value: "100%" },
                { label: "구두 설명", value: "0" }
            ]}
            step07_capability="문서화 없이 방치된 레거시 코드를 분석하고 구조화하는 역량이 있습니다. 기존 시스템 파악이 필요한 상황에서 빠르게 팀에 기여할 수 있습니다."
            storyId="documentation"
        />
    );
};
