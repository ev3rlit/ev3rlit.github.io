"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const SectionNode = memo(({ data, selected }: NodeProps) => {
    return (
        <div className={cn(
            "px-4 py-2 rounded-lg border-2 transition-all duration-200 bg-white dark:bg-stone-900 border-slate-200 dark:border-stone-800",
            "max-w-[300px] whitespace-pre-wrap break-words",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400" />
            <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400" />

            <div className={cn(
                "font-bold text-sm text-slate-700 dark:text-stone-300"
            )}>
                {data.label}
            </div>

            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400" />
            <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400" />
        </div>
    );
});

SectionNode.displayName = 'SectionNode';
