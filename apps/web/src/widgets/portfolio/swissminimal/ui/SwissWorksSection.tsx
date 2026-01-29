"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import Link from 'next/link';

const projects = [
    {
        id: '01',
        title: 'E-Commerce Platform',
        category: 'Web Application',
        year: '2024',
        description: 'A modern shopping experience with seamless checkout flow',
        href: '#'
    },
    {
        id: '02',
        title: 'Dashboard Analytics',
        category: 'SaaS Product',
        year: '2024',
        description: 'Real-time data visualization for business intelligence',
        href: '#'
    },
    {
        id: '03',
        title: 'Portfolio Generator',
        category: 'Tool',
        year: '2023',
        description: 'Automated portfolio creation for creative professionals',
        href: '#'
    },
    {
        id: '04',
        title: 'Mobile Banking App',
        category: 'Mobile / Web',
        year: '2023',
        description: 'Secure and intuitive banking experience redesign',
        href: '#'
    },
];

// Simple Arrow Icon Component since we might not have lucide
const ArrowUpRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
);

export const SwissWorksSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="snap-section bg-white dark:bg-stone-950">
            <div className="swiss-grid h-full py-16">
                {/* Header */}
                <div className="col-span-12 flex justify-between items-end mb-12">
                    <div
                        className={cn(
                            "transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text accent-indigo">(02)</span>
                        <span className="label-text text-stone-500 ml-2">Selected Works</span>
                    </div>

                    <div
                        className={cn(
                            "transition-all duration-700 delay-100",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="heading-xl">{projects.length.toString().padStart(2, '0')}</span>
                    </div>
                </div>

                {/* Projects List */}
                <div className="col-span-12">
                    <div className="space-y-0">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className={cn(
                                    "group border-t border-stone-200 dark:border-stone-800 py-8 cursor-pointer transition-all duration-700",
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}
                                style={{ transitionDelay: `${200 + index * 100}ms` }}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div className="swiss-grid items-center px-0 mx-0 w-full max-w-none">
                                    {/* Project Number */}
                                    <div className="col-span-1 hidden md:block">
                                        <span className="label-text text-stone-400">{project.id}</span>
                                    </div>

                                    {/* Project Title */}
                                    <div className="col-span-12 md:col-span-5">
                                        <h3 className="heading-lg group-hover:accent-indigo transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Project Category */}
                                    <div className="col-span-6 md:col-span-3 mt-2 md:mt-0">
                                        <span className="body-text text-stone-500">{project.category}</span>
                                    </div>

                                    {/* Project Year */}
                                    <div className="col-span-4 md:col-span-2 mt-2 md:mt-0">
                                        <span className="label-text text-stone-400">{project.year}</span>
                                    </div>

                                    {/* Arrow */}
                                    <div className="col-span-2 md:col-span-1 flex justify-end mt-2 md:mt-0">
                                        <div
                                            className={cn(
                                                "w-10 h-10 border border-stone-900 dark:border-stone-100 flex items-center justify-center transition-all duration-300",
                                                hoveredProject === project.id
                                                    ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900"
                                                    : "bg-transparent"
                                            )}
                                        >
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Description - Shows on Hover */}
                                <div
                                    className={cn(
                                        "overflow-hidden transition-all duration-500",
                                        hoveredProject === project.id ? "max-h-20 opacity-100 mt-4" : "max-h-0 opacity-0"
                                    )}
                                >
                                    <div className="swiss-grid px-0 mx-0 w-full max-w-none">
                                        <div className="col-span-1 hidden md:block"></div>
                                        <div className="col-span-11 md:col-span-5">
                                            <p className="body-text text-stone-600 dark:text-stone-400">{project.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Bottom Border */}
                        <div className="border-t border-stone-200 dark:border-stone-800"></div>
                    </div>
                </div>

                {/* View All Link */}
                <div className="col-span-12 mt-12 flex justify-end">
                    <Link
                        href="#"
                        className={cn(
                            "group flex items-center gap-2 transition-all duration-700 delay-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="heading-md text-sm group-hover:accent-indigo transition-colors">View All Projects</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute top-1/2 right-0 w-px h-32 bg-stone-200 dark:bg-stone-800 -translate-y-1/2 hidden md:block"></div>
        </section>
    );
};
