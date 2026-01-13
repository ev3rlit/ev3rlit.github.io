import { Node, Edge } from 'reactflow';

// Layout Constants
const NODE_GAP = 30;      // Vertical gap between sibling nodes
const LEVEL_GAP = 150;    // Horizontal gap between levels
const ROOT_OFFSET = 200;  // Horizontal offset from root

interface LayoutNode {
    id: string;
    width: number;
    height: number;
}

interface SubtreeInfo {
    height: number;
    topOffset: number;  // Distance from subtree top to node center
}

// Estimate node dimensions based on type and content
export const estimateDimensions = (node: Node): { width: number; height: number } => {
    if (node.type === 'component') return { width: 300, height: 120 };

    if (node.type === 'table') {
        const tableData = node.data?.tableData as { headers: string[]; rows: string[][] } | undefined;
        const rows = (tableData?.rows?.length || 1) + 1;
        const cols = tableData?.headers?.length || 2;
        const width = Math.min(400, Math.max(250, cols * 100));
        const height = Math.max(80, rows * 30 + 40);
        return { width, height };
    }

    if (node.type === 'code') {
        const codeData = node.data?.codeData as { lang: string; value: string } | undefined;
        const value = codeData?.value || '';
        const lines = value.split('\n').length;
        const contentHeight = Math.min(300, lines * 16 + 20);
        const height = 40 + contentHeight + 20;
        return { width: 320, height };
    }

    if (node.type === 'blockquote') {
        const label = node.data?.label || '';
        const width = 280;
        const charsPerLine = 35;
        const lines = Math.ceil((label.length || 1) / charsPerLine);
        const height = 20 + (lines * 20);
        return { width, height };
    }

    if (node.type === 'link') {
        return { width: 200, height: 50 };
    }

    if (node.type === 'image') {
        return { width: 200, height: 140 };  // 썸네일 높이 포함
    }

    if (node.type === 'section') {
        const maxWidth = 300;
        const label = node.data?.label || '';
        const charsPerLine = 32;
        const lines = Math.ceil((label.length || 1) / charsPerLine);
        const lineHeight = 24;
        const height = 24 + (lines * lineHeight);
        return { width: maxWidth, height: Math.max(54, height) };
    }

    // List / Default
    const maxWidth = 250;
    const label = node.data?.label || '';
    const charsPerLine = 32;
    const lines = Math.ceil((label.length || 1) / charsPerLine);
    const lineHeight = 18;
    const height = 16 + (lines * lineHeight);
    return { width: maxWidth, height: Math.max(40, height) };
};

// Build parent-children map from edges
const buildChildrenMap = (edges: Edge[]): Map<string, string[]> => {
    const childrenMap = new Map<string, string[]>();

    edges.forEach(edge => {
        const children = childrenMap.get(edge.source) || [];
        children.push(edge.target);
        childrenMap.set(edge.source, children);
    });

    return childrenMap;
};

// Calculate subtree height recursively (Bottom-Up) with cycle detection
const calculateSubtreeHeight = (
    nodeId: string,
    nodeMap: Map<string, LayoutNode>,
    childrenMap: Map<string, string[]>,
    cache: Map<string, SubtreeInfo>,
    visitedStack: Set<string> = new Set()
): SubtreeInfo => {
    // Return cached result if available
    if (cache.has(nodeId)) {
        return cache.get(nodeId)!;
    }

    // CYCLE DETECTION: Check if node is already being visited in current path
    if (visitedStack.has(nodeId)) {
        // Return safe default to break the cycle (don't cache to avoid masking issue)
        const node = nodeMap.get(nodeId);
        return {
            height: node?.height || 0,
            topOffset: (node?.height || 0) / 2
        };
    }

    const node = nodeMap.get(nodeId);
    if (!node) {
        const defaultInfo = { height: 0, topOffset: 0 };
        cache.set(nodeId, defaultInfo);
        return defaultInfo;
    }

    // Add current node to visiting stack
    visitedStack.add(nodeId);

    const children = childrenMap.get(nodeId) || [];

    // Leaf node: return own height
    if (children.length === 0) {
        visitedStack.delete(nodeId);
        const info = { height: node.height, topOffset: node.height / 2 };
        cache.set(nodeId, info);
        return info;
    }

    // Calculate total children height
    let childrenTotalHeight = 0;
    const childInfos: SubtreeInfo[] = [];

    children.forEach((childId, index) => {
        const childInfo = calculateSubtreeHeight(childId, nodeMap, childrenMap, cache, visitedStack);
        childInfos.push(childInfo);
        childrenTotalHeight += childInfo.height;

        // Add gap between siblings (not after last child)
        if (index < children.length - 1) {
            childrenTotalHeight += NODE_GAP;
        }
    });

    // Subtree height = max(own height, children total height)
    const subtreeHeight = Math.max(node.height, childrenTotalHeight);

    // Calculate top offset: position where this node's center should be
    // Node should be vertically centered relative to its children
    const topOffset = childrenTotalHeight / 2;

    // Remove from visiting stack before caching and returning
    visitedStack.delete(nodeId);

    const info = { height: subtreeHeight, topOffset };
    cache.set(nodeId, info);

    return info;
};

// Position nodes recursively (Top-Down)
const positionSubtree = (
    nodeId: string,
    x: number,
    yStart: number,
    yEnd: number,
    nodeMap: Map<string, LayoutNode>,
    childrenMap: Map<string, string[]>,
    heightCache: Map<string, SubtreeInfo>,
    positions: Map<string, { x: number; y: number }>,
    direction: 'left' | 'right'
): void => {
    const node = nodeMap.get(nodeId);
    if (!node) return;

    // Position current node at center of allocated space
    const centerY = (yStart + yEnd) / 2;
    positions.set(nodeId, {
        x: direction === 'right' ? x : x - node.width,
        y: centerY - node.height / 2
    });

    const children = childrenMap.get(nodeId) || [];
    if (children.length === 0) return;

    // Calculate next level X position
    const childX = direction === 'right'
        ? x + node.width + LEVEL_GAP
        : x - node.width - LEVEL_GAP;

    // Distribute space to children
    let currentY = yStart;

    children.forEach(childId => {
        const childInfo = heightCache.get(childId);
        if (!childInfo) return;

        const childYStart = currentY;
        const childYEnd = currentY + childInfo.height;

        // Recursively position child subtree
        positionSubtree(
            childId,
            childX,
            childYStart,
            childYEnd,
            nodeMap,
            childrenMap,
            heightCache,
            positions,
            direction
        );

        // Move to next child position
        currentY = childYEnd + NODE_GAP;
    });
};

// Balance children between left and right sides (Greedy algorithm)
const balanceLeftRight = (
    childrenIds: string[],
    heightCache: Map<string, SubtreeInfo>
): { left: string[]; right: string[] } => {
    // Sort children by subtree height (largest first)
    const sorted = [...childrenIds].sort((a, b) => {
        const heightA = heightCache.get(a)?.height || 0;
        const heightB = heightCache.get(b)?.height || 0;
        return heightB - heightA;
    });

    const left: string[] = [];
    const right: string[] = [];
    let leftHeight = 0;
    let rightHeight = 0;

    // Greedy: assign to the side with less total height
    sorted.forEach(childId => {
        const h = heightCache.get(childId)?.height || 0;

        if (leftHeight <= rightHeight) {
            left.push(childId);
            leftHeight += h + NODE_GAP;
        } else {
            right.push(childId);
            rightHeight += h + NODE_GAP;
        }
    });

    return { left, right };
};

// Get all descendants of a node (with cycle protection)
const getDescendants = (
    nodeId: string,
    childrenMap: Map<string, string[]>
): Set<string> => {
    const descendants = new Set<string>();
    const stack = [nodeId];
    const visited = new Set<string>([nodeId]); // Track visited nodes to prevent infinite loop

    while (stack.length > 0) {
        const current = stack.pop()!;
        const children = childrenMap.get(current) || [];

        children.forEach(childId => {
            // Only process if not already visited (prevents infinite loop from cycles)
            if (!visited.has(childId)) {
                descendants.add(childId);
                visited.add(childId);
                stack.push(childId);
            }
        });
    }

    return descendants;
};

// Main layout function
export const applySubtreeLayout = (
    nodes: Node[],
    edges: Edge[]
): { nodes: Node[]; edges: Edge[] } => {
    // Find root node
    const rootNode = nodes.find(n => n.type === 'root');
    if (!rootNode) return { nodes, edges };

    // Build node map with dimensions
    const nodeMap = new Map<string, LayoutNode>();
    nodes.forEach(node => {
        const dims = estimateDimensions(node);
        nodeMap.set(node.id, {
            id: node.id,
            width: dims.width,
            height: dims.height
        });
    });

    // Build children map
    const childrenMap = buildChildrenMap(edges);

    // Get root's direct children
    const rootChildren = childrenMap.get(rootNode.id) || [];

    // Calculate subtree heights for all nodes
    const heightCache = new Map<string, SubtreeInfo>();
    rootChildren.forEach(childId => {
        calculateSubtreeHeight(childId, nodeMap, childrenMap, heightCache);
    });

    // Balance left and right sides
    const { left: leftChildren, right: rightChildren } = balanceLeftRight(rootChildren, heightCache);

    // Get all nodes for each side
    const leftNodeIds = new Set<string>(leftChildren);
    const rightNodeIds = new Set<string>(rightChildren);

    leftChildren.forEach(childId => {
        getDescendants(childId, childrenMap).forEach(id => leftNodeIds.add(id));
    });
    rightChildren.forEach(childId => {
        getDescendants(childId, childrenMap).forEach(id => rightNodeIds.add(id));
    });

    // Calculate total heights for each side
    let leftTotalHeight = 0;
    leftChildren.forEach((childId, index) => {
        leftTotalHeight += heightCache.get(childId)?.height || 0;
        if (index < leftChildren.length - 1) leftTotalHeight += NODE_GAP;
    });

    let rightTotalHeight = 0;
    rightChildren.forEach((childId, index) => {
        rightTotalHeight += heightCache.get(childId)?.height || 0;
        if (index < rightChildren.length - 1) rightTotalHeight += NODE_GAP;
    });

    // Position nodes
    const positions = new Map<string, { x: number; y: number }>();

    // Position root at origin
    const rootDims = nodeMap.get(rootNode.id)!;
    positions.set(rootNode.id, {
        x: -rootDims.width / 2,
        y: -rootDims.height / 2
    });

    // Position right side
    if (rightChildren.length > 0) {
        let currentY = -rightTotalHeight / 2;

        rightChildren.forEach(childId => {
            const childInfo = heightCache.get(childId);
            if (!childInfo) return;

            positionSubtree(
                childId,
                ROOT_OFFSET,
                currentY,
                currentY + childInfo.height,
                nodeMap,
                childrenMap,
                heightCache,
                positions,
                'right'
            );

            currentY += childInfo.height + NODE_GAP;
        });
    }

    // Position left side
    if (leftChildren.length > 0) {
        let currentY = -leftTotalHeight / 2;

        leftChildren.forEach(childId => {
            const childInfo = heightCache.get(childId);
            if (!childInfo) return;

            positionSubtree(
                childId,
                -ROOT_OFFSET,
                currentY,
                currentY + childInfo.height,
                nodeMap,
                childrenMap,
                heightCache,
                positions,
                'left'
            );

            currentY += childInfo.height + NODE_GAP;
        });
    }

    // Apply positions to nodes and add direction data
    const layoutedNodes = nodes.map(node => {
        const pos = positions.get(node.id);
        if (!pos) return node;

        let direction: 'root' | 'left' | 'right' = 'root';
        if (leftNodeIds.has(node.id)) direction = 'left';
        else if (rightNodeIds.has(node.id)) direction = 'right';

        return {
            ...node,
            data: { ...node.data, direction },
            position: pos
        };
    });

    // Update edges with correct handles
    const updatedEdges = edges.map(edge => {
        const targetIsLeft = leftNodeIds.has(edge.target);

        if (targetIsLeft) {
            return {
                ...edge,
                sourceHandle: 'left',
                targetHandle: 'right'
            };
        } else {
            return {
                ...edge,
                sourceHandle: 'right',
                targetHandle: 'left'
            };
        }
    });

    return { nodes: layoutedNodes, edges: updatedEdges };
};

// Utility: Recalculate layout for existing nodes (useful for dynamic updates)
export const recalculateLayout = (
    nodes: Node[],
    edges: Edge[]
): { nodes: Node[]; edges: Edge[] } => {
    return applySubtreeLayout(nodes, edges);
};
