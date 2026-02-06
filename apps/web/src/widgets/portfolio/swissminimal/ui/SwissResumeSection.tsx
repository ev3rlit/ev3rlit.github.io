"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

// Data derived from docs/portfolio_drafts/00_career_tech.md
const resumeData = {
    careers: [
        {
            company: '넥써쓰/원유니버스',
            role: '게임 서버 개발',
            period: '2023.04 — 2025.10',
            desc: 'Golang 기반의 삼국블레이드 키우기 서버 아키텍처 설계 및 라이브 운영',
            details: [
                'MSA 아키텍처 설계: WebSocket RPC 기반의 마이크로서비스 구조 설계 및 핸들러 라우팅 시스템 구축',
                '대규모 인프라 이관: 퍼블리셔 계약 종료에 따라 AWS에서 Naver Cloud로 전체 서비스 및 데이터 마이그레이션',
                '데이터 정합성 보장: Redis 분산 락(Distributed Lock)과 트랜잭션 처리를 통한 동시성 이슈 해결',
                '성능 최적화: Write-back 캐싱 패턴 도입으로 DB 병목을 해소하고 API 응답 속도 및 처리량 개선'
            ]
        },
        {
            company: '액션스퀘어 (Action Square)',
            role: '게임 서버 개발',
            period: '2022.05 — 2023.04',
            desc: 'C++ 기반의 BladeX 신규 프로젝트 코어 개발 및 런칭 경험',
            details: [
                '서버 코어 개발: C++ 서버 API 설계 및 유저 아이템, 상점, 길드등 게임 컨텐츠 구현',
                '실시간 랭킹 시스템: Redis Sorted Set을 활용하여 대량의 데이터 정렬 및 실시간 순위 산출 로직 구현',
                'CI/CD 자동화: Jenkins 파이프라인 구축을 통해 빌드/배포 프로세스를 자동화하여 배포 안정성 확보',
                '레거시 문서화: 시스템 아키텍처 다이어그램 작성 및 온보딩 문서화를 통해 팀 내 지식 공유 프로세스 정립'
            ]
        }
    ],
    education: [
        {
            school: '금오공과대학교',
            major: '컴퓨터소프트웨어공학과',
            period: '2016.03 — 2022.02',
            desc: '학점: 3.5 / 4.5'
        }
    ],
    awards: [
        {
            title: '2020 한국정보기술학회 대학생 논문경진대회',
            award: '동상 (딥러닝 이용 지폐 진위 판별)',
            year: '2020'
        },
        {
            title: '제31회 한글 및 한국어 정보처리 학술대회',
            award: '논문 게시 (문자메시지 분류 애플리케이션 Lettr)',
            year: '2019'
        }
    ],
    techStack: [
        { category: '언어', items: 'Golang, C++' },
        { category: '프레임워크', items: 'Unreal Engine 5' },
        { category: '데이터베이스', items: 'MongoDB, MySQL, Redis, AWS DocumentDB' },
        { category: '인프라', items: 'AWS (EC2, Lambda), Naver Cloud, Jenkins, Docker' },
        { category: '도구', items: 'Git, Jira, Confluence, Slack' }
    ]
};

export const SwissResumeSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="snap-section bg-white dark:bg-stone-950 transition-colors duration-500 flex items-center justify-center min-h-[90vh]">
            <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
                
                {/* 
                    Grid Layout: 9 Columns (Main) + 3 Columns (Side)
                    The Label is now INTEGRATED into the Main Column at the top.
                */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 items-start">

                    {/* 1. LEFT: Main Content (Span 8 - leaving 1 col gap before side) */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-12">
                        
                        {/* SECTION LABEL (Integrated at Grid Top) */}
                        <div className={cn(
                            "flex items-baseline gap-3 border-b border-stone-200 dark:border-stone-800 pb-4 transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <span className="label-text accent-indigo text-lg">(02)</span>
                            <h2 className="text-lg font-bold text-stone-900 dark:text-white uppercase tracking-widest">
                                경력 기술서
                            </h2>
                        </div>

                        {/* Career Section */}
                        <section className={cn(
                            "transition-all duration-1000 delay-200 pl-2 md:pl-0",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <div className="flex items-center gap-4 mb-8">
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                                    업무 경력
                                </h3>
                                <span className="h-px bg-stone-200 dark:bg-stone-800 w-12"></span>
                            </div>
                            
                            <div className="space-y-12">
                                {resumeData.careers.map((career, idx) => (
                                    <div key={idx} className="group relative">
                                        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                                            <h4 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
                                                {career.company}
                                            </h4>
                                            <span className="font-mono text-xs font-bold text-stone-400 mt-1 md:mt-0">{career.period}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <p className="text-base font-bold text-stone-600 dark:text-stone-300">{career.role}</p>
                                            <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                                            <p className="text-sm text-stone-500 dark:text-stone-400">{career.desc}</p>
                                        </div>
                                        
                                        <ul className="space-y-2">
                                            {career.details.map((detail, dIdx) => (
                                                <li key={dIdx} className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed group-hover:text-stone-900 dark:group-hover:text-stone-200 transition-colors duration-200">
                                                    <span className="mt-2 w-1 h-1 bg-stone-300 dark:bg-stone-600 rounded-full flex-shrink-0 group-hover:bg-indigo-500 transition-colors duration-200"></span>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education Section */}
                        <section className={cn(
                            "transition-all duration-1000 delay-300 pl-2 md:pl-0",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                                    학력
                                </h3>
                                <span className="h-px bg-stone-200 dark:bg-stone-800 w-8"></span>
                            </div>
                            <div className="space-y-4">
                                {resumeData.education.map((edu, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 pl-4 border-l-2 border-stone-200 dark:border-stone-800">
                                        <h4 className="text-base font-bold text-stone-900 dark:text-white">{edu.school}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400">{edu.major}</p>
                                        <p className="text-xs text-stone-400">{edu.desc}</p>
                                        <span className="flex-grow md:text-right font-mono text-xs font-bold text-stone-300">{edu.period}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* 2. RIGHT: Side Content (Span 3 - Offset 1 for gap) */}
                    <div className="col-span-12 lg:col-span-3 lg:col-start-10 flex flex-col gap-12 lg:pt-20">
                        {/* Added top padding to align visually with content start below header */}
                        
                        {/* Tech Stack */}
                        <div className={cn(
                            "transition-all duration-1000 delay-500",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6 block">
                                기술 스택
                            </h3>

                            <div className="space-y-8">
                                {resumeData.techStack.map((stack, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">{stack.category}</h4>
                                        <p className="text-sm font-medium text-stone-800 dark:text-stone-300 leading-relaxed border-b border-stone-100 dark:border-stone-900 pb-2">
                                            {stack.items}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Awards */}
                        <section className={cn(
                            "transition-all duration-1000 delay-600",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                             <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                                    수상 내역
                                </h3>
                                <span className="w-full h-px bg-stone-200 dark:bg-stone-800 flex-grow"></span>
                            </div>
                            <div className="space-y-6">
                                {resumeData.awards.map((award, idx) => (
                                    <div key={idx}>
                                        <div className="font-mono text-[10px] font-bold text-stone-300 mb-1">{award.year}</div>
                                        <h4 className="text-sm font-bold text-stone-900 dark:text-white leading-tight">{award.title}</h4>
                                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">{award.award}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer */}
                         <div className="pt-6 border-t border-stone-200 dark:border-stone-800 text-[10px] text-stone-300 font-mono">
                             <p>
                                © 2024 BeomHwi Choi
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};
