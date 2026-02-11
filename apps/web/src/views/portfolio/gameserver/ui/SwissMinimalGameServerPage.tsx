"use client";

import { useEffect, useRef } from "react";

import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import {
    SwissFeatureSummary_ErrorSystem,
    SwissFeatureSummary_GuildMineCqrs,
    SwissFeatureSummary_LogPipeline,
    SwissFeatureSummary_Payment,
    SwissFeatureSummary_ServiceTransfer,
    SwissFeatureSummary_TrackingContainer,
} from "@/widgets/portfolio/stories";
import {
    SwissAboutSection,
    SwissContactSection,
    SwissNavigation,
    SwissProjectIntro_BladeX,
    SwissProjectIntro_SamgukBlade,
    SwissResumeSection,
} from "@/widgets/portfolio/swissminimal";
import {
    SwissGrowthCurveSection_GameServer,
    SwissHeroSection_GameServer,
    SwissWeaknessSection_GameServer,
} from "@/widgets/portfolio/variants/gameserver";

export const SwissMinimalGameServerPage = () => {
    const { setPortfolioMode, setSidebarOpen } = useSidebarStore();
    const mainRef = useRef<HTMLElement>(null);

    // Layout Mode
    useEffect(() => {
        setPortfolioMode(true);
        setSidebarOpen(false);

        return () => {
            setPortfolioMode(false);
            setSidebarOpen(true);
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

    return (
        <div className="relative h-full w-full overflow-hidden bg-white dark:bg-stone-950">
            <SwissNavigation basePath="/portfolio/gameserver" />

            <main
                ref={mainRef}
                className="h-full w-full overflow-y-scroll scroll-smooth no-scrollbar absolute inset-0 z-10"
            >
                {/* PAGE 1: COVER */}
                <div id="hero">
                    <SwissHeroSection_GameServer />
                </div>

                {/* PAGE 2: INTRODUCTION */}
                <div id="about">
                    <SwissAboutSection
                        role="게임 서버 개발자"
                        motivation={{
                            title: "왜 게임 서버인가",
                            content: "실시간 통신, 동시성 제어, 대규모 트래픽 처리 — 게임 서버는 가장 까다로운 기술적 도전이 밀집된 분야입니다. 이 도메인에서 더 깊이 파고들며 성장하고 싶습니다.",
                        }}
                    />
                </div>

                {/* PAGE 3: RESUME */}
                <div id="resume">
                    <SwissResumeSection
                        summary="Golang·C++ 기반 게임 서버를 설계하고, 런칭부터 글로벌 라이브 운영까지 전 사이클을 주도한 3년차 게임 서버 개발자입니다. 실시간 처리, 동시성 제어, 무중단 마이그레이션 같은 문제를 풀며 게임 서버의 깊이에 매료되었고, 앞으로도 이 도메인에서 대규모 동시접속, 분산 시스템, 네트워크 최적화 등 더 깊은 기술적 도전을 이어가고 싶습니다."
                    />
                </div>

                {/* PAGE 4: PROJECT INTRO (삼국블레이드) */}
                <div id="project-samguk">
                    <SwissProjectIntro_SamgukBlade />
                </div>

                {/* DYNAMIC STORIES (Samguk Blade) */}
                <SwissFeatureSummary_ServiceTransfer sectionNumber="S.01" storyNumber="01" />
                <SwissFeatureSummary_Payment sectionNumber="S.02" storyNumber="02" />
                <SwissFeatureSummary_ErrorSystem sectionNumber="S.03" storyNumber="03" />
                <SwissFeatureSummary_TrackingContainer sectionNumber="S.04" storyNumber="04" />
                <SwissFeatureSummary_LogPipeline sectionNumber="S.05" storyNumber="05" />
                <SwissFeatureSummary_GuildMineCqrs sectionNumber="S.06" storyNumber="06" />

                {/* PAGE 11: PROJECT INTRO (BladeX) */}
                <div id="project-bladex">
                    <SwissProjectIntro_BladeX />
                </div>

                {/* PAGE 12: GROWTH CURVE */}
                <div id="growth-curve">
                    <SwissGrowthCurveSection_GameServer />
                </div>

                {/* PAGE 13: WEAKNESS & PLAN */}
                <div id="weakness-plan">
                    <SwissWeaknessSection_GameServer />
                </div>

                {/* PAGE 14: SKILLS & CONTACT */}
                <div id="contact">
                    <SwissContactSection />
                </div>
            </main>
        </div>
    );
};
