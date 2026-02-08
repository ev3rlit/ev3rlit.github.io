"use client";

import { SwissNavigation } from './SwissNavigation';
import { SwissFeatureRow } from './SwissFeatureRow';
import { useEffect } from 'react';
import { useSidebarStore } from '@/features/layout/model/useSidebarStore';
import { features } from './featureData';

export { getFeatureNumber } from './featureData';

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
                        {features.map((feature, idx) => (
                            <SwissFeatureRow
                                key={feature.storyId}
                                {...feature}
                                id={`F.${String(idx + 1).padStart(3, '0')}`}
                            />
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
};
