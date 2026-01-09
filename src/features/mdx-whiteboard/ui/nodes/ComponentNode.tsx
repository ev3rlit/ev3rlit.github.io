"use client";

import React, { memo, useMemo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card } from '@/shared/ui/Card';
import { useWhiteboardStore } from '@/entities/whiteboard/model/whiteboardStore';
import { cn } from '@/shared/lib/cn';

// Component Imports
import { SqlPlayground } from '@/features/sql-playground/ui/SqlPlayground';
import { CodeComparison } from '@/features/mdx-viewer/ui/CodeComparison';
import { StatCard } from '@/features/mdx-viewer/ui/StatCard';
// Wait, MdxContent imports Callout? No, MdxContent imports components locally or from features. 
// Looking at descriptors.tsx, 'Callout' is defined. 
// Let's assume standard components for now. If path is wrong I will fix.
// Actually, let's look at MdxContent.tsx imports again in previous turns.
// MdxContent imports: SqlPlayground, SchemaDiagram (LogArchitectureDiagrams), StatCard, CodeComparison, etc.
// Callout might be just mapped or I need to find it. I'll omit Callout specific import if unsure, or map it to a generic alert.

// Let's use the ones I'm sure of from previous `view_file`.
// SqlPlayground: @/features/sql-playground/ui/SqlPlayground
// CodeComparison: @/features/mdx-viewer/ui/CodeComparison
// StatCard: @/features/mdx-viewer/ui/StatCard

// SchemaDiagram is also big, might need special handling.

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
    'SqlPlayground': SqlPlayground,
    'CodeComparison': CodeComparison,
    'StatCard': StatCard,
    // Add others as needed
};

export const ComponentNode = memo(({ data, selected, id }: NodeProps) => {
    const setEditingNodeId = useWhiteboardStore(state => state.setEditingNodeId);

    const Component = useMemo(() => {
        // data.label comes from parser, usually "CodeComparison" etc.
        // It might be uppercased in the UI for display, but parser.ts usually stores exact name or we normalize.
        // The screenshot showed "CODECOMPARISON" which implies the *visualization* uppercased it, strictly check data.label.
        // If parser stores "CodeComparison", we match that.
        // Let's try direct match first, then case-insensitive.
        const name = data.label;
        return COMPONENT_MAP[name] || Object.entries(COMPONENT_MAP).find(([k]) => k.toLowerCase() === name.toLowerCase())?.[1];
    }, [data.label]);

    // Parse props if they are strings that look like JSON (common in MDX attributes passing complex data)
    const activeProps = useMemo(() => {
        const props = { ...data.props };

        // CodeComparison 'items' prop handling
        if (data.label === 'CodeComparison') {
            // If it's a string, try to parse it
            if (typeof props.items === 'string') {
                try {
                    // Check if it's potentially an expression string like "{ ... }" or "[ ... ]"
                    // Sometimes MDX strings come with wrapped braces if picked up as string attribute
                    const raw = props.items.trim();
                    if (raw.startsWith('[') || raw.startsWith('{')) {
                        // Use Function constructor to parse JS object literals (allows single quotes, etc.)
                        // JSON.parse is too strict for typical developer inputs like [{ title: 'A' }]
                        // eslint-disable-next-line no-new-func
                        props.items = new Function('return ' + raw)();
                    }
                } catch (e) {
                    console.warn("Failed to parse items prop:", e, props.items);
                }
            }

            // Final safety check: must be an array
            if (!Array.isArray(props.items)) {
                props.items = [];
            }
        }

        return props;
    }, [data.props, data.label]);

    // Validate props to ensure component can render without crashing
    const validation = useMemo(() => {
        const name = data.label;
        const props = activeProps;

        if (name === 'CodeComparison') {
            if (!props.items || !Array.isArray(props.items) || props.items.length === 0) {
                return { valid: false, message: "Add 'items' prop to compare code" };
            }
        }
        if (name === 'Chart') {
            if (!props.data) {
                return { valid: false, message: "Add 'data' prop to render chart" };
            }
        }
        // StatCard and SqlPlayground are generally safe with defaults or undefined, 
        // but can add checks if strictness is needed.

        return { valid: true };
    }, [data.label, activeProps]);

    if (Component) {
        // If props are missing, show a friendly "Setup Needed" state
        if (!validation.valid) {
            return (
                <div
                    className={cn(
                        "group relative min-w-[300px] rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50 p-6 flex flex-col items-center justify-center gap-2 transition-all",
                        selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950 border-blue-400"
                    )}
                    onClick={() => setEditingNodeId(id)}
                >
                    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-blue-400" />

                    <div className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-500">
                        {/* Could map icons here but simplified for now */}
                        <span className="font-bold font-mono text-lg px-2">?</span>
                    </div>
                    <div className="font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider text-xs">
                        {data.label}
                    </div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400 text-center px-4">
                        {validation.message || "Configure properties to view"}
                    </div>

                    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-blue-400" />
                </div>
            );
        }

        return (
            <div
                className={cn(
                    "group relative min-w-[400px] rounded-xl transition-all duration-200",
                    selected ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950 shadow-xl" : "hover:shadow-lg border border-transparent"
                )}
                onClick={(e) => {
                    e.stopPropagation();
                    setEditingNodeId(id);
                }}
            >
                <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 !bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="bg-white dark:bg-stone-900 rounded-xl overflow-hidden border border-slate-200 dark:border-stone-800">
                    <div className="h-6 bg-slate-50 dark:bg-stone-800/50 flex items-center justify-between px-2 cursor-grab active:cursor-grabbing border-b border-slate-100 dark:border-stone-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{data.label}</span>
                    </div>
                    <div className="p-2 nodrag cursor-auto">
                        <Component {...activeProps} />
                    </div>
                </div>

                <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 !bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        );
    }

    // Fallback for unknown components (Original Generic Card)
    return (
        <div
            className={cn(
                "group relative p-1 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm",
                selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
            )}
            onClick={() => setEditingNodeId(id)}
        >
            <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-blue-400" />
            <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-blue-400" />

            <Card className="p-4 border-none bg-white/80 dark:bg-stone-900/80 overflow-hidden min-w-[300px]">
                <div className="text-[10px] font-mono text-blue-500 mb-2 uppercase tracking-wider flex justify-between items-center">
                    <span>{data.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Click to Edit</span>
                </div>

                {/* Props Display */}
                {data.props && Object.keys(data.props).length > 0 && (
                    <div className="mb-3 flex flex-col gap-1 p-2 rounded bg-stone-100 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800">
                        {Object.entries(data.props).map(([key, value]) => (
                            <div key={key} className="flex gap-2 text-[10px] items-center">
                                <span className="font-bold text-slate-500">{key}:</span>
                                <span className="font-mono text-stone-600 dark:text-stone-400 truncate max-w-[150px]" title={String(value)}>
                                    {String(value)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="pointer-events-none opacity-80 scale-90 origin-top-left">
                    <div className="p-2 rounded border border-dashed border-stone-300 dark:border-stone-700 text-xs text-stone-400 italic">
                        Preview Area (No Renderer)
                    </div>
                </div>
            </Card>

            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-blue-400" />
            <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-blue-400" />
        </div>
    );
});

ComponentNode.displayName = 'ComponentNode';
