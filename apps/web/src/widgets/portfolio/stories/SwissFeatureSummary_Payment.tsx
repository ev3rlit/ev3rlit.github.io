import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_Payment = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Payment · Migration"
            title={`결제 데이터 구조 개편 &\n매출 집계 기능 개발`}
            subtitle="10만 건 무중단 구조 전환 + 다통화 매출 집계 (1인 전담, 2개월)"
            step01_intro="퍼블리셔 계약 종료로 결제 데이터를 자체 관리해야 하는 상황에서, 데이터 구조 개편부터 매출 집계까지 전 과정을 수행했습니다."
            step02_background={[
                "퍼블리셔가 매출 현황을 제공하던 시절, 영수증 원본만 저장하고 구매일자·통화·가격을 기록하지 않았습니다.",
                "계약 종료 후 자체 매출 집계가 필요해졌고, 데이터 구조 재설계부터 집계 기능까지 혼자 전담했습니다.",
                "3개 앱스토어의 결제가 각기 다른 통화로 기록되어 있어, 원화 환산 체계도 함께 필요했습니다."
            ]}
            step03_problem="10만 건의 결제 데이터에 구매일자가 누락되어 매출 집계가 불가능했고, 서비스 중단 없이 데이터 구조를 전면 교체해야 했습니다."
            step03_solution="기존 데이터는 뒤에서 순차 전환하고, 신규 결제는 새 구조에 바로 저장하는 방식으로 서비스를 중단하지 않았습니다."
            step04_action="3개 앱스토어에서 누락된 구매일자 역추적 → 10만 건 병렬 전환 → 신규 결제는 새 구조에 바로 저장하여 무중단 전환 → 건별 대조로 누락 0건 검증 → 3단계 환율 저장소 설계 → 상품별·기간별 매출 집계 기능 구축."
            step05_result={[
                "배포 시점을 기준으로 신규·기존 데이터를 분리하여 서비스 중단 없이 전환했습니다.",
                "전환 완료 후 전체 건수를 건별 대조하여 누락 0건을 확인했습니다.",
                "자체 매출 대시보드를 구축하여 상품별·기간별 매출을 실시간 파악할 수 있는 체계를 확보했습니다."
            ]}
            step06_performance="환율 조회를 3단계 저장소로 안정화했고, 별도 예약 작업 없이 조회 시점에 집계하는 방식으로 운영 부담을 줄였습니다."
            kpiList={[
                { label: "서비스 영향", value: "무중단" },
                { label: "데이터 누락", value: "0건" },
                { label: "결제 건수", value: "10만 건" }
            ]}
            step07_capability="운영 중인 서비스의 무중단 데이터 구조 전환과 매출 집계 시스템을 설계한 경험이 있습니다. 기존 데이터 구조의 결함을 파악하고 서비스 중단 없이 개선할 수 있습니다."
            storyId="payment"
        />
    );
};
