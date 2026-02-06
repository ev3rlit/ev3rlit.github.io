"use client";

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

// --- Types ---

interface Value {
    keyword: string;
    desc: ReactNode;
}

interface SwissAboutSectionProps {
    sectionNumber?: string;
    title?: string;
    name?: string;
    role?: string;

    introduction?: ReactNode;
    philosophy?: ReactNode;

    experienceLabel?: string;
    experienceValue?: string;
    experienceDesc?: string;

    values?: Value[];

    motivation?: {
        title?: string;
        content: ReactNode;
    };
}

// --- Default Data (3 values, 2-line descriptions) ---

const defaultValues: Value[] = [
    {
        keyword: 'Stability First',
        desc: '장애가 발생하지 않는 구조를 설계합니다. 에러 컨텍스트로 문제 원인을 빠르게 추적합니다.',
    },
    {
        keyword: 'Simplicity',
        desc: '이해하기 쉽고 유지보수가 용이한 코드를 작성합니다. 명확한 구조가 장기적으로 더 안정적입니다.',
    },
    {
        keyword: 'Team-Oriented',
        desc: '팀 전체가 생산적으로 일할 수 있는 구조를 만듭니다. 직관적인 API로 핵심 로직에 집중할 수 있도록 합니다.',
    },
];

// --- Component ---

export const SwissAboutSection = ({
    sectionNumber = "ABOUT",
    title = "WHO I AM",
    name = "최범휘",
    role = "BACKEND DEVELOPER",

    introduction = (
        <>
            안정적인 시스템을 설계하고,{'\n'}
            팀 전체의 생산성을 높이는{'\n'}
            백엔드 개발자
        </>
    ),

    philosophy = "단순하고 명확한 설계를 지향합니다. 빠르게 검증하고 개선하는 반복적 개발을 선호합니다.",

    experienceLabel = "EXPERIENCE",
    experienceValue = "3.5Y",
    experienceDesc = "GAME SERVER BACKEND",

    values = defaultValues,

    motivation,
}: SwissAboutSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="snap-section bg-white overflow-hidden">
            <div className="w-full max-w-[1440px] mx-auto px-8 md:px-16">

                {/* ── Header ── */}
                <div className={cn(
                    "flex justify-between items-start mb-8 border-b border-gray-200 pb-4 transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    <div>
                        <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2">
                            {sectionNumber}
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight">
                            {title}
                        </h3>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="font-bold text-gray-900 uppercase">{name}</p>
                        <p className="text-sm text-gray-500 font-mono">{role}</p>
                    </div>
                </div>

                {/* ── Asymmetric Grid (4:8) ── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* LEFT COL (Span 4) */}
                    <div className="md:col-span-4 flex flex-col gap-6 pr-6 md:border-r border-gray-100">
                        <div className={cn(
                            "transition-all duration-700 delay-100",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                                01 Introduction
                            </span>
                            <div className="text-2xl font-bold leading-tight text-black break-keep whitespace-pre-line">
                                {introduction}
                            </div>
                        </div>

                        <div className={cn(
                            "transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                                02 Philosophy
                            </span>
                            <div className="text-sm text-gray-600 leading-relaxed font-medium break-keep">
                                {philosophy}
                            </div>
                        </div>

                        {/* Experience Highlight */}
                        <div className={cn(
                            "transition-all duration-700 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                                <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                                    {experienceLabel}
                                </span>
                                <div className="text-3xl font-black text-black">
                                    {experienceValue}
                                </div>
                                <div className="text-xs text-indigo-600 font-bold mt-1 uppercase">
                                    {experienceDesc}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL (Span 8) */}
                    <div className="md:col-span-8 flex flex-col gap-6 pl-0 md:pl-4">

                        {/* Core Values (3 cols) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {values.map((val, idx) => (
                                <div
                                    key={val.keyword}
                                    className={cn(
                                        "transition-all duration-700",
                                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    )}
                                    style={{ transitionDelay: `${200 + idx * 100}ms` }}
                                >
                                    <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                                        0{idx + 3} {val.keyword}
                                    </span>
                                    <div className="text-sm text-gray-700 leading-relaxed break-keep line-clamp-2">
                                        {val.desc}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Motivation - Dark Block */}
                        <div className={cn(
                            "bg-gray-900 text-white p-6 transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                            style={{ transitionDelay: '600ms' }}
                        >
                            {motivation ? (
                                <>
                                    <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                                        {motivation.title || "06 Motivation"}
                                    </span>
                                    <div className="text-sm text-gray-300 leading-relaxed break-keep">
                                        {motivation.content}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                                        06 Motivation
                                    </span>
                                    <div className="border border-dashed border-gray-700 p-4">
                                        <p className="text-sm text-gray-400 mb-1">
                                            지원 동기 (회사별 커스터마이징 영역)
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            motivation prop으로 회사별 지원 동기를 주입하세요.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};
