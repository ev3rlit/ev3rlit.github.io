"use client";

import { SwissProjectIntroSection } from "./SwissProjectIntroSection";

export const SwissProjectIntro_SamgukBlade = () => {
    return (
        <SwissProjectIntroSection
            sectionNumber="03"
            projectName="삼국블레이드 키우기"
            period="2023.04 - 2025.10"
            projectRole="게임 서버 개발자"
            genre="방치형 액션 RPG"
            engine="Unreal Engine 5 Client / Golang Server"
            description="글로벌 20개국에 서비스 중인 방치형 액션 RPG의 서버 아키텍처를 설계하고, 런칭부터 라이브 운영까지 전 사이클을 주도했습니다."
            contribution={[
                "Golang 기반 게임 서버 아키텍처 설계를 주도하여 런칭부터 21개월 안정 라이브 운영 달성",
                "트랜잭션+롤백 미들웨어를 설계하여 모든 API에서 데이터 무결성 100% 보장 체계 구축",
                "퍼블리셔 계약 해지 후 AWS → Naver Cloud Platform 전체 인프라·데이터 무중단 이관을 2개월 내 완수",
                "라이브 서비스 중 결제 데이터 10만 건 무중단 마이그레이션 설계 및 실행",
                "커스텀 에러 핸들링 시스템 도입으로 라이브 장애 발생률 90% 감소",
                "AWS Kinesis 기반 실시간 로그 파이프라인 구축으로 운영 모니터링 체계 확립",
                "인메모리 캐시 레이어 및 쿼리 최적화로 API 응답 속도 50ms → 5ms 개선",
                "관리자 페이지 REST API 설계 및 개발",
            ]}
            enhancedMetrics={[
                { kpi: "Google Play 순위", value: "1위", context: "콜라보 이벤트 당일" },
                { kpi: "피크 DAU", value: "10,000", context: "일간 활성 사용자" },
                { kpi: "서비스 가용성", value: "안정", context: "21개월 라이브 운영" },
                { kpi: "API 응답 속도", value: "5ms", context: "50ms → 5ms 개선" },
            ]}
            techStack={["Golang", "MongoDB", "Redis", "WebSocket", "AWS Kinesis", "Naver Cloud Platform", "Jenkins"]}
            modules={[
                {
                    title: "앱 서비스 이관",
                    description: "퍼블리셔 계약 해지 후 AWS에서 Naver Cloud로 2개월 내 전체 인프라·데이터 무중단 이관.",
                    tags: ["AWS", "NCP", "Zero-downtime"],
                },
                {
                    title: "결제 마이그레이션",
                    description: "라이브 서비스 중 결제 데이터 10만 건 무중단 마이그레이션 완수.",
                    tags: ["Payment", "Migration", "Zero-downtime"],
                },
                {
                    title: "응답속도 개선",
                    description: "API 응답 속도를 50ms에서 5ms로 개선, 인메모리 캐시와 쿼리 최적화 적용.",
                    tags: ["Performance", "Cache", "Optimization"],
                },
            ]}
            storeLinks={{
                playStore: "https://play.google.com/store/apps/details?id=com.hybeim.tkic&pcampaignid=web_share",
                appStore: "https://apps.apple.com/kr/app/%EC%82%BC%EA%B5%AD%EB%B8%94%EB%A0%88%EC%9D%B4%EB%93%9C-%ED%82%A4%EC%9A%B0%EA%B8%B0-9-999-%EB%BD%91%EA%B8%B0-%EC%A6%9D%EC%A0%95/id6557070807",
            }}
            screenshots={[
                { src: "/images/portfolio/tkic/title.png", alt: "타이틀 화면", caption: "타이틀" },
                { src: "/images/portfolio/tkic/main-lobby.png", alt: "메인 로비", caption: "메인 로비" },
                { src: "/images/portfolio/tkic/offline-reward.png", alt: "오프라인 보상", caption: "오프라인 보상" },
                { src: "/images/portfolio/tkic/character.jpeg", alt: "캐릭터 목록", caption: "캐릭터" },
                { src: "/images/portfolio/tkic/character-detail.jpeg", alt: "캐릭터 상세", caption: "캐릭터 상세" },
                { src: "/images/portfolio/tkic/gacha.png", alt: "가챠 화면", caption: "가챠" },
                { src: "/images/portfolio/tkic/gacha-result.png", alt: "가챠 결과", caption: "가챠 결과" },
                { src: "/images/portfolio/tkic/shop.png", alt: "상점", caption: "상점" },
                { src: "/images/portfolio/tkic/shop-subscription.png", alt: "구독 상품", caption: "구독 상품" },
                { src: "/images/portfolio/tkic/castle-defense.png", alt: "성채 방어", caption: "성채 방어" },
                { src: "/images/portfolio/tkic/morale.png", alt: "사기 시스템", caption: "사기 시스템" },
                { src: "/images/portfolio/tkic/pvp.png", alt: "PvP", caption: "PvP" },
                { src: "/images/portfolio/tkic/treasure.png", alt: "보물", caption: "보물" },
                { src: "/images/portfolio/tkic/weapons.png", alt: "무기", caption: "무기" },
                { src: "/images/portfolio/tkic/worldboss.png", alt: "월드보스", caption: "월드보스" },
            ]}
        />
    );
};
