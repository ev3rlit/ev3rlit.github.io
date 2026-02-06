import { SwissStorySection } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const Story_ErrorHandling = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissStorySection
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Stability"
            title="에러 핸들링 시스템 구축"
            subtitle="핫픽스 시간을 1/8로 단축한 안정성 확보 프로젝트 (1인 전담, 1개월)"
            step01_intro="라이브 서비스의 안정성을 위해 에러 추적 시스템을 바닥부터 재설계했습니다."
            step02_background="이전 프로젝트에서 에러 원인 파악에 하루 이상 소요되던 고통스러운 경험을 반복하지 않기 위해, 프로젝트 초기부터 '추적 가능한 시스템'을 만드는 것을 목표로 했습니다."
            step03_problem="Go 언어의 기본 에러 처리만으로는 스택 트레이스와 당시 상황(Context)을 알 수 없어, 로그만으로 원인을 찾기 불가능했습니다."
            step03_solution="'Error as Value' 패턴을 응용하여, 에러 발생 시점의 모든 문맥 정보를 수집하는 미들웨어와 래퍼(Wrapper) 함수를 구현했습니다."
            step04_action="UserID, Request Params, Code Line을 자동으로 캡처하는 미들웨어를 직접 설계하고, 팀원들이 쉽게 사용할 수 있도록 온보딩 가이드를 작성하여 코드 컨벤션을 통일시켰습니다."
            step05_result="운영툴에서 에러 로그 클릭 한 번으로 '누가, 어떤 요청을 보내서, 어디서 터졌는지' 즉시 확인 가능한 대시보드 구축."
            step06_performance="핫픽스 대응 시간 단축: 평균 1일(24h) → 1~2시간 이내로 약 90% 단축"
            kpiList={[
                { label: "핫픽스 시간", value: "90%↓" },
                { label: "평균 소요", value: "1h" },
                { label: "대시보드", value: "1-Click" }
            ]}
            step07_capability="Context-aware Error Logging 시스템을 직접 설계해본 경험이 있습니다. 입사 시 기존 에러 추적 체계를 빠르게 파악하고 개선점을 제안할 수 있습니다."
            storyId="error-handling"
        />
    );
};
