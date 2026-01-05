"use client";

import React from 'react';
import { Home, Search, PenTool, Brush, NotebookPen, ChevronLeft } from 'lucide-react';
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import { PlaygroundToolbar } from "@/features/playground-toolbar/ui/PlaygroundToolbar";
import { AnimatePresence } from "framer-motion";
import { useSearchStore } from "@/features/search-menu/model/useSearchStore";
import { SearchMenu } from "@/features/search-menu/ui/SearchMenu";
import { useWhiteboardStore } from "@/entities/whiteboard/model/whiteboardStore";
import { ComponentPickerMenu } from "@/features/mdx-whiteboard/ui/ComponentPickerMenu";
import { WhiteboardToolbar } from "@/widgets/whiteboard-toolbar/ui/WhiteboardToolbar";
import { Sidebar as GenericSidebar } from "@/shared/ui/sidebar/Sidebar";
import { Card } from "@/shared/ui/Card"; // Keeping for Identity/Profile if needed custom
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function Sidebar({ posts = [] }: { posts?: any[] }) {
    const { isPlaygroundMode, isWhiteboardMode, toggleSidebar } = useSidebarStore();
    const { isOpen: isSearchOpen, toggle: toggleSearch } = useSearchStore();
    const isComponentPickerOpen = useWhiteboardStore(s => s.isComponentPickerOpen);

    // Theme Logic
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

    // If Search or Component Picker is open, they take over the sidebar view
    // (This behavior is preserved from previous implementation)
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
        <GenericSidebar layout="responsive" expandMode="multi" defaultExpandedGroups={['main', 'tools', 'system']}>

            {/* 1. Identity / Profile */}
            <GenericSidebar.Group id="identity">
                <Link href="/about">
                    {/* Custom rendered item for Profile Image */}
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border-2 border-indigo-100 hover:border-indigo-400 transition-colors mx-auto">
                        <img src="/profile.png" alt="Me" className="h-full w-full object-cover" />
                    </div>
                </Link>
            </GenericSidebar.Group>

            {/* 2. Main Navigation */}
            <GenericSidebar.Group id="main" collapsible defaultOpen>
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

            <GenericSidebar.Divider />

            {/* 3. Contextual Tools (Playground / Whiteboard) */}
            {(isPlaygroundMode || isWhiteboardMode) && (
                <GenericSidebar.Group id="tools" collapsible defaultOpen>
                    {isPlaygroundMode && <PlaygroundToolbar />}
                    {isWhiteboardMode && <WhiteboardToolbar />}
                </GenericSidebar.Group>
            )}

            {/* 4. System / App Tools */}
            <GenericSidebar.Group id="system" collapsible>

                {mounted && (
                    <GenericSidebar.Item
                        icon={isDark ? <Moon size={18} /> : <Sun size={18} />}
                        title="Toggle Theme"
                        onClick={toggleTheme}
                    />
                )}

                <GenericSidebar.Divider />

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
