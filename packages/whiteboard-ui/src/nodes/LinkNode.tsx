import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { cn } from '../shared/lib/cn';
import { ExternalLink } from 'lucide-react';

interface LinkNodeData {
    label: string;
    url: string;
    direction?: 'left' | 'right' | 'root';
}

export const LinkNode = memo(({ data, selected }: NodeProps<LinkNodeData>) => {
    const isLeft = data.direction === 'left';

    return (
        <div className={cn(
            "px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800",
            "min-w-[120px] max-w-[280px]",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={isLeft ? Position.Right : Position.Left} className="!bg-blue-400" />
            <Handle type="source" position={isLeft ? Position.Left : Position.Right} className="!bg-blue-400" />

            <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                onClick={(e) => e.stopPropagation()}
            >
                <ExternalLink size={14} className="flex-shrink-0" />
                <span className="truncate text-sm font-medium">{data.label || data.url}</span>
            </a>
            <div className="text-xs text-slate-400 dark:text-stone-500 truncate mt-1">
                {data.url}
            </div>
        </div>
    );
});

LinkNode.displayName = 'LinkNode';
