"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const ListNode = memo(({ data, selected }: NodeProps) => {
    return (
        <div className={cn(
            "px-3 py-1.5 rounded-md bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={Position.Left} id="left" className="w-1.5 h-1.5 !bg-stone-400" />
            <Handle type="source" position={Position.Left} id="left" className="w-1.5 h-1.5 !bg-stone-400" />

            <div className="text-xs text-stone-600 dark:text-stone-400">
                {data.label}
            </div>

            <Handle type="source" position={Position.Right} id="right" className="w-1.5 h-1.5 !bg-stone-400" />
            <Handle type="target" position={Position.Right} id="right" className="w-1.5 h-1.5 !bg-stone-400" />
        </div>
    );
});

ListNode.displayName = 'ListNode';
