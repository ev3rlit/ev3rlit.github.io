import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_ErrorSystem = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Stability · Middleware"
            title="에러 추적 시스템 &
자동화 미들웨어 구축"
            subtitle="에러 원인 즉시 파악 + 공통 기능 자동화 (1인 전담, 2개월)"
            step01_intro="프로젝트 합류 후 에러 원인을 파악할 수 없는 상황을 발견하고, 에러 추적 시스템과 공통 기능 자동화 미들웨어를 직접 구축했습니다."
            step02_background="프로젝트에 한 달 늦게 합류하여 구조를 분석한 결과, 에러가 발생해도 원인을 알 수 없고, 로깅만 하고 넘어가는 상태였습니다. 또한 팀 내 서버 개발자는 본인 혼자였고, 나머지 팀원은 클라이언트 개발자였지만 서버 코드도 작성해야 하는 환경이었습니다."
            step03_problem="에러 발생 시 원인·위치·상황을 알 수 없어 같은 에러가 재발할 때까지 기다려야 했고, 각 API마다 로깅·에러 처리·데이터 저장을 일일이 작성해야 해서 코드가 중복되고 누락이 발생했습니다. 런타임 에러 시 서버가 종료되는 위험도 있었습니다."
            step03_solution="에러 발생 시점의 모든 정보를 자동 수집하는 에러 추적 시스템을 구축하고, 공통 기능을 자동 처리하는 미들웨어를 설계했습니다."
            step04_action="에러 발생 위치·원인·당시 상황을 자동으로 기록하는 에러 라이브러리 개발 → 로깅, 에러 응답 변환, 런타임 에러 복구, 데이터 자동 저장/롤백 등 4가지 공통 기능을 미들웨어로 구현 → 팀원 온보딩 및 사용 가이드 제공."
            step05_result="에러 추적과 로깅 등 공통 기능을 미들웨어로 분리하여, 클라이언트 개발자를 포함한 팀원들이 핵심 비즈니스 로직에만 집중할 수 있는 개발 환경을 완성했습니다. 장애 발생 시 에러 로그만으로 원인·위치·당시 상황을 즉시 파악할 수 있게 되어, 핫픽스 대응 시간이 평균 24시간에서 1~2시간으로 단축되었습니다."
            step06_performance="API 개발 시 공통 코드 작성이 불필요해져 개발 속도가 향상되고, 개발자 실수로 인한 로깅 누락이나 에러 처리 불일치가 사라졌습니다."
            kpiList={[
                { label: "핫픽스 시간", value: "90%↓" },
                { label: "라이브 운영", value: "무중단" },
                { label: "개발 생산성", value: "DX 향상" }
            ]}
            step07_capability="에러 추적 시스템과 공통 기능 자동화 미들웨어를 바닥부터 설계·구현한 경험이 있습니다. 기존 시스템의 안정성을 빠르게 파악하고 개선할 수 있습니다."
            storyId="error-handling"
        />
    );
};
