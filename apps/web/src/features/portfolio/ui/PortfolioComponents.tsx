import React from 'react';

// ProblemSolution: 문제-해결-결과 구조를 보여주는 컴포넌트
export function ProblemSolution({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-stone-800/50 dark:to-stone-900/50 p-6 ring-1 ring-slate-200/60 dark:ring-white/10">
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}

export function Problem({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative pl-6 border-l-4 border-red-400 dark:border-red-500/70">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                <span className="text-red-500 text-sm font-black">!</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-red-500 dark:text-red-400 mb-2">
                Problem
            </div>
            <div className="text-slate-600 dark:text-stone-300 text-[15px] leading-relaxed">
                {children}
            </div>
        </div>
    );
}

export function Solution({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative pl-6 border-l-4 border-blue-400 dark:border-blue-500/70">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-2">
                Solution
            </div>
            <div className="text-slate-600 dark:text-stone-300 text-[15px] leading-relaxed">
                {children}
            </div>
        </div>
    );
}

export function Result({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative pl-6 border-l-4 border-green-400 dark:border-green-500/70">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-green-500 dark:text-green-400 mb-2">
                Result
            </div>
            <div className="text-slate-700 dark:text-stone-200 text-[15px] leading-relaxed font-medium">
                {children}
            </div>
        </div>
    );
}

// TechDetail: 기술적 세부 사항을 보여주는 컴포넌트
export function TechDetail({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-6 p-6 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 ring-1 ring-indigo-200/60 dark:ring-indigo-500/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Technical Details
            </div>
            <div className="text-slate-700 dark:text-stone-300 text-[15px] leading-relaxed">
                {children}
            </div>
        </div>
    );
}

// Lesson: 교훈을 보여주는 컴포넌트
export function Lesson({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-6 p-6 rounded-xl bg-amber-50 dark:bg-amber-500/10 ring-1 ring-amber-200/60 dark:ring-amber-500/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Lesson Learned
            </div>
            <div className="text-slate-700 dark:text-stone-300 text-[15px] leading-relaxed">
                {children}
            </div>
        </div>
    );
}
