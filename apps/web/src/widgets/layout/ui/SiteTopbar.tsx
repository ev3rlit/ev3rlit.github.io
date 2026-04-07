"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/features/theme-toggle/ui/ThemeToggle';
import { useViewModeOptional } from '@/shared/context/ViewContext';

function ViewModeToggle() {
    const pathname = usePathname();
    const { viewMode, toggleViewMode } = useViewModeOptional();

    if (!pathname || !pathname.startsWith('/blog/')) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={toggleViewMode}
            className="inline-flex min-h-11 items-center py-2 text-[13px] font-medium text-stone-400 transition-colors hover:text-indigo-500 focus-visible:outline-none focus-visible:text-indigo-500 dark:text-stone-500 dark:hover:text-indigo-400 dark:focus-visible:text-indigo-400"
        >
            {viewMode === 'document' ? 'Mindmap View' : 'Document View'}
        </button>
    );
}

export function SiteTopbar() {
    const pathname = usePathname();

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-stone-50/95 dark:bg-stone-950/95 supports-[backdrop-filter]:backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-[688px] items-center justify-between px-6 py-7">
                <Link
                    href="/"
                    className="text-sm font-extrabold tracking-[-0.02em] text-stone-950 no-underline dark:text-stone-50"
                >
                    ev3rlit<span className="text-indigo-500 dark:text-indigo-400">.</span>
                </Link>

                <div className="flex items-center gap-4 sm:gap-5">
                    <ViewModeToggle />
                    <Link
                        href="/about"
                        aria-current={pathname === '/about' ? 'page' : undefined}
                        className="inline-flex min-h-11 items-center py-2 text-[13px] font-medium text-stone-400 no-underline transition-colors hover:text-indigo-500 focus-visible:outline-none focus-visible:text-indigo-500 dark:text-stone-500 dark:hover:text-indigo-400 dark:focus-visible:text-indigo-400"
                    >
                        About
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
