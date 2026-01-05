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
    const ast = processor.parse(content);

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Stack to keep track of parent nodes based on depth
    const stack: { id: string; depth: number; astParentId?: string }[] = [];

    // Virtual Root Node from Frontmatter
    const rootId = 'root';
    nodes.push({
        id: rootId,
        type: 'root', // New type
        data: {
            label: frontmatter.title || 'Untitled Whiteboard',
            depth: 0,
            frontmatter // Pass full metadata
        },
        position: { x: 0, y: 0 },
    });
    stack.push({ id: rootId, depth: 0 });

    visit(ast, (node: any, index: any, parent: any) => {
        let nodeId = '';
        let label = '';
        let depth = -1;
        let type = 'default';

        // Robustly identify the AST parent
        const currentParentId = parent ? getAstNodeId(parent) : undefined;

        if (node.type === 'heading') {
            depth = node.depth;
            nodeId = `heading-${node.position?.start.line}-${node.position?.start.column}`;
            label = node.children.map((c: any) => c.value).join('');
            type = 'section';
        } else if (node.type === 'listItem') {
            nodeId = `list-${node.position?.start.line}-${node.position?.start.column}`;
            // Extract text from listItem children
            label = extractText(node);
            type = 'list';

            // Check for siblings in stack to determine depth/parent
            // If we find an item in the stack that shares the same AST parent ID,
            // it means we are a sibling of that item.
            if (currentParentId) {
                const siblingIndex = stack.findIndex(item => item.astParentId === currentParentId);

                if (siblingIndex !== -1) {
                    // Found a sibling (item in the same list)
                    // Pop everything after and including the sibling
                    // This effectively moves "up" to the sibling's level
                    while (stack.length > siblingIndex) {
                        stack.pop();
                    }
                }
            }
        } else if (node.type === 'mdxJsxFlowElement') {
            // Keep component logic simple for now, can be improved similarly
            const lastParent = stack[stack.length - 1];
            depth = lastParent.depth + 1;
            nodeId = `component-${node.name}-${node.position?.start.line}`;
            label = node.name;
            type = 'component';
        }

        if (nodeId) {
            // If depth wasn't set by sibling logic (i.e. it's a heading or new list level)
            // Calculate depth if not already set (Headings set it explicitly)

            if (depth === -1) {
                const lastParent = stack[stack.length - 1];
                depth = lastParent.depth + 1;
            }

            // Standard hierarchy check for Headings
            // (List items mostly handled by sibling check, but this acts as fallback)
            if (type === 'section') {
                while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
                    stack.pop();
                }
            }

            const parentNode = stack[stack.length - 1];

            nodes.push({
                id: nodeId,
                type,
                data: {
                    label,
                    depth,
                    // Store original node for prop editing later
                    mdxNode: type === 'component' ? node : undefined
                },
                position: { x: 0, y: 0 },
            });

            if (parentNode) {
                edges.push({
                    id: `e-${parentNode.id}-${nodeId}`,
                    source: parentNode.id,
                    target: nodeId,
                    type: 'smoothstep',
                });
            }

            if (type !== 'component') {
                stack.push({ id: nodeId, depth, astParentId: currentParentId });
            }
        }
    });

    return applyLayout(nodes, edges);
};

// Helper: Generate a unique ID for an AST node based on position
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
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'LR', nodesep: 50, ranksep: 100 });
    g.setDefaultEdgeLabel(() => ({}));

    nodes.forEach((node) => {
        g.setNode(node.id, { width: 250, height: 100 });
    });

    edges.forEach((edge) => {
        g.setEdge(edge.source, edge.target);
    });

    dagre.layout(g);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = g.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - 125,
                y: nodeWithPosition.y - 50,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};
