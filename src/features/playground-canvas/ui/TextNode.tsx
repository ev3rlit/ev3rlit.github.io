import React, { memo, useState } from 'react';
import { NodeProps, NodeResizer } from 'reactflow';
import { usePlaygroundStore } from '../model/usePlaygroundStore';
import { NodeWrapper } from './NodeWrapper';

export const TextNode = memo(({ data, selected, id }: NodeProps) => {
    const editingNodeId = usePlaygroundStore(s => s.editingNodeId);
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="w-full h-full min-w-[30px] min-h-[20px] flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <NodeWrapper selected={selected} isHovered={isHovered} data={data} id={id}>
                <NodeResizer
                    isVisible={selected}
                    minWidth={20}
                    minHeight={15}
                    lineClassName="border-transparent"
                    handleClassName="h-2.5 w-2.5 bg-white dark:bg-stone-800 border-2 border-indigo-500 rounded-full"
                />
                <div
                    className={`flex items-center justify-center flex-1 w-full h-full p-2 min-h-[1.5em] transition-colors bg-transparent border-none
                        ${editingNodeId === id ? '' : ''}
                    `}
                    style={{ minHeight: 'inherit' }}
                >
                    <div className={`text-xl font-black text-slate-800 dark:text-stone-100 tracking-tight text-center transition-opacity ${editingNodeId === id ? 'opacity-0' : 'opacity-100'}`}>
                        {data.label || (selected ? '' : ' ')}
                    </div>
                </div>
            </NodeWrapper>
        </div>
    );
});

TextNode.displayName = 'TextNode';
