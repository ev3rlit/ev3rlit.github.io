import { Node, Edge, Position } from 'reactflow';
import { runFlextree } from './flextree';
import { measureNode } from './measureNode';

export const applyLayout = (nodes: Node[], edges: Edge[]): { nodes: Node[], edges: Edge[] } => {
    if (nodes.length === 0) return { nodes: [], edges: [] };

    const rootNode = nodes[0];
    if (nodes.length === 1) return { nodes: [{ ...rootNode, position: { x: 0, y: 0 } }], edges: [] };

    // 1. Measure all nodes
    // Use two maps: one for layout (with buffer), one for rendering (original)
    const layoutSizes = new Map<string, { width: number, height: number }>();
    const renderSizes = new Map<string, { width: number, height: number }>();

    nodes.forEach(node => {
        const dims = measureNode(node);
        console.log(`[Layout] Node ${node.id}: ${dims.width}x${dims.height}`);

        // Layout uses buffered size to prevent tight overlaps
        layoutSizes.set(node.id, {
            width: dims.width + 40,
            height: dims.height + 10
        });

        // Rendering uses original measured size
        renderSizes.set(node.id, dims);
    });

    const rootDims = layoutSizes.get(rootNode.id) || { width: 150, height: 50 };

    // 2. Build Hierarchy & Split Trees
    const childrenMap = new Map<string, string[]>();
    edges.forEach(edge => {
        const children = childrenMap.get(edge.source) || [];
        children.push(edge.target);
        childrenMap.set(edge.source, children);
    });

    const rootChildren = childrenMap.get(rootNode.id) || [];
    const leftChildrenIds: string[] = [];
    const rightChildrenIds: string[] = [];

    // Alternating split
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

    const getNodeSize = (d: any) => layoutSizes.get(d.id) || { width: 100, height: 50 };

    const GAP_X = 80;  // Horizontal Level Gap
    const GAP_Y = 20;  // Vertical Sibling Gap

    // Result Map
    const layoutPositions = new Map<string, { x: number, y: number, dir: 'left' | 'right' | 'root' }>();

    // Root Center (Visual Center at 0,0)
    layoutPositions.set(rootNode.id, { x: -rootDims.width / 2, y: -rootDims.height / 2, dir: 'root' });

    // 3. Right Tree Layout using Horizontal Flextree
    if (rightChildrenIds.length > 0) {
        const virtualRightRoot = {
            id: 'virtual-right',
            children: rightChildrenIds.map(buildTreeData)
        };

        // Virtual Root Size = Real Root Size
        const virtualSize = (d: any) => {
            if (d.id === 'virtual-right') return { width: rootDims.width, height: rootDims.height };
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
            const measured = layoutSizes.get(n.id) || { width: 100, height: 50 };

            // Output from Algo:
            // n.x = Absolute X position (Left edge)
            // n.y = Relative Y position (Center-aligned?) 
            // -> Our implementation calculates Y based on 'prelim'.
            // -> 'prelim' centers parent relative to children.
            // -> So n.y is the Center Y of the node.

            // X Adjustment:
            // Algo treats Virtual Root's X as 0. 
            // Children start at 0 + RootWidth + Gap.
            // But we want offsets relative to Root Center.
            // Root Right Edge is at +rootDims.width/2.
            // Child Left Edge should be at +rootDims.width/2 + Gap.

            // Algo Output for Child X = RootWidth + Gap.
            // So: Algo X - RootWidth/2 = (RootWidth + Gap) - RootWidth/2 = RootWidth/2 + Gap.
            // Exactly what we want!

            const posX = n.x - rootDims.width / 2;
            const posY = n.y - measured.height / 2; // Center aligns so top-left Y is center - h/2

            layoutPositions.set(n.id, { x: posX, y: posY, dir: 'right' });
        });
    }

    // 4. Left Tree Layout using Horizontal Flextree
    if (leftChildrenIds.length > 0) {
        const virtualLeftRoot = {
            id: 'virtual-left',
            children: leftChildrenIds.map(buildTreeData)
        };

        const virtualSize = (d: any) => {
            if (d.id === 'virtual-left') return { width: rootDims.width, height: rootDims.height };
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
            const measured = layoutSizes.get(n.id) || { width: 100, height: 50 };

            // Left Tree: Mirrored X
            // Algo n.x is positive distance to the right.
            // We want negative.

            // Right Child X = n.x - RootWidth/2
            // Left Child X should be symmetric.
            // Left Child Right Edge = -(RootWidth/2 + Gap).

            // Algo n.x = RootWidth + Gap.
            // So -(n.x - RootWidth/2) = -(RootWidth + Gap - RootWidth/2) = -(RootWidth/2 + Gap). 
            // This is the Right Edge position.

            // Child Left X (Top-Left) = Right Edge - ChildWidth
            // = -(n.x - RootWidth/2) - ChildWidth.

            const posX = -(n.x - rootDims.width / 2) - measured.width;
            const posY = n.y - measured.height / 2;

            layoutPositions.set(n.id, { x: posX, y: posY, dir: 'left' });
        });
    }

    // 5. Update Nodes
    const finalNodes = nodes.map(node => {
        const layout = layoutPositions.get(node.id);
        const measured = renderSizes.get(node.id); // Use original size for rendering

        if (!layout) return node;

        const isRoot = layout.dir === 'root';
        const isLeft = layout.dir === 'left';

        if (isRoot) {
            return {
                ...node,
                position: { x: layout.x, y: layout.y },
                // Don't force width/height - let CSS w-fit handle it
                sourcePosition: undefined, targetPosition: undefined,
            };
        }

        return {
            ...node,
            position: { x: layout.x, y: layout.y },
            // Don't force width/height - CSS w-fit will size to content
            sourcePosition: isLeft ? Position.Left : Position.Right,
            targetPosition: isLeft ? Position.Right : Position.Left,
            data: { ...node.data, layoutDirection: layout.dir }
        };
    });

    // 6. Update Edges
    const finalEdges = edges.map(edge => {
        const sourcePos = layoutPositions.get(edge.source);
        const targetPos = layoutPositions.get(edge.target);

        if (!sourcePos || !targetPos) return edge;

        let sourceHandle = 'right';
        let targetHandle = 'left';

        if (sourcePos.dir === 'root') sourceHandle = targetPos.dir === 'left' ? 'left' : 'right';
        else sourceHandle = sourcePos.dir;

        targetHandle = targetPos.dir === 'left' ? 'right' : 'left';

        return { ...edge, sourceHandle, targetHandle };
    });

    return { nodes: finalNodes, edges: finalEdges };
};
