"use client";

import React from "react";
import ReactFlow, { Background, Controls, Edge, Node, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import { Card } from "@/shared/ui/Card";
import { useTheme } from "next-themes";
import { cn } from "@/shared/lib/cn";

interface FlowDiagramProps {
    nodes: Node[];
    edges: Edge[];
    title?: string;
    height?: number | string;
    className?: string;
    fitView?: boolean;
}

export function FlowDiagram({
    nodes,
    edges,
    title,
    height = 320,
    className,
    fitView = true
}: FlowDiagramProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <Card
            className={cn("my-8 overflow-hidden dark:bg-stone-900/50 border-stone-200 dark:border-stone-800", className)}
            padding="none"
        >
            {title && (
                <div className="border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {title}
                </div>
            )}
            <div style={{ width: "100%", height }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView={fitView}
                    nodesConnectable={false}
                    nodesDraggable={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    panOnScroll={false}
                    preventScrolling={false}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background color={isDark ? "#333" : "#aaa"} gap={20} />
                    <Controls showInteractive={false} />
                </ReactFlow>
            </div>
        </Card>
    );
}
