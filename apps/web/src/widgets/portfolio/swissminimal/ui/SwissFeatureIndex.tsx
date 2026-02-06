"use client";

import { SwissNavigation } from './SwissNavigation';
import { SwissFeatureRow } from './SwissFeatureRow';
import { useEffect } from 'react';
import { useSidebarStore } from '@/features/layout/model/useSidebarStore';

export const SwissFeatureIndex = () => {
    const { setPortfolioMode, setSidebarOpen } = useSidebarStore();

    useEffect(() => {
        setPortfolioMode(true);
        setSidebarOpen(false);
        return () => {
            setPortfolioMode(false);
            setSidebarOpen(true);
        };
    }, [setPortfolioMode, setSidebarOpen]);

    const features = [
        {
            id: "F.01",
            title: "문맥 인식 에러 로깅 (Context-aware Error Logging)",
            description: "모든 에러 발생 시 유저, 요청 값, 스택 트레이스를 자동 캡처하여 디버깅 시간을 단축한 미들웨어.",
            storyId: "error-handling"
        },
        {
            id: "F.02",
            title: "인메모리 변경 추적 (In-Memory Change Tracking)",
            description: "DB 쓰기 부하를 줄이기 위해 객체의 상태 변경을 메모리에서 추적하고 Diff만 반영하는 엔진.",
            storyId: "tracking-container"
        },
        {
            id: "F.03",
            title: "무중단 이중 쓰기 (Dual Write Migration)",
            description: "운영 중인 라이브 서비스의 데이터를 중단 없이 신규 스키마로 안전하게 이관하는 마이그레이션 전략.",
            storyId: "payment"
        },
        {
            id: "F.04",
            title: "웹소켓 인터셉터 체인 (Websocket Interceptor Chain)",
            description: "웹소켓 핸들러 전후에 로깅, 복구, 인증 로직을 주입할 수 있는 데코레이터 패턴 미들웨어.",
            storyId: "websocket"
        },
        {
            id: "F.05",
            title: "스키마리스 로그 파이프라인 (Schema-less Log Pipeline)",
            description: "Go 구조체 정의만으로 스키마 관리 없이 빅데이터 저장소로 로그를 전송하는 자동화 파이프라인.",
            storyId: "log-pipeline"
        },
        {
            id: "F.06",
            title: "멀티 인증 통합 (Multi-Auth Identity Linking)",
            description: "다수의 소셜 계정과 자체 계정을 하나의 유저 아이덴티티로 통합 관리하는 인증 시스템.",
            storyId: "migration"
        }
    ];

    return (
        <div className="h-full w-full overflow-y-auto bg-white dark:bg-stone-950 text-stone-900 dark:text-white font-sans selection:bg-stone-900 selection:text-white dark:selection:bg-white dark:selection:text-stone-900">
            
            <SwissNavigation />

            <main className="w-full flex-grow pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                        <div className="lg:col-span-8">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none text-stone-900 dark:text-white mb-8">
                                Feature<br/>
                                Index<span className="text-indigo-600 dark:text-indigo-400">.</span>
                            </h1>
                        </div>
                        <div className="lg:col-span-4 flex items-end">
                            <p className="text-xl font-light text-stone-600 dark:text-stone-400 leading-relaxed border-l-4 border-stone-900 dark:border-white pl-6 mb-4 break-keep">
                                대규모 트래픽 환경에서 검증된 백엔드 핵심 모듈, 아키텍처 패턴, 시스템 역량을 정리한 기술 인덱스입니다.
                            </p>
                        </div>
                    </div>

                    {/* Feature List Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-8 pb-4 text-xs font-mono uppercase tracking-widest text-stone-400 border-b border-stone-100 dark:border-stone-800 mb-0">
                        <div className="col-span-1">No.</div>
                        <div className="col-span-4">Feature Name</div>
                        <div className="col-span-5">Technical Specification</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* Feature Rows */}
                    <div className="flex flex-col w-full">
                        {features.map((feature) => (
                            <SwissFeatureRow 
                                key={feature.id}
                                {...feature}
                            />
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
};
