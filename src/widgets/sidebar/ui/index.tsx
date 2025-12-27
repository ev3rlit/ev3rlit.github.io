"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Home, Search, PenTool, Sun, ChevronLeft, Edit } from 'lucide-react';
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import { PlaygroundToolbar } from "@/features/playground-toolbar/ui/PlaygroundToolbar";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchStore } from "@/features/search-menu/model/useSearchStore";
import { SearchMenu } from "@/features/search-menu/ui/SearchMenu";
import { ThemeToggle } from "@/features/theme-toggle/ui/ThemeToggle";

export function Sidebar({ posts = [] }: { posts?: any[] }) {
    const { isPlaygroundMode } = useSidebarStore();
    const { isOpen, close } = useSearchStore();

    return (
        <div className="flex gap-4 relative flex-row md:flex-col">
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <SearchMenu posts={posts} key="search-panel" />
                ) : (
                    <motion.div
                        key="sidebar-nav"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 flex-row md:flex-col"
                    >
                        {/* Minimal ID */}
                        <Link href="/about">
                            <Card className="flex h-14 w-14 items-center justify-center overflow-hidden border-2 border-indigo-100 p-0 hover:border-indigo-400 transition-colors" radius="md" shadow="lg">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Me" className="h-full w-full object-cover" />
                            </Card>
                        </Link>

                        {/* Context Menu Tools */}
                        <Card className="flex gap-2 p-2 flex-row md:flex-col" radius="md" shadow="lg">
                            <Link href="/">
                                <Button size="icon" intent="ghost" title="Home"><Home size={20} /></Button>
                            </Link>
                            <Button size="icon" intent="ghost" title="Search" onClick={() => useSearchStore.getState().toggle()}><Search size={20} /></Button>
                            <Button size="icon" intent="ghost" title="Write/Guestbook"><PenTool size={20} /></Button>
                        </Card>

                        {/* Playground Specific Tools */}
                        <AnimatePresence>
                            {isPlaygroundMode && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <PlaygroundToolbar />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* System Tools */}
                        <Card className="flex gap-2 p-2 flex-row md:flex-col items-center" radius="md" shadow="lg">
                            <ThemeToggle />
                            {!isPlaygroundMode && (
                                <Link href="/playground">
                                    <Button
                                        size="icon"
                                        intent="ghost"
                                        title="Open Playground"
                                    >
                                        <Edit size={20} />
                                    </Button>
                                </Link>
                            )}
                            <Button size="icon" intent="ghost" title="Collapse" onClick={useSidebarStore.getState().toggleSidebar}>
                                <ChevronLeft size={20} />
                            </Button>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
