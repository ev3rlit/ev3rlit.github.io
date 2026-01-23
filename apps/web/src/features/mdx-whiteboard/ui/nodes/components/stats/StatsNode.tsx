"use client";

import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseComponentNode } from '../../base/BaseComponentNode';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export const StatsNode = memo(({ data, selected }: NodeProps) => {
    const title = data.props?.title || 'Metric';
    const value = data.props?.value || '0';
    const delta = data.props?.delta || '';
    const trend = data.props?.trend || 'neutral'; // 'up' | 'down' | 'neutral'

    const isUp = trend === 'up';
    const isDown = trend === 'down';

    return (
        <BaseComponentNode
            selected={selected}
            title={title}
            icon={Activity}
            headerColor="text-stone-500"
            className="min-w-[200px]"
        >
            <div className="flex flex-col gap-1 mt-1">
                <div className="text-2xl font-bold text-stone-800 dark:text-stone-100">
                    {value}
                </div>
                {delta && (
                    <div className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        isUp ? "text-emerald-600 dark:text-emerald-400" :
                            isDown ? "text-rose-600 dark:text-rose-400" : "text-stone-500"
                    )}>
                        {isUp && <TrendingUp size={12} />}
                        {isDown && <TrendingDown size={12} />}
                        <span>{delta}</span>
                    </div>
                )}
            </div>
        </BaseComponentNode>
    );
});

StatsNode.displayName = 'StatsNode';
