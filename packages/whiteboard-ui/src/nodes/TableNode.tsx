"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { cn } from '@/shared/lib/cn';

export const TableNode = memo(({ data, selected }: NodeProps) => {
    const tableData = data.tableData as { headers: string[]; rows: string[][] } | undefined;

    return (
        <div className={cn(
            "px-3 py-2 rounded-lg bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800/50",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950"
        )}>
            <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-emerald-400" />
            <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-emerald-400" />

            <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">
                Table
            </div>

            {tableData && (
                <div className="max-w-[400px] overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-emerald-800">
                    <table className="text-xs border-collapse w-full">
                        <thead>
                            <tr>
                                {tableData.headers.map((header, i) => (
                                    <th
                                        key={i}
                                        className="px-2 py-1 text-left font-semibold text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 whitespace-nowrap"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="px-2 py-1 text-stone-600 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 whitespace-nowrap"
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-emerald-400" />
            <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-emerald-400" />
        </div>
    );
});

TableNode.displayName = 'TableNode';
