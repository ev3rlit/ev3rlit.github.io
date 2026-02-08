import React from 'react';
import Link from 'next/link';

interface ExperienceProps {
    company: string;
    period: string;
    role: string;
    stack?: string;
    children: React.ReactNode;
}

export function Experience({ company, period, role, stack, children }: ExperienceProps) {
    return (
        <div className="group mb-16 last:mb-0">
            {/* Minimal Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-stone-100 tracking-tight leading-none">{company}</h3>
                    <time className="font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-indigo-500/80">{period}</time>
                </div>
                <div className="text-[13px] font-bold text-slate-400 dark:text-stone-500 uppercase tracking-widest mt-3">{role}</div>

                {stack && (
                    <div className="flex flex-wrap items-center gap-x-2 mt-3 pb-4 border-b border-slate-50 dark:border-stone-800/50">
                        {stack.split(',').map((tech, i, arr) => (
                            <span key={tech} className="flex items-center gap-2">
                                <span className="text-[14px] font-bold text-slate-700 dark:text-stone-300">
                                    {tech.trim()}
                                </span>
                                {i < arr.length - 1 && (
                                    <span className="text-slate-300 dark:text-stone-700 font-light text-[10px]">/</span>
                                )}
                            </span>
                        ))}
                    </div>
                )}
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
    link?: string;
    children?: React.ReactNode;
}

export function Feature({ title, link, children }: FeatureProps) {
    return (
        <div className="relative">
            <div className="flex items-center gap-2 mb-3">
                <p className="text-[15px] font-bold text-slate-700 dark:text-stone-300 leading-snug">{title}</p>
                {link && (
                    <Link
                        href={link}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-[10px] font-bold text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                    >
                        상세
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </Link>
                )}
            </div>
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
export function TechStack({ tech }: { tech: string }) {
    // Split by comma if it's a string containing multiple items, or just treat as single string
    const items = tech.split(',').map(t => t.trim());

    return (
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 mb-2.5 pl-[17px]">
            <span className="font-bold text-slate-400 dark:text-stone-500 text-[11px] uppercase tracking-wider">Tech</span>
            <div className="flex flex-wrap items-center gap-x-2 text-[13px] font-semibold text-indigo-600/90 dark:text-indigo-400/90">
                {items.map((item, i) => {
                    // Check for markdown link format: [text](url)
                    const linkMatch = item.match(/^\[(.*?)\]\((.*?)\)$/);

                    let content;
                    if (linkMatch) {
                        content = (
                            <Link
                                href={linkMatch[2]}
                                className="hover:underline hover:text-indigo-500 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {linkMatch[1]}
                            </Link>
                        );
                    } else {
                        content = item;
                    }

                    return (
                        <span key={i} className="flex items-center gap-2">
                            {content}
                            {i < items.length - 1 && (
                                <span className="text-slate-300 dark:text-stone-700 font-light text-[10px]">/</span>
                            )}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
