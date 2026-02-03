"use client";

import React, { useCallback, useMemo } from "react";
import ReactFlow, {
    Background,
    Controls,
    Node,
    Edge,
    Position,
    Handle,
    NodeProps,
    ReactFlowProvider,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { MacWindow } from "@/shared/ui/MacWindow";

// Custom Node Components
const RootNode = ({ data }: NodeProps) => (
    <div className="px-6 py-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg border-2 border-white/20">
        <Handle type="source" position={Position.Right} className="!bg-white" />
        <div className="text-lg font-bold">{data.label}</div>
        {data.subtitle && (
            <div className="text-xs text-white/70 mt-1">{data.subtitle}</div>
        )}
    </div>
);

const BranchNode = ({ data }: NodeProps) => (
    <div className="px-4 py-3 rounded-lg bg-white dark:bg-zinc-800 shadow-md border border-zinc-200 dark:border-zinc-700">
        <Handle type="target" position={Position.Left} className="!bg-indigo-500" />
        <Handle type="source" position={Position.Right} className="!bg-indigo-500" />
        <div className="font-semibold text-zinc-800 dark:text-zinc-100">{data.label}</div>
        {data.description && (
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-[160px]">
                {data.description}
            </div>
        )}
    </div>
);

const LeafNode = ({ data }: NodeProps) => (
    <div className="px-3 py-2 rounded-md bg-zinc-50 dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-700">
        <Handle type="target" position={Position.Left} className="!bg-zinc-400" />
        <div className="text-sm text-zinc-700 dark:text-zinc-300">{data.label}</div>
    </div>
);

const nodeTypes = {
    root: RootNode,
    branch: BranchNode,
    leaf: LeafNode,
};

// Demo data: Graphwrite concept visualization
const demoNodes: Node[] = [
    {
        id: "root",
        type: "root",
        position: { x: 0, y: 150 },
        data: { label: "📝 Graphwrite", subtitle: "코드로 선언하는 생각의 지도" },
    },
    // Left side - Problem
    {
        id: "traditional",
        type: "branch",
        position: { x: 250, y: 0 },
        data: { label: "🖱️ 기존 방식", description: "마우스로 드래그 & 드롭" },
    },
    {
        id: "t-problem1",
        type: "leaf",
        position: { x: 450, y: -30 },
        data: { label: "좌표 계산에 시간 낭비" },
    },
    {
        id: "t-problem2",
        type: "leaf",
        position: { x: 450, y: 30 },
        data: { label: "AI 협업 불가능" },
    },
    // Right side - Solution
    {
        id: "declarative",
        type: "branch",
        position: { x: 250, y: 150 },
        data: { label: "⚡ 선언형 접근", description: "관계만 정의하면 끝" },
    },
    {
        id: "d-benefit1",
        type: "leaf",
        position: { x: 450, y: 120 },
        data: { label: "구조가 곧 코드" },
    },
    {
        id: "d-benefit2",
        type: "leaf",
        position: { x: 450, y: 180 },
        data: { label: "AI가 이해하는 언어" },
    },
    // Bottom - Result
    {
        id: "result",
        type: "branch",
        position: { x: 250, y: 300 },
        data: { label: "🎯 결과", description: "생각의 속도로 시각화" },
    },
    {
        id: "r-feature1",
        type: "leaf",
        position: { x: 450, y: 270 },
        data: { label: "React 컴포넌트 = 노드" },
    },
    {
        id: "r-feature2",
        type: "leaf",
        position: { x: 450, y: 330 },
        data: { label: "TypeScript로 타입 안전" },
    },
];

const demoEdges: Edge[] = [
    { id: "e-root-trad", source: "root", target: "traditional", animated: true, style: { stroke: "#6366f1" } },
    { id: "e-root-decl", source: "root", target: "declarative", animated: true, style: { stroke: "#6366f1" } },
    { id: "e-root-result", source: "root", target: "result", animated: true, style: { stroke: "#6366f1" } },
    { id: "e-trad-p1", source: "traditional", target: "t-problem1", style: { stroke: "#ef4444" } },
    { id: "e-trad-p2", source: "traditional", target: "t-problem2", style: { stroke: "#ef4444" } },
    { id: "e-decl-b1", source: "declarative", target: "d-benefit1", style: { stroke: "#22c55e" } },
    { id: "e-decl-b2", source: "declarative", target: "d-benefit2", style: { stroke: "#22c55e" } },
    { id: "e-result-f1", source: "result", target: "r-feature1", style: { stroke: "#f59e0b" } },
    { id: "e-result-f2", source: "result", target: "r-feature2", style: { stroke: "#f59e0b" } },
];

function GraphwriteFlowInner() {
    const { fitView } = useReactFlow();

    // Fit view on mount
    const onInit = useCallback(() => {
        setTimeout(() => fitView({ padding: 0.2 }), 100);
    }, [fitView]);

    return (
        <ReactFlow
            nodes={demoNodes}
            edges={demoEdges}
            nodeTypes={nodeTypes}
            onInit={onInit}
            fitView
            minZoom={0.5}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
            className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950"
        >
            <Background color="#a1a1aa" gap={20} size={1} />
            <Controls
                showInteractive={false}
                className="!bg-white dark:!bg-zinc-800 !border-zinc-200 dark:!border-zinc-700 !shadow-lg"
            />
        </ReactFlow>
    );
}

export function GraphwriteDemo() {
    return (
        <MacWindow title="Graphwrite 컨셉 데모">
            <div className="h-[400px]">
                <ReactFlowProvider>
                    <GraphwriteFlowInner />
                </ReactFlowProvider>
            </div>
        </MacWindow>
    );
}
