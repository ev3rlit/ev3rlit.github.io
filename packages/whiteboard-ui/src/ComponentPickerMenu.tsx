"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Database, Activity, Type, Component } from 'lucide-react';
import { useWhiteboardStore } from './model/whiteboardStore';
import { Card } from './shared/ui/Card';

export function ComponentPickerMenu() {
    const { insertContent, setComponentPickerOpen } = useWhiteboardStore();
    const [searchQuery, setSearchQuery] = useState('');

    const components = [
        {
            name: 'SqlPlayground',
            label: 'SQL Playground',
            description: 'Interactive SQL execution in the browser',
            icon: <Database size={18} />,
            code: '<SqlPlayground />'
        },
        {
            name: 'SchemaDiagram',
            label: 'Schema Diagram',
            description: 'Visualization for database schemas',
            icon: <Activity size={18} />,
            code: '<SchemaDiagram />'
        },
        {
            name: 'Callout',
            label: 'Callout',
            description: 'Highlight important information',
            icon: <Type size={18} />,
            code: '<Callout type="info">\n  Message\n</Callout>'
        },
    ];

    const filteredComponents = useMemo(() => {
        if (!searchQuery.trim()) return components;
        const lowerQuery = searchQuery.toLowerCase();
        return components.filter(comp =>
            comp.label.toLowerCase().includes(lowerQuery) ||
            comp.name.toLowerCase().includes(lowerQuery) ||
            comp.description.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery]);

    const handleSelect = (code: string) => {
        insertContent(`\n\n${code}\n`);
        setComponentPickerOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:w-80 md:h-[600px] w-full h-[60vh]"
        >
            <Card
                className="flex flex-col h-full overflow-hidden bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-white/20 dark:border-stone-800/20 shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
                radius="lg"
                padding="none"
            >
                {/* Header */}
                <div className="flex items-center justify-between bg-stone-50/50 dark:bg-stone-800/50 px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-stone-501">Components</span>
                    <button
                        onClick={() => setComponentPickerOpen(false)}
                        className="rounded-md p-1 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Search Input */}
                <div className="p-4 border-b border-stone-100 dark:border-stone-800">
                    <div className="relative flex items-center">
                        <Search className="absolute left-3 text-stone-400 dark:text-stone-500 pointer-events-none" size={18} />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-xl bg-stone-100/50 dark:bg-stone-800/50 border-none focus:bg-white dark:focus:bg-stone-800 focus:ring-2 focus:ring-indigo-500/20 text-stone-700 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm transition-all shadow-inner outline-none"
                        />
                    </div>
                </div>

                {/* List Content */}
                <div className="flex-1 overflow-y-auto p-2 [scrollbar-width:thin] [scrollbar-color:theme(colors.stone.200)_transparent] dark:[scrollbar-color:theme(colors.stone.800)_transparent]">
                    {filteredComponents.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            <div className="px-2 py-1.5 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                                {searchQuery ? 'Results' : 'Available Components'}
                            </div>

                            {filteredComponents.map((comp) => (
                                <button
                                    key={comp.name}
                                    onClick={() => handleSelect(comp.code)}
                                    className="group flex items-center gap-3 rounded-lg p-3 hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 dark:active:bg-stone-700 transition-colors text-left w-full"
                                >
                                    <div className="p-2 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 group-hover:text-indigo-500 group-hover:bg-white dark:group-hover:bg-indigo-900/50 transition-colors">
                                        {comp.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-stone-700 dark:text-stone-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                            {comp.label}
                                        </span>
                                        <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 group-hover:text-stone-600 dark:group-hover:text-stone-300">
                                            {comp.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-stone-400 gap-2">
                            <Component size={32} className="opacity-20" />
                            <p className="text-sm">No components found</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                    <div className="text-[10px] text-stone-400 text-center">
                        Inserts at cursor position
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
