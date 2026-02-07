import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_Payment = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Migration"
            title="10만 건 결제 데이터 무중단 마이그레이션"
            subtitle="서비스 중단 없이 레거시 스키마를 신규 구조로 개편 (1인 전담, 2개월)"
            step01_intro="퍼블리셔 계약 종료로 인해 독자적인 매출 관리 시스템이 필요해졌습니다."
            step02_background="기존 결제 데이터에는 '구매 일시' 같은 필수 필드가 누락되어 있어, 일일 매출 집계가 불가능한 상황이었습니다. 이를 해결하려면 전체 DB 스키마를 변경해야 했습니다."
            step03_problem="10만 건 이상의 결제 데이터를 마이그레이션해야 하는데, 서비스 점검을 할 수 없는 상황(Zero Downtime 요구)."
            step03_solution="스토어 API로 과거 데이터를 복원하고, '이중 사용 (Dual Write)' 전략으로 무중단 이관을 수행했습니다."
            step04_action="Go루틴으로 스토어 영수증 검증을 병렬 처리하여 속도를 높이고, 배포 전 백그라운드 마이그레이션 -> 배포 후 신규 스키마 사용 -> 트랜잭션 ID 대조로 누락 검증 프로세스를 구축."
            step05_result="자체 매출 대시보드 구축 및 과거 3년치 매출 리포트 생성 완료."
            step06_performance="다운타임 0분, 데이터 누락 0건. 마이그레이션 속도 20배 향상 (순차 처리 대비)."
            kpiList={[
                { label: "다운타임", value: "0분" },
                { label: "데이터 누락", value: "0건" },
                { label: "처리 속도", value: "20배↑" }
            ]}
            step07_capability="대규모 데이터 마이그레이션 시나리오를 설계하고, 운영 중인 서비스에 영향 없이 DB 구조를 개선할 수 있습니다."
            storyId="payment"
        />
    );
};
