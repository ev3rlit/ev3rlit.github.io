import { Node } from 'reactflow';
import { NODE_STYLES, CODE_NODE_STYLES } from './nodeStyles';

const MEASURE_CONTAINER_ID = 'whiteboard-measure-container';

/**
 * Creates a hidden container for measuring DOM elements
 */
const getMeasureContainer = (): HTMLElement | null => {
    if (typeof document === 'undefined') return null;

    let container = document.getElementById(MEASURE_CONTAINER_ID);
    if (!container) {
        container = document.createElement('div');
        container.id = MEASURE_CONTAINER_ID;
        // Make it invisible but layout-affecting
        container.style.position = 'absolute';
        container.style.visibility = 'hidden';
        container.style.pointerEvents = 'none';
        container.style.top = '-9999px';
        container.style.left = '-9999px';
        container.style.width = 'auto'; // Allow growing
        document.body.appendChild(container); // Append to body to ensure styles apply
    }
    return container;
};

/**
 * Helper to render inline content approximate string for measurement
 */
const getInlineContentString = (node: any): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (node.value) return node.value;
    if (node.children) return node.children.map(getInlineContentString).join('');
    return '';
};

/**
 * Measures the dimensions of a node by rendering it off-screen
 */
export const measureNode = (node: Node): { width: number; height: number } => {
    const container = getMeasureContainer();
    if (!container) return estimateDimensions(node); // Fallback for SSR

    const el = document.createElement('div');
    let className = '';
    let content = '';

    // 1. Determine style class and content based on node type
    switch (node.type) {
        case 'root':
            className = NODE_STYLES.root;
            content = node.data?.label || 'Root';
            break;
        case 'section':
            className = NODE_STYLES.section;
            content = node.data?.label || 'Section';
            break;
        case 'list':
        case 'text':
            className = NODE_STYLES.list;
            // Handle inline content approximation
            if (node.data.mdxNode) {
                // For complex MDX nodes, we use the raw text value or approximate children text
                // Note: Ideally we would render the actual React component tree for perfect measurement
                // but that's expensive. Text length + style approximation is usually sufficient for layout.
                content = getInlineContentString(node.data.mdxNode);
            } else {
                content = node.data?.label || '';
            }

            // Add HTML structure approximation if needed (e.g., links, images)
            // But for layout, text wrapping is the main factor.
            // We'll wrap content in a span if needed.
            break;
        case 'code':
            // Replicate CodeNode.tsx structure exactly
            // 1. Container
            el.className = CODE_NODE_STYLES.container;

            // 2. Header
            const header = document.createElement('div');
            header.className = CODE_NODE_STYLES.header;
            // Header content simulation (buttons + lang) - minimal height impact structure
            header.innerHTML = `
                <div class="flex items-center gap-2">
                    <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                </div>
                <div class="text-[10px] font-mono text-stone-400">TXT</div>
                <div class="p-1"></div>
            `;
            el.appendChild(header);

            // 3. Content (Pre)
            const pre = document.createElement('pre');
            pre.className = CODE_NODE_STYLES.pre;
            pre.style.margin = '0';
            pre.style.whiteSpace = 'pre';

            const codeData = node.data?.codeData;
            const rawCode = codeData?.value || '';
            // Handle Truncation same as component (slice 300)
            pre.textContent = rawCode.length > 300 ? rawCode.slice(0, 300) + '\n// ...' : rawCode;

            el.appendChild(pre);

            // Ignore default content handling
            content = '';
            className = '';
            break;

        case 'blockquote':
            className = NODE_STYLES.blockquote;
            content = node.data?.label || '';
            break;
        case 'component':
            // Components are hard to measure without rendering React
            // Return fixed/estimated size
            return { width: 200, height: 100 };
        case 'table':
            // Table estimation
            return estimateDimensions(node);
        default:
            className = NODE_STYLES.list;
            content = node.data?.label || '';

            // 2. Apply styles and content (for non-code nodes)
            el.className = className;
            // Use innerHTML to simulate some rich text if necessary, 
            // but textContent is safer and usually enough for wrapping check
            el.innerText = content;
    }

    // 2. Apply styles and content (Simplified)
    // If className is set (default cases), apply it. Code case clears it.
    if (className) {
        el.className = className;
        el.innerText = content;
    }

    // Explicitly set width constraints if they exist in CSS but aren't applied due to context
    // (Tailwind classes handle max-w usually)

    // 3. Mount and Measure
    container.appendChild(el);
    const rect = el.getBoundingClientRect();

    // 4. Cleanup
    container.removeChild(el);

    // Return dimensions with some padding buffer
    return {
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height)
    };
};

/**
 * Fallback size estimation for SSR or unsupported types
 */
const estimateDimensions = (node: Node): { width: number; height: number } => {
    if (node.type === 'component') return { width: 200, height: 100 };
    if (node.type === 'code') {
        // Estimate based on line count + header
        const lines = (node.data?.codeData?.value || '').split('\n').length;
        // Header ~40px, Line ~20px, Padding ~32px
        return { width: 300, height: Math.max(80, lines * 20 + 40 + 32) };
    }
    if (node.type === 'table') {
        const tableData = node.data?.tableData as { headers: string[]; rows: string[][] } | undefined;
        const rows = (tableData?.rows?.length || 1) + 1;
        const cols = tableData?.headers?.length || 2;
        const width = Math.min(280, Math.max(180, cols * 80));
        const height = Math.max(80, rows * 30 + 40);
        return { width, height };
    }
    // Default fallback
    return { width: 200, height: 50 };
};
