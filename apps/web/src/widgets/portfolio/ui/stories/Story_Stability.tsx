
import { StorySection } from "../StorySection";

export const Story_Stability = () => {
    return (
        <StorySection
            sectionNumber="STORY.01"
            title="Error Handling System"
            step1_intro={
                <>
                    핫픽스 시간을<br />
                    <span className="text-indigo-600">1/8로 단축한</span><br />
                    안정성 확보 프로젝트
                </>
            }
            step2_overview={
                <>
                    이전 프로젝트에서 에러 원인 파악에 하루 이상 소요되던 고통스러운 경험을 반복하지 않기 위해,
                    프로젝트 초기부터 <strong>'추적 가능한 시스템(Traceability)'</strong>을 만드는 것을 최우선 목표로 설계했습니다.
                </>
            }
            step3_problem={
                <>
                    Go 언어의 기본 에러 처리만으로는 <strong>스택 트레이스</strong>와 <strong>Context</strong> 부재로
                    로그만 보고 원인을 찾기가 불가능했습니다.
                </>
            }
            step3_solution={
                <>
                    <strong>Error as Value 패턴</strong>을 응용하여,
                    에러 발생 시점의 모든 문맥 정보를 수집하는 미들웨어와 래퍼(Wrapper)를 구현했습니다.
                </>
            }
            step4_process={
                <ul className="list-disc list-inside space-y-1 marker:text-indigo-600">
                    <li><strong>Context Middleware:</strong> UserID, Request Params, Code Line 자동 캡처</li>
                    <li><strong>Onboarding:</strong> 팀원 코드 컨벤션 통일 및 사용 가이드 작성</li>
                    <li><strong>Dashboard:</strong> 운영툴에서 클릭 한 번으로 "누가/어디서/왜" 확인 가능</li>
                </ul>
            }
            step5_impact="1 Day → 2 Hrs"
            step5_impact_label="Response Time Reduced"
            step6_growth={
                <>
                    막연한 추측이 아닌 <strong>데이터 기반 디버깅</strong>이 가능해졌습니다. "추적 불가능한 에러는 없다"는 확신을 얻었습니다.
                </>
            }
            step7_capability={
                <>
                    장애 발생 시 <strong>당황하지 않고 빠르게 복구</strong>할 수 있는 견고한 백엔드 환경을 약속드립니다.
                </>
            }
        />
    );
};
