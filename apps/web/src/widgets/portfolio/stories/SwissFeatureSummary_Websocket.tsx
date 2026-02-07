import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_Websocket = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Middleware"
            title="웹소켓 인터셉터 시스템 구축"
            subtitle="서버 안정성과 보안을 동시에 잡은 미들웨어 아키텍처 (1인 전담, 1.5개월)"
            step01_intro="웹소켓 서버의 안정성을 높이기 위해 gRPC 스타일의 인터셉터 패턴을 도입했습니다."
            step02_background="대부분 클라이언트 개발자로 구성된 팀 환경에서, 서버 코드의 품질과 안정성을 보장할 안전장치가 필요했습니다."
            step03_problem="기존 Gorilla Websocket에는 미들웨어 개념이 없어, 로깅/에러처리 코드가 비즈니스 로직과 뒤섞이고 panic 발생 시 서버가 다운되는 위험이 있었습니다."
            step03_solution="핸들러를 감싸는 'Interceptor' 패턴을 직접 구현하여 로깅, 패닉 복구, 트랜잭션 관리를 자동화했습니다."
            step04_action="'함수를 받아 함수를 반환'하는 데코레이터 패턴으로 인터셉터 체이닝을 구현. RecoverInterceptor로 패닉을 잡고, ErrorInterceptor로 내부 에러를 클라이언트용 메시지로 변환하도록 설계."
            step05_result="표준화된 인터셉터 라이브러리 (ContextCache, PacketLog, Recovery, Transaction)"
            step06_performance="서버 다운 0건 달성 (패닉 자동 복구), 코드량 30% 감소 (공통 관심사 분리)."
            kpiList={[
                { label: "서버 다운", value: "0건" },
                { label: "코드량 감소", value: "30%" },
                { label: "자동 복구", value: "100%" }
            ]}
            step07_capability="미들웨어/인터셉터 아키텍처를 설계하여 팀 전체의 코드 품질을 상향 평준화할 수 있습니다."
            storyId="websocket"
        />
    );
};
