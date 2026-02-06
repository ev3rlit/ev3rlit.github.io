"use client";

import { useEffect, useRef, useState } from "react";
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import { AnimatePresence, motion } from "framer-motion";
import {
    SwissNavigation,
    SwissHeroSection,
    SwissAboutSection,
    SwissResumeSection,
    SwissProjectIntroSection,
    SwissRetrospectiveSection,
    SwissBladeXRetrospectiveSection,
    SwissContactSection
} from "@/widgets/portfolio/swissminimal";
import {
    Story_ErrorHandling,
    Story_Websocket,
    Story_TrackingContainer,
    Story_Payment,
    Story_Migration,
    Story_LogPipeline,
    Story_Documentation,
    Story_Growth
} from "@/widgets/portfolio/stories";
import { StoryDetail_ErrorHandling } from "@/views/portfolio/projects/StoryDetail_ErrorHandling";

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
                        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar absolute inset-0 z-10"
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
                                role="Server Architect & Lead"
                                genre="방치형 액션 RPG"
                                engine="Unity Client / Golang Server"
                                metrics={[
                                    { label: 'Google Rank', value: '1st' },
                                    { label: 'CCU', value: '10,000+' },
                                    { label: 'Service', value: 'Global One Build' }
                                ]}
                                description="입사 초기, 잦은 라이브 장애와 비효율적인 로그 시스템으로 고통받던 팀에 합류하여, '서버 아키텍처를 안정화'하고 '운영 효율을 극대화'하는 데 주력했습니다."
                                contribution="라이브 장애 90% 감소 및 로그 시스템 자동화를 통한 운영 효율 400% 증대 달성."
                            />
                        </div>

                        {/* DYNAMIC STORIES (Samguk Blade) */}
                        <Story_ErrorHandling sectionNumber="S.01" storyNumber="01" />
                        <Story_Websocket sectionNumber="S.02" storyNumber="02" />
                        <Story_TrackingContainer sectionNumber="S.03" storyNumber="03" />
                        <Story_Payment sectionNumber="S.04" storyNumber="04" />
                        <Story_Migration sectionNumber="S.05" storyNumber="05" />
                        <Story_LogPipeline sectionNumber="S.06" storyNumber="06" />

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
                                role="Game Server Developer"
                                genre="콘솔급 블록체인 액션 RPG"
                                engine="Unreal Engine / C++ Server"
                                description="기존 서비스 종료된 Blade2 에셋을 재활용하여, 블록체인 기반의 신규 게임 개발. 이 프로젝트는 성공보다 실패에서 더 많이 배운 경험입니다."
                                contribution="문서화 없이 방치된 Legacy C++ 서버 코어를 분석하여 아키텍처 문서화 및 아이템/인벤토리 코어 로직 설계."
                            />
                        </div>

                        {/* DYNAMIC STORIES (BladeX) */}
                        <Story_Documentation sectionNumber="S.07" storyNumber="07" />
                        <Story_Growth sectionNumber="S.08" storyNumber="08" />

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
