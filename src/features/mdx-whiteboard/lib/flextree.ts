/**
 * Simple Recursive Tree Layout Algorithm (Horizontal Mindmap)
 * 
 * This algorithm uses a clean bottom-up + top-down approach:
 * 1. Bottom-up: Calculate subtreeHeight for each node
 * 2. Top-down: Assign Y coordinates with center alignment
 * 
 * Key properties:
 * - 100% overlap-free guarantee
 * - Perfect vertical centering of parents relative to children
 * - Simple and predictable behavior
 */

interface LayoutNode {
    id: string;
    width: number;
    height: number;
    x: number;
    y: number;
    subtreeHeight: number; // Total height of this node's subtree
    children: LayoutNode[];
}

export const runFlextree = (
    rootData: any,
    getChildren: (d: any) => any[],
    getSize: (d: any) => { w: number, h: number },
    gapX: number = 50, // Horizontal Gap (between Levels)
    gapY: number = 20  // Vertical Gap (between Siblings)
): { nodes: any[], width: number, height: number } => {

    // 1. Build Layout Tree
    const buildTree = (data: any): LayoutNode => {
        const size = getSize(data);
        const node: LayoutNode = {
            id: data.id,
            width: size.w,
            height: size.h,
            x: 0,
            y: 0,
            subtreeHeight: 0,
            children: []
        };
        const children = getChildren(data) || [];
        node.children = children.map(c => buildTree(c));
        return node;
    };

    const root = buildTree(rootData);

    // 2. Bottom-up: Calculate subtreeHeight for each node
    calculateSubtreeHeights(root, gapY);

    // 3. Top-down: Assign Y coordinates (centered)
    assignYCoordinates(root, 0, gapY);

    // 4. Assign X coordinates (depth-based)
    assignXCoordinates(root, 0, gapX);

    // 5. Flatten and Return
    const nodes: any[] = [];
    const flatten = (node: LayoutNode) => {
        nodes.push({
            id: node.id,
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height
        });
        node.children.forEach(flatten);
    };
    flatten(root);

    return { nodes, width: 0, height: 0 };
};

/**
 * Bottom-up: Calculate the total height of each subtree.
 * Leaf nodes have subtreeHeight = their own height.
 * Parent nodes have subtreeHeight = sum of children's subtreeHeights + gaps,
 * or their own height if larger (shouldn't happen typically).
 */
const calculateSubtreeHeights = (node: LayoutNode, gapY: number) => {
    if (node.children.length === 0) {
        // Leaf node
        node.subtreeHeight = node.height;
    } else {
        // Recurse first
        node.children.forEach(child => calculateSubtreeHeights(child, gapY));

        // Sum children's subtree heights + gaps between them
        let totalChildrenHeight = 0;
        node.children.forEach((child, i) => {
            totalChildrenHeight += child.subtreeHeight;
            if (i < node.children.length - 1) {
                totalChildrenHeight += gapY; // Gap between siblings
            }
        });

        // Subtree height is the larger of: node's own height or children's total
        node.subtreeHeight = Math.max(node.height, totalChildrenHeight);
    }
};

/**
 * Top-down: Assign Y coordinates.
 * - centerY is the center of the allocated vertical space for this node.
 * - Children are stacked vertically, centered around the node's center.
 */
const assignYCoordinates = (node: LayoutNode, centerY: number, gapY: number) => {
    // This node's Y is at the center of its allocated space
    node.y = centerY;

    if (node.children.length === 0) {
        return;
    }

    // Calculate total height needed for children
    let totalChildrenHeight = 0;
    node.children.forEach((child, i) => {
        totalChildrenHeight += child.subtreeHeight;
        if (i < node.children.length - 1) {
            totalChildrenHeight += gapY;
        }
    });

    // Start position: center - half of total height
    let currentY = centerY - totalChildrenHeight / 2;

    // Place each child
    node.children.forEach((child, i) => {
        // Child's center is at currentY + child.subtreeHeight / 2
        const childCenterY = currentY + child.subtreeHeight / 2;
        assignYCoordinates(child, childCenterY, gapY);

        // Move to next child's starting position
        currentY += child.subtreeHeight;
        if (i < node.children.length - 1) {
            currentY += gapY;
        }
    });
};

/**
 * Assign X coordinates based on depth.
 * Each level is offset by the parent's width + gapX.
 */
const assignXCoordinates = (node: LayoutNode, depth: number, gapX: number) => {
    node.x = depth;

    node.children.forEach(child => {
        // Child starts after parent's right edge + gap
        assignXCoordinates(child, depth + node.width + gapX, gapX);
    });
};
