import { describe, it, expect, vi } from 'vitest';
import { applyLayout } from './layoutEngine';
import { Node, Edge } from 'reactflow';

// Mock measureNode to return predictable values
vi.mock('./measureNode', () => ({
    measureNode: (node: any) => {
        // Return different sizes based on node type or id for testing
        if (node.id === 'root') return { width: 150, height: 60 };
        if (node.id.includes('large')) return { width: 200, height: 80 };
        if (node.id.includes('small')) return { width: 100, height: 30 };
        return { width: 120, height: 40 }; // Default
    }
}));

describe('applyLayout', () => {
    it('should return empty arrays for empty input', () => {
        const result = applyLayout([], []);
        expect(result.nodes).toHaveLength(0);
        expect(result.edges).toHaveLength(0);
    });

    it('should center single node at origin', () => {
        const nodes: Node[] = [{
            id: 'root',
            type: 'root',
            data: { label: 'Root' },
            position: { x: 0, y: 0 }
        }];

        const result = applyLayout(nodes, []);
        expect(result.nodes).toHaveLength(1);
        expect(result.nodes[0].position.x).toBe(0);
        expect(result.nodes[0].position.y).toBe(0);
    });

    it('should split children between left and right trees', () => {
        const nodes: Node[] = [
            { id: 'root', type: 'root', data: { label: 'Root' }, position: { x: 0, y: 0 } },
            { id: 'child1', type: 'list', data: { label: 'C1' }, position: { x: 0, y: 0 } },
            { id: 'child2', type: 'list', data: { label: 'C2' }, position: { x: 0, y: 0 } },
            { id: 'child3', type: 'list', data: { label: 'C3' }, position: { x: 0, y: 0 } },
            { id: 'child4', type: 'list', data: { label: 'C4' }, position: { x: 0, y: 0 } },
        ];

        const edges: Edge[] = [
            { id: 'e1', source: 'root', target: 'child1' },
            { id: 'e2', source: 'root', target: 'child2' },
            { id: 'e3', source: 'root', target: 'child3' },
            { id: 'e4', source: 'root', target: 'child4' },
        ];

        const result = applyLayout(nodes, edges);

        // Find positioned children
        const positionedChildren = result.nodes.filter(n => n.id !== 'root');

        // Check that some are on left (x < 0) and some on right (x > 0)
        const leftChildren = positionedChildren.filter(n => n.position.x < 0);
        const rightChildren = positionedChildren.filter(n => n.position.x > 0);

        expect(leftChildren.length).toBeGreaterThan(0);
        expect(rightChildren.length).toBeGreaterThan(0);
    });

    it('should not have overlapping nodes', () => {
        const nodes: Node[] = [
            { id: 'root', type: 'root', data: { label: 'Root' }, position: { x: 0, y: 0 } },
            { id: 'child1', type: 'list', data: { label: 'C1' }, position: { x: 0, y: 0 } },
            { id: 'child2', type: 'list', data: { label: 'C2' }, position: { x: 0, y: 0 } },
            { id: 'child3', type: 'list', data: { label: 'C3' }, position: { x: 0, y: 0 } },
        ];

        const edges: Edge[] = [
            { id: 'e1', source: 'root', target: 'child1' },
            { id: 'e2', source: 'root', target: 'child2' },
            { id: 'e3', source: 'root', target: 'child3' },
        ];

        const result = applyLayout(nodes, edges);

        // Check for overlaps using bounding box intersection
        const checkOverlap = (a: Node, b: Node): boolean => {
            const aWidth = (a.style?.width as number) || 100;
            const aHeight = (a.style?.height as number) || 50;
            const bWidth = (b.style?.width as number) || 100;
            const bHeight = (b.style?.height as number) || 50;

            const aLeft = a.position.x;
            const aRight = a.position.x + aWidth;
            const aTop = a.position.y;
            const aBottom = a.position.y + aHeight;

            const bLeft = b.position.x;
            const bRight = b.position.x + bWidth;
            const bTop = b.position.y;
            const bBottom = b.position.y + bHeight;

            // Check if boxes overlap
            return !(aRight <= bLeft || bRight <= aLeft || aBottom <= bTop || bBottom <= aTop);
        };

        const layoutedNodes = result.nodes;

        for (let i = 0; i < layoutedNodes.length; i++) {
            for (let j = i + 1; j < layoutedNodes.length; j++) {
                const overlap = checkOverlap(layoutedNodes[i], layoutedNodes[j]);
                if (overlap) {
                    console.error(`Overlap detected between ${layoutedNodes[i].id} and ${layoutedNodes[j].id}`);
                    console.error(`  ${layoutedNodes[i].id}: pos=(${layoutedNodes[i].position.x}, ${layoutedNodes[i].position.y}), size=${layoutedNodes[i].style?.width}x${layoutedNodes[i].style?.height}`);
                    console.error(`  ${layoutedNodes[j].id}: pos=(${layoutedNodes[j].position.x}, ${layoutedNodes[j].position.y}), size=${layoutedNodes[j].style?.width}x${layoutedNodes[j].style?.height}`);
                }
                expect(overlap).toBe(false);
            }
        }
    });

    it('should set correct edge handles based on direction', () => {
        const nodes: Node[] = [
            { id: 'root', type: 'root', data: { label: 'Root' }, position: { x: 0, y: 0 } },
            { id: 'child1', type: 'list', data: { label: 'C1' }, position: { x: 0, y: 0 } },
            { id: 'child2', type: 'list', data: { label: 'C2' }, position: { x: 0, y: 0 } },
        ];

        const edges: Edge[] = [
            { id: 'e1', source: 'root', target: 'child1' },
            { id: 'e2', source: 'root', target: 'child2' },
        ];

        const result = applyLayout(nodes, edges);

        result.edges.forEach(edge => {
            expect(edge.sourceHandle).toBeDefined();
            expect(edge.targetHandle).toBeDefined();
            expect(['left', 'right']).toContain(edge.sourceHandle);
            expect(['left', 'right']).toContain(edge.targetHandle);
        });
    });

    it('should handle deeply nested trees', () => {
        const nodes: Node[] = [
            { id: 'root', type: 'root', data: { label: 'Root' }, position: { x: 0, y: 0 } },
            { id: 'level1', type: 'section', data: { label: 'L1' }, position: { x: 0, y: 0 } },
            { id: 'level2', type: 'section', data: { label: 'L2' }, position: { x: 0, y: 0 } },
            { id: 'level3', type: 'list', data: { label: 'L3' }, position: { x: 0, y: 0 } },
        ];

        const edges: Edge[] = [
            { id: 'e1', source: 'root', target: 'level1' },
            { id: 'e2', source: 'level1', target: 'level2' },
            { id: 'e3', source: 'level2', target: 'level3' },
        ];

        const result = applyLayout(nodes, edges);

        // Check that X position increases with depth (for right tree)
        const root = result.nodes.find(n => n.id === 'root')!;
        const l1 = result.nodes.find(n => n.id === 'level1')!;
        const l2 = result.nodes.find(n => n.id === 'level2')!;
        const l3 = result.nodes.find(n => n.id === 'level3')!;

        // Assuming all go to right tree (index 0 -> right)
        // Each level should be further right
        expect(l1.position.x).toBeGreaterThan(root.position.x);
        expect(l2.position.x).toBeGreaterThan(l1.position.x);
        expect(l3.position.x).toBeGreaterThan(l2.position.x);
    });
});
