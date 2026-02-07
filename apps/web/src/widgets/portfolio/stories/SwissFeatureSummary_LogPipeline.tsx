import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_LogPipeline = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Efficiency"
            title="로그 프로세스 개선"
            subtitle="로그 추가 작업 0.5일→1시간 단축 (1개월)"
            step01_intro="로그를 추가할 때마다 발생하는 비효율적인 프로세스를 개선하여, 개발자가 핵심 로직에 집중할 수 있는 구조를 만들었습니다."
            step02_background={[
                "기존 C++ 게임 서버에서는 로그 하나를 추가하는 데 MySQL 스키마 설계, SP 작성, C++ 연동 등 비즈니스 로직만큼의 시간이 소요되었습니다.",
                "특히 비정형 데이터(가변 길이 배열, 중첩 구조)를 RDBMS 스키마로 표현하는 과정이 병목이었습니다.",
                "이 문제를 직접 개선하고자 했습니다."
            ]}
            step03_problem="가변 길이 배열, 중첩 객체 등 비정형 데이터를 RDBMS 스키마로 표현하기 어려워 매번 0.5일~1일이 소요되었습니다."
            step03_solution="Go 구조체만 정의하면 나머지는 자동으로 처리되도록 프로세스를 재설계했습니다."
            step04_action="요청이 실패하면 해당 로그를 자동 폐기하여 잘못된 데이터가 쌓이지 않도록 했고, 공통 정보는 자동 주입되어 개발자는 한 줄 호출만으로 로그를 남길 수 있습니다. 수집된 로그는 묶음 전송으로 서버 부담 없이 처리됩니다."
            step05_result={[
                "로그 추가 작업 시간 0.5일 → 1시간 이내로 단축",
                "요청 실패 시 로그 자동 폐기로 분석 데이터 정확도 확보"
            ]}
            step06_performance="운영 스케일: 일일 처리량 1,000만 건, 분당 발생량 ~7,000건의 로그를 안정적으로 처리"
            kpiList={[
                { label: "작업 시간", value: "1h" },
                { label: "일일 처리량", value: "1,000만 건" },
                { label: "분당 발생량", value: "~7,000건" }
            ]}
            step07_capability="비효율적인 프로세스를 발견하면 직접 개선합니다. 팀 전체의 작업 시간을 줄여주는 구조를 설계하여 조직의 생산성을 높이는 엔지니어가 되겠습니다."
            storyId="log-pipeline"
        />
    );
};
