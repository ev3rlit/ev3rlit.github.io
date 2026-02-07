import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_LogPipeline = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Efficiency"
            title="로그 파이프라인 자동화"
            subtitle="개발 생산성을 4배 높인 스키마리스 로그 시스템 (1인 전담, 2주)"
            step01_intro="복잡한 로그 정의 절차를 자동화하여 개발자와 운영팀의 병목을 제거했습니다."
            step02_background="'로그 하나 남기는데 비즈니스 로직보다 시간이 더 걸려서야 되겠는가?'라는 문제의식에서 출발했습니다."
            step03_problem="기존에는 로그 테이블 정의(SQL) → 코드 생성 → 연동의 과정이 필요해 작업이 번거로웠고, 수정 유연성도 떨어졌습니다."
            step03_solution="Go 구조체(Struct)만 정의하면 AWS Kinesis까지 자동으로 전송되는 Schema-less 파이프라인을 구축했습니다."
            step04_action="개발 효율뿐만 아니라 CS 대응 효율까지 고려했습니다. 'Action-based Log ID'를 고안하여, 유저의 행위 순서가 인과관계에 따라 묶이도록 설계해 운영팀이 개발자 없이도 CS를 처리하게 만들었습니다."
            step05_result="개발자는 구조체 선언만으로 로그 작업 끝. 운영팀은 시각화된 대시보드에서 유저 CS 직접 처리."
            step06_performance="생산성 향상: 로그 작업 소요 시간 0.5일 → 1시간 이내로 단축"
            kpiList={[
                { label: "작업 시간", value: "1h" },
                { label: "생산성", value: "4배↑" },
                { label: "CS 처리", value: "No-Dev" }
            ]}
            step07_capability="반복적인 비효율을 참지 않습니다. 팀 전체의 시간을 아껴주는 도구와 시스템을 만들어 조직의 속도를 높이는 'Force Multiplier'가 되겠습니다."
            storyId="log-pipeline"
        />
    );
};
