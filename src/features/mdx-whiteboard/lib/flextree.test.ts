import { describe, it, expect } from 'vitest';
import { runFlextree } from './flextree';

describe('runFlextree (Horizontal Layout)', () => {
    it('should place single child to the right of parent', () => {
        const tree = {
            id: 'root',
            children: [{ id: 'child1', children: [] }]
        };

        const result = runFlextree(
            tree,
            (d) => d.children,
            (d) => {
                if (d.id === 'root') return { w: 100, h: 50 };
                return { w: 80, h: 40 };
            },
            50, // gapX
            20  // gapY
        );

        const nodes = result.nodes;
        const root = nodes.find(n => n.id === 'root');
        const child1 = nodes.find(n => n.id === 'child1');

        expect(root).toBeDefined();
        expect(child1).toBeDefined();

        // Root is at x=0
        expect(root!.x).toBe(0);

        // Child should be to the right: root.width + gapX = 100 + 50 = 150
        expect(child1!.x).toBe(150);
    });

    it('should stack siblings vertically without overlap', () => {
        const tree = {
            id: 'root',
            children: [
                { id: 'child1', children: [] },
                { id: 'child2', children: [] },
                { id: 'child3', children: [] }
            ]
        };

        const result = runFlextree(
            tree,
            (d) => d.children,
            (d) => {
                if (d.id === 'root') return { w: 100, h: 50 };
                return { w: 80, h: 40 }; // All same size
            },
            50, // gapX
            20  // gapY
        );

        const nodes = result.nodes;
        const children = nodes.filter(n => n.id.startsWith('child'));

        expect(children).toHaveLength(3);

        // Check they don't overlap vertically
        children.sort((a, b) => a.y - b.y);

        for (let i = 1; i < children.length; i++) {
            const prev = children[i - 1];
            const curr = children[i];
            // prev bottom edge should be less than curr top edge
            // Assuming y is center, prev bottom = prev.y + prev.height/2
            const prevBottom = prev.y + prev.height / 2;
            const currTop = curr.y - curr.height / 2;
            expect(prevBottom).toBeLessThanOrEqual(currTop);
        }
    });

    it('should handle variable node heights without overlap', () => {
        const tree = {
            id: 'root',
            children: [
                { id: 'tall', children: [] },
                { id: 'short', children: [] }
            ]
        };

        const result = runFlextree(
            tree,
            (d) => d.children,
            (d) => {
                if (d.id === 'tall') return { w: 80, h: 120 }; // Tall node
                if (d.id === 'short') return { w: 80, h: 30 }; // Short node
                return { w: 100, h: 50 };
            },
            50,
            20
        );

        const nodes = result.nodes;
        const tall = nodes.find(n => n.id === 'tall');
        const short = nodes.find(n => n.id === 'short');

        expect(tall).toBeDefined();
        expect(short).toBeDefined();

        // Check no vertical overlap
        const tallBottom = tall!.y + tall!.height / 2;
        const shortTop = short!.y - short!.height / 2;

        // Tall should be above short (or vice versa) with gap
        // Since spacing is 20, the gap should be at least 20
        const distance = Math.abs(shortTop - tallBottom);
        expect(distance).toBeGreaterThanOrEqual(20);
    });

    it('should NOT overlap when sibling has deep subtree (CRITICAL TEST)', () => {
        // This is the case that causes problems:
        // - Sibling A has a deep subtree extending downward
        // - Sibling B is a leaf
        // - B's Y position might overlap with A's deep children

        const tree = {
            id: 'root',
            children: [
                {
                    id: 'siblingA',
                    children: [
                        { id: 'A-child1', children: [] },
                        { id: 'A-child2', children: [] },
                        { id: 'A-child3', children: [] },
                        { id: 'A-child4', children: [] },
                        { id: 'A-child5', children: [] },
                    ]
                },
                { id: 'siblingB', children: [] }
            ]
        };

        const result = runFlextree(
            tree,
            (d) => d.children,
            (d) => ({ w: 100, h: 40 }), // All same size
            50, // gapX
            20  // gapY
        );

        const nodes = result.nodes;
        const siblingA = nodes.find(n => n.id === 'siblingA')!;
        const siblingB = nodes.find(n => n.id === 'siblingB')!;
        const aChildren = nodes.filter(n => n.id.startsWith('A-child'));

        console.log('[TEST] siblingA y:', siblingA.y);
        console.log('[TEST] siblingB y:', siblingB.y);
        aChildren.forEach(c => console.log(`[TEST] ${c.id} y:`, c.y));

        // Find the bottommost A child
        const aBottomChild = aChildren.reduce((max, c) => c.y > max.y ? c : max, aChildren[0]);
        const aBottomEdge = aBottomChild.y + aBottomChild.height / 2;

        // siblingB should NOT overlap with A's bottommost child
        const siblingBTop = siblingB.y - siblingB.height / 2;

        console.log('[TEST] A bottom edge:', aBottomEdge);
        console.log('[TEST] B top edge:', siblingBTop);
        console.log('[TEST] Gap:', siblingBTop - aBottomEdge);

        // siblingB's top should be below A's bottom child's bottom edge + gap
        expect(siblingBTop).toBeGreaterThanOrEqual(aBottomEdge + 20);
    });

    it('should center parent relative to children (Y-axis)', () => {
        const tree = {
            id: 'root',
            children: [
                { id: 'child1', children: [] },
                { id: 'child2', children: [] }
            ]
        };

        const result = runFlextree(
            tree,
            (d) => d.children,
            (d) => ({ w: 100, h: 50 }), // All same size
            50,
            20
        );

        const nodes = result.nodes;
        const root = nodes.find(n => n.id === 'root');
        const child1 = nodes.find(n => n.id === 'child1');
        const child2 = nodes.find(n => n.id === 'child2');

        expect(root).toBeDefined();
        expect(child1).toBeDefined();
        expect(child2).toBeDefined();

        // Root Y should be average of children Y (centered)
        const childrenCenterY = (child1!.y + child2!.y) / 2;
        expect(root!.y).toBeCloseTo(childrenCenterY, 1);
    });
});
