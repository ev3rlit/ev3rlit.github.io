"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { ThemeToggle } from '@/features/theme-toggle/ui/ThemeToggle';

const navItems = [
    { label: '홈', href: '#hero' },
    { label: '소개', href: '#about' },
    { label: '프로젝트', href: '#works' },
    { label: '연락처', href: '#contact' },
];

export const SwissNavigation = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 100);

            // Determine active section
            const sections = ['hero', 'about', 'works', 'contact'];
            const sectionElements = sections.map(id => document.getElementById(id));

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const section = sectionElements[i];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    // 섹션이 화면의 절반 지점에 걸쳐있을 때 활성화
                    if (rect.top <= window.innerHeight / 2) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "bg-white/90 dark:bg-stone-950/90 backdrop-blur-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="swiss-grid items-center h-auto">
                {/* Logo */}
                <div className="col-span-6 md:col-span-2">
                    <a
                        href="#hero"
                        onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
                        className="heading-md text-lg hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        HOMVELOPER.
                    </a>
                </div>

                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex col-span-8 justify-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                            className={cn(
                                "label-text transition-all duration-300 relative",
                                activeSection === item.href.slice(1)
                                    ? "text-stone-900 dark:text-white"
                                    : "text-stone-400 hover:text-stone-900 dark:hover:text-white"
                            )}
                        >
                            {item.label}
                            {activeSection === item.href.slice(1) && (
                                <span className="block absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
                            )}
                        </a>
                    ))}
                </div>

                {/* CTA - Desktop */}
                <div className="hidden md:flex col-span-2 justify-end items-center gap-4">
                    <ThemeToggle />
                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                        className="label-text px-4 py-2 bg-stone-900 text-white dark:bg-white dark:text-stone-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white dark:hover:text-white transition-colors"
                    >
                        제안하기
                    </a>
                </div>

                {/* Mobile Menu Button + Toggle */}
                <div className="col-span-6 md:hidden flex justify-end items-center gap-4">
                    <ThemeToggle />
                    <button
                        className="label-text text-stone-500"
                        onClick={() => scrollToSection('#contact')}
                    >
                        메뉴
                    </button>
                </div>
            </div>
        </nav>
    );
};
