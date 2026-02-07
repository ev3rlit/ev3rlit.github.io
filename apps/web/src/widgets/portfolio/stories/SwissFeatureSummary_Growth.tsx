import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_Growth = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Growth"
            title="실패가 만든 방법론: 주석-먼저 코딩"
            subtitle="처절한 실패가 지금의 개발 철학을 만들다"
            step01_intro="아이템/인벤토리 코어 로직 개발 중 데이터 정합성 장애를 겪고, 스스로 Pseudo-code 작성 습관을 고안했습니다."
            step02_background="게임의 핵심인 경제 시스템을 구축해야 했습니다. 하지만 서버에는 트랜잭션/롤백 기능이 없었고, 에러 핸들링 체계도 부재했습니다."
            step03_problem="트랜잭션이 없는 인메모리 구조에서, 클라이언트에게 보여주는 '시뮬레이션 결과'와 실제 DB에 '처리되는 결과'가 달라지는 치명적인 데이터 불일치 이슈 발생."
            step03_solution="당시에는 근본적인 해결을 하지 못했지만, 버그를 줄이기 위한 '주석-먼저 코딩' 습관을 스스로 고안했습니다."
            step04_action="API 구현 전, 필요한 실행 순서를 자연어로 주석 작성 → 주석에 맞춰 코드 구현. 이 방식이 가장 버그가 적고 효율적임을 체감, 지금까지도 유지 중인 개발 철학이 됨."
            step05_result="시스템적 해결은 못했으나 개인 방법론 확립: Think First, Code Later"
            step06_performance="'Atomicity(원자성)는 타협할 수 없는 가치' 체득. 이 실패는 훗날 삼국블레이드에서 'Error as Value'와 '트랜잭션 미들웨어'를 1순위로 설계하게 만든 결정적 계기."
            step07_capability="실패를 숨기지 않고 방법론으로 승화시킵니다. 과거의 실수를 반복하지 않는 견고한 설계와, 코딩 전 충분히 생각하는 습관을 갖춘 개발자입니다."
            storyId="growth"
        />
    );
};
