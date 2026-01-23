"use client";

import React from "react";
import { FlowDiagram } from "./FlowDiagram";
import { Node, Edge } from "reactflow";
import { useTheme } from "next-themes";
import { cn } from "@/shared/lib/cn";

// Common style generator
const useNodeStyles = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return {
        background: isDark ? "#1c1917" : "#fff",
        border: isDark ? "1px solid #444" : "1px solid #777",
        color: isDark ? "#e7e5e4" : "#1c1917",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 12,
        fontWeight: 500,
        textAlign: "center" as const,
        width: 140,
    };
};

export function ContextArchitectureFlow() {
    const nodeStyle = useNodeStyles();

    // Top (Client) -> Bottom (Logic)
    const x = 0;

    const nodes: Node[] = [
        {
            id: "client",
            position: { x, y: 0 },
            data: { label: "Client" },
            style: nodeStyle,
        },
        {
            id: "rpc-parser",
            position: { x, y: 100 },
            data: { label: "RPC Parser" },
            style: { ...nodeStyle, background: "#3b82f6", color: "#fff", border: "none" },
        },
        {
            id: "context",
            position: { x: -20, y: 200 },
            data: { label: "PeerContext" },
            style: {
                ...nodeStyle,
                height: 100,
                width: 180,
                border: "2px dashed #f59e0b",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: 10
            },
            type: "group",
        },
        {
            id: "ctx-info",
            position: { x: 15, y: 40 }, // relative to group
            data: { label: "RequestID\nUser Info\nTimestamp" },
            style: { ...nodeStyle, width: 140, fontSize: 10, border: "none", background: "transparent", boxShadow: "none" },
            parentNode: "context",
            extent: "parent",
        },
        {
            id: "logic",
            position: { x, y: 350 }, // below context
            data: { label: "Business Logic" },
            style: nodeStyle,
        },
    ];

    const edges: Edge[] = [
        { id: "e1", source: "client", target: "rpc-parser", animated: true },
        { id: "e2", source: "rpc-parser", target: "context", animated: true, label: "Inject" },
        { id: "e3", source: "context", target: "logic", animated: true, label: "Pass" },
    ];

    return (
        <FlowDiagram
            title="Context Injection Flow"
            nodes={nodes}
            edges={edges}
            height={440}
        />
    );
}

export function FinalArchitectureFlow() {
    const nodeStyle = useNodeStyles();

    // Full Pipeline: 
    // WebSocket (Top) -> Context -> Logic -> Log Buffer (Commit/Rollback via Group) -> Batch Worker -> ELAS (Bottom)
    const x = 0;

    const nodes: Node[] = [
        {
            id: "websocket",
            position: { x, y: 0 },
            data: { label: "WebSocket Receive" },
            style: { ...nodeStyle, borderRadius: "50%", width: 140 }
        },
        {
            id: "context-layer",
            position: { x, y: 100 },
            data: { label: "Context Layer" },
            style: { ...nodeStyle, border: "1px dashed #777", background: "transparent" }
        },
        {
            id: "logic",
            position: { x, y: 200 },
            data: { label: "Business Logic" },
            style: nodeStyle
        },

        // Transaction Zone
        {
            id: "tx-zone",
            position: { x: -30, y: 300 },
            data: { label: "Transaction Scope" },
            style: {
                ...nodeStyle,
                width: 200,
                height: 120,
                border: "2px dotted #ef4444",
                background: "transparent",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 5,
                fontSize: 10,
                color: "#ef4444"
            },
            type: "group",
        },
        {
            id: "buffer",
            position: { x: 30, y: 20 }, // relative to tx-zone
            data: { label: "Log Buffer" },
            style: { ...nodeStyle, width: 140 },
            parentNode: "tx-zone",
            extent: "parent",
        },
        // Action buttons simulated as nodes for Commit/Rollback visualization
        {
            id: "commit-action",
            position: { x: 30, y: 80 },
            data: { label: "On Success: Flush" },
            style: { ...nodeStyle, width: 140, height: 30, fontSize: 10, background: "#22c55e", color: "white", border: "none" },
            parentNode: "tx-zone",
            extent: "parent",
        },

        {
            id: "worker",
            position: { x, y: 460 },
            data: { label: "Batch Worker" },
            style: { ...nodeStyle, background: "#8b5cf6", color: "#fff", border: "none" }
        },
        {
            id: "storage",
            position: { x, y: 560 },
            data: { label: "ELAS (Cloud)" },
            style: { ...nodeStyle, borderRadius: "50%" }
        },
    ];

    const edges: Edge[] = [
        { id: "e1", source: "websocket", target: "context-layer", animated: true },
        { id: "e2", source: "context-layer", target: "logic", animated: true },
        { id: "e3", source: "logic", target: "buffer", animated: true, label: "AppendLog" },
        { id: "e4", source: "commit-action", target: "worker", animated: true, label: "Async Channel" },
        { id: "e5", source: "worker", target: "storage", animated: true, label: "Bulk Insert" },
    ];

    return (
        <FlowDiagram
            title="Full Transactional Logging Flow"
            nodes={nodes}
            edges={edges}
            height={660} // Taller for full pipeline
        />
    );
}
