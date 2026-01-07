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

interface FullscreenMindmapPageProps {
    source: string;
    title: string;
}

// ============================================
// Inner Canvas Component
// ============================================

function MindmapCanvas({
    nodes,
    edges
}: {
    nodes: Node[];
    edges: Edge[];
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
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={true}
            zoomOnScroll={true}
            className="bg-transparent"
        >
            {/* Background with WhiteboardLayout matching colors - scales with zoom */}
            <Background
                key={resolvedTheme}
                color={isDark ? "#475569" : "#94a3b8"}
                gap={32}
                size={2.5}
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
// FullscreenMindmapPage Component
// ============================================

/**
 * FullscreenMindmapPage - Renders MDX as fullscreen mindmap canvas
 * 
 * Uses fixed positioning to fill entire viewport like WhiteboardPage.
 * Title is displayed in the root node via parseMdxToGraph.
 */
export function FullscreenMindmapPage({ source, title }: FullscreenMindmapPageProps) {
    // Parse MDX to React Flow graph, passing title for root node
    const { nodes, edges } = useMemo(() => {
        const result = parseMdxToGraph(source, { title });
        return result ?? { nodes: [], edges: [] };
    }, [source, title]);

    // Empty state
    if (nodes.length === 0) {
        return (
            <div className="fixed inset-0 flex items-center justify-center text-slate-400 dark:text-stone-500">
                마인드맵을 생성할 콘텐츠가 없습니다.
            </div>
        );
    }

    return (
        <div className="fixed inset-0 overflow-hidden bg-slate-50 dark:bg-stone-950">
            <ReactFlowProvider>
                {/* Fullscreen Canvas - uses entire viewport */}
                <div className="absolute inset-0">
                    <MindmapCanvas nodes={nodes} edges={edges} />
                </div>
            </ReactFlowProvider>
        </div>
    );
}
