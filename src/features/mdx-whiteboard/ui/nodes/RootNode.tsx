"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const RootNode = memo(({ data, selected }: NodeProps) => {
    return (
        <div className={cn(
            "px-4 py-2 rounded-lg border-2 transition-all duration-200 bg-stone-900 border-stone-700 text-stone-100 min-w-[200px] text-center",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400" />

            <div className="font-bold text-lg">
                {data.label}
            </div>

            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400" />
        </div>
    );
});

RootNode.displayName = 'RootNode';
