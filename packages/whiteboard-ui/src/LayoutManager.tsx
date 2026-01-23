"use client";

import { useLayoutEffect, useRef } from 'react';
import { useWhiteboardStore } from './model/whiteboardStore';
import { runFlextree } from '@repo/mdx-logic';
import { Position } from 'reactflow';

/**
 * Headless component that manages the auto-layout process.
 * Uses useLayoutEffect to calculate layout BEFORE paint, preventing flicker.
 * Uses structureHash to skip unnecessary re-layouts.
 */
export const LayoutManager = () => {
    const nodes = useWhiteboardStore((state) => state.nodes);
    const edges = useWhiteboardStore((state) => state.edges);
    const nodeSizes = useWhiteboardStore((state) => state.nodeSizes);
    const structureHash = useWhiteboardStore((state) => state.structureHash);
    const setNodes = useWhiteboardStore((state) => state.setNodes);
    const setEdges = useWhiteboardStore((state) => state.setEdges);

    // Track previous structure hash to detect topology changes
    const prevHashRef = useRef<string>('');

    useLayoutEffect(() => {
        // Skip if no nodes
        if (nodes.length === 0) return;

        // Compute current structure hash
        const currentHash = nodes.map(n => n.id).sort().join(',');

        // Skip if structure hasn't changed AND all nodes already have layout
        const allLayoutReady = nodes.every(n => n.data?.isLayoutReady);
        if (currentHash === prevHashRef.current && allLayoutReady) {
            return;
        }

        // Check if all nodes have been measured
        const allMeasured = nodes.every(n => nodeSizes[n.id]);
        if (!allMeasured) {
            // Not all measured yet, wait for next render
            return;
        }

        // Update hash reference
        prevHashRef.current = currentHash;

        // Determine Root Node
        const rootNode = nodes.find(n => n.type === 'root') || nodes[0];
        if (!rootNode) return;

        // Build Hierarchy & Split Trees
        const childrenMap = new Map<string, string[]>();
        edges.forEach(edge => {
            const children = childrenMap.get(edge.source) || [];
            children.push(edge.target);
            childrenMap.set(edge.source, children);
        });

        const rootChildren = childrenMap.get(rootNode.id) || [];
        const leftChildrenIds: string[] = [];
        const rightChildrenIds: string[] = [];

        rootChildren.forEach((childId, index) => {
            if (index % 2 === 0) rightChildrenIds.push(childId);
            else leftChildrenIds.push(childId);
        });

        const buildTreeData = (rootId: string): any => {
            const children = childrenMap.get(rootId) || [];
            return {
                id: rootId,
                children: children.map(buildTreeData)
            };
        };

        // Get Size from Store
        const getNodeSize = (d: any) => {
            const size = nodeSizes[d.id];
            return size
                ? { width: size.w + 40, height: size.h + 10 }
                : { width: 150, height: 50 };
        };

        const rootSize = getNodeSize({ id: rootNode.id });

        const GAP_X = 80;
        const GAP_Y = 20;

        const layoutPositions = new Map<string, { x: number, y: number, dir: 'left' | 'right' | 'root' }>();

        // Root Position
        layoutPositions.set(rootNode.id, {
            x: -rootSize.width / 2,
            y: -rootSize.height / 2,
            dir: 'root'
        });

        // Flextree: Right
        if (rightChildrenIds.length > 0) {
            const virtualRightRoot = {
                id: 'virtual-right',
                children: rightChildrenIds.map(buildTreeData)
            };
            const virtualSize = (d: any) => {
                if (d.id === 'virtual-right') return { width: rootSize.width, height: rootSize.height };
                return getNodeSize(d);
            };

            const result = runFlextree(
                virtualRightRoot,
                (d) => d.children,
                (d) => {
                    const s = virtualSize(d);
                    return { w: s.width, h: s.height };
                },
                GAP_X,
                GAP_Y
            );

            result.nodes.forEach(n => {
                if (n.id === 'virtual-right') return;
                const measured = nodeSizes[n.id] || { w: 100, h: 50 };
                const posX = n.x - rootSize.width / 2;
                const posY = n.y - measured.h / 2;
                layoutPositions.set(n.id, { x: posX, y: posY, dir: 'right' });
            });
        }

        // Flextree: Left
        if (leftChildrenIds.length > 0) {
            const virtualLeftRoot = {
                id: 'virtual-left',
                children: leftChildrenIds.map(buildTreeData)
            };
            const virtualSize = (d: any) => {
                if (d.id === 'virtual-left') return { width: rootSize.width, height: rootSize.height };
                return getNodeSize(d);
            };

            const result = runFlextree(
                virtualLeftRoot,
                (d) => d.children,
                (d) => {
                    const s = virtualSize(d);
                    return { w: s.width, h: s.height };
                },
                GAP_X,
                GAP_Y
            );

            result.nodes.forEach(n => {
                if (n.id === 'virtual-left') return;
                const measured = nodeSizes[n.id] || { w: 100, h: 50 };
                const posX = -(n.x - rootSize.width / 2) - measured.w;
                const posY = n.y - measured.h / 2;
                layoutPositions.set(n.id, { x: posX, y: posY, dir: 'left' });
            });
        }

        // Apply Updates
        const newNodes = nodes.map(node => {
            const layout = layoutPositions.get(node.id);
            if (!layout) return node;

            const isLeft = layout.dir === 'left';
            const isRoot = layout.dir === 'root';

            return {
                ...node,
                position: { x: layout.x, y: layout.y },
                sourcePosition: isRoot ? undefined : (isLeft ? Position.Left : Position.Right),
                targetPosition: isRoot ? undefined : (isLeft ? Position.Right : Position.Left),
                data: {
                    ...node.data,
                    layoutDirection: layout.dir,
                    isLayoutReady: true
                },
                style: { ...node.style, width: undefined, height: undefined }
            };
        });

        // Update Edges
        const newEdges = edges.map(edge => {
            const sourcePos = layoutPositions.get(edge.source);
            const targetPos = layoutPositions.get(edge.target);

            if (!sourcePos || !targetPos) return edge;

            let sourceHandle = 'right';
            let targetHandle = 'left';

            if (sourcePos.dir === 'root') sourceHandle = targetPos.dir === 'left' ? 'left' : 'right';
            else sourceHandle = sourcePos.dir;

            targetHandle = targetPos.dir === 'left' ? 'right' : 'left';

            if (edge.sourceHandle !== sourceHandle || edge.targetHandle !== targetHandle) {
                return { ...edge, sourceHandle, targetHandle };
            }
            return edge;
        });

        setNodes(newNodes);
        setEdges(newEdges);

    }, [nodes, edges, nodeSizes, structureHash, setNodes, setEdges]);

    return null;
};
