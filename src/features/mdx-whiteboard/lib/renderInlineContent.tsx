"use client";

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface InlineNode {
    type: string;
    value?: string;
    url?: string;
    alt?: string;
    title?: string;
    children?: InlineNode[];
}

/**
 * AST의 인라인 요소들을 React 요소로 변환
 * paragraph, listItem 등의 노드에서 인라인 콘텐츠를 추출하여 렌더링
 */
export const renderInlineContent = (node: InlineNode | null | undefined): React.ReactNode => {
    if (!node) return null;

    // paragraph나 listItem인 경우 적절한 children 추출
    let children: InlineNode[] | undefined;

    if (node.type === 'paragraph') {
        children = node.children;
    } else if (node.type === 'listItem') {
        // listItem의 첫 번째 paragraph에서 children 가져오기
        const firstParagraph = node.children?.find((c: InlineNode) => c.type === 'paragraph');
        children = firstParagraph?.children || node.children;
    } else if (node.children) {
        children = node.children;
    }

    if (!children || children.length === 0) {
        return node.value || '';
    }

    return children.map((child, index) => renderNode(child, index));
};

/**
 * 개별 인라인 노드를 React 요소로 변환
 */
const renderNode = (node: InlineNode, key: number): React.ReactNode => {
    switch (node.type) {
        case 'text':
            return <span key={key}>{node.value}</span>;

        case 'link':
            return (
                <a
                    key={key}
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {node.children?.map((c, i) => renderNode(c, i))}
                    <ExternalLink size={10} className="inline ml-0.5 flex-shrink-0" />
                </a>
            );

        case 'image':
            // 인라인 이미지는 이모지 + alt 텍스트로 표시
            return (
                <span
                    key={key}
                    className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400"
                    title={node.url}
                >
                    🖼️ {node.alt || 'image'}
                </span>
            );

        case 'strong':
            return (
                <strong key={key} className="font-semibold">
                    {node.children?.map((c, i) => renderNode(c, i))}
                </strong>
            );

        case 'emphasis':
            return (
                <em key={key} className="italic">
                    {node.children?.map((c, i) => renderNode(c, i))}
                </em>
            );

        case 'inlineCode':
            return (
                <code
                    key={key}
                    className="px-1 py-0.5 bg-stone-200 dark:bg-stone-700 rounded text-[10px] font-mono"
                >
                    {node.value}
                </code>
            );

        case 'delete': // strikethrough (GFM)
            return (
                <del key={key} className="line-through opacity-60">
                    {node.children?.map((c, i) => renderNode(c, i))}
                </del>
            );

        default:
            // 알 수 없는 노드는 children이 있으면 렌더링, 없으면 value Return
            if (node.children) {
                return <span key={key}>{node.children.map((c, i) => renderNode(c, i))}</span>;
            }
            return <span key={key}>{node.value || ''}</span>;
    }
};

export default renderInlineContent;
