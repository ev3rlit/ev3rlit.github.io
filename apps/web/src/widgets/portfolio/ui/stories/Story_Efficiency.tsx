
import { StorySection } from "../StorySection";

export const Story_Efficiency = () => {
    return (
        <StorySection
            sectionNumber="STORY.02"
            title="Log Pipeline Automation"
            step1_intro={
                <>
                    로그 작업 시간을<br />
                    <span className="text-indigo-600">4배 단축한</span><br />
                    스키마리스 자동화
                </>
            }
            step2_overview={
                <>
                    "로그 하나 남기는데 비즈니스 로직보다 시간이 더 걸려서야 되겠는가?"<br />
                    반복적인 노가다 작업을 제거하고 <strong>개발 본질에 집중</strong>하기 위해 파이프라인을 혁신했습니다.
                </>
            }
            step3_problem={
                <>
                    기존 프로세스는 <strong>SQL 정의 → 코드 생성 → 연동</strong>의 복잡한 절차가 필요하여
                    수정이 어렵고 개발 피로도가 높았습니다.
                </>
            }
            step3_solution={
                <>
                    Go 구조체(Struct)만 정의하면 AWS Kinesis까지 자동으로 전송되는
                    <strong>Schema-less 파이프라인</strong>을 구축하여 병목을 제거했습니다.
                </>
            }
            step4_process={
                <ul className="list-disc list-inside space-y-1 marker:text-indigo-600">
                    <li><strong>Schema-less:</strong> JSON marshaling 기반의 유연한 데이터 구조 채택</li>
                    <li><strong>Action-based ID:</strong> 유저 행위를 인과관계로 묶어 CS 추적 용이성 확보</li>
                    <li><strong>Self-Service:</strong> 운영팀이 개발자 없이 로그를 조회하는 대시보드 연동</li>
                </ul>
            }
            step5_impact="4h → 1h"
            step5_impact_label="Task Time Reduced"
            step6_growth={
                <>
                    단순 반복 작업을 참지 않고 시스템으로 해결했습니다. <strong>생산성을 높이는 도구(Force Multiplier)</strong>의 가치를 증명했습니다.
                </>
            }
            step7_capability={
                <>
                    팀 전체의 시간을 아껴주는 시스템을 만듭니다. <strong>비효율을 비용으로 인식</strong>하고 적극적으로 개선합니다.
                </>
            }
        />
    );
};
