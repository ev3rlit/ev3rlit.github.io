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
    SwissGrowthCurveSection,
    SwissHeroSection,
    SwissNavigation,
    SwissProjectIntro_BladeX,
    SwissProjectIntro_SamgukBlade,
    SwissResumeSection,
    SwissRetrospectiveSection,
    SwissWeaknessSection_Default,
} from "@/widgets/portfolio/swissminimal";

export const SwissMinimalPage = () => {
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
            <SwissNavigation />

            <main
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
                    <SwissProjectIntro_SamgukBlade />
                </div>

                {/* DYNAMIC STORIES (Samguk Blade) */}
                <SwissFeatureSummary_ServiceTransfer sectionNumber="S.01" storyNumber="01" />
                <SwissFeatureSummary_Payment sectionNumber="S.02" storyNumber="02" />
                <SwissFeatureSummary_ErrorSystem sectionNumber="S.03" storyNumber="03" />
                <SwissFeatureSummary_TrackingContainer sectionNumber="S.04" storyNumber="04" />
                <SwissFeatureSummary_LogPipeline sectionNumber="S.05" storyNumber="05" />
                <SwissFeatureSummary_GuildMineCqrs sectionNumber="S.06" storyNumber="06" />

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
                    <SwissProjectIntro_BladeX />
                </div>

                {/* PAGE 14: GROWTH CURVE */}
                <div id="growth-curve">
                    <SwissGrowthCurveSection />
                </div>

                {/* PAGE 15: WEAKNESS & PLAN */}
                <div id="weakness-plan">
                    <SwissWeaknessSection_Default />
                </div>

                {/* PAGE 16: SKILLS & CONTACT */}
                <div id="contact">
                    <SwissContactSection />
                </div>
            </main>
        </div>
    );
};
