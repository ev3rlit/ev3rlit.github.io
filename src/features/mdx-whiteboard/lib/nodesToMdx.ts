import { Node, Edge } from 'reactflow';

interface TreeNode {
    id: string;
    type: string;
    data: any;
    children: TreeNode[];
    depth: number;
}

/**
 * ReactFlow 노드와 엣지를 MDX 문자열로 변환
 */
export const nodesToMdx = (
    nodes: Node[],
    edges: Edge[],
    frontmatter?: Record<string, any>
): string => {
    if (nodes.length === 0) return '';

    // 1. 트리 구조 구축
    const tree = buildTree(nodes, edges);
    if (!tree.root) return '';

    // 2. Frontmatter 생성
    let mdx = generateFrontmatter(frontmatter);

    // 3. DFS로 순회하며 MDX 생성
    traverseDF(tree.root, (node, depth) => {
        mdx += convertNodeToMdx(node, depth);
    });

    return mdx.trim();
};

/**
 * 노드와 엣지로부터 트리 구조 구축
 */
const buildTree = (nodes: Node[], edges: Edge[]): { root: TreeNode | null } => {
    const nodeMap = new Map<string, TreeNode>();
    const childrenMap = new Map<string, string[]>();

    // 노드 맵 생성
    nodes.forEach(node => {
        nodeMap.set(node.id, {
            id: node.id,
            type: node.type || 'default',
            data: node.data,
            children: [],
            depth: 0
        });
    });

    // 부모-자식 관계 구축
    edges.forEach(edge => {
        const children = childrenMap.get(edge.source) || [];
        children.push(edge.target);
        childrenMap.set(edge.source, children);
    });

    // 자식 노드 연결 및 depth 계산
    const setChildren = (nodeId: string, depth: number) => {
        const node = nodeMap.get(nodeId);
        if (!node) return;

        node.depth = depth;
        const childIds = childrenMap.get(nodeId) || [];

        childIds.forEach(childId => {
            const child = nodeMap.get(childId);
            if (child) {
                node.children.push(child);
                setChildren(childId, depth + 1);
            }
        });
    };

    // 루트 노드 찾기
    const rootNode = nodes.find(n => n.type === 'root');
    if (rootNode) {
        setChildren(rootNode.id, 0);
        return { root: nodeMap.get(rootNode.id) || null };
    }

    return { root: null };
};

/**
 * 깊이 우선 탐색 (DFS)
 */
const traverseDF = (
    node: TreeNode | null,
    callback: (node: TreeNode, depth: number) => void,
    depth: number = 0
) => {
    if (!node) return;

    callback(node, depth);

    node.children.forEach(child => {
        traverseDF(child, callback, depth + 1);
    });
};

/**
 * 노드를 MDX 문자열로 변환
 */
const convertNodeToMdx = (node: TreeNode, depth: number): string => {
    const { type, data } = node;
    const label = data?.label || '';

    switch (type) {
        case 'root':
            // root는 frontmatter에서 처리, 건너뜀
            return '';

        case 'section':
            // 헤더: ## 텍스트
            // depth 0 = root, depth 1 = ## (h2), depth 2 = ### (h3), ...
            const headerLevel = Math.min(depth, 6);
            return '\n' + '#'.repeat(headerLevel) + ' ' + label + '\n\n';

        case 'list':
            // 불릿: - 텍스트 (들여쓰기)
            // section 이후의 list이므로 depth-2부터 들여쓰기
            const listIndent = '\t'.repeat(Math.max(0, depth - 2));
            return listIndent + '- ' + label + '\n';

        case 'code':
            // 코드 블록
            const codeData = data?.codeData || {};
            const lang = codeData.lang || '';
            const value = codeData.value || '';
            return '\n```' + lang + '\n' + value + '\n```\n\n';

        case 'table':
            // 테이블
            return generateTable(data?.tableData) + '\n';

        case 'blockquote':
            // 인용
            return '\n> ' + label + '\n\n';

        case 'link':
            // 링크: [텍스트](url)
            const linkUrl = data?.url || '';
            return '[' + label + '](' + linkUrl + ')\n';

        case 'image':
            // 이미지: ![alt](url)
            const imageUrl = data?.url || '';
            return '![' + label + '](' + imageUrl + ')\n';

        case 'component':
        case 'chart':
        case 'math':
        case 'stats':
            // MDX 컴포넌트
            return '\n' + generateMdxComponent(label, data?.props) + '\n\n';

        default:
            // 일반 텍스트 (list 스타일로 처리)
            if (label) {
                const defaultIndent = '\t'.repeat(Math.max(0, depth - 2));
                return defaultIndent + '- ' + label + '\n';
            }
            return '';
    }
};

/**
 * Frontmatter YAML 생성
 */
const generateFrontmatter = (frontmatter?: Record<string, any>): string => {
    if (!frontmatter || Object.keys(frontmatter).length === 0) {
        return '';
    }

    let yaml = '---\n';
    Object.entries(frontmatter).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            if (value.length === 0) {
                yaml += `${key}: []\n`;
            } else {
                yaml += `${key}: [${value.join(', ')}]\n`;
            }
        } else if (typeof value === 'object') {
            yaml += `${key}: ${JSON.stringify(value)}\n`;
        } else {
            yaml += `${key}: ${value}\n`;
        }
    });
    yaml += '---\n\n';

    return yaml;
};

/**
 * 테이블 마크다운 생성
 */
const generateTable = (tableData?: { headers: string[]; rows: string[][] }): string => {
    if (!tableData || !tableData.headers || tableData.headers.length === 0) {
        return '';
    }

    const { headers, rows } = tableData;

    // 헤더 행
    let table = '\n| ' + headers.join(' | ') + ' |\n';

    // 구분선
    table += '| ' + headers.map(() => '---').join(' | ') + ' |\n';

    // 데이터 행
    if (rows && rows.length > 0) {
        rows.forEach(row => {
            table += '| ' + row.join(' | ') + ' |\n';
        });
    }

    return table;
};

/**
 * MDX 컴포넌트 문자열 생성
 */
const generateMdxComponent = (name: string, props?: Record<string, any>): string => {
    if (!name) return '';

    if (!props || Object.keys(props).length === 0) {
        return `<${name} />`;
    }

    const propsStr = Object.entries(props)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => {
            if (typeof value === 'string') {
                // 문자열은 따옴표로 감싸기
                return `${key}="${value}"`;
            } else if (typeof value === 'boolean') {
                // boolean은 값이 true면 속성만, false면 생략
                return value ? key : null;
            } else {
                // 객체/배열은 JSX 표현식으로
                return `${key}={${JSON.stringify(value)}}`;
            }
        })
        .filter(Boolean)
        .join(' ');

    if (propsStr) {
        return `<${name} ${propsStr} />`;
    }
    return `<${name} />`;
};

export { generateFrontmatter, generateTable, generateMdxComponent };
