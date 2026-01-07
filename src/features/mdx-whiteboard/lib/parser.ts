import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { Node, Edge } from 'reactflow';
import dagre from 'dagre';

interface ParsedResult {
    nodes: Node[];
    edges: Edge[];
}

export const parseMdxToGraph = (mdxContent: string, options?: { title?: string }): ParsedResult | null => {
    // 1. Parse Frontmatter
    let content = "";
    let frontmatter: any = {};

    try {
        const parsed = matter(mdxContent);
        content = parsed.content;
        frontmatter = parsed.data;
    } catch (e) {
        // Fallback if matter fails (rare)
        content = mdxContent;
    }

    // Use provided title or fallback to frontmatter.title
    const rootTitle = options?.title || frontmatter.title || 'Untitled';

    const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMdx);

    // Safety check for empty content
    if (!content.trim()) {
        return {
            nodes: [{
                id: 'root',
                type: 'root',
                data: { label: rootTitle, depth: 0, frontmatter },
                position: { x: 0, y: 0 }
            }],
            edges: []
        };
    }

    let ast: any;
    try {
        ast = processor.parse(content);
    } catch (error) {
        // console.warn("MDX Parse Error (incomplete syntax?):", error);
        return null;
    }

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
            label: rootTitle,
            depth: 0,
            frontmatter
        },
        position: { x: 0, y: 0 },
    });
    // Root acts as "H0"
    stack.push({ id: rootId, headerDepth: 0 });

    // 4. Recursive Traversal
    // Returns the ID of the node created/processed, to be used for state tracking
    const traverse = (node: any, lexicalParentId: string): string | null => {
        let currentId = lexicalParentId;

        let type = 'default';
        let nodeId = '';
        let label = '';
        let props: any = {};
        let createdNodeId: string | null = null;

        // --- NODE IDENTIFICATION ---
        if (node.type === 'heading') {
            const depth = node.depth;
            nodeId = `heading-${node.position?.start.line}`;
            label = extractCurrentNodeText(node);
            type = 'section';

            // Stack Management for Headings
            while (stack.length > 1 && stack[stack.length - 1].headerDepth >= depth) {
                stack.pop();
            }
            const stackParent = stack[stack.length - 1];

            nodes.push({
                id: nodeId,
                type,
                data: { label, depth, props, mdxNode: node },
                position: { x: 0, y: 0 }
            });

            edges.push({
                id: `e-${stackParent.id}-${nodeId}`,
                source: stackParent.id,
                target: nodeId,
                type: 'smoothstep',
                style: { stroke: '#94a3b8' }
            });

            stack.push({ id: nodeId, headerDepth: depth });

            // Headings change the global context for subsequent flat siblings (until next heading)
            // But for children *inside* this AST node (rare), they belong to this heading.
            createdNodeId = nodeId;
            currentId = nodeId;

        } else if (node.type === 'listItem') {
            nodeId = `list-${node.position?.start.line}`;

            // Intelligent Label Extraction:
            // ListItems usually contain a Paragraph as the first child. 
            // We want to "hoist" that text to be the ListItem's label and avoid creating a separate Paragraph node.
            const firstParagraph = node.children?.find((c: any) => c.type === 'paragraph');

            if (firstParagraph) {
                label = extractCurrentNodeText(firstParagraph);
            } else {
                label = extractCurrentNodeText(node);
            }

            type = 'list';

            nodes.push({
                id: nodeId,
                type,
                data: { label, depth: 0, props, mdxNode: node },
                position: { x: 0, y: 0 }
            });

            edges.push({
                id: `e-${lexicalParentId}-${nodeId}`,
                source: lexicalParentId,
                target: nodeId,
                type: 'smoothstep',
                style: { stroke: '#94a3b8' }
            });

            createdNodeId = nodeId;
            currentId = nodeId;

            // Recurse: Exclude the hoisted paragraph from children processing
            if (node.children) {
                const childrenToProcess = firstParagraph
                    ? node.children.filter((c: any) => c !== firstParagraph)
                    : node.children;
                processChildren(childrenToProcess, currentId);

                // We return immediately because we handled children manually here
                return createdNodeId;
            }

        } else if (node.type === 'mdxJsxFlowElement') {
            const tagName = node.name || 'Anonymous Component';
            nodeId = `component-${tagName}-${node.position?.start.line}`;
            label = tagName;

            // Determine Node Type based on Tag Name
            if (['Chart', 'LineChart', 'BarChart', 'AreaChart'].includes(tagName)) {
                type = 'chart';
            } else if (['Math', 'Equation', 'Formula'].includes(tagName)) {
                type = 'math';
            } else if (['Stats', 'Metric', 'KPI'].includes(tagName)) {
                type = 'stats';
            } else {
                type = 'component';
            }

            if (node.attributes) {
                node.attributes.forEach((attr: any) => {
                    if (attr.type === 'mdxJsxAttribute') {
                        if (typeof attr.value === 'string') {
                            // String value: type="line"
                            props[attr.name] = attr.value;
                        } else if (attr.value && typeof attr.value === 'object' && attr.value.value) {
                            // Expression value: data={[...]} -> extract the expression string
                            props[attr.name] = attr.value.value;
                        } else if (attr.value === null || attr.value === undefined) {
                            // Boolean attribute: disabled
                            props[attr.name] = true;
                        } else {
                            props[attr.name] = attr.value;
                        }
                    }
                });
            }

            nodes.push({
                id: nodeId,
                type,
                data: { label, depth: 0, props, mdxNode: node },
                position: { x: 0, y: 0 }
            });

            edges.push({
                id: `e-${lexicalParentId}-${nodeId}`,
                source: lexicalParentId,
                target: nodeId,
                type: 'smoothstep',
                style: { stroke: '#94a3b8' }
            });

            createdNodeId = nodeId;
            currentId = nodeId;

        } else if (node.type === 'table') {
            nodeId = `table-${node.position?.start.line}`;
            type = 'table';

            // Extract table data: headers and rows
            const tableData = extractTableData(node);
            label = 'Table';

            nodes.push({
                id: nodeId,
                type,
                data: { label, depth: 0, props, mdxNode: node, tableData },
                position: { x: 0, y: 0 }
            });

            edges.push({
                id: `e-${lexicalParentId}-${nodeId}`,
                source: lexicalParentId,
                target: nodeId,
                type: 'smoothstep',
                style: { stroke: '#94a3b8' }
            });

            createdNodeId = nodeId;
            // Tables don't have meaningful children to traverse for graph nodes
            return createdNodeId;

        } else if (node.type === 'code') {
            // Fenced code block: ```lang ... ```
            nodeId = `code-${node.position?.start.line}`;
            type = 'code';

            const lang = node.lang || 'text';
            const codeValue = node.value || '';
            label = lang;

            nodes.push({
                id: nodeId,
                type,
                data: {
                    label,
                    depth: 0,
                    props,
                    mdxNode: node,
                    codeData: { lang, value: codeValue }
                },
                position: { x: 0, y: 0 }
            });

            edges.push({
                id: `e-${lexicalParentId}-${nodeId}`,
                source: lexicalParentId,
                target: nodeId,
                type: 'smoothstep',
                style: { stroke: '#94a3b8' }
            });

            createdNodeId = nodeId;
            return createdNodeId;

        } else if (node.type === 'blockquote') {
            // Blockquote
            nodeId = `blockquote-${node.position?.start.line}`;
            type = 'blockquote';

            // Extract text from blockquote children (usually paragraphs)
            const quoteText = node.children?.map((child: any) => extractCurrentNodeText(child)).join(' ').trim() || '';
            label = quoteText;

            nodes.push({
                id: nodeId,
                type,
                data: { label, depth: 0, props, mdxNode: node },
                position: { x: 0, y: 0 }
            });

            edges.push({
                id: `e-${lexicalParentId}-${nodeId}`,
                source: lexicalParentId,
                target: nodeId,
                type: 'smoothstep',
                style: { stroke: '#94a3b8' }
            });

            createdNodeId = nodeId;
            return createdNodeId;

        } else if (node.type === 'paragraph') {
            const text = extractCurrentNodeText(node);
            if (text && text.trim()) {
                nodeId = `text-${node.position?.start.line}`;
                label = text;
                type = 'list'; // Visual style

                nodes.push({
                    id: nodeId,
                    type,
                    data: { label, depth: 0, props, mdxNode: node },
                    position: { x: 0, y: 0 }
                });

                edges.push({
                    id: `e-${lexicalParentId}-${nodeId}`,
                    source: lexicalParentId,
                    target: nodeId,
                    type: 'smoothstep',
                    style: { stroke: '#94a3b8' }
                });

                createdNodeId = nodeId;
            }
        }

        // --- RECURSION ---
        if (node.children) {
            processChildren(node.children, currentId);
        }

        return createdNodeId;
    };

    // Helper: Iterate children with state to track "Paragraph -> List" adjacency
    const processChildren = (children: any[], defaultParentId: string) => {
        let siblingParagraphId: string | null = null;

        children.forEach((child: any) => {
            // Determine the effective parent for this child
            let effectiveParentId = defaultParentId;

            // Rule: If this is a List, and the immediate previous sibling was a Paragraph, 
            // use that Paragraph as the parent.
            if (child.type === 'list' && siblingParagraphId) {
                effectiveParentId = siblingParagraphId;
            }

            // Execute traversal
            const resultId = traverse(child, effectiveParentId);

            // Update State for NEXT sibling
            if (child.type === 'paragraph' && resultId) {
                // If we just processed a valid paragraph, it becomes the potential parent for the next list
                siblingParagraphId = resultId;
            } else if (child.type === 'list') {
                // If we just processed a list, we usually reset. 
                // (A list doesn't act as a parent for a subsequent list in this logic)
                siblingParagraphId = null;
            } else {
                // Headings, Components, etc. break the flow
                siblingParagraphId = null;
            }
        });
    };

    // Start Traversal from Root Context
    if (ast.children) {
        // We use the same processChildren logic for the top level, 
        // but we need to handle the dynamic 'Section Stack' parent for top-level nodes.
        // However, processChildren takes a static 'defaultParentId'.
        // This is tricky because 'heading' children update the stack, but 'paragraph' children need the stack.

        // Custom loop for Root to handle the Stack + Adjacency mixed logic
        let rootSiblingParagraphId: string | null = null;

        ast.children.forEach((child: any) => {
            // 1. Determine base parent from Stack (Section)
            const currentSection = stack[stack.length - 1];
            let effectiveParentId = currentSection.id;

            // 2. Apply Adjacency Rule (Paragraph -> List)
            if (child.type === 'list' && rootSiblingParagraphId) {
                effectiveParentId = rootSiblingParagraphId;
            }

            // 3. Traverse
            const resultId = traverse(child, effectiveParentId);

            // 4. Update Adjacency State
            if (child.type === 'paragraph' && resultId) {
                rootSiblingParagraphId = resultId;
            } else if (child.type === 'list') {
                rootSiblingParagraphId = null;
            } else {
                // Headings or others break the flow
                rootSiblingParagraphId = null;
            }
        });
    }

    return applyLayout(nodes, edges);
};

// ... keep helpers ...
const getAstNodeId = (node: any): string => {
    if (!node || !node.position) return 'unknown';
    return `${node.type}-${node.position.start.line}:${node.position.start.column}`;
};

// Shallow text extraction: Only gets text from the current block's direct inline children.
// Does NOT dive into other blocks like Lists, Blockquotes, etc.
const extractCurrentNodeText = (node: any): string => {
    if (node.type === 'text' || node.type === 'inlineCode') return node.value;
    if (node.children) {
        return node.children
            .map((startChild: any) => {
                // Allow recusion only for Inline elements
                const inlineTypes = ['text', 'strong', 'emphasis', 'delete', 'link', 'inlineCode', 'image'];
                if (inlineTypes.includes(startChild.type) || !startChild.type /* root/unknown inline */) {
                    return extractCurrentNodeText(startChild);
                }
                return '';
            })
            .join('');
    }
    return '';
};

// Extract table data (headers and rows) from table AST node
const extractTableData = (tableNode: any): { headers: string[]; rows: string[][] } => {
    const headers: string[] = [];
    const rows: string[][] = [];

    if (tableNode.children) {
        tableNode.children.forEach((row: any, rowIndex: number) => {
            if (row.type === 'tableRow') {
                const cells: string[] = [];
                row.children?.forEach((cell: any) => {
                    if (cell.type === 'tableCell') {
                        cells.push(extractCurrentNodeText(cell));
                    }
                });
                if (rowIndex === 0) {
                    headers.push(...cells);
                } else {
                    rows.push(cells);
                }
            }
        });
    }

    return { headers, rows };
};

// Original recursive helper (removed or renamed if needed, but 'extractText' was replaced above)
// We'll keep the logic inline or use the new helper.
const extractText = extractCurrentNodeText; // Alias for compatibility if reused elsewhere

const applyLayout = (nodes: Node[], edges: Edge[]): ParsedResult => {
    const rootNode = nodes.find(n => n.type === 'root');
    if (!rootNode) return { nodes, edges };

    // 1. Identify direct children of Root and maintain original order
    const rootChildrenIds = edges
        .filter(e => e.source === rootNode.id)
        .map(e => e.target);

    // 2. Separate Layout Groups (Smart Balancing)
    const leftNodeIds = new Set<string>();
    const rightNodeIds = new Set<string>();

    // Helper: Estimate height of a single node
    const getNodeHeight = (nodeId: string): number => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return 60;

        if (node.type === 'component') return 120;
        if (node.type === 'table') {
            const tableData = node.data?.tableData as { headers: string[]; rows: string[][] } | undefined;
            const rows = (tableData?.rows?.length || 1) + 1;
            return Math.max(80, rows * 30 + 40);
        }
        if (node.type === 'code') return 150;
        if (node.type === 'blockquote') return 70;
        return 60;
    };

    // Helper: Collect all descendant IDs recursively
    const getDescendants = (nodeId: string): string[] => {
        const children = edges.filter(e => e.source === nodeId).map(e => e.target);
        const descendants = [...children];
        children.forEach(childId => {
            descendants.push(...getDescendants(childId));
        });
        return descendants;
    };

    // Helper: Calculate total height weight of a branch
    const getBranchWeight = (rootChildId: string): number => {
        let weight = getNodeHeight(rootChildId);
        const descendants = getDescendants(rootChildId);
        descendants.forEach(dId => {
            weight += getNodeHeight(dId);
        });
        return weight;
    };

    // Greedy Balance Algorithm
    let leftWeight = 0;
    let rightWeight = 0;

    rootChildrenIds.forEach((childId) => {
        const branchWeight = getBranchWeight(childId);

        // Add to the lighter side
        if (leftWeight <= rightWeight) {
            leftNodeIds.add(childId);
            getDescendants(childId).forEach(dId => leftNodeIds.add(dId));
            leftWeight += branchWeight;
        } else {
            rightNodeIds.add(childId);
            getDescendants(childId).forEach(dId => rightNodeIds.add(dId));
            rightWeight += branchWeight;
        }
    });

    // 3. Run Dagre for each side
    const runDagre = (subsetNodeIds: Set<string>) => {
        const g = new dagre.graphlib.Graph();
        g.setGraph({ rankdir: 'LR', nodesep: 30, ranksep: 80 });
        g.setDefaultEdgeLabel(() => ({}));

        nodes.forEach(node => {
            if (subsetNodeIds.has(node.id)) {
                let width = 250;
                let height = 60;
                if (node.type === 'component') {
                    width = 300;
                    height = 120;
                } else if (node.type === 'table') {
                    // Estimate table size based on content
                    const tableData = node.data?.tableData as { headers: string[]; rows: string[][] } | undefined;
                    const cols = tableData?.headers?.length || 2;
                    const rows = (tableData?.rows?.length || 1) + 1; // +1 for header
                    width = Math.max(250, cols * 100);
                    height = Math.max(80, rows * 30 + 40);
                } else if (node.type === 'code') {
                    // Code blocks are wider
                    width = 320;
                    height = 150;
                } else if (node.type === 'blockquote') {
                    width = 280;
                    height = 70;
                }
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
