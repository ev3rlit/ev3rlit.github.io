import React, { memo, useState } from 'react';
import { NodeProps, NodeResizer } from 'reactflow';
import { usePlaygroundStore } from '../model/usePlaygroundStore';
import { NodeWrapper } from './NodeWrapper';

export const StickyNode = memo(({ data, selected, id }: NodeProps) => {
    const editingNodeId = usePlaygroundStore(s => s.editingNodeId);
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="w-full h-full min-w-[80px] min-h-[80px] flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <NodeWrapper selected={selected} isHovered={isHovered} data={data} id={id}>
                <NodeResizer
                    isVisible={selected}
                    minWidth={50}
                    minHeight={50}
                    lineClassName="border-transparent"
                    handleClassName="h-3 w-3 bg-white dark:bg-stone-800 border-2 border-indigo-500 rounded-full shadow-sm"
                />
                <div
                    className="flex items-start justify-start p-6 flex-1 w-full h-full bg-[#fff9c4] dark:bg-amber-950/40 border border-yellow-500/50 dark:border-amber-900/40 shadow-[4px_4px_10px_rgba(0,0,0,0.06)] dark:shadow-[4px_4px_20px_rgba(0,0,0,0.3)] rotate-[-1deg] overflow-hidden"
                    style={{ minHeight: 'inherit' }}
                >
                    <div className={`text-base text-yellow-900 dark:text-amber-200/80 font-bold leading-snug text-left select-none italic transition-opacity ${editingNodeId === id ? 'opacity-0' : 'opacity-100'}`}>
                        {data.label}
                    </div>
                </div>
            </NodeWrapper>
        </div>
    );
});

StickyNode.displayName = 'StickyNode';
