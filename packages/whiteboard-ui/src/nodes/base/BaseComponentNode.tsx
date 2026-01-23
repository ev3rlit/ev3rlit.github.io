"use client";

import React, { ReactNode } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { cn } from '../../shared/lib/cn';
import { LucideIcon } from 'lucide-react';

interface BaseComponentNodeProps {
    selected?: boolean;
    title: string;
    icon?: LucideIcon;
    children: ReactNode;
    className?: string;
    headerColor?: string;
}

export const BaseComponentNode = ({
    selected,
    title,
    icon: Icon,
    children,
    className,
    headerColor = "text-stone-500"
}: BaseComponentNodeProps) => {
    return (
        <div className={cn(
            "group relative rounded-xl bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 shadow-lg backdrop-blur-sm transition-all duration-200 min-w-[280px]",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950 shadow-blue-500/20",
            className
        )}>
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                id="left"
                className="w-2.5 h-2.5 !bg-stone-400 border-2 border-white dark:border-stone-900 shadow-sm transition-transform hover:scale-125"
            />
            <Handle
                type="source"
                position={Position.Left}
                id="left"
                className="w-2.5 h-2.5 !bg-stone-400 border-2 border-white dark:border-stone-900 shadow-sm transition-transform hover:scale-125"
            />

            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-stone-100 dark:border-stone-800/50">
                {Icon && <Icon size={14} className={headerColor} />}
                <span className={cn("text-xs font-semibold tracking-wide uppercase", headerColor)}>
                    {title}
                </span>
            </div>

            {/* Content Body */}
            <div className="p-3">
                {children}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id="right"
                className="w-2.5 h-2.5 !bg-stone-400 border-2 border-white dark:border-stone-900 shadow-sm transition-transform hover:scale-125"
            />
            <Handle
                type="target"
                position={Position.Right}
                id="right"
                className="w-2.5 h-2.5 !bg-stone-400 border-2 border-white dark:border-stone-900 shadow-sm transition-transform hover:scale-125"
            />
        </div>
    );
};
