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
 * 유튜브 URL에서 비디오 ID 추출
 */
const getYouTubeVideoId = (url: string): string | null => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
};

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

        case 'link': {
            // 유튜브 링크 감지
            const youtubeVideoId = getYouTubeVideoId(node.url || '');

            if (youtubeVideoId) {
                // 유튜브 링크: 썸네일 표시
                const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`;
                return (
                    <a
                        key={key}
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-col items-center gap-0.5 align-middle cursor-pointer mx-1 group"
                        onClick={(e) => e.stopPropagation()}
                        title={node.children?.map(c => c.value).join('') || 'YouTube Video'}
                    >
                        <div className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={thumbnailUrl}
                                alt="YouTube thumbnail"
                                className="h-16 w-auto max-w-[120px] rounded-md object-cover border border-red-200 dark:border-red-800 shadow-sm group-hover:shadow-md transition-shadow"
                            />
                            {/* 재생 버튼 오버레이 */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-6 bg-red-600 rounded-md flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs">▶</span>
                                </div>
                            </div>
                        </div>
                        <span className="text-[9px] text-red-600 dark:text-red-400 max-w-[120px] truncate text-center">
                            {node.children?.map(c => c.value).join('') || 'YouTube'}
                        </span>
                    </a>
                );
            }

            // 일반 링크
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
        }

        case 'image':
            // 인라인 이미지를 유튜브 썸네일 스타일로 표시
            return (
                <a
                    key={key}
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-col items-center gap-0.5 align-middle cursor-pointer mx-1 group"
                    onClick={(e) => e.stopPropagation()}
                    title={node.alt || node.url}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={node.url}
                        alt={node.alt || 'image'}
                        className="h-16 w-auto max-w-[120px] rounded-md object-cover border border-purple-200 dark:border-purple-800 shadow-sm group-hover:shadow-md transition-shadow"
                        onError={(e) => {
                            // 이미지 로딩 실패 시 fallback
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.insertAdjacentHTML('afterend', '<span class="text-purple-500 text-2xl">🖼️</span>');
                        }}
                    />
                    {node.alt && (
                        <span className="text-[9px] text-purple-600 dark:text-purple-400 max-w-[120px] truncate text-center">
                            {node.alt}
                        </span>
                    )}
                </a>
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
