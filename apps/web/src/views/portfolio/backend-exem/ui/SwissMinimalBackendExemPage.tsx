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
    SwissGrowthCurveSection_BackendExem,
    SwissHeroSection_BackendExem,
    SwissWeaknessSection_BackendExem,
} from "@/widgets/portfolio/variants/backend-exem";

export const SwissMinimalBackendExemPage = () => {
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
            <SwissNavigation basePath="/portfolio/backend-exem" />

            <main
                ref={mainRef}
                className="h-full w-full overflow-y-scroll scroll-smooth no-scrollbar absolute inset-0 z-10"
            >
                {/* PAGE 1: COVER */}
                <div id="hero">
                    <SwissHeroSection_BackendExem />
                </div>

                {/* PAGE 2: INTRODUCTION */}
                <div id="about">
                    <SwissAboutSection
                        role="백엔드 개발자"
                        motivation={{
                            title: "왜 엑셈인가",
                            content: (
                                <>
                                    <p className="mb-3">
                                        엑셈 CORE팀이 구축하는 &ldquo;데이터 파이프라인 + 백엔드 시스템&rdquo;은
                                        제가 게임 서버에서 해온 일의 연장선입니다. Go로 고성능 서버를
                                        설계하고, 실시간 데이터를 수집·처리하며, 서비스 안정성을
                                        지속적으로 개선해온 경험이 CORE팀의 업무와 직결됩니다.
                                    </p>
                                    <p className="mb-3">
                                        또한 엑셈의 &ldquo;열정·속도·몰입&rdquo; 가치는 Go·MongoDB를 처음 접하고
                                        6개월 만에 상용 서비스를 출시한 저의 학습 방식과 동일합니다.
                                        문제의 핵심을 빠르게 파악하고, 속도감 있게 실행하며,
                                        결과물에 몰입하는 태도로 CORE팀에 기여하고 싶습니다.
                                    </p>
                                    <p>
                                        개발부터 배포, 운영까지 전 과정에 직접 참여하는 환경에서
                                        Kafka, ClickHouse 같은 데이터 처리 기술을 깊이 경험하고,
                                        모니터링·로깅 시스템을 실제 인프라에 연동하는 영역까지
                                        성장하고 싶습니다.
                                    </p>
                                </>
                            ),
                        }}
                    />
                </div>

                {/* PAGE 3: RESUME */}
                <div id="resume">
                    <SwissResumeSection
                        summary="Golang·C++ 기반 게임 서버를 설계하고, 6개월 만에 상용 서비스를 런칭하여 21개월 안정적인 라이브 운영을 주도한 4년차 백엔드 개발자입니다. Go 기반 고성능 서버 설계, 실시간 데이터 파이프라인 구축, 대용량 데이터 무중단 마이그레이션 경험을 바탕으로, 데이터 파이프라인과 백엔드 시스템 영역에서 더 깊이 성장하고 싶습니다."
                    />
                </div>

                {/* PAGE 4: PROJECT INTRO (삼국블레이드) */}
                <div id="project-samguk">
                    <SwissProjectIntro_SamgukBlade />
                </div>

                {/* DYNAMIC STORIES (Samguk Blade) — 엑셈 역량 순 */}
                <SwissFeatureSummary_LogPipeline sectionNumber="S.01" storyNumber="01" />
                <SwissFeatureSummary_Payment sectionNumber="S.02" storyNumber="02" />
                <SwissFeatureSummary_GuildMineCqrs sectionNumber="S.03" storyNumber="03" />
                <SwissFeatureSummary_TrackingContainer sectionNumber="S.04" storyNumber="04" />
                <SwissFeatureSummary_ErrorSystem sectionNumber="S.05" storyNumber="05" />
                <SwissFeatureSummary_ServiceTransfer sectionNumber="S.06" storyNumber="06" />

                {/* PAGE 11: PROJECT INTRO (BladeX) */}
                <div id="project-bladex">
                    <SwissProjectIntro_BladeX />
                </div>

                {/* PAGE 12: GROWTH CURVE */}
                <div id="growth-curve">
                    <SwissGrowthCurveSection_BackendExem />
                </div>

                {/* PAGE 13: WEAKNESS & PLAN */}
                <div id="weakness-plan">
                    <SwissWeaknessSection_BackendExem />
                </div>

                {/* PAGE 14: SKILLS & CONTACT */}
                <div id="contact">
                    <SwissContactSection />
                </div>
            </main>
        </div>
    );
};
