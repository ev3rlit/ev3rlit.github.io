"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card } from '@/shared/ui/Card';
import { useWhiteboardStore } from '@/entities/whiteboard/model/whiteboardStore';
import { cn } from '@/shared/lib/cn';

export const ComponentNode = memo(({ data, selected, id }: NodeProps) => {
    const setEditingNodeId = useWhiteboardStore(state => state.setEditingNodeId);

    return (
        <div
            className={cn(
                "group relative p-1 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm",
                selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
            )}
            onClick={() => setEditingNodeId(id)}
        >
            <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-blue-400" />
            <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-blue-400" />

            <Card className="p-4 border-none bg-white/80 dark:bg-stone-900/80 overflow-hidden min-w-[300px]">
                <div className="text-[10px] font-mono text-blue-500 mb-2 uppercase tracking-wider flex justify-between items-center">
                    <span>{data.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Click to Edit</span>
                </div>

                {/* Props Display */}
                {data.props && Object.keys(data.props).length > 0 && (
                    <div className="mb-3 flex flex-col gap-1 p-2 rounded bg-stone-100 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800">
                        {Object.entries(data.props).map(([key, value]) => (
                            <div key={key} className="flex gap-2 text-[10px] items-center">
                                <span className="font-bold text-slate-500">{key}:</span>
                                <span className="font-mono text-stone-600 dark:text-stone-400 truncate max-w-[150px]" title={String(value)}>
                                    {String(value)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Live component preview placeholder */}
                <div className="pointer-events-none opacity-80 scale-90 origin-top-left">
                    <div className="p-2 rounded border border-dashed border-stone-300 dark:border-stone-700 text-xs text-stone-400 italic">
                        Preview Area
                    </div>
                </div>
            </Card>

            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-blue-400" />
            <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-blue-400" />
        </div>
    );
});

ComponentNode.displayName = 'ComponentNode';
