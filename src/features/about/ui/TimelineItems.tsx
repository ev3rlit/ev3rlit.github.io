import React from 'react';

interface ExperienceProps {
    company: string;
    period: string;
    role: string;
    children: React.ReactNode;
}

export function Experience({ company, period, role, children }: ExperienceProps) {
    return (
        <div className="group mb-16 last:mb-0">
            {/* Minimal Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-stone-100 tracking-tight leading-none">{company}</h3>
                    <time className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500/80">{period}</time>
                </div>
                <div className="text-[13px] font-bold text-slate-400 dark:text-stone-500 uppercase tracking-widest mt-3 border-b border-slate-50 dark:border-stone-800/50 pb-2">{role}</div>
            </div>

            {/* Content Area without Vertical Line */}
            <div className="space-y-10 pl-1">
                {children}
            </div>
        </div>
    );
}

interface ProjectProps {
    title: string;
    period: string;
    children: React.ReactNode;
}

export function Project({ title, period, children }: ProjectProps) {
    return (
        <div className="relative pt-2">
            <div className="mb-6">
                <h4 className="font-extrabold text-slate-800 dark:text-stone-200 text-[17px] leading-tight mb-1">
                    {title}
                </h4>
                <div className="text-[9px] font-black text-slate-300 dark:text-stone-600 uppercase tracking-[0.15em]">{period}</div>
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}

interface FeatureProps {
    title: string;
    children?: React.ReactNode;
}

export function Feature({ title, children }: FeatureProps) {
    return (
        <div className="relative">
            <p className="text-[15px] font-bold text-slate-700 dark:text-stone-300 leading-snug mb-3">{title}</p>
            {children && (
                <ul className="space-y-2.5">
                    {children}
                </ul>
            )}
        </div>
    );
}

export function FeatureItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex gap-3 text-[14px] text-slate-500 dark:text-stone-400 font-medium leading-relaxed group/item">
            <span className="text-slate-300 dark:text-stone-700 font-bold group-hover/item:text-indigo-400 transition-colors mt-[1px]">•</span>
            <span>{children}</span>
        </li>
    );
}
