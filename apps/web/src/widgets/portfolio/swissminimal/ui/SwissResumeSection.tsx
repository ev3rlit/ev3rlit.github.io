"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

const profile = {
    name: '최범휘 (BeomHwi Choi)',
    role: 'Backend Developer (Server)',
    email: 'bum4496@naver.com',
    github: 'github.com/ev3rlit',
    education: '금오공과대학교 컴퓨터소프트웨어공학과 (2016.03 - 2022.02)'
};

const careers = [
    {
        period: '2023.04 - 2025.10',
        company: '넥써쓰/원유니버스',
        role: '게임 서버 개발',
        desc: 'Golang 기반의 삼국블레이드 키우기 서버 아키텍처 설계 및 라이브 운영'
    },
    {
        period: '2022.05 - 2023.04',
        company: '액션스퀘어데브',
        role: '게임 서버 개발',
        desc: 'C++ 기반의 BladeX 신규 프로젝트 코어 개발 및 런칭 경험'
    }
];

const techStack = {
    Languages: ['Golang', 'C++', 'C#'],
    Database: ['MongoDB', 'MySQL', 'Redis', 'AWS DocumentDB'],
    Infrastructure: ['AWS (Kinesis, EC2)', 'Jenkins', 'Naver Cloud'],
    'Game Engine': ['Unreal Engine', 'Unity']
};

export const SwissResumeSection = () => {
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
        <section ref={sectionRef} className="snap-section bg-white dark:bg-stone-950">
            <div className="swiss-grid items-center h-full">
                {/* Section Label */}
                <div className="col-span-12 md:col-span-2">
                    <div
                        className={cn(
                            "transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text accent-indigo">(02)</span>
                        <span className="label-text text-stone-500 ml-2">이력서</span>
                    </div>
                </div>

                {/* Profile & Career */}
                <div className="col-span-12 md:col-span-5 mt-8 md:mt-0">
                    {/* Profile */}
                    <div
                        className={cn(
                            "mb-10 transition-all duration-700 delay-100",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-500 mb-4">프로필</div>
                        <h3 className="heading-lg mb-2">{profile.name}</h3>
                        <div className="body-text text-stone-600 dark:text-stone-400 space-y-1">
                            <p>{profile.role}</p>
                            <p>{profile.email}</p>
                            <p className="accent-indigo">{profile.github}</p>
                        </div>
                    </div>

                    {/* Career */}
                    <div
                        className={cn(
                            "transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-500 mb-4">경력</div>
                        <div className="space-y-6">
                            {careers.map((c, i) => (
                                <div key={i} className="border-l-2 border-stone-900 dark:border-stone-100 pl-4">
                                    <div className="label-text text-stone-400 mb-1">{c.period}</div>
                                    <div className="heading-md text-sm">{c.company}</div>
                                    <div className="body-text text-stone-500">{c.role}</div>
                                    <p className="body-text text-stone-500 text-sm mt-1">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="col-span-12 md:col-span-5 mt-8 md:mt-0 md:pl-8">
                    <div
                        className={cn(
                            "transition-all duration-700 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-500 mb-6">기술 스택</div>
                        <div className="space-y-6">
                            {Object.entries(techStack).map(([category, items], idx) => (
                                <div key={category}>
                                    <div className="label-text text-stone-400 mb-2">{category}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <span
                                                key={item}
                                                className="px-3 py-1 border border-stone-300 dark:border-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300 transition-colors hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200 dark:bg-stone-800"></div>
        </section>
    );
};
