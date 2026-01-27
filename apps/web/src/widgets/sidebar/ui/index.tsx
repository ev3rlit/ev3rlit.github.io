"use client";

import React from 'react';
import { Home, Search, PenTool, Brush, NotebookPen, ChevronLeft, FileText, Network } from 'lucide-react';
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import { PlaygroundToolbar } from "@/features/playground-toolbar/ui/PlaygroundToolbar";
import { AnimatePresence } from "framer-motion";
import { useSearchStore } from "@/features/search-menu/model/useSearchStore";
import { SearchMenu } from "@/features/search-menu/ui/SearchMenu";
import { useWhiteboardStore } from "@repo/whiteboard-ui";
import { ComponentPickerMenu } from "@repo/whiteboard-ui";
import { WhiteboardToolbar } from "@/widgets/whiteboard-toolbar/ui/WhiteboardToolbar";
import { Sidebar as GenericSidebar } from "@/shared/ui/sidebar/Sidebar";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useViewModeOptional } from '@/shared/context/ViewContext';
import { usePathname } from 'next/navigation';
import { ExportButton } from '@/features/content-export';

// ============================================
// Context Detection Hook
// ============================================

function usePageContext() {
    const pathname = usePathname();

    return {
        isPostDetail: pathname?.startsWith('/blog/') ?? false,
        isWhiteboard: pathname === '/whiteboard',
        isPlayground: pathname === '/playground',
        isHome: pathname === '/',
    };
}

// ============================================
// View Mode Toggle Button Component
// ============================================

function ViewModeToggleButton() {
    const { viewMode, toggleViewMode } = useViewModeOptional();
    const isDocument = viewMode === 'document';

    return (
        <GenericSidebar.Item
            icon={isDocument ? <Network size={18} /> : <FileText size={18} />}
            title={isDocument ? 'Mindmap View' : 'Document View'}
            onClick={toggleViewMode}
        />
    );
}

// ============================================
// Context-Specific Sidebar Groups
// ============================================

/** PostDetail 전용 그룹 - View Mode Toggle + Export 포함 */
import { useTocStore } from '@/features/toc/model/useTocStore';
import { List } from 'lucide-react';

function PostDetailGroup() {
    const toggleMobileToc = useTocStore(s => s.toggleMobileOpen);

    return (
        <GenericSidebar.Group id="post-detail" defaultOpen>
            <ViewModeToggleButton />
            {/* Mobile TOC Toggle (Only visible on small screens usually, but Sidebar handles responsive layout) */}
            <GenericSidebar.Item
                icon={<List size={18} />}
                title="Table of Contents"
                onClick={toggleMobileToc}
            />
            <ExportButton />
        </GenericSidebar.Group>
    );
}

// ============================================
// Main Sidebar Component
// ============================================

export function Sidebar({ posts = [] }: { posts?: any[] }) {
    const { isPlaygroundMode, isWhiteboardMode, toggleSidebar } = useSidebarStore();
    const { isOpen: isSearchOpen, toggle: toggleSearch } = useSearchStore();
    const isComponentPickerOpen = useWhiteboardStore(s => s.isComponentPickerOpen);

    // Page Context Detection
    const { isPostDetail } = usePageContext();

    // Theme Logic
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

    // If Search or Component Picker is open, they take over the sidebar view
    if (isSearchOpen) {
        return (
            <div className="flex gap-4 relative flex-row md:flex-col w-full h-full overflow-x-auto overflow-y-hidden md:overflow-y-auto md:overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <SearchMenu posts={posts} key="search-panel" />
            </div>
        );
    }

    if (isComponentPickerOpen) {
        return (
            <div className="flex gap-4 relative flex-row md:flex-col w-full h-full overflow-x-auto overflow-y-hidden md:overflow-y-auto md:overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <ComponentPickerMenu key="component-picker-panel" />
            </div>
        );
    }

    return (
        <GenericSidebar layout="responsive" expandMode="multi" defaultExpandedGroups={['main', 'tools', 'post-detail', 'system']}>

            {/* 1. Identity / Profile */}
            <GenericSidebar.Group id="identity">
                <Link href="/about">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border-2 border-indigo-100 hover:border-indigo-400 transition-colors mx-auto">
                        <img src="/profile.png" alt="Me" className="h-full w-full object-cover" />
                    </div>
                </Link>
            </GenericSidebar.Group>

            {/* 2. Main Navigation */}
            <GenericSidebar.Group id="main" defaultOpen>
                <GenericSidebar.Item
                    icon={<Home size={18} />}
                    title="Home"
                    href="/"
                    activeMatch="exact"
                />
                <GenericSidebar.Item
                    icon={<Search size={18} />}
                    title="Search"
                    onClick={toggleSearch}
                />
                <GenericSidebar.Item
                    icon={<PenTool size={18} />}
                    title="Guestbook"
                    href="/guestbook"
                />
            </GenericSidebar.Group>

            {/* 3. Context-Specific Tools */}

            {/* PostDetail Context: View Mode Toggle */}
            {isPostDetail && <PostDetailGroup />}

            {/* Playground/Whiteboard Context: Editor Tools */}
            {(isPlaygroundMode || isWhiteboardMode) && (
                <GenericSidebar.Group id="tools" defaultOpen>
                    {isPlaygroundMode && <PlaygroundToolbar />}
                    {isWhiteboardMode && <WhiteboardToolbar />}
                </GenericSidebar.Group>
            )}

            {/* 4. System / App Tools */}
            <GenericSidebar.Group id="system">
                {mounted && (
                    <GenericSidebar.Item
                        icon={isDark ? <Moon size={18} /> : <Sun size={18} />}
                        title="Toggle Theme"
                        onClick={toggleTheme}
                    />
                )}

                {!isPlaygroundMode && (
                    <GenericSidebar.Item
                        icon={<Brush size={18} />}
                        title="Playground"
                        href="/playground"
                    />
                )}
                <GenericSidebar.Item
                    icon={<NotebookPen size={18} />}
                    title="Whiteboard"
                    href="/whiteboard"
                />

                <GenericSidebar.Item
                    icon={<ChevronLeft size={18} />}
                    title="Collapse"
                    onClick={toggleSidebar}
                />
            </GenericSidebar.Group>

        </GenericSidebar>
    );
}
