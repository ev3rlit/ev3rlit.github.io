"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import {
    useNestedEditorContext,
    useMdastNodeUpdater,
} from '@mdxeditor/editor';
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';

/**
 * InlineCodeEditor - 보이는 그대로 바로 편집 가능한 Editor 컴포넌트
 * 
 * contentEditable을 사용하여 별도의 편집 모드 없이 바로 수정 가능
 */
export function InlineCodeEditor() {
    const { mdastNode } = useNestedEditorContext<MdxJsxFlowElement>();
    const updateMdastNode = useMdastNodeUpdater<MdxJsxFlowElement>();
    const editableRef = useRef<HTMLDivElement>(null);

    // mdast 노드에서 raw JSX 문자열 생성
    const generateJsxString = useCallback((node: MdxJsxFlowElement): string => {
        const name = node.name || 'Component';
        const attrs = (node.attributes || [])
            .filter((attr): attr is MdxJsxAttribute => attr.type === 'mdxJsxAttribute')
            .map(attr => {
                const value = attr.value;
                if (value === null || value === undefined) {
                    return attr.name;
                }
                if (typeof value === 'string') {
                    return `${attr.name}="${value}"`;
                }
                // Expression value
                if (typeof value === 'object' && 'value' in value) {
                    return `${attr.name}={${value.value}}`;
                }
                return `${attr.name}={...}`;
            })
            .join(' ');

        return `<${name}${attrs ? ' ' + attrs : ''} />`;
    }, []);

    // raw JSX 문자열에서 attributes 파싱
    const parseJsxString = useCallback((jsxString: string): MdxJsxAttribute[] => {
        const attributes: MdxJsxAttribute[] = [];

        // 간단한 props 파싱 (key="value" 또는 key={expression})
        const propsMatch = jsxString.match(/<\w+\s+([^/>]*)/);
        if (!propsMatch) return attributes;

        const propsString = propsMatch[1].trim();
        if (!propsString) return attributes;

        // key="value" 패턴 매칭
        const stringPropRegex = /(\w+)="([^"]*)"/g;
        let match: RegExpExecArray | null;
        while ((match = stringPropRegex.exec(propsString)) !== null) {
            attributes.push({
                type: 'mdxJsxAttribute',
                name: match[1],
                value: match[2]
            });
        }

        // key={expression} 패턴 매칭
        const exprPropRegex = /(\w+)=\{([^}]*)\}/g;
        let exprMatch: RegExpExecArray | null;
        while ((exprMatch = exprPropRegex.exec(propsString)) !== null) {
            const alreadyParsed = attributes.some(a => a.name === exprMatch![1]);
            if (!alreadyParsed) {
                attributes.push({
                    type: 'mdxJsxAttribute',
                    name: exprMatch[1],
                    value: {
                        type: 'mdxJsxAttributeValueExpression',
                        value: exprMatch[2]
                    }
                });
            }
        }

        return attributes;
    }, []);

    // blur 시 변경사항 저장
    const handleBlur = useCallback(() => {
        if (mdastNode && editableRef.current) {
            const editedText = editableRef.current.innerText || '';
            const newAttributes = parseJsxString(editedText);
            updateMdastNode({ attributes: newAttributes } as Partial<MdxJsxFlowElement>);
        }
    }, [mdastNode, parseJsxString, updateMdastNode]);

    // 초기 내용 설정 (mdastNode 변경 시)
    useEffect(() => {
        if (mdastNode && editableRef.current) {
            const currentText = editableRef.current.innerText;
            const expectedText = generateJsxString(mdastNode);
            // 외부에서 변경된 경우에만 업데이트 (편집 중 커서 점프 방지)
            if (!editableRef.current.contains(document.activeElement) && currentText !== expectedText) {
                editableRef.current.innerText = expectedText;
            }
        }
    }, [mdastNode, generateJsxString]);

    if (!mdastNode) {
        return <div className="p-2 text-slate-500">Loading...</div>;
    }

    const displayJsx = generateJsxString(mdastNode);

    return (
        <div className="group p-3 border border-slate-200 dark:border-stone-700 rounded-lg bg-slate-50 dark:bg-stone-800/50 hover:border-blue-400 dark:hover:border-blue-500 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors">
            <div
                ref={editableRef}
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur}
                className="font-mono text-xs text-blue-600 dark:text-blue-400 break-all outline-none cursor-text whitespace-pre-wrap"
                spellCheck={false}
            >
                {displayJsx}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-stone-500 mt-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                Click to edit · Changes saved on blur
            </div>
        </div>
    );
}
