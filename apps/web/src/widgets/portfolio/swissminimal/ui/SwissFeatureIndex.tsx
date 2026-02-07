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
            id: "F.05",
            title: "로그 프로세스 개선",
            description: "Go 구조체 정의만으로 스키마 관리 없이 빅데이터 저장소로 로그를 전송하는 자동화 파이프라인.",
            storyId: "log-pipeline"
        },
        {
            id: "F.07",
            title: "앱 서비스 이관",
            description: "퍼블리셔 계약 종료 위기에서 2개월 내 인프라/DB/인증을 자체 플랫폼으로 긴급 이관하고, Apple Transfer API로 무중단 계정 마이그레이션을 달성한 사례.",
            storyId: "service-transfer"
        },
        {
            id: "F.08",
            title: "결제 스키마 무중단 마이그레이션",
            description: "초기 설계 결함으로 누락된 구매일자를 Store API 역추적으로 복원하고, 이중 기록 전략으로 10만 건을 무중단 마이그레이션한 사례.",
            storyId: "payment-migration"
        },
        {
            id: "F.09",
            title: "매출 집계 API",
            description: "3개 스토어의 다통화 결제 데이터를 원화로 환산하고, 상품별·기간별·플랫폼별 매출 통계를 제공하는 운영툴 API.",
            storyId: "revenue-api"
        },
        {
            id: "F.10",
            title: "Apple 계정 이관 장애 복구",
            description: "Apple 앱 이관 완료 시 기존 유저가 신규 계정으로 생성되는 장애를 Transfer API와 Account Linking으로 12시간 내 전체 복구한 위기 대응 사례.",
            storyId: "apple-transfer"
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
                                작업<br/>
                                기록<span className="text-indigo-600 dark:text-indigo-400">.</span>
                            </h1>
                        </div>
                        <div className="lg:col-span-4 flex items-end">
                            <p className="text-xl font-light text-stone-600 dark:text-stone-400 leading-relaxed border-l-4 border-stone-900 dark:border-white pl-6 mb-4 break-keep">
                                실무에서 마주한 문제들을 하나씩 고민하고 해결해 나간 과정입니다.
                            </p>
                        </div>
                    </div>

                    {/* Feature List Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-8 pb-4 text-xs font-mono uppercase tracking-widest text-stone-400 border-b border-stone-100 dark:border-stone-800 mb-0">
                        <div className="col-span-1">번호</div>
                        <div className="col-span-4">작업명</div>
                        <div className="col-span-5">설명</div>
                        <div className="col-span-2 text-right">상세</div>
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
