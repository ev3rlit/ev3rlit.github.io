import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
import { getFeatureNumber } from '@/widgets/portfolio/swissminimal/ui/featureData';

const WebsocketInterceptorArchitecture = () => (
    <div className="w-full bg-white dark:bg-stone-950 p-8 font-mono text-sm text-stone-900 dark:text-stone-100">
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center text-stone-900 dark:text-stone-100 text-xs tracking-widest mb-8">웹소켓 인터셉터 체이닝 흐름</div>

            {/* 클라이언트 요청 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4 text-center">
                <span className="font-bold">클라이언트 요청</span>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓</div>

            {/* WebSocket + 요청 파싱 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">WebSocket 커넥션</div>
                <div className="space-y-2 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        요청 파싱 → <span className="font-bold">PeerRequest</span> / <span className="font-bold">PeerResponse</span> 생성
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓</div>

            {/* 인터셉터 체이닝 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4">
                <div className="text-xs tracking-widest text-stone-900 dark:text-stone-100 mb-3">인터셉터 체이닝</div>
                <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <span className="font-bold text-xs">Log</span>
                        <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">요청/응답 자동 로깅</div>
                    </div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <span className="font-bold text-xs">Recovery</span>
                        <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">panic → 에러 변환</div>
                    </div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <span className="font-bold text-xs">Error</span>
                        <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">내부 → Public 에러</div>
                    </div>
                    <div className="border border-stone-200 dark:border-stone-700 p-2">
                        <span className="font-bold text-xs">Transaction</span>
                        <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">자동 롤백/커밋</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓</div>

            {/* 핸들러 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4 text-center">
                <span className="font-bold">핸들러</span>
                <span className="text-stone-500 dark:text-stone-400 ml-2 text-xs">비즈니스 로직만 작성</span>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-500">↓</div>

            {/* 클라이언트 응답 */}
            <div className="border border-stone-300 dark:border-stone-600 p-4 text-center">
                <span className="font-bold">클라이언트 응답</span>
            </div>
        </div>
    </div>
);

export const Detail_WebsocketMiddleware = () => (
    <SwissProjectDetail
        projectInfo={{
            number: getFeatureNumber("websocket-middleware"),
            title: "웹소켓 인터셉터\n시스템 구축",
            description: "고릴라 웹소켓에 gRPC 스타일의 인터셉터 패턴을 직접 구현하여, 로깅·에러 처리·트랜잭션을 자동화하고 개발자가 비즈니스 로직에만 집중할 수 있는 환경을 구축했습니다.",
            role: "Backend Engineer",
            period: "2024.03 ~ 2024.04",
            links: {}
        }}
        overview={{
            intro: "nope 패키지 도입 후, 각 핸들러에서 반환된 에러를 일관되게 로깅하고 클라이언트에 응답하는 구조가 필요했습니다. 하지만 고릴라 웹소켓은 미들웨어를 지원하지 않았습니다.",
            goals: "개발자가 실수해도 시스템이 안전하게 동작하고, 서버 관리를 몰라도 비즈니스 로직에만 집중할 수 있는 환경",
            strategy: "gRPC UnaryInterceptor 패턴 분석 → 요청/응답 컨텍스트 구조체 직접 구현 → 인터셉터 체이닝 시스템 구축"
        }}
        keywords={[
            { category: "Language", items: ["Go"] },
            { category: "Framework", items: ["gorilla/websocket"] },
            { category: "Pattern", items: ["Interceptor", "Decorator", "gRPC UnaryInterceptor"] },
            { category: "Feature", items: ["자동 로깅", "Panic Recovery", "에러 변환", "트랜잭션"] }
        ]}
        architecture={<WebsocketInterceptorArchitecture />}
        architectureDescription={[
            "## 미들웨어 레이어 직접 구축",
            "",
            "고릴라 웹소켓에는 인터셉터를 끼워넣을 수 있는 레이어가 없었고, RPC 요청/응답에 대한 **컨텍스트 구조체**도 없었습니다. gRPC의 UnaryInterceptor 패턴을 분석하여, 웹소켓 환경에 맞는 인터셉터 시스템을 직접 구현했습니다.",
            "",
            "### PeerRequest / PeerResponse 컨텍스트",
            "",
            "```go",
            "// PeerRequest — RPC 요청 컨텍스트",
            "type PeerRequest struct {",
            "    Method      string             // RPC 메서드명",
            "    Peer        any                // 커넥션 피어",
            "    HandlerName string             // 핸들러 이름",
            "    AccId       primitive.ObjectID // 유저 ID",
            "    Message     any                // 요청 파라미터",
            "}",
            "",
            "// PeerResponse — RPC 응답 컨텍스트",
            "type PeerResponse struct {",
            "    Message any",
            "}",
            "```",
            "",
            "### 인터셉터 인터페이스",
            "",
            "```go",
            "type PeerInterceptor interface {",
            "    Intercept(handler PeerMessageHandler) PeerMessageHandler",
            "}",
            "```",
            "",
            "핸들러를 받아서 핸들러를 반환하는 Decorator 패턴으로, 전처리/후처리를 자유롭게 추가할 수 있습니다.",
            "",
            "### serveWS 통합",
            "",
            "```go",
            "func (hc *websocketPeerHandler[T]) serveWS(...) {",
            "    // 1. 바이너리 메시지 파싱",
            "    // 2. PeerRequest / PeerResponse 생성",
            "    // 3. 인터셉터 체이닝 → 비즈니스 로직 호출",
            "    return hc.intercept(req, res, func() (any, error) {",
            "        return apiContext.Method.Func.Call(reflectargs)",
            "    })",
            "}",
            "```",
            "",
            "## 4개 핵심 인터셉터",
            "",
            "| 인터셉터 | 역할 |",
            "| --- | --- |",
            "| **PacketLog** | 모든 요청/응답을 자동 로깅 (처리 시간 포함) |",
            "| **Recovery** | panic을 에러로 변환 → 세션 유지 + 에러 응답 반환 |",
            "| **Error** | 내부 에러를 Public 에러로 변환 → 민감 정보 노출 차단 |",
            "| **Transaction** | 유저 데이터 자동 롤백/커밋 |",
            "",
            "## 인터셉터 등록 예시",
            "",
            "```go",
            "handler := wshandler.NewWebsocketPeerHandler[*Peer](...)",
            "handler.Use(interceptor.NewPeerPacketLogInterceptor(devMode))",
            "handler.Use(interceptor.NewPeerRecoverInterceptor())",
            "handler.Use(interceptor.NewPeerErrorInterceptor(devMode))",
            "handler.Use(interceptor.NewUserDocumentTransactioner(...))",
            "```",
            "",
            "## 팀 온보딩",
            "",
            "인터셉터 도입 후 **\"에러를 무시하지 말고 전파하라\"** 원칙을 정립했습니다. 에러를 return하기만 하면 인터셉터가 자동으로 로깅, Public 변환, 트랜잭션 롤백을 처리합니다.",
            "",
            "## 회고",
            "",
            "### 횡단 관심사 분리의 가치",
            "",
            "로깅, 에러 처리, 트랜잭션 같은 공통 기능을 비즈니스 로직과 분리하면 코드가 깔끔해지고 유지보수가 쉬워집니다.",
            "",
            "### 패턴의 이식성",
            "",
            "gRPC의 인터셉터 패턴을 웹소켓에 적용할 수 있었던 것처럼, 좋은 패턴은 다른 환경에도 적용 가능합니다.",
            "",
            "### 인터셉터는 안전망이다",
            "",
            "단순히 코드를 분리하는 것이 아니라, 다른 개발자가 실수해도 시스템이 안전하게 동작하도록 보장하는 역할을 합니다."
        ].join("\n")}
        mainTasks={[
            {
                title: "gRPC 인터셉터 패턴 분석 및 웹소켓 적용 설계",
                description: "gRPC UnaryInterceptor의 '핸들러를 받아서 핸들러를 반환하는 함수' 패턴을 분석하고, 웹소켓 환경에 맞게 적용 설계"
            },
            {
                title: "PeerRequest/PeerResponse 컨텍스트 및 인터셉터 인터페이스 구현",
                description: "인터셉터가 요청/응답 정보에 접근할 수 있도록 구조화된 컨텍스트 구조체와 PeerInterceptor 인터페이스 설계"
            },
            {
                title: "4개 핵심 인터셉터 구현",
                description: "PacketLog(자동 로깅), Recovery(panic → 에러 변환, 세션 유지), Error(Public 에러 변환), Transaction(자동 롤백/커밋)"
            },
            {
                title: "팀 온보딩 및 원칙 정립",
                description: "\"에러를 무시하지 말고 전파하라\" 원칙을 정립하고, 에러 전파만 하면 자동 롤백이 지원되는 구조 안내"
            }
        ]}
        challenges={[
            {
                problem: "미들웨어 레이어 부재: 고릴라 웹소켓에 인터셉터를 끼워넣을 수 있는 레이어와 요청/응답 컨텍스트 구조체가 없었음",
                solution: "인터셉터 레이어 직접 구축: PeerRequest/PeerResponse 컨텍스트 구조체 생성, PeerInterceptor 인터페이스 설계, serveWS에서 인터셉터 체이닝 통합"
            },
            {
                problem: "런타임 에러로 서버 종료 및 세션 끊김: panic 발생 시 서버가 종료되고, 커넥션 레벨 recover 추가 후에도 에러 응답 없이 세션만 끊기는 문제",
                solution: "2단계 Recovery 구현: 커넥션 레벨 recover로 서버 종료 방지 → PeerRecoveryInterceptor로 panic을 에러로 변환하여 세션 유지 + 에러 응답 반환"
            },
            {
                problem: "클라이언트 개발자의 서버 코드 부담: 서버 개발자는 본인 혼자이고 나머지 팀원은 클라이언트 개발자였지만, 서버 코드도 작성해야 하는 환경",
                solution: "인터셉터로 공통 기능 자동화: 로깅·에러 처리·트랜잭션을 인터셉터가 처리하여, 개발자는 비즈니스 로직만 작성하면 되는 구조 완성"
            }
        ]}
    />
);
