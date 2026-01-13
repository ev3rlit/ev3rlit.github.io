"use client";

import React, { memo, useMemo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { renderInlineContent } from '../../lib/renderInlineContent';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const ListNode = memo(({ data, selected }: NodeProps) => {
    // mdxNode가 있으면 인라인 콘텐츠를 렌더링, 없으면 label 사용
    const content = useMemo(() => {
        if (data.mdxNode) {
            return renderInlineContent(data.mdxNode);
        }
        return data.label;
    }, [data.mdxNode, data.label]);

    return (
        <div className={cn(
            "px-3 py-1.5 rounded-md bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50",
            "max-w-[250px] whitespace-pre-wrap break-words",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={Position.Left} id="left" className="w-1.5 h-1.5 !bg-stone-400" />
            <Handle type="source" position={Position.Left} id="left" className="w-1.5 h-1.5 !bg-stone-400" />

            <div className="text-xs text-stone-600 dark:text-stone-400">
                {content}
            </div>

            <Handle type="source" position={Position.Right} id="right" className="w-1.5 h-1.5 !bg-stone-400" />
            <Handle type="target" position={Position.Right} id="right" className="w-1.5 h-1.5 !bg-stone-400" />
        </div>
    );
});

ListNode.displayName = 'ListNode';

