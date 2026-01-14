"use client";

import React, { useEffect, useRef } from 'react';
import { useWhiteboardStore } from '@/entities/whiteboard/model/whiteboardStore';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import { parseMdxToGraph } from '../lib/parser';
import { MonacoEditor } from './MonacoEditor';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

// Validate MDX syntax before parsing
const isValidMdx = (mdxContent: string): boolean => {
    // Allow empty content
    if (!mdxContent.trim()) return true;

    // Check for unclosed code blocks
    const codeBlockMatches = mdxContent.match(/```/g);
    if (codeBlockMatches && codeBlockMatches.length % 2 !== 0) {
        return false;
    }

    // Check for unclosed JSX tags (simple heuristic)
    const jsxOpenTags = mdxContent.match(/<[A-Z][a-zA-Z0-9]*(?:\s[^>]*)?(?<!\/)\s*>/g) || [];
    const jsxCloseTags = mdxContent.match(/<\/[A-Z][a-zA-Z0-9]*>/g) || [];
    const selfClosingTags = mdxContent.match(/<[A-Z][a-zA-Z0-9]*(?:\s[^>]*)?\s*\/>/g) || [];

    if (jsxOpenTags.length - selfClosingTags.length > jsxCloseTags.length) {
        return false;
    }

    // Try parsing with unified to catch syntax errors
    try {
        const processor = unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMdx);

        const parsed = matter(mdxContent);
        processor.parse(parsed.content);
        return true;
    } catch {
        return false;
    }
};

const DEBOUNCE_DELAY = 500;

export function MdxEditor() {
    const { mdxSource, setMdxSource, isEditorOpen, toggleEditor, setNodes, setEdges } = useWhiteboardStore();
    const parseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Debounced parsing with validation
    useEffect(() => {
        // Clear previous timeout
        if (parseTimeoutRef.current) {
            clearTimeout(parseTimeoutRef.current);
        }

        // Set new timeout (debounced)
        parseTimeoutRef.current = setTimeout(() => {
            // Validate MDX first - if invalid, keep current graph state
            if (!isValidMdx(mdxSource)) {
                return;
            }

            // Try parsing
            const result = parseMdxToGraph(mdxSource);
            if (result) {
                setNodes(result.nodes);
                setEdges(result.edges);
            }
            // If parsing fails (returns null), keep current state
        }, DEBOUNCE_DELAY);

        // Cleanup on unmount or re-run
        return () => {
            if (parseTimeoutRef.current) {
                clearTimeout(parseTimeoutRef.current);
            }
        };
    }, [mdxSource, setNodes, setEdges]);

    return (
        <div className={clsx(
            "relative transition-all duration-300 ease-in-out bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl group overflow-hidden border border-slate-200 dark:border-stone-800 shadow-2xl rounded-2xl flex flex-col",
            // Desktop: 사이드 패널
            "md:h-full",
            isEditorOpen ? "md:w-[500px]" : "md:w-0 md:border-0 md:pointer-events-none",
            // Mobile: 하단 고정 패널 (툴바 공간 확보)
            "max-md:fixed max-md:bottom-20 max-md:left-0 max-md:right-0 max-md:z-50 max-md:rounded-2xl",
            isEditorOpen ? "max-md:h-[45vh]" : "max-md:h-0 max-md:border-0 max-md:pointer-events-none"
        )}>
            {/* Header */}
            <div className={clsx(
                "flex-none p-4 border-b border-slate-200 dark:border-stone-800 flex justify-between items-center bg-stone-50/50 dark:bg-stone-950/50 transition-opacity duration-200",
                !isEditorOpen && "opacity-0"
            )}>
                <h2 className="text-xs font-bold text-slate-500 dark:text-stone-400 uppercase tracking-widest font-mono">MDX Editor</h2>
                <button
                    onClick={toggleEditor}
                    className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-stone-800 text-stone-500 hover:text-blue-500 transition-colors"
                    aria-label="에디터 접기"
                >
                    {/* Desktop: 좌우 화살표, Mobile: 상하 화살표 */}
                    <span className="hidden md:block"><ChevronLeft size={14} /></span>
                    <span className="block md:hidden"><ChevronDown size={14} /></span>
                </button>
            </div>

            {/* Editor Content */}
            <div className={clsx(
                "flex-1 overflow-hidden",
                !isEditorOpen && "opacity-0"
            )}>
                <MonacoEditor
                    value={mdxSource}
                    onChange={setMdxSource}
                    className="h-full"
                />
            </div>
        </div>
    );
}
