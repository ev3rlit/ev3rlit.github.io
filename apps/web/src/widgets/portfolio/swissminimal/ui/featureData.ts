export const features = [
    {
        title: "에러 핸들링 도입",
        description: "oops 라이브러리를 Fork하여 정수형 에러 코드·컨텍스트·스택 트레이스를 포함한 구조화된 에러 시스템 구축.",
        storyId: "error-handling"
    },
    {
        title: "웹소켓 인터셉터",
        description: "고릴라 웹소켓에 gRPC 스타일 인터셉터를 직접 구현하여, 로깅·에러 처리·트랜잭션을 자동화한 미들웨어 시스템.",
        storyId: "websocket-middleware"
    },
    {
        title: "로그 프로세스 개선",
        description: "Go 구조체 정의만으로 스키마 관리 없이 빅데이터 저장소로 로그를 전송하는 자동화 파이프라인.",
        storyId: "log-pipeline"
    },
    {
        title: "앱 서비스 이관",
        description: "퍼블리셔 계약 종료 위기에서 2개월 내 인프라/DB/인증을 자체 플랫폼으로 긴급 이관하고, Apple Transfer API로 무중단 계정 마이그레이션을 달성한 사례.",
        storyId: "service-transfer"
    },
    {
        title: "결제 스키마 무중단 마이그레이션",
        description: "초기 설계 결함으로 누락된 구매일자를 Store API 역추적으로 복원하고, 이중 기록 전략으로 10만 건을 무중단 마이그레이션한 사례.",
        storyId: "payment-migration"
    },
    {
        title: "매출 집계 API",
        description: "3개 스토어의 다통화 결제 데이터를 원화로 환산하고, 상품별·기간별·플랫폼별 매출 통계를 제공하는 운영툴 API.",
        storyId: "revenue-api"
    },
    {
        title: "Apple 계정 이관 장애 복구",
        description: "Apple 앱 이관 완료 시 기존 유저가 신규 계정으로 생성되는 장애를 Transfer API와 Account Linking으로 12시간 내 전체 복구한 위기 대응 사례.",
        storyId: "apple-transfer"
    },
    {
        title: "연합 금광: 도메인 설계와 CQRS",
        description: "기획팀과 협의하여 도메인을 분리하고, CQRS + 이벤트 소싱으로 20개 이상의 API를 지원하는 아키텍처를 설계",
        storyId: "guild-mine-cqrs"
    },
    {
        title: "연합 금광: 분산 동시성 제어",
        description: "Redis Stream 기반 명령 라우팅과 멱등성 키, 직접 Aggregate 호출로 분산 서버 환경의 데이터 일관성 확보",
        storyId: "guild-mine-concurrency"
    },
    {
        title: "유저 데이터 동기화 시스템",
        description: "유저 데이터를 인메모리로 전환하고 Write-back 캐싱 + BSON Patch Diff로 DB 접근을 제거하여 요청 처리 시간 90% 단축.",
        storyId: "tracking-container"
    }
];

/** storyId로 배열 순서 기반 번호를 조회 (e.g. "001", "002", ...) */
export function getFeatureNumber(storyId: string): string {
    const idx = features.findIndex((f) => f.storyId === storyId);
    return String(idx >= 0 ? idx + 1 : 0).padStart(3, '0');
}
