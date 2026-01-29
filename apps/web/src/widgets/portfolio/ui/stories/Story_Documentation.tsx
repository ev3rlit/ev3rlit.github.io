
import { StorySection } from "../StorySection";

export const Story_Documentation = () => {
    return (
        <StorySection
            sectionNumber="STORY.05"
            title="Legacy Code Analysis"
            subTitle="BLADE X / ACTION SQUARE"
            projectPeriod="2022.05 - 2023.04"
            step1_intro={
                <>
                    문서 없는 서버 코드를<br />
                    <span className="text-indigo-600">완벽하게 해독해</span><br />
                    팀의 시간을 벌다
                </>
            }
            step2_overview={
                <>
                    사내 C++ 서버 코어를 신규 프로젝트에 이식해야 했으나,
                    <strong>문서가 전무</strong>하여 개발 착수조차 불가능한 상황을 타개했습니다.
                </>
            }
            step3_problem={
                <>
                    서버 실행 방법부터 아키텍처, 모듈 간 의존성까지 정보가 없어
                    <strong>레거시 파악</strong>에 과도한 시간이 소요되고 있었습니다.
                </>
            }
            step3_solution={
                <>
                    코드를 역분석하여 <strong>전체 아키텍처를 도식화</strong>하고,
                    신규 입사자 누구나 따라할 수 있는 <strong>상세 가이드</strong>를 작성했습니다.
                </>
            }
            step4_process={
                <ul className="list-disc list-inside space-y-1 marker:text-indigo-600">
                    <li><strong>Reverse Engineering:</strong> "왜 이렇게 짰을까?" 의도를 추론하며 코드 분석</li>
                    <li><strong>Visualization:</strong> 복잡한 서버군 통신 구조를 다이어그램으로 시각화</li>
                    <li><strong>Knowledge Sharing:</strong> 문서 기반 온보딩 프로세스 정립</li>
                </ul>
            }
            step5_impact="2 Weeks → 2 Days"
            step5_impact_label="Onboarding Time Reduced"
            step6_growth={
                <>
                    복잡한 시스템을 <strong>구조화하여 파악하는 능력</strong>을 길렀습니다. 문서화는 남을 위한 배려이자 나를 위한 정리임을 배웠습니다.
                </>
            }
            step7_capability={
                <>
                    레거시 코드를 두려워하지 않습니다. 방치된 시스템을 분석하여 가시화하고, 팀이 유지보수 가능한 상태로 만듭니다.
                </>
            }
        />
    );
};
