"use client";

import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { cn } from '@/shared/lib/cn';
import { Image as ImageIcon, ExternalLink } from 'lucide-react';

interface ImageNodeData {
    label: string;
    url: string;
    direction?: 'left' | 'right' | 'root';
}

export const ImageNode = memo(({ data, selected }: NodeProps<ImageNodeData>) => {
    const isLeft = data.direction === 'left';
    const [imageError, setImageError] = useState(false);

    return (
        <div className={cn(
            "p-3 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800",
            "min-w-[150px] max-w-[300px]",
            selected && "ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={isLeft ? Position.Right : Position.Left} className="!bg-purple-400" />
            <Handle type="source" position={isLeft ? Position.Left : Position.Right} className="!bg-purple-400" />

            <div className="mb-2 rounded overflow-hidden bg-white dark:bg-stone-900">
                {!imageError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={data.url}
                        alt={data.label}
                        className="w-full h-24 object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-24 flex items-center justify-center bg-slate-100 dark:bg-stone-800">
                        <ImageIcon size={32} className="text-slate-400" />
                    </div>
                )}
            </div>

            <div className="text-sm font-medium text-purple-700 dark:text-purple-300 truncate">
                {data.label || 'Image'}
            </div>
            <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-400 dark:text-stone-500 hover:underline mt-1"
                onClick={(e) => e.stopPropagation()}
            >
                <ExternalLink size={10} />
                <span className="truncate">{data.url}</span>
            </a>
        </div>
    );
});

ImageNode.displayName = 'ImageNode';
