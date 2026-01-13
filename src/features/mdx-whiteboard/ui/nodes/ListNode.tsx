"use client";

import React, { memo, useMemo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { renderInlineContent } from '../../lib/renderInlineContent';
import { NODE_STYLES } from '../../lib/nodeStyles';
import { cn } from '@/shared/lib/cn';

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
            NODE_STYLES.list,
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={Position.Left} id="left" className="w-1.5 h-1.5 !bg-stone-400" />
            <Handle type="source" position={Position.Left} id="left" className="w-1.5 h-1.5 !bg-stone-400" />

            {/* NODE_STYLES.list에 text 스타일이 포함되어 있으므로 직접 렌더링 */}
            {content}

            <Handle type="source" position={Position.Right} id="right" className="w-1.5 h-1.5 !bg-stone-400" />
            <Handle type="target" position={Position.Right} id="right" className="w-1.5 h-1.5 !bg-stone-400" />
        </div>
    );
});

ListNode.displayName = 'ListNode';
