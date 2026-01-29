
"use client";

import { useEffect } from "react";
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import { CoverSection } from "@/widgets/portfolio/ui/CoverSection";
import { IntroSection } from "@/widgets/portfolio/ui/IntroSection";
import { ResumeSection } from "@/widgets/portfolio/ui/ResumeSection";
import { ProjectIntroSection } from "@/widgets/portfolio/ui/ProjectIntroSection";
import { Story_Stability } from "@/widgets/portfolio/ui/stories/Story_Stability";
import { Story_Efficiency } from "@/widgets/portfolio/ui/stories/Story_Efficiency";
import { Story_Ownership } from "@/widgets/portfolio/ui/stories/Story_Ownership";
import { Story_DataEngineering } from "@/widgets/portfolio/ui/stories/Story_DataEngineering";
import { RetrospectiveSection } from "@/widgets/portfolio/ui/RetrospectiveSection";
import { Story_Documentation } from "@/widgets/portfolio/ui/stories/Story_Documentation";
import { Story_Growth } from "@/widgets/portfolio/ui/stories/Story_Growth";
import { BladeXRetrospectiveSection } from "@/widgets/portfolio/ui/BladeXRetrospectiveSection";
import { SkillsSection } from "@/widgets/portfolio/ui/SkillsSection";

export const PortfolioPage = () => {
    const { setPortfolioMode, setSidebarOpen } = useSidebarStore();

    useEffect(() => {
        setPortfolioMode(true);
        setSidebarOpen(false); // Hide sidebar for full immersion

        return () => {
            setPortfolioMode(false);
            setSidebarOpen(true);
        };
    }, [setPortfolioMode, setSidebarOpen]);

    return (
        <main className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-stone-50 dark:bg-stone-950 no-scrollbar">
            {/* 1. Cover */}
            <CoverSection />

            {/* 2. Intro */}
            <IntroSection />

            {/* 3. Resume */}
            <ResumeSection />

            {/* 4. Samguk Blade Intro */}
            <ProjectIntroSection
                sectionNumber="04"
                projectName="삼국블레이드 키우기"
                subTitle="Samguk Blade Idle"
                period="2023.04 - 2025.10"
                role="Server Architect & Lead"
                genre="Idle Action RPG"
                engine="Unity Client / Golang Server"
                metrics={[
                    { label: "Google Rank", value: "1st" },
                    { label: "CCU", value: "10,000+" },
                    { label: "Service", value: "Global One Build" },
                ]}
                description="방치형 액션 RPG로, 입사 초기 잦은 라이브 장애와 비효율적인 로그 시스템으로 고통받던 팀에 합류하여, '서버 아키텍처를 안정화'하고 '운영 효율을 극대화'하는 데 주력했습니다."
                contributionSummary="라이브 장애 90% 감소 및 로그 시스템 자동화를 통한 운영 효율 400% 증대 달성."
            />

            {/* Stories: Samguk */}
            <Story_Stability />
            <Story_Efficiency />
            <Story_Ownership />
            <Story_DataEngineering />

            {/* Retrospective: Samguk */}
            <RetrospectiveSection
                sectionNumber="REFLECT.01"
                title="Retrospective: Samguk Blade"
                subTitle="Evolution & Unfinished Business"
                evolution={{
                    title: "Evolution",
                    items: [
                        "BladeX의 실패를 딛고 <strong>Golang</strong> 도입 및 아키텍처 주도",
                        "트랜잭션+롤백 미들웨어 초기 설계로 <strong>데이터 무결성 100% 보장</strong>"
                    ]
                }}
                techDebt={{
                    title: "Unfinished Business (Debt)",
                    items: [
                        "<strong>Client DX 부족:</strong> 인메모리 트랜잭션 도구로 인한 클라이언트 로직 부하",
                        "<strong>Observability:</strong> APM 부재로 인한 수동 장애 대응 한계"
                    ]
                }}
                lessons={{
                    title: "Strategic Lesson",
                    items: [
                        "<strong>Data Sovereignty:</strong> 퍼블리셔 의존 없는 핵심 데이터 자체 관리의 중요성 체득"
                    ]
                }}
                quote="실패에서 배운 것을 적용했으나, 또 다른 성장의 씨앗(부채)을 발견하다"
            />

            {/* 5. Blade X Intro */}
            <ProjectIntroSection
                sectionNumber="05"
                projectName="블레이드 X"
                subTitle="Blade X"
                period="2022.05 - 2023.04"
                role="Game Server Developer"
                genre="Blockchain Action RPG"
                engine="Unreal Engine / C++ Server"
                description="콘솔급 블록체인 액션 RPG. 기존 Blade2 에셋을 재활용하여 신규 개발했습니다."
                contributionSummary="문서화 없이 방치된 Legacy C++ 서버 코어를 분석하여 아키텍처 문서화 및 아이템/인벤토리 코어 로직 설계."
            />

            {/* Stories: Blade X */}
            <Story_Documentation />
            <Story_Growth />

            {/* Retrospective: Blade X */}
            <BladeXRetrospectiveSection />

            {/* 6. Skills & Contact */}
            <SkillsSection />
        </main>
    );
};
