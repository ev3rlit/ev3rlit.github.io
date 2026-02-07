"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import { StoryDetail_ErrorHandling } from "@/views/portfolio/projects/StoryDetail_ErrorHandling";
import {
    SwissFeatureSummary_Documentation,
    SwissFeatureSummary_ErrorHandling,
    SwissFeatureSummary_Growth,
    SwissFeatureSummary_LogPipeline,
    SwissFeatureSummary_Migration,
    SwissFeatureSummary_Payment,
    SwissFeatureSummary_TrackingContainer,
    SwissFeatureSummary_Websocket,
} from "@/widgets/portfolio/stories";
import {
    SwissAboutSection,
    SwissBladeXRetrospectiveSection,
    SwissContactSection,
    SwissHeroSection,
    SwissNavigation,
    SwissProjectIntroSection,
    SwissResumeSection,
    SwissRetrospectiveSection,
} from "@/widgets/portfolio/swissminimal";

const SCROLL_KEY = 'swiss_portfolio_scroll_y';

export const SwissMinimalPage = () => {
    const { setPortfolioMode, setSidebarOpen } = useSidebarStore();
    const mainRef = useRef<HTMLElement>(null);

    // Layout Mode & Scroll Restoration
    useEffect(() => {
        setPortfolioMode(true);
        setSidebarOpen(false);

        // Restore Scroll Position
        const savedScrollY = sessionStorage.getItem(SCROLL_KEY);
        if (savedScrollY && mainRef.current) {
            // Immediate restoration
            mainRef.current.scrollTop = parseInt(savedScrollY, 10);

            // Retry for layout shifts
            setTimeout(() => {
                if (mainRef.current) mainRef.current.scrollTop = parseInt(savedScrollY, 10);
            }, 100);
        }

        return () => {
            setPortfolioMode(false);
            setSidebarOpen(true);

            // Save Scroll Position
            if (mainRef.current) {
                sessionStorage.setItem(SCROLL_KEY, mainRef.current.scrollTop.toString());
            }
        };
    }, [setPortfolioMode, setSidebarOpen]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!mainRef.current) return;
            const container = mainRef.current;
            const scrollAmount = window.innerHeight;

            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    e.preventDefault();
                    container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
                    break;
                case 'Home':
                    e.preventDefault();
                    container.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'End':
                    e.preventDefault();
                    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const [activeStory, setActiveStory] = useState<string | null>(null);

    // Detail View Map
    const renderDetail = () => {
        switch (activeStory) {
            case 'error-handling':
                return <StoryDetail_ErrorHandling onBack={() => setActiveStory(null)} />;
            default:
                return null;
        }
    };

    return (
        <div className="relative h-full w-full overflow-hidden bg-white dark:bg-stone-950">
            <SwissNavigation />

            <AnimatePresence mode="wait" initial={false}>
                {!activeStory ? (
                    <motion.main
                        key="main-list"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        ref={mainRef}
                        className="h-full w-full overflow-y-scroll scroll-smooth no-scrollbar absolute inset-0 z-10"
                    >
                        {/* PAGE 1: COVER */}
                        <div id="hero">
                            <SwissHeroSection />
                        </div>

                        {/* PAGE 2: INTRODUCTION */}
                        <div id="about">
                            <SwissAboutSection />
                        </div>

                        {/* PAGE 3: RESUME */}
                        <div id="resume">
                            <SwissResumeSection />
                        </div>


                        {/* PAGE 4: PROJECT INTRO (삼국블레이드) */}
                        <div id="project-samguk">
                            <SwissProjectIntroSection
                                sectionNumber="03"
                                projectName="삼국블레이드 키우기"
                                period="2023.04 - 2025.10"
                                projectRole="Server Architect & Lead"
                                genre="방치형 액션 RPG"
                                engine="Unreal Engine 5 Client / Golang Server"
                                description="글로벌 20개국에 서비스 중인 방치형 액션 RPG의 서버 아키텍처를 설계하고, 런칭부터 라이브 운영까지 전 사이클을 주도했습니다."
                                contribution="라이브 장애 90% 감소 및 로그 시스템 자동화를 통한 운영 효율 400% 증대 달성."
                                enhancedMetrics={[
                                    { kpi: "Google Play 순위", value: "1위", context: "콜라보 이벤트 당일" },
                                    { kpi: "피크 DAU", value: "10,000", context: "일간 활성 사용자" },
                                    { kpi: "서비스 가용성", value: "무중단", context: "21개월 라이브 운영" },
                                    { kpi: "API 응답 속도", value: "5ms", context: "50ms → 5ms 개선" }
                                ]}
                                techStack={["Golang", "MongoDB", "Redis", "WebSocket", "AWS Kinesis", "Naver Cloud Platform", "Jenkins"]}
                                modules={[
                                    {
                                        title: "앱 서비스 이관",
                                        description: "퍼블리셔 계약 해지 후 AWS에서 Naver Cloud로 2개월 내 전체 인프라·데이터 무중단 이관.",
                                        tags: ["AWS", "NCP", "Zero-downtime"]
                                    },
                                    {
                                        title: "결제 마이그레이션",
                                        description: "라이브 서비스 중 결제 데이터 10만 건 무중단 마이그레이션 완수.",
                                        tags: ["Payment", "Migration", "Zero-downtime"]
                                    },
                                    {
                                        title: "응답속도 개선",
                                        description: "API 응답 속도를 50ms에서 5ms로 개선, 인메모리 캐시와 쿼리 최적화 적용.",
                                        tags: ["Performance", "Cache", "Optimization"]
                                    }
                                ]}
                                screenshots={[
                                    { src: "/images/portfolio/samguk_battle.svg", alt: "삼국블레이드 전투 화면 와이어프레임", caption: "전투 화면" },
                                    { src: "/images/portfolio/samguk_inventory.svg", alt: "삼국블레이드 영웅 정보 화면 와이어프레임", caption: "영웅 정보" },
                                    { src: "/images/portfolio/samguk_gacha.svg", alt: "삼국블레이드 가챠 화면 와이어프레임", caption: "가챠 / 뽑기" }
                                ]}
                            />
                        </div>

                        {/* DYNAMIC STORIES (Samguk Blade) */}
                        <SwissFeatureSummary_ErrorHandling sectionNumber="S.01" storyNumber="01" />
                        <SwissFeatureSummary_Websocket sectionNumber="S.02" storyNumber="02" />
                        <SwissFeatureSummary_TrackingContainer sectionNumber="S.03" storyNumber="03" />
                        <SwissFeatureSummary_Payment sectionNumber="S.04" storyNumber="04" />
                        <SwissFeatureSummary_Migration sectionNumber="S.05" storyNumber="05" />
                        <SwissFeatureSummary_LogPipeline sectionNumber="S.06" storyNumber="06" />

                        {/* PAGE 9: RETROSPECTIVE (삼국블레이드) */}
                        <div id="retrospective-samguk">
                            <SwissRetrospectiveSection
                                sectionLabel="(R.01)"
                                title="Retrospective: Samguk Blade"
                                subtitle="Evolution & Unfinished Business"
                                quote="실패에서 배운 것을 적용했으나, 또 다른 성장의 씨앗(부채)을 발견하다"
                                evolution={{
                                    title: "Evolution",
                                    items: [
                                        "BladeX의 실패를 딛고 <strong>Golang</strong> 도입 및 아키텍처 주도",
                                        "트랜잭션+롤백 미들웨어 초기 설계로 <strong>데이터 무결성 100% 보장</strong>"
                                    ]
                                }}
                                techDebt={{
                                    title: "Technical Debt",
                                    items: [
                                        "<strong>Client DX 부족:</strong> 인메모리 트랜잭션 도구로 인한 클라이언트 로직 부하",
                                        "<strong>Observability:</strong> APM 부재로 인한 수동 장애 대응 한계"
                                    ]
                                }}
                                lesson={{
                                    title: "Strategic Lesson",
                                    items: [
                                        "<strong>Data Sovereignty:</strong> 퍼블리셔 의존 없는 핵심 데이터 자체 관리의 중요성 체득"
                                    ]
                                }}
                            />
                        </div>

                        {/* PAGE 10: PROJECT INTRO (BladeX) */}
                        <div id="project-bladex">
                            <SwissProjectIntroSection
                                sectionNumber="04"
                                projectName="블레이드 X"
                                period="2022.05 - 2023.04"
                                projectRole="Game Server Developer"
                                genre="콘솔급 블록체인 액션 RPG"
                                engine="Unreal Engine / C++ Server"
                                description="기존 서비스 종료된 Blade2 에셋을 재활용하여, 블록체인 기반의 신규 게임 개발. 이 프로젝트는 성공보다 실패에서 더 많이 배운 경험입니다."
                                contribution="문서화 없이 방치된 Legacy C++ 서버 코어를 분석하여 아키텍처 문서화 및 아이템/인벤토리 코어 로직 설계."
                            />
                        </div>

                        {/* DYNAMIC STORIES (BladeX) */}
                        <SwissFeatureSummary_Documentation sectionNumber="S.07" storyNumber="07" />
                        <SwissFeatureSummary_Growth sectionNumber="S.08" storyNumber="08" />

                        {/* PAGE 13: RETROSPECTIVE (BladeX) */}
                        <div id="retrospective-bladex">
                            <SwissBladeXRetrospectiveSection />
                        </div>

                        {/* PAGE 14: SKILLS & CONTACT */}
                        <div id="contact">
                            <SwissContactSection />
                        </div>
                    </motion.main>
                ) : (
                    <motion.div
                        key="detail-view"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-50 bg-white dark:bg-stone-950 overflow-y-auto"
                    >
                        {renderDetail()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
