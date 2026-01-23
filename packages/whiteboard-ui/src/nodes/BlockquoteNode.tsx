"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { cn } from '../shared/lib/cn';

export const BlockquoteNode = memo(({ data, selected }: NodeProps) => {
    return (
        <div className={cn(
            "px-3 py-2 rounded-lg bg-violet-50 dark:bg-violet-950/30 border-l-4 border-violet-400",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-violet-400" />
            <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-violet-400" />

            <div className="text-xs italic text-violet-700 dark:text-violet-300 max-w-[250px]">
                "{data.label}"
            </div>

            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-violet-400" />
            <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-violet-400" />
        </div>
    );
});

BlockquoteNode.displayName = 'BlockquoteNode';
