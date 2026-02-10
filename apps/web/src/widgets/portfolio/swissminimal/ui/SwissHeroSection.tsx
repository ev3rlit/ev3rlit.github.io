"use client";

import { type ReactNode, useEffect, useState, useRef } from 'react';
import { cn } from '@/shared/lib/cn';
import { SwissSectionContainer } from './SwissSectionContainer';
import { SwissHeroProfile } from './SwissHeroProfile';

interface ImpactCard {
    title: string;
    description: ReactNode;
}

interface SwissHeroSectionProps {
    headline?: ReactNode;
    role?: string;
    tags?: string[];
    impacts?: ImpactCard[];
}

const DEFAULT_TAGS = ['Go', 'MongoDB', 'Redis', 'Naver Cloud', 'Event-Driven'];

const DEFAULT_IMPACTS: ImpactCard[] = [
    {
        title: '6개월',
        description: <>Go·MongoDB를 학습하여<br />상용 서비스 런칭</>,
    },
    {
        title: '2개월',
        description: <>앱 서비스 및 인프라<br />(AWS→NCP) 이관 완료</>,
    },
    {
        title: '10만 건',
        description: <>결제/재화 데이터<br />무중단 마이그레이션</>,
    },
];

const DEFAULT_HEADLINE = (
    <>
        새로운 기술을 빠르게 습득하여 <br className="hidden md:block" />
        <span className="text-indigo-600 dark:text-indigo-400">비즈니스 가치</span>를 만들어내고,<br />
        신규 런칭부터 라이브 운영까지 <br className="hidden md:block" />
        <span className="text-indigo-600 dark:text-indigo-400">전체 과정</span>을 책임지는 백엔드 개발자
    </>
);

export const SwissHeroSection = ({
    headline = DEFAULT_HEADLINE,
    role = '백엔드 개발자',
    tags = DEFAULT_TAGS,
    impacts = DEFAULT_IMPACTS,
}: SwissHeroSectionProps) => {
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
                        {headline}
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
                        {impacts.map((impact) => (
                            <div key={impact.title} className="border-l-2 border-stone-200 dark:border-stone-800 pl-4">
                                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-1">
                                    {impact.title}
                                </h3>
                                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                                    {impact.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Keywords */}
                    <div
                        className={cn(
                            "mt-10 flex flex-wrap gap-2 transition-all duration-1000 delay-600",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        {tags.map((tag) => (
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
                <SwissHeroProfile role={role} isVisible={isVisible} />
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
