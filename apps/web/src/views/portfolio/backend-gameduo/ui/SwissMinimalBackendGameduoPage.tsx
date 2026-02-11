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
    SwissGrowthCurveSection_BackendGameduo,
    SwissHeroSection_BackendGameduo,
    SwissWeaknessSection_BackendGameduo,
} from "@/widgets/portfolio/variants/backend-gameduo";

export const SwissMinimalBackendGameduoPage = () => {
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
            <SwissNavigation basePath="/portfolio/backend-gameduo" />

            <main
                ref={mainRef}
                className="h-full w-full overflow-y-scroll scroll-smooth no-scrollbar absolute inset-0 z-10"
            >
                {/* PAGE 1: COVER */}
                <div id="hero">
                    <SwissHeroSection_BackendGameduo />
                </div>

                {/* PAGE 2: INTRODUCTION */}
                <div id="about">
                    <SwissAboutSection
                        role="백엔드 개발자"
                        motivation={{
                            title: "왜 게임듀오인가",
                            content: (
                                <>
                                    <p className="mb-3">
                                        공고의 &lsquo;팀원의 한마디&rsquo;에서 &ldquo;서비스 품질을 안정적으로 유지하고, 팀이 유연하게 협업하면서 문제 해결에 집중하는&rdquo; 문화를 읽었습니다. 이것은 제가 게임 서버 팀에서 직접 경험하고 지향해온 방식과 동일합니다.
                                    </p>
                                    <p className="mb-3">
                                        게임 서버에서 쌓은 실시간 처리, 동시성 제어, 라이브 운영 경험은 게임 백엔드의 핵심 역량과 직결됩니다. 이 경험을 Node.js/NestJS 생태계로 확장하여, 안정적인 서비스 운영과 지속적인 시스템 개선에 기여하고 싶습니다.
                                    </p>
                                    <p>
                                        또한, 이전에는 사내 자체 배포 환경을 사용했기에 AWS 같은 클라우드 인프라를 더 깊이 경험하고 싶습니다. 로깅·에러 핸들링·사용자 로그 분석의 기반 시스템을 구축해왔지만, 이를 실제 인프라에 연동하여 모니터링하고 운영하는 영역까지 확장하며 성장하고 싶습니다.
                                    </p>
                                </>
                            ),
                        }}
                    />
                </div>

                {/* PAGE 3: RESUME */}
                <div id="resume">
                    <SwissResumeSection
                        summary="Golang·C++ 기반 게임 서버를 설계하고, 6개월 만에 상용 서비스를 런칭하여 21개월 안정적인 라이브 운영을 주도한 4년차 백엔드 개발자입니다. 실시간 처리, 동시성 제어, 무중단 마이그레이션 같은 문제를 풀며 서비스 안정성의 가치를 체감했고, 이 경험을 Node.js/NestJS 기반 게임 백엔드로 확장하며, 로깅·모니터링 기반 시스템을 실제 인프라에 연동하여 운영하는 영역까지 성장하고 싶습니다."
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
                    <SwissGrowthCurveSection_BackendGameduo />
                </div>

                {/* PAGE 13: WEAKNESS & PLAN */}
                <div id="weakness-plan">
                    <SwissWeaknessSection_BackendGameduo />
                </div>

                {/* PAGE 14: SKILLS & CONTACT */}
                <div id="contact">
                    <SwissContactSection />
                </div>
            </main>
        </div>
    );
};
