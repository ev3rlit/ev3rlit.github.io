import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import { Node, Edge } from 'reactflow';
import { applyLayout } from './layoutEngine';

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

            // link와 image는 인라인으로만 처리 (renderInlineContent에서 렌더링)
            // 독립 노드로 만들지 않음

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

        } else if (node.type === 'list') {
            // List container (ordered or unordered)
            // A list doesn't create its own node, but its children (listItems) should be
            // parented to the CURRENT lexicalParentId.
            // This is crucial for nested lists: the nested list's items should be children
            // of the parent listItem, not siblings of it.

            if (node.children) {
                node.children.forEach((listItemChild: any) => {
                    traverse(listItemChild, lexicalParentId);
                });
            }

            // No node created, just return null
            return null;
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

// Alias for compatibility
const extractText = extractCurrentNodeText;
