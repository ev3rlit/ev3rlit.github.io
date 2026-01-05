import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';
import { Node, Edge } from 'reactflow';
import dagre from 'dagre';

interface ParsedResult {
    nodes: Node[];
    edges: Edge[];
}

export const parseMdxToGraph = (mdxContent: string): ParsedResult => {
    // 1. Parse Frontmatter
    const { content, data: frontmatter } = matter(mdxContent);

    const processor = unified().use(remarkParse).use(remarkMdx);

    // Safety check for empty content
    if (!content.trim()) {
        return {
            nodes: [{
                id: 'root',
                type: 'root',
                data: { label: frontmatter.title || 'Untitled', depth: 0, frontmatter },
                position: { x: 0, y: 0 }
            }],
            edges: []
        };
    }

    const ast = processor.parse(content);

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Stack to manage hierarchy: 
    // We treat 'Root' as depth 0. H1 as depth 1, H2 as 2, etc.
    // Non-heading elements (lists, components) adopt the parent's depth + 1 effectively for visual hierarchy,
    // but semantically they belong to the current heading.
    const stack: { id: string; headerDepth: number }[] = [];

    // Virtual Root Node
    const rootId = 'root';
    nodes.push({
        id: rootId,
        type: 'root',
        data: {
            label: frontmatter.title || 'Untitled',
            depth: 0,
            frontmatter
        },
        position: { x: 0, y: 0 },
    });
    // Root acts as "H0"
    stack.push({ id: rootId, headerDepth: 0 });

    visit(ast, (node: any) => {
        let nodeId = '';
        let label = '';
        let type = 'default';
        let newHeaderDepth = -1; // Only for headings
        let props: any = {};

        // 1. Headings (Section)
        if (node.type === 'heading') {
            const depth = node.depth;
            nodeId = `heading-${node.position?.start.line}`;
            label = extractText(node);
            type = 'section';
            newHeaderDepth = depth;

            // 2. Components (mdxJsxFlowElement)
        } else if (node.type === 'mdxJsxFlowElement') {
            nodeId = `component-${node.name}-${node.position?.start.line}`;
            label = node.name || 'Anonymous Component';
            type = 'component';

            // Extract Attributes (Props)
            if (node.attributes) {
                node.attributes.forEach((attr: any) => {
                    if (attr.type === 'mdxJsxAttribute') {
                        props[attr.name] = attr.value;
                    }
                });
            }

            // 3. Lists (Optional: Can be too noisy, maybe filter or aggregate?)
            // Let's keep them for now but maybe group them if needed.
        } else if (node.type === 'listItem') {
            // For simplicity, we might skip individual list items if they are too granular
            // checking user constraint "Complex structure to Mindmap". 
            // Individual list items are good for mindmaps.
            nodeId = `list-${node.position?.start.line}`;
            label = extractText(node);
            type = 'list';
        }

        if (nodeId && label) {
            // Determine Parent
            // If it's a heading, it should pop stack until it finds a heading with lower depth (higher rank)
            if (type === 'section') {
                while (stack.length > 1 && stack[stack.length - 1].headerDepth >= newHeaderDepth) {
                    stack.pop();
                }
            }

            // If it's not a heading, it just belongs to the current "active" section (top of stack)
            const parent = stack[stack.length - 1];

            // Create Node
            nodes.push({
                id: nodeId,
                type,
                data: {
                    label,
                    depth: type === 'section' ? newHeaderDepth : parent.headerDepth + 1,
                    props,
                    mdxNode: node
                },
                position: { x: 0, y: 0 }
            });

            // Create Edge
            if (parent) {
                edges.push({
                    id: `e-${parent.id}-${nodeId}`,
                    source: parent.id,
                    target: nodeId,
                    type: 'smoothstep',
                    style: { stroke: '#94a3b8' }
                });
            }

            // Update Stack
            if (type === 'section') {
                stack.push({ id: nodeId, headerDepth: newHeaderDepth });
            }
            // Non-sections can also be parents? 
            // For a Mindmap, usually yes. e.g. List Item -> Sub List Item.
            // But standard Markdown AST structures lists differently (List -> ListItem).
            // Let's keep it simple: Only Sections act as structural parents for now to flatten the graph slightly,
            // UNLESS we want strict nesting.
            // User said: "Complex structure well parsed".
            // Let's stick to Sections as main branches. Components/Lists are leaves of the section.
        }
    });

    return applyLayout(nodes, edges);
};

// ... keep helpers ...
const getAstNodeId = (node: any): string => {
    if (!node || !node.position) return 'unknown';
    return `${node.type}-${node.position.start.line}:${node.position.start.column}`;
};

const extractText = (node: any): string => {
    if (node.value) return node.value;
    if (node.children) {
        return node.children.map(extractText).join('');
    }
    return '';
};

const applyLayout = (nodes: Node[], edges: Edge[]): ParsedResult => {
    const rootNode = nodes.find(n => n.type === 'root');
    if (!rootNode) return { nodes, edges };

    // 1. Identify direct children of Root and maintain original order
    const rootChildrenIds = edges
        .filter(e => e.source === rootNode.id)
        .map(e => e.target);

    // 2. Separate Layout Groups
    const leftNodeIds = new Set<string>();
    const rightNodeIds = new Set<string>();

    // Helper to collect all descendant IDs recursively
    const collectDescendants = (nodeId: string, targetSet: Set<string>) => {
        if (targetSet.has(nodeId)) return;
        targetSet.add(nodeId);
        const children = edges.filter(e => e.source === nodeId).map(e => e.target);
        children.forEach(childId => collectDescendants(childId, targetSet));
    };

    // Distribute Alternately: Right, Left, Right, Left...
    rootChildrenIds.forEach((childId, index) => {
        if (index % 2 === 0) { // Right
            collectDescendants(childId, rightNodeIds);
        } else { // Left
            collectDescendants(childId, leftNodeIds);
        }
    });

    // 3. Run Dagre for each side
    const runDagre = (subsetNodeIds: Set<string>) => {
        const g = new dagre.graphlib.Graph();
        g.setGraph({ rankdir: 'LR', nodesep: 50, ranksep: 100 });
        g.setDefaultEdgeLabel(() => ({}));

        nodes.forEach(node => {
            if (subsetNodeIds.has(node.id)) {
                const width = node.type === 'component' ? 300 : 250;
                const height = node.type === 'component' ? 120 : 60;
                g.setNode(node.id, { width, height });
            }
        });

        edges.forEach(edge => {
            if (subsetNodeIds.has(edge.source) && subsetNodeIds.has(edge.target)) {
                g.setEdge(edge.source, edge.target);
            }
        });

        dagre.layout(g);
        return g;
    };

    const gRight = runDagre(rightNodeIds);
    const gLeft = runDagre(leftNodeIds);

    // Helper: Vertical Alignment
    const getVerticalOffset = (graph: dagre.graphlib.Graph, subsetNodeIds: Set<string>) => {
        const directChildren = rootChildrenIds.filter(id => subsetNodeIds.has(id));
        if (directChildren.length === 0) return 0;

        const avgY = directChildren.reduce((acc, id) => {
            const n = graph.node(id);
            return acc + (n ? n.y : 0);
        }, 0) / directChildren.length;

        return avgY;
    };

    const rightOffsetY = getVerticalOffset(gRight, rightNodeIds);
    const leftOffsetY = getVerticalOffset(gLeft, leftNodeIds);

    // 4. Merge Nodes and Inject Direction
    const layoutedNodes = nodes.map(node => {
        if (node.id === rootNode.id) {
            return {
                ...node,
                data: { ...node.data, direction: 'root' },
                position: { x: 0, y: 0 }
            };
        }

        if (rightNodeIds.has(node.id)) {
            const pos = gRight.node(node.id);
            if (!pos) return node;
            const width = node.type === 'component' ? 300 : 250;
            const height = node.type === 'component' ? 120 : 60;

            return {
                ...node,
                data: { ...node.data, direction: 'right' },
                position: {
                    x: (pos.x + 200) - width / 2, // Center to Top-Left
                    y: (pos.y - rightOffsetY) - height / 2
                }
            };
        }

        if (leftNodeIds.has(node.id)) {
            const pos = gLeft.node(node.id);
            if (!pos) return node;
            const width = node.type === 'component' ? 300 : 250;
            const height = node.type === 'component' ? 120 : 60;

            // Mirror X logic: NewCenter = -OldCenter - 200
            // TopLeft = NewCenter - Width/2
            return {
                ...node,
                data: { ...node.data, direction: 'left' },
                position: {
                    x: (-pos.x - 200) - width / 2,
                    y: (pos.y - leftOffsetY) - height / 2
                }
            };
        }

        return node;
    });

    // 5. Update Edges with Handles
    const updatedEdges = edges.map(edge => {
        const targetIsLeft = leftNodeIds.has(edge.target);

        if (targetIsLeft) {
            // Flow: Right -> Left
            return {
                ...edge,
                sourceHandle: 'left',
                targetHandle: 'right'
            };
        } else {
            // Flow: Left -> Right (Standard)
            return {
                ...edge,
                sourceHandle: 'right',
                targetHandle: 'left'
            };
        }
    });

    return { nodes: layoutedNodes, edges: updatedEdges };
};
