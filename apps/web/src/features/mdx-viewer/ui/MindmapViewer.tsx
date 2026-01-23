"use client";

import React, { useEffect, useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    BackgroundVariant,
    ConnectionMode,
    Node,
    Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { parseMdxToGraph } from '@/features/mdx-whiteboard/lib/parser';
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
    StatsNode
} from '@/features/mdx-whiteboard/ui/nodes';
import { useTheme } from 'next-themes';
import { ReactFlowProvider } from 'reactflow';

// ============================================
// Node Types
// ============================================

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
};

// ============================================
// Types
// ============================================

interface MindmapViewerProps {
    source: string;
    readOnly?: boolean;
    className?: string;
}

// ============================================
// Inner Canvas Component (needs ReactFlowProvider parent)
// ============================================

function MindmapCanvas({
    nodes,
    edges,
    readOnly = true
}: {
    nodes: Node[];
    edges: Edge[];
    readOnly?: boolean;
}) {
    const [mounted, setMounted] = React.useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            // Read-only options
            nodesDraggable={!readOnly}
            nodesConnectable={!readOnly}
            elementsSelectable={!readOnly}
            panOnDrag={true}
            zoomOnScroll={true}
            className="bg-transparent"
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
    );
}

// ============================================
// MindmapViewer Component
// ============================================

/**
 * MindmapViewer - Renders MDX content as a React Flow mindmap canvas
 * 
 * Uses the existing parseMdxToGraph() to convert MDX to nodes/edges,
 * then renders them in a read-only WhiteboardCanvas.
 * 
 * @param source - Raw MDX content string
 * @param readOnly - If true, disables dragging and editing (default: true)
 */
export function MindmapViewer({ source, readOnly = true, className }: MindmapViewerProps) {
    // Parse MDX to React Flow graph
    const { nodes, edges } = useMemo(() => {
        const result = parseMdxToGraph(source);
        return result ?? { nodes: [], edges: [] };
    }, [source]);

    // Empty state
    if (nodes.length === 0) {
        return (
            <div className="flex items-center justify-center h-[400px] text-slate-400 dark:text-stone-500">
                마인드맵을 생성할 콘텐츠가 없습니다.
            </div>
        );
    }

    return (
        <div className={`h-[600px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-stone-800 bg-stone-50 dark:bg-[#0a0a0a] ${className ?? ''}`}>
            <ReactFlowProvider>
                <MindmapCanvas nodes={nodes} edges={edges} readOnly={readOnly} />
            </ReactFlowProvider>
        </div>
    );
}
