"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/cn";

interface CodeItem {
    label: string;
    code: string;
    lang: string;
}

interface CodeComparisonProps {
    items: CodeItem[];
}

export function CodeComparison({ items }: CodeComparisonProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="my-8 rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Mobile Tabs */}
            <div className="flex md:hidden border-b border-border bg-muted/30">
                {items.map((item, index) => (
                    <button
                        key={item.label}
                        onClick={() => setActiveTab(index)}
                        className={cn(
                            "flex-1 px-4 py-3 text-sm font-medium transition-colors relative",
                            activeTab === index
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {item.label}
                        {activeTab === index && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Container */}
            <div className="relative">
                {/* Desktop Grid Layout */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-border">
                    {items.map((item) => (
                        <div key={item.label} className="flex flex-col">
                            <div className="px-4 py-2 border-b border-border bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {item.label}
                            </div>
                            <div className="p-4 overflow-auto max-h-[500px] bg-[#1e1e1e] text-zinc-100 font-mono text-sm leading-relaxed">
                                <pre>
                                    <code className={`language-${item.lang}`}>
                                        {item.code}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Single View */}
                <div className="md:hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-[#1e1e1e] p-4 overflow-auto font-mono text-sm"
                        >
                            <pre className="text-zinc-100">
                                <code className={`language-${items[activeTab].lang}`}>
                                    {items[activeTab].code}
                                </code>
                            </pre>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
