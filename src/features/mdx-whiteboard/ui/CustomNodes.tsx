"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card } from '@/shared/ui/Card';
import { useWhiteboardStore } from '@/entities/whiteboard/model/whiteboardStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const RootNode = memo(({ data, selected }: NodeProps) => {
    // The data.label contains the title from frontmatter (handled in parser.ts)
    return (
        <div className={cn(
            "px-4 py-2 rounded-lg border-2 transition-all duration-200 bg-stone-900 border-stone-700 text-stone-100 min-w-[200px] text-center",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <div className="font-bold text-lg">
                {data.label}
            </div>

            <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-slate-400" />
        </div>
    );
});

export const SectionNode = memo(({ data, selected }: NodeProps) => {
    return (
        <div className={cn(
            "px-4 py-2 rounded-lg border-2 transition-all duration-200 bg-white dark:bg-stone-900 border-slate-200 dark:border-stone-800",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-slate-400" />

            <div className={cn(
                "font-bold text-sm text-slate-700 dark:text-stone-300"
            )}>
                {data.label}
            </div>

            <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-slate-400" />
        </div>
    );
});

export const ListNode = memo(({ data, selected }: NodeProps) => {
    return (
        <div className={cn(
            "px-3 py-1.5 rounded-md bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={Position.Left} className="w-1.5 h-1.5 !bg-stone-400" />
            <div className="text-xs text-stone-600 dark:text-stone-400">
                {data.label}
            </div>
            <Handle type="source" position={Position.Right} className="w-1.5 h-1.5 !bg-stone-400" />
        </div>
    );
});

// We'll implement ComponentNode separately as it needs more complex logic for live rendering
export const ComponentNode = memo(({ data, selected, id }: NodeProps) => {
    const setEditingNodeId = useWhiteboardStore(state => state.setEditingNodeId);

    return (
        <div
            className={cn(
                "group relative p-1 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm",
                selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
            )}
            onClick={() => setEditingNodeId(id)}
        >
            <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-blue-400" />

            <Card className="p-4 border-none bg-white/80 dark:bg-stone-900/80 overflow-hidden min-w-[300px]">
                <div className="text-[10px] font-mono text-blue-500 mb-2 uppercase tracking-wider flex justify-between items-center">
                    <span>{data.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Click to Edit Props</span>
                </div>

                {/* Live component preview would go here */}
                <div className="pointer-events-none opacity-80 scale-90 origin-top-left">
                    <div className="p-4 rounded border border-dashed border-stone-300 dark:border-stone-700 text-xs text-stone-400 italic">
                        Live Preview of {data.label}
                    </div>
                </div>
            </Card>

            <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-blue-400" />
        </div>
    );
});

RootNode.displayName = 'RootNode';
SectionNode.displayName = 'SectionNode';
ListNode.displayName = 'ListNode';
ComponentNode.displayName = 'ComponentNode';
