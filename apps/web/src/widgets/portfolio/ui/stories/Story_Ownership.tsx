
import { StorySection } from "../StorySection";

export const Story_Ownership = () => {
    return (
        <StorySection
            sectionNumber="STORY.03"
            title="Crisis Management"
            step1_intro={
                <>
                    전체 로그인 장애를<br />
                    <span className="text-indigo-600">서버 패치만으로</span><br />
                    해결한 승부수
                </>
            }
            step2_overview={
                <>
                    퍼블리셔 계약 해지로 인한 <strong>로그인 불가능 사태</strong>.
                    매뉴얼도 없는 초유의 상황에서 서비스 중단을 막기 위해 끝까지 파고들어 해결책을 찾았습니다.
                </>
            }
            step3_problem={
                <>
                    Apple Transfer API 연동 실패로 <strong>iOS 전체 유저 로그인 불가</strong>.
                    클라이언트 수정 시 앱 심사에 2일이 소요되어 서비스 치명타 예상.
                </>
            }
            step3_solution={
                <>
                    <strong>OAuth 작동 원리를 역이용</strong>하여,
                    DB 레벨에서 기존 토큰을 신규 계정 체계로 <strong>Batch Migration</strong>하는 우회로를 설계했습니다.
                </>
            }
            step4_process={
                <ul className="list-disc list-inside space-y-1 marker:text-indigo-600">
                    <li><strong>Deep Dive:</strong> OAuth 스펙 분석을 통해 토큰 매핑 가능성 확인</li>
                    <li><strong>Simulation:</strong> 로컬 환경에서 마이그레이션 스크립트 수차례 검증</li>
                    <li><strong>Execution:</strong> 라이브 점검 연장 없이 실시간 데이터 패치로 정상화</li>
                </ul>
            }
            step5_impact="100% Resolved"
            step5_impact_label="iOS Users Recovered"
            step6_growth={
                <>
                    위기 상황에서는 완벽한 정답보다 <strong>최선의 수습(Action)</strong>이 중요함을 배웠습니다.
                </>
            }
            step7_capability={
                <>
                    내 코드의 범위를 넘어 문제를 해결합니다. <strong>서비스 정상화를 최우선</strong>으로 생각하는 주인의식을 가졌습니다.
                </>
            }
        />
    );
};
