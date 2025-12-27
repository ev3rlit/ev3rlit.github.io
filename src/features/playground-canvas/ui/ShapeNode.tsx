import React, { memo, useState } from 'react';
import { NodeProps, NodeResizer } from 'reactflow';
import { usePlaygroundStore } from '../model/usePlaygroundStore';
import { NodeWrapper } from './NodeWrapper';

export const ShapeNode = memo(({ data, selected, id }: NodeProps) => {
    const editingNodeId = usePlaygroundStore(s => s.editingNodeId);
    const [isHovered, setIsHovered] = useState(false);
    const isCircle = data.shape === 'Circle';

    return (
        <div
            className="w-full h-full min-w-[50px] min-h-[50px] flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <NodeWrapper selected={selected} isHovered={isHovered} data={data} id={id}>
                <NodeResizer
                    isVisible={selected}
                    minWidth={30}
                    minHeight={30}
                    lineClassName="border-transparent"
                    handleClassName="h-2.5 w-2.5 bg-white dark:bg-stone-800 border-2 border-indigo-500 rounded-full shadow-sm"
                />
                <div
                    className={`flex items-center justify-center flex-1 w-full h-full border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-md transition-all
                        ${isCircle ? 'rounded-full' : 'rounded-sm'}
                        ${selected ? 'ring-1 ring-indigo-500 ring-offset-2 dark:ring-offset-stone-950' : ''}
                    `}
                    style={{
                        backgroundColor: data.color || undefined,
                        minHeight: 'inherit'
                    }}
                >
                    <div className={`text-sm font-bold text-slate-800 dark:text-stone-200 px-4 text-center select-none uppercase tracking-tight transition-opacity ${editingNodeId === id ? 'opacity-0' : 'opacity-100'}`}>
                        {data.label}
                    </div>
                </div>
            </NodeWrapper>
        </div>
    );
});

ShapeNode.displayName = 'ShapeNode';
