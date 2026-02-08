"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { ThemeToggle } from '@/features/theme-toggle/ui/ThemeToggle';
import { cn } from '@/shared/lib/cn';

interface NavItem {
    label: string;
    path: string;
    hash?: string; // section id (without #)
}

const navItems: NavItem[] = [
    { label: '홈', path: '/portfolio', hash: 'hero' },
    { label: '소개', path: '/portfolio', hash: 'about' },
    { label: '프로젝트', path: '/portfolio', hash: 'project-samguk' },
    { label: '연락처', path: '/portfolio', hash: 'contact' },
    { label: '기능들', path: '/portfolio/features' },
];

// Map all observable section IDs → the nav item hash they belong to
const sectionToNavHash: Record<string, string> = {
    'hero': 'hero',
    'about': 'about',
    'resume': 'about',
    'project-samguk': 'project-samguk',
    'retrospective-samguk': 'project-samguk',
    'project-bladex': 'project-samguk',
    'retrospective-bladex': 'project-samguk',
    'contact': 'contact',
};

export const SwissNavigation = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [activeNavHash, setActiveNavHash] = useState('hero');
    const [isScrolled, setIsScrolled] = useState(false);

    const isPortfolioHome = pathname === '/portfolio';

    // Find the scroll container (motion.main in SwissMinimalPage)
    const getScrollContainer = useCallback((): HTMLElement | null => {
        return document.querySelector<HTMLElement>('.overflow-y-scroll');
    }, []);

    // Scroll background detection
    useEffect(() => {
        const container = getScrollContainer();
        const target = container || window;

        const handleScroll = () => {
            const scrollY = container ? container.scrollTop : window.scrollY;
            setIsScrolled(scrollY > 100);
        };

        target.addEventListener('scroll', handleScroll, { passive: true });
        return () => target.removeEventListener('scroll', handleScroll);
    }, [getScrollContainer]);

    // Active section detection via IntersectionObserver (portfolio page only)
    useEffect(() => {
        if (!isPortfolioHome) return;

        const sectionIds = Object.keys(sectionToNavHash);
        const visibleSections = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        visibleSections.set(entry.target.id, entry.intersectionRatio);
                    } else {
                        visibleSections.delete(entry.target.id);
                    }
                }

                // Pick the section with the highest visibility
                let bestId = '';
                let bestRatio = 0;
                visibleSections.forEach((ratio, id) => {
                    if (ratio > bestRatio) {
                        bestRatio = ratio;
                        bestId = id;
                    }
                });

                if (bestId) {
                    const navHash = sectionToNavHash[bestId];
                    if (navHash) setActiveNavHash(navHash);
                }
            },
            { threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        // Delay slightly so the scroll container is mounted
        const timer = setTimeout(() => {
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            }
        }, 150);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [isPortfolioHome]);

    const handleNavClick = (item: NavItem) => {
        // Page link (no hash) → navigate directly
        if (!item.hash) {
            router.push(item.path);
            return;
        }

        // On portfolio home → scroll to section
        if (isPortfolioHome) {
            const el = document.getElementById(item.hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // On other pages → navigate to portfolio page with hash
        router.push(`${item.path}#${item.hash}`);
    };

    const isActive = (item: NavItem): boolean => {
        // "기능들" (page link) — active on /portfolio/features and /portfolio/story/*
        if (!item.hash) {
            return pathname === item.path || pathname.startsWith('/portfolio/story') || pathname.startsWith('/portfolio/features');
        }

        // Section links — only highlight on portfolio home
        if (isPortfolioHome) {
            return activeNavHash === item.hash;
        }

        return false;
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
                <div className="col-span-6 md:col-span-2" />

                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex col-span-8 justify-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => handleNavClick(item)}
                            className={cn(
                                "label-text transition-all duration-300 relative",
                                isActive(item)
                                    ? "text-stone-900 dark:text-white"
                                    : "text-stone-400 hover:text-stone-900 dark:hover:text-white"
                            )}
                        >
                            {item.label}
                            {isActive(item) && (
                                <span className="block absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400" />
                            )}
                        </button>
                    ))}
                </div>

                {/* CTA - Desktop */}
                <div className="hidden md:flex col-span-2 justify-end items-center gap-4">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => router.push('/portfolio/contact')}
                        className="label-text px-4 py-2 bg-stone-900 text-white dark:bg-white dark:text-stone-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white dark:hover:text-white transition-colors"
                    >
                        제안하기
                    </button>
                </div>

                {/* Mobile Menu Button + Toggle */}
                <div className="col-span-6 md:hidden flex justify-end items-center gap-4">
                    <ThemeToggle />
                    <button
                        type="button"
                        className="label-text text-stone-500"
                        onClick={() => router.push('/portfolio/contact')}
                    >
                        메뉴
                    </button>
                </div>
            </div>
        </nav>
    );
};
