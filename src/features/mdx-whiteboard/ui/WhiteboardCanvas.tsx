"use client";

import React, { useEffect, useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    BackgroundVariant,
    ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWhiteboardStore } from '@/entities/whiteboard/model/whiteboardStore';
import {
    SectionNode,
    ListNode,
    ComponentNode,
    RootNode,
    TableNode,
    CodeNode,
    BlockquoteNode,
    ChartNode,
    MathNode,
    StatsNode,
    LinkNode,
    ImageNode
} from './nodes';
import { useTheme } from 'next-themes';

const nodeTypes = {
    root: RootNode,
    section: SectionNode,
    list: ListNode,
    component: ComponentNode,
    table: TableNode,
    code: CodeNode,
    blockquote: BlockquoteNode,
    chart: ChartNode,
    math: MathNode,
    stats: StatsNode,
    link: LinkNode,
    image: ImageNode,
};

export function WhiteboardCanvas() {
    const [mounted, setMounted] = React.useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        setEditingNodeId,
        setReactFlowInstance,
        undo,
        redo,
    } = useWhiteboardStore();

    // Keyboard shortcuts for Undo/Redo
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // Ignore if focus is on input/textarea
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
            return;
        }

        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modKey = isMac ? event.metaKey : event.ctrlKey;

        if (modKey && event.key === 'z') {
            event.preventDefault();
            if (event.shiftKey) {
                redo();
            } else {
                undo();
            }
        }
        // Ctrl+Y for redo (Windows convention)
        if (!isMac && event.ctrlKey && event.key === 'y') {
            event.preventDefault();
            redo();
        }
    }, [undo, redo]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    if (!mounted) return null;

    return (
        <div className="h-full w-full bg-transparent relative overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onPaneClick={() => setEditingNodeId(null)}
                connectionMode={ConnectionMode.Loose}
                onInit={setReactFlowInstance}
                fitView
                className="bg-transparent"
                // Disable space key for panning to allow Monaco Editor to use it
                selectionKeyCode={null}
                panActivationKeyCode={null}
            >
                <Background
                    key={resolvedTheme}
                    color={isDark ? "#57534e" : "#cbd5e1"}
                    gap={20}
                    size={1}
                    variant={BackgroundVariant.Dots}
                />
                <Controls
                    className="!bg-white dark:!bg-stone-900 !border-slate-200 dark:!border-stone-800 !shadow-lg"
                    showInteractive={false}
                />
            </ReactFlow>
        </div>
    );
}
