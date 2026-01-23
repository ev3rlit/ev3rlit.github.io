"use client";

import React, { useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    BackgroundVariant,
    ConnectionMode,
    useViewport
} from 'reactflow';
import 'reactflow/dist/style.css';
import { usePlaygroundStore } from '../model/usePlaygroundStore';
import { ShapeNode, TextNode, StickyNode } from './CustomNodes';
import { FloatingEdge } from './FloatingEdge';

import { useTheme } from 'next-themes';

const ZoomIndicator = () => {
    const { zoom } = useViewport();
    const zoomPercent = Math.round(zoom * 100);

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-slate-200 dark:border-stone-800 rounded-full shadow-lg pointer-events-none z-[5]">
            <span className="text-[11px] font-bold text-slate-500 dark:text-stone-400 tabular-nums tracking-wider uppercase">
                Zoom {zoomPercent}%
            </span>
        </div>
    );
};

const nodeTypes = {
    shape: ShapeNode,
    text: TextNode,
    sticky: StickyNode,
};

const edgeTypes = {
    floating: FloatingEdge,
};

export function PlaygroundCanvas() {
    const { theme, resolvedTheme } = useTheme();
    const isDark = (resolvedTheme || theme) === 'dark';

    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        setEditingNodeId
    } = usePlaygroundStore();

    const onPaneClick = useCallback(() => {
        setEditingNodeId(null);
    }, [setEditingNodeId]);

    return (
        <div className="h-full w-full bg-transparent relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onPaneClick={onPaneClick}
                connectionMode={ConnectionMode.Loose}
                connectionRadius={20}
                snapToGrid={true}
                snapGrid={[5, 5]}
                fitView
            >
                <Background
                    key={resolvedTheme}
                    color={isDark ? "#57534e" : "#cbd5e1"}
                    gap={20}
                    size={1}
                    variant={BackgroundVariant.Dots}
                />
                <Controls position="bottom-right" showInteractive={false} />
                <ZoomIndicator />
            </ReactFlow>
        </div>
    );
}
