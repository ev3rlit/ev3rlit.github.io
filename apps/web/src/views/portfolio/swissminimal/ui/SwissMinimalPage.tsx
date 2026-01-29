"use client";

import { useEffect } from "react";
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import {
    SwissNavigation,
    SwissHeroSection,
    SwissAboutSection,
    SwissResumeSection,
    SwissProjectIntroSection,
    SwissStorySection,
    SwissRetrospectiveSection,
    SwissBladeXRetrospectiveSection,
    SwissContactSection
} from "@/widgets/portfolio/swissminimal";

export const SwissMinimalPage = () => {
    const { setPortfolioMode, setSidebarOpen } = useSidebarStore();

    useEffect(() => {
        setPortfolioMode(true);
        setSidebarOpen(false);

        return () => {
            setPortfolioMode(false);
            setSidebarOpen(true);
        };
    }, [setPortfolioMode, setSidebarOpen]);

    return (
        <div className="relative h-full w-full">
            <SwissNavigation />
            <main className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-white dark:bg-stone-950 no-scrollbar">
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

                {/* PAGE 5: STORY 01 (Stability) */}
                <div id="story-stability">
                    <SwissStorySection
                        sectionNumber="S.01"
                        storyNumber="01"
                        keyword="Stability"
                        title="에러 핸들링 시스템 구축"
                        subtitle="핫픽스 시간을 1/8로 단축한 안정성 확보 프로젝트 (1인 전담, 1개월)"
                        step01_intro="라이브 서비스의 안정성을 위해 에러 추적 시스템을 바닥부터 재설계했습니다."
                        step02_background="이전 프로젝트에서 에러 원인 파악에 하루 이상 소요되던 고통스러운 경험을 반복하지 않기 위해, 프로젝트 초기부터 '추적 가능한 시스템'을 만드는 것을 목표로 했습니다."
                        step03_problem="Go 언어의 기본 에러 처리만으로는 스택 트레이스와 당시 상황(Context)을 알 수 없어, 로그만으로 원인을 찾기 불가능했습니다."
                        step03_solution="'Error as Value' 패턴을 응용하여, 에러 발생 시점의 모든 문맥 정보를 수집하는 미들웨어와 래퍼(Wrapper) 함수를 구현했습니다."
                        step04_action="UserID, Request Params, Code Line을 자동으로 캡처하는 미들웨어를 직접 설계하고, 팀원들이 쉽게 사용할 수 있도록 온보딩 가이드를 작성하여 코드 컨벤션을 통일시켰습니다."
                        step05_result="운영툴에서 에러 로그 클릭 한 번으로 '누가, 어떤 요청을 보내서, 어디서 터졌는지' 즉시 확인 가능한 대시보드 구축."
                        step06_performance="핫픽스 대응 시간 단축: 평균 1일(24h) → 1~2시간 이내로 약 90% 단축"
                        step07_capability="Context-aware Error Logging 시스템을 직접 설계해본 경험이 있습니다. 입사 시 기존 에러 추적 체계를 빠르게 파악하고 개선점을 제안할 수 있습니다."
                    />
                </div>

                {/* PAGE 6: STORY 02 (Efficiency) */}
                <div id="story-efficiency">
                    <SwissStorySection
                        sectionNumber="S.02"
                        storyNumber="02"
                        keyword="Efficiency"
                        title="로그 파이프라인 자동화"
                        subtitle="개발 생산성을 4배 높인 스키마리스 로그 시스템 (1인 전담, 2주)"
                        step01_intro="복잡한 로그 정의 절차를 자동화하여 개발자와 운영팀의 병목을 제거했습니다."
                        step02_background="'로그 하나 남기는데 비즈니스 로직보다 시간이 더 걸려서야 되겠는가?'라는 문제의식에서 출발했습니다."
                        step03_problem="기존에는 로그 테이블 정의(SQL) → 코드 생성 → 연동의 과정이 필요해 작업이 번거로웠고, 수정 유연성도 떨어졌습니다."
                        step03_solution="Go 구조체(Struct)만 정의하면 AWS Kinesis까지 자동으로 전송되는 Schema-less 파이프라인을 구축했습니다."
                        step04_action="개발 효율뿐만 아니라 CS 대응 효율까지 고려했습니다. 'Action-based Log ID'를 고안하여, 유저의 행위 순서가 인과관계에 따라 묶이도록 설계해 운영팀이 개발자 없이도 CS를 처리하게 만들었습니다."
                        step05_result="개발자는 구조체 선언만으로 로그 작업 끝. 운영팀은 시각화된 대시보드에서 유저 CS 직접 처리."
                        step06_performance="생산성 향상: 로그 작업 소요 시간 0.5일 → 1시간 이내로 단축"
                        step07_capability="반복적인 비효율을 참지 않습니다. 팀 전체의 시간을 아껴주는 도구와 시스템을 만들어 조직의 속도를 높이는 'Force Multiplier'가 되겠습니다."
                    />
                </div>

                {/* PAGE 7: STORY 03 (Ownership) */}
                <div id="story-ownership">
                    <SwissStorySection
                        sectionNumber="S.03"
                        storyNumber="03"
                        keyword="Ownership"
                        title="대규모 서비스 이관 및 장애 대응"
                        subtitle="무중단 데이터 이관과 위기 상황에서의 승부수 (메인 담당, 1개월)"
                        step01_intro="퍼블리셔 계약 해지로 인한 데이터 이관 및 Apple 로그인 장애 사태를 해결했습니다."
                        step02_background="외부 의존성(퍼블리셔 SDK)을 제거하고 자체 서비스로 전환하는 과정에서 데이터 정합성을 지키고 서비스를 중단시키지 않는 것이 목표였습니다."
                        step03_problem="Apple Transfer API 연동 실패로 전체 iOS 유저가 로그인 불가능한 초유의 장애 발생. 매뉴얼도 없는 상황."
                        step03_solution="서비스 중단 대신, 과감하게 DB 레벨에서 기존 토큰을 신규 계정 체계로 일괄 마이그레이션하는 스크립트를 작성하여 승부수를 띄웠습니다."
                        step04_action="'규정된 절차가 없다면 원리를 파고들어라.' OAuth 작동 원리를 역이용하여, 클라이언트 수정(앱 심사 2일 소요) 없이 서버 사이드 데이터 패치만으로 문제를 해결했습니다."
                        step05_result="iOS 유저 전원(수십만 명 예상) 데이터 복구 및 로그인 정상화."
                        step06_performance="외부 의존성의 리스크를 뼈저리게 느꼈으며, '위기 상황에서는 완벽한 정답보다 최선의 수습이 중요하다'는 것을 체험했습니다."
                        step07_capability="정해진 길로만 가지 않습니다. 예상치 못한 장애 앞에서도 주저앉지 않고, 집요하게 해결책을 찾아내 서비스의 불을 끄는 소방관이 되겠습니다."
                    />
                </div>

                {/* PAGE 8: STORY 04 (Data Engineering) */}
                <div id="story-data">
                    <SwissStorySection
                        sectionNumber="S.04"
                        storyNumber="04"
                        keyword="Data Engineering"
                        title="통합 매출 시스템 & 무중단 마이그레이션"
                        subtitle="사라진 매출 데이터를 되살리고, 다운타임 없이 10만 건을 이관하다"
                        step01_intro="퍼블리셔 의존으로 인해 누락되었던 핵심 매출 데이터를 복원하고, 자체 정산 시스템을 구축했습니다."
                        step02_background="퍼블리셔 계약 해지로 자체 서비스를 전환해야 했으나, 기존 DB에는 영수증 원본만 있을 뿐 분석에 필요한 필수 데이터(통화코드, 결제금액)가 전무했습니다."
                        step03_problem="글로벌 서비스 특성상 환율/통화 정보 없이는 정확한 매출 파악 불가. 운영 서비스 중이라 DB 스키마 변경 부담."
                        step03_solution="3대 스토어(Google, Apple, Galaxy) 통합 스키마 설계 및 백그라운드 마이그레이션 프로세스 개발."
                        step04_action="플랫폼별 고유 테이블과 통합 인덱스 테이블로 정규화. 기존 Base64 영수증을 파싱하고, 부족한 정보는 각 스토어 API를 역으로 조회하여 채워넣는 스크립트 작성."
                        step05_result="10만 건의 결제 데이터 무결성 확보 및 이관 완료. 운영팀이 실시간으로 확인 가능한 통합 매출 조회 대시보드 구축."
                        step06_performance="System Stability: 라이브 서비스 다운타임 0초"
                        step07_capability="레거시 데이터의 두려움을 없앱니다. 복잡하게 얽힌 데이터를 분석하여 살려내고, 서비스 중단 없이 구조를 개선하는 데이터 엔지니어링 역량을 갖췄습니다."
                    />
                </div>

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

                {/* PAGE 11: STORY 05 (Documentation) */}
                <div id="story-documentation">
                    <SwissStorySection
                        sectionNumber="S.05"
                        storyNumber="05"
                        keyword="Documentation"
                        title="Legacy 코드 분석 및 문서화"
                        subtitle="문서 없는 C++ 서버를 해독해 팀의 시간을 아끼다 (1인 전담, 2주)"
                        step01_intro="사내 다른 프로젝트의 C++ 서버 코어를 신규 프로젝트에 적용하기 위해, 전무했던 문서를 직접 작성했습니다."
                        step02_background="팀 내 C++ 개발자만 있어 기존 Java Spring 서버 대신 사내 프로젝트의 C++ 서버 코어를 가져와 사용하기로 결정. 하지만 서버 실행 방법, 아키텍처, 각 서버 역할에 대한 문서가 전무한 상황이었습니다."
                        step03_problem="레거시 코드를 이해하는 데만 시간이 과도하게 소요되어 실제 개발 진행이 지연됨."
                        step03_solution="코드를 직접 읽고 분석하여 전체 아키텍처를 도식화하고, 신규 팀원도 따라할 수 있는 실행 가이드 문서 작성."
                        step04_action="단순히 코드를 읽는 것에 그치지 않고, '왜 이렇게 설계되었는가?'를 추론하며 각 서버 모듈의 역할과 의존 관계를 정리했습니다."
                        step05_result="서버 아키텍처 다이어그램 및 각 서버별 역할 정의 문서, 로컬 개발 환경 세팅 가이드 (Step-by-step)"
                        step06_performance="신규 입사자 온보딩 시간 단축 (구두 설명 의존 → 문서 기반 셀프 학습 가능). '코드를 읽고 이해하는 법'을 체득."
                        step07_capability="문서화 없이 방치된 레거시 코드를 분석하고 구조화하는 역량이 있습니다. 기존 시스템 파악이 필요한 상황에서 빠르게 팀에 기여할 수 있습니다."
                    />
                </div>

                {/* PAGE 12: STORY 06 (Growth) */}
                <div id="story-growth">
                    <SwissStorySection
                        sectionNumber="S.06"
                        storyNumber="06"
                        keyword="Growth"
                        title="실패가 만든 방법론: 주석-먼저 코딩"
                        subtitle="처절한 실패가 지금의 개발 철학을 만들다"
                        step01_intro="아이템/인벤토리 코어 로직 개발 중 데이터 정합성 장애를 겪고, 스스로 Pseudo-code 작성 습관을 고안했습니다."
                        step02_background="게임의 핵심인 경제 시스템을 구축해야 했습니다. 하지만 서버에는 트랜잭션/롤백 기능이 없었고, 에러 핸들링 체계도 부재했습니다."
                        step03_problem="트랜잭션이 없는 인메모리 구조에서, 클라이언트에게 보여주는 '시뮬레이션 결과'와 실제 DB에 '처리되는 결과'가 달라지는 치명적인 데이터 불일치 이슈 발생."
                        step03_solution="당시에는 근본적인 해결을 하지 못했지만, 버그를 줄이기 위한 '주석-먼저 코딩' 습관을 스스로 고안했습니다."
                        step04_action="API 구현 전, 필요한 실행 순서를 자연어로 주석 작성 → 주석에 맞춰 코드 구현. 이 방식이 가장 버그가 적고 효율적임을 체감, 지금까지도 유지 중인 개발 철학이 됨."
                        step05_result="시스템적 해결은 못했으나 개인 방법론 확립: Think First, Code Later"
                        step06_performance="'Atomicity(원자성)는 타협할 수 없는 가치' 체득. 이 실패는 훗날 삼국블레이드에서 'Error as Value'와 '트랜잭션 미들웨어'를 1순위로 설계하게 만든 결정적 계기."
                        step07_capability="실패를 숨기지 않고 방법론으로 승화시킵니다. 과거의 실수를 반복하지 않는 견고한 설계와, 코딩 전 충분히 생각하는 습관을 갖춘 개발자입니다."
                    />
                </div>

                {/* PAGE 13: RETROSPECTIVE (BladeX) */}
                <div id="retrospective-bladex">
                    <SwissBladeXRetrospectiveSection />
                </div>

                {/* PAGE 14: SKILLS & CONTACT */}
                <div id="contact">
                    <SwissContactSection />
                </div>
            </main>
        </div>
    );
};
