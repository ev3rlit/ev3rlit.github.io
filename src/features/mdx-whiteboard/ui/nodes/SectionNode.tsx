"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NODE_STYLES } from '../../lib/nodeStyles';
import { cn } from '@/shared/lib/cn';

export const SectionNode = memo(({ data, selected }: NodeProps) => {
    return (
        <div className={cn(
            NODE_STYLES.section,
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400" />
            <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400" />

            {/* NODE_STYLES.section에 폰트 스타일 포함됨 */}
            {data.label}

            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400" />
            <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400" />
        </div>
    );
});

SectionNode.displayName = 'SectionNode';
