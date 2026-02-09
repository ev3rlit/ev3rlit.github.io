"use client";

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/shared/lib/cn';
import { SwissSectionContainer } from './SwissSectionContainer';

export const SwissHeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section ref={sectionRef} className="snap-section bg-white dark:bg-stone-950 flex flex-col justify-center min-h-screen">

            <SwissSectionContainer className="grid grid-cols-12 gap-6 items-center h-full">
                {/* Left Column - Main Content */}
                <div className="col-span-12 lg:col-span-8 flex flex-col">


                    <h1
                        className={cn(
                            "heading-lg text-stone-900 dark:text-white transition-all duration-1000 delay-200 leading-tight mb-8",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="block mb-2 text-stone-400 dark:text-stone-600 heading-md">
                            &quot;
                        </span>
                        새로운 기술을 빠르게 습득하여 <br className="hidden md:block" />
                        <span className="text-indigo-600 dark:text-indigo-400">비즈니스 가치</span>를 만들어내고,<br />
                        신규 런칭부터 라이브 운영까지 <br className="hidden md:block" />
                        <span className="text-indigo-600 dark:text-indigo-400">전체 과정</span>을 책임지는 백엔드 개발자
                        <span className="block mt-2 text-stone-400 dark:text-stone-600 heading-md text-right">
                            &quot;
                        </span>
                    </h1>

                    {/* Key Impacts */}
                    <div
                        className={cn(
                            "mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-500",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="border-l-2 border-stone-200 dark:border-stone-800 pl-4">
                            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-1">
                                6개월
                            </h3>
                            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                                Go·MongoDB를 학습하여<br />상용 서비스 런칭
                            </p>
                        </div>
                        <div className="border-l-2 border-stone-200 dark:border-stone-800 pl-4">
                            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-1">
                                2개월
                            </h3>
                            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                                앱 서비스 및 인프라<br />(AWS→NCP) 이관 완료
                            </p>
                        </div>
                        <div className="border-l-2 border-stone-200 dark:border-stone-800 pl-4">
                            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-1">
                                10만 건
                            </h3>
                            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                                결제/재화 데이터<br />무중단 마이그레이션
                            </p>
                        </div>
                    </div>

                    {/* Keywords */}
                    <div
                        className={cn(
                            "mt-10 flex flex-wrap gap-2 transition-all duration-1000 delay-600",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        {['Go', 'MongoDB', 'Redis', 'Naver Cloud', 'Event-Driven'].map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 text-xs font-medium tracking-wide"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right Column - Profile Info */}
                <div className="col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end mt-12 lg:mt-0">
                    
                    {/* Content Wrapper for internal left alignment */}
                    <div className="flex flex-col items-start text-left">
                        {/* Profile Image Area */}
                        <div 
                            className={cn(
                                "w-32 h-32 md:w-40 md:h-40 bg-stone-200 dark:bg-stone-800 mb-8 overflow-hidden relative shadow-xl transition-all duration-1000 delay-400",
                                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                            )}
                        >
                            <img src="/images/portfolio/profile.jpg" alt="프로필 사진" className="w-full h-full object-cover" />
                        </div>

                        <div
                            className={cn(
                                "text-left transition-all duration-1000 delay-600",
                                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                            )}
                        >
                            <h2 className="heading-md mb-1">최범휘</h2>
                            <p className="text-lg text-stone-500 font-light mb-6">백엔드 개발자</p>
                            
                            <div className="w-12 h-px bg-stone-900 dark:bg-stone-100 mb-6"></div>

                            <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400 font-mono">
                                <li className="flex flex-col">
                                    <span className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">이메일</span>
                                    <a href="mailto:bum4496@naver.com" className="hover:text-indigo-600 transition-colors">bum4496@naver.com</a>
                                </li>
                                <li className="flex flex-col">
                                    <span className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">깃허브</span>
                                    <a href="https://github.com/ev3rlit" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">github.com/ev3rlit</a>
                                </li>
                                <li className="flex flex-col">
                                    <span className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">블로그</span>
                                    <a href="https://ev3rlit.github.io" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">ev3rlit.github.io</a>
                                </li>
                                <li className="flex flex-col">
                                    <span className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">활동 지역</span>
                                    <span>Seoul, South Korea</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </SwissSectionContainer>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-8 left-12 lg:left-24 hidden md:flex flex-col gap-2">
                <span className="label-text text-stone-400 writing-mode-vertical">스크롤</span>
                <div className="h-12 w-[1px] bg-stone-300 dark:bg-stone-700 mx-auto"></div>
            </div>
            
            {/* Background Decorations */}
             <div className="absolute top-0 right-0 w-[40vw] h-[60vh] bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/20 dark:to-transparent pointer-events-none -z-10 blur-3xl"></div>
        </section>
    );
};
