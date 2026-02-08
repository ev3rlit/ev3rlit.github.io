"use client";

import { SwissProjectIntroSection } from "./SwissProjectIntroSection";

export const SwissProjectIntro_BladeX = () => {
    return (
        <SwissProjectIntroSection
            sectionNumber="04"
            projectName="블레이드 X"
            period="2022.05 - 2023.04"
            projectRole="게임 서버 개발자 (신입)"
            genre="모바일 액션 RPG"
            engine="Unreal Engine / C++14 서버"
            description="기존 서비스 종료된 Blade2 에셋을 재활용한 신규 게임 개발. C++ 게임 서버 콘텐츠 전반을 구현하며 서버 개발의 기초를 다진 첫 프로젝트."
            contribution={[
                "기존 서버 코어(인증/게임/월드/길드/채팅 5종) 분석 및 구조 문서화 — 문서 전무한 환경에서 코드 분석만으로 전체 구조 파악",
                "아이템·인벤토리 핵심 시스템의 데이터 구조 설계 및 Stored Procedure 기반 데이터 접근 구현",
                "범용 보상 시스템 설계: 그룹 식별자 기반 3가지 보상 타입(개별 확률/가중치 선정/재귀 그룹) + 순환 참조 탐지 로직 적용",
                "인게임 재화 상점 및 앱 내 실결제 상점 구현",
                "중복 로그인 사용자 경험 개선: 서버 간 중계를 통한 기존 기기 확인 → 유저 선택 방식으로 전환",
                "게임 유저 행동 로그 시스템 전수 구현 (도메인별 테이블 및 Stored Procedure 설계)",
            ]}
            enhancedMetrics={[
                { kpi: "동시접속자", value: "200", context: "최대 동시접속" },
                { kpi: "일간 활성 사용자", value: "1,000", context: "일간 활성 사용자" },
                { kpi: "라이브 서비스", value: "1개월", context: "사업지표 저조로 종료" },
                { kpi: "서버 구성", value: "5종", context: "인증/게임/월드/길드/채팅" },
            ]}
            techStack={["C++14", "Boost.Asio", "MFC", "MySQL", "Stored Procedure", "Windows Server", "Jenkins"]}
            modules={[
                {
                    title: "범용 보상 시스템",
                    description: "확률·가중치·재귀 그룹 3가지 보상 타입을 하나의 구조로 통합. 순환 참조 방지를 위해 탐지 로직 적용.",
                    tags: ["보상", "알고리즘", "구조 설계"],
                },
                {
                    title: "아이템 & 인벤토리",
                    description: "게임 핵심 시스템. 아이템 종류별 데이터 구조 설계 및 Stored Procedure 기반 처리. 첫 기능 개발로 설계·예외처리의 중요성 체득.",
                    tags: ["게임 핵심", "MySQL", "Stored Procedure"],
                },
                {
                    title: "중복 로그인 구조 개선",
                    description: "강제 종료 → 서버 간 중계를 통한 유저 선택 방식으로 사용자 경험 개선. 서버 간 통신 경험.",
                    tags: ["사용자 경험", "서버 중계", "소켓 통신"],
                },
            ]}
            storeLinks={{}}
            screenshots={[
                { src: "/images/portfolio/bladex/main-lobby.jpeg", alt: "메인 로비", caption: "메인 로비" },
                { src: "/images/portfolio/bladex/ingame.jpeg", alt: "인게임", caption: "인게임" },
                { src: "/images/portfolio/bladex/character.jpeg", alt: "캐릭터", caption: "캐릭터" },
                { src: "/images/portfolio/bladex/shop.jpeg", alt: "상점", caption: "상점" },
                { src: "/images/portfolio/bladex/battle-reward.jpeg", alt: "전투 보상", caption: "전투 보상" },
                { src: "/images/portfolio/bladex/idle-reward.jpeg", alt: "방치 보상", caption: "방치 보상" },
            ]}
        />
    );
};
