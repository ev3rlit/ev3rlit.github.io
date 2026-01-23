"use client";

import React, { useState, useEffect } from 'react';
import { useWhiteboardStore } from '@/model/whiteboardStore';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { X, Save, Trash2, Info } from 'lucide-react';

export function PropertyEditor() {
    const { editingNodeId, setEditingNodeId, nodes, mdxSource, setMdxSource } = useWhiteboardStore();
    const [node, setNode] = useState<any>(null);

    useEffect(() => {
        if (editingNodeId) {
            const foundNode = nodes.find(n => n.id === editingNodeId);
            setNode(foundNode);
        } else {
            setNode(null);
        }
    }, [editingNodeId, nodes]);

    if (!node || node.type !== 'component') return null;

    const onClose = () => setEditingNodeId(null);

    return (
        <Card
            className="fixed top-6 right-6 w-80 z-20 shadow-2xl border-slate-200 dark:border-stone-800 flex flex-col max-h-[80vh]"
            radius="md"
            padding="none"
        >
            <div className="p-4 border-b border-slate-100 dark:border-stone-800 flex justify-between items-center bg-stone-50 dark:bg-stone-950/50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <h3 className="text-xs font-bold text-slate-500 dark:text-stone-400 uppercase tracking-widest">{node.data.label} Props</h3>
                </div>
                <button onClick={onClose} className="text-stone-400 hover:text-stone-900 transition-colors">
                    <X size={16} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/20 flex gap-3">
                    <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-blue-700 dark:text-blue-400 leading-relaxed">
                        Props editing will directly update the MDX source.
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Placeholder for dynamic prop fields based on MDX node AST */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">Raw MDX Node</label>
                        <pre className="text-[10px] p-2 bg-stone-100 dark:bg-stone-950 rounded border border-stone-200 dark:border-stone-800 font-mono text-stone-600 dark:text-stone-400 overflow-x-auto">
                            {JSON.stringify(node.data.mdxNode?.attributes || [], null, 2)}
                        </pre>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-950/50 border-t border-slate-100 dark:border-stone-800 flex gap-2">
                <Button intent="secondary" size="sm" className="flex-1 text-[11px]" onClick={onClose}>
                    Cancel
                </Button>
                <Button intent="primary" size="sm" className="flex-1 text-[11px]">
                    <Save size={14} className="mr-1.5" /> Save Changes
                </Button>
            </div>
        </Card>
    );
}
