
import { StorySection } from "../StorySection";

export const Story_Growth = () => {
    return (
        <StorySection
            sectionNumber="STORY.06"
            title="Pseudo-code Methodology"
            subTitle="BLADE X / ACTION SQUARE"
            projectPeriod="2022.05 - 2023.04"
            step1_intro={
                <>
                    처절한 실패가 만든<br />
                    <span className="text-indigo-600">주석-먼저 코딩</span><br />
                    (Think First, Code Later)
                </>
            }
            step2_overview={
                <>
                    아이템 관련 데이터 정합성 장애를 겪으며,
                    <strong>"코딩보다 설계(생각)가 먼저다"</strong>라는 저만의 개발 철학을 확립하게 된 계기입니다.
                </>
            }
            step3_problem={
                <>
                    트랜잭션 없는 환경에서 로직이 복잡해지자,
                    <strong>시뮬레이션 결과</strong>와 <strong>실제 DB 처리</strong>가 달라지는 심각한 버그가 빈발했습니다.
                </>
            }
            step3_solution={
                <>
                    기능 구현 전, <strong>실행 순서를 자연어로 주석 작성(Pseudo-code)</strong>하고
                    그 논리가 완벽할 때만 코드를 채워넣는 습관을 만들었습니다.
                </>
            }
            step4_process={
                <ul className="list-disc list-inside space-y-1 marker:text-indigo-600">
                    <li><strong>Comment First:</strong> 비즈니스 로직의 흐름을 한글로 먼저 서술</li>
                    <li><strong>Review:</strong> 주석 단계에서 논리적 헛점과 예외 케이스 발견 및 수정</li>
                    <li><strong>Implement:</strong> 검증된 주석 아래 실제 코드를 작성하여 버그 원천 차단</li>
                </ul>
            }
            step5_impact="Zero"
            step5_impact_label="Logic Errors After Adoption"
            step6_growth={
                <>
                    <strong>Atomicity(원자성)</strong>는 타협할 수 없는 가치임을 깨달았습니다. 실패를 단순한 경험으로 남기지 않고 방법론으로 승화시켰습니다.
                </>
            }
            step7_capability={
                <>
                    실수를 반복하지 않는 <strong>견고한 설계 능력</strong>과, 코딩 전 충분히 생각하는 신중함을 갖춘 개발자입니다.
                </>
            }
        />
    );
};
