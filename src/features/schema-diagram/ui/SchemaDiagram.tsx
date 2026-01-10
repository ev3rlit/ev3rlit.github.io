"use client";

import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { Card } from "@/shared/ui/Card";
import { useTheme } from "next-themes";

const getInitialNodes = (isDark: boolean) => [
    {
        id: "1",
        position: { x: 0, y: 0 },
        data: { label: "users" },
        style: {
            background: isDark ? "#1c1917" : "#fff",
            border: isDark ? "1px solid #444" : "1px solid #777",
            color: isDark ? "#e7e5e4" : "#1c1917",
            padding: 10,
            borderRadius: 8,
            width: 100
        },
    },
    {
        id: "2",
        position: { x: 200, y: 100 },
        data: { label: "posts" },
        style: {
            background: isDark ? "#1c1917" : "#fff",
            border: isDark ? "1px solid #444" : "1px solid #777",
            color: isDark ? "#e7e5e4" : "#1c1917",
            padding: 10,
            borderRadius: 8,
            width: 100
        },
    },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

export function SchemaDiagram() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Memoize nodes to prevent unnecessary re-renders but respond to theme
    const nodes = React.useMemo(() => getInitialNodes(isDark), [isDark]);

    return (
        <Card className="my-8 h-80 overflow-hidden dark:bg-stone-900/50 border-stone-200 dark:border-stone-800" padding="none">
            <div className="border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Schema Diagram
            </div>
            <div style={{ width: "100%", height: "100%" }}>
                <ReactFlow nodes={nodes} edges={initialEdges} fitView>
                    <Background color={isDark ? "#333" : "#aaa"} gap={16} />
                    <Controls />
                </ReactFlow>
            </div>
        </Card>
    );
}
