
import { StorySection } from "../StorySection";

export const Story_DataEngineering = () => {
    return (
        <StorySection
            sectionNumber="STORY.04"
            title="Revenue Data Recovery"
            step1_intro={
                <>
                    사라진 10만 건 매출을<br />
                    <span className="text-indigo-600">무중단으로</span><br />
                    되살려내다
                </>
            }
            step2_overview={
                <>
                    퍼블리셔 의존으로 인해 누락되었던 <strong>핵심 매출 데이터(통화/환율)</strong>를 복원하고,
                    자체 정산 시스템을 구축하여 <strong>데이터 주권</strong>을 확보했습니다.
                </>
            }
            step3_problem={
                <>
                    DB에는 결제 ID만 있을 뿐, <strong>분석 필수 데이터</strong>가 전무했습니다.
                    운영 중인 DB라 스키마 변경 시 다운타임 리스크가 컸습니다.
                </>
            }
            step3_solution={
                <>
                    3대 스토어 통합 스키마 설계 및 <strong>백그라운드 마이그레이션</strong> 프로세스를 개발하여
                    서비스 중단 없이 데이터를 이관했습니다.
                </>
            }
            step4_process={
                <ul className="list-disc list-inside space-y-1 marker:text-indigo-600">
                    <li><strong>Schema Redesign:</strong> 플랫폼별 테이블 분리 및 통합 인덱스 테이블 설계</li>
                    <li><strong>Data Recovery:</strong> 스토어 API 역조회를 통해 결제 ID로부터 상세 정보 복원</li>
                    <li><strong>Verification:</strong> Transaction ID 전수 검증으로 데이터 무결성 100% 확보</li>
                </ul>
            }
            step5_impact="Zero"
            step5_impact_label="Downtime During Migration"
            step6_growth={
                <>
                    외부 의존의 위험성을 깨닫고 <strong>Data Sovereignty(데이터 주권)</strong>의 중요성을 확립했습니다.
                </>
            }
            step7_capability={
                <>
                    복잡한 데이터를 두려워하지 않습니다. 레거시 데이터를 분석하여 살려내고 구조를 개선하는 <strong>데이터 엔지니어링 역량</strong>이 있습니다.
                </>
            }
        />
    );
};
