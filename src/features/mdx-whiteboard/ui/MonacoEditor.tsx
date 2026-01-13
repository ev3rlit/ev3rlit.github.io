"use client";

import { useEffect, useRef } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { registerMdxLanguage, registerMarkdownSnippets } from '../lib/monacoAutocomplete';

interface MonacoEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function MonacoEditor({ value, onChange, className = '' }: MonacoEditorProps) {
    const { resolvedTheme } = useTheme();
    const monacoRef = useRef<typeof import('monaco-editor') | null>(null);

    // Register MDX language before mount
    const handleBeforeMount: BeforeMount = (monaco) => {
        monacoRef.current = monaco;
        registerMdxLanguage(monaco);
        registerMarkdownSnippets(monaco);

        // Define custom themes
        monaco.editor.defineTheme('blog-light', {
            base: 'vs',
            inherit: true,
            rules: [
                { token: 'tag', foreground: 'EA580C' }, // orange-600
                { token: 'attribute.name', foreground: '9333EA' }, // purple-600
                { token: 'string', foreground: '16A34A' }, // green-600
                { token: 'keyword', foreground: '0EA5E9' }, // sky-500
                { token: 'comment', foreground: '94A3B8', fontStyle: 'italic' }, // slate-400
            ],
            colors: {
                'editor.background': '#FFFFFF',
                'editor.foreground': '#1C1917', // stone-900
                'editor.lineHighlightBackground': '#F8FAFC', // slate-50
                'editor.selectionBackground': '#BFDBFE', // blue-200
                'editorCursor.foreground': '#3B82F6', // blue-500
                'editorLineNumber.foreground': '#94A3B8', // slate-400
                'editorWidget.background': '#FFFFFF',
                'editorWidget.border': '#E2E8F0', // slate-200
                'editorSuggestWidget.background': '#FFFFFF',
                'editorSuggestWidget.border': '#E2E8F0',
                'editorSuggestWidget.selectedBackground': '#DBEAFE', // blue-100
            },
        });

        monaco.editor.defineTheme('blog-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'tag', foreground: 'FB923C' }, // orange-400
                { token: 'attribute.name', foreground: 'C084FC' }, // purple-400
                { token: 'string', foreground: '4ADE80' }, // green-400
                { token: 'keyword', foreground: '38BDF8' }, // sky-400
                { token: 'comment', foreground: '78716C', fontStyle: 'italic' }, // stone-500
            ],
            colors: {
                'editor.background': '#1C1917', // stone-900
                'editor.foreground': '#F5F5F4', // stone-100
                'editor.lineHighlightBackground': '#292524', // stone-800
                'editor.selectionBackground': '#3B82F640', // blue-500/25
                'editorCursor.foreground': '#60A5FA', // blue-400
                'editorLineNumber.foreground': '#78716C', // stone-500
                'editorWidget.background': '#1C1917',
                'editorWidget.border': '#44403C', // stone-700
                'editorSuggestWidget.background': '#1C1917',
                'editorSuggestWidget.border': '#44403C',
                'editorSuggestWidget.selectedBackground': '#3B82F630',
            },
        });
    };

    // Handle editor mount
    const handleMount: OnMount = (editor, monaco) => {
        // Focus editor
        editor.focus();

        // Custom Enter key handler for smart list continuation
        editor.addCommand(monaco.KeyCode.Enter, () => {
            const model = editor.getModel();
            const position = editor.getPosition();
            if (!model || !position) {
                return;
            }

            const fullText = model.getValue();
            const offset = model.getOffsetAt(position);

            // Check if cursor is inside a code block
            const isInsideCodeBlock = checkIfInsideCodeBlock(fullText, offset);

            let textToInsert = '\n';

            if (!isInsideCodeBlock) {
                // Outside code block: check for list continuation
                const currentLine = model.getLineContent(position.lineNumber);
                const listMatch = currentLine.match(/^(\s*)([*\-+]|\d+\.)\s+/);

                if (listMatch) {
                    const indent = listMatch[1];
                    const marker = listMatch[2];

                    // If the line only contains the list marker (empty item), don't continue
                    const contentAfterMarker = currentLine.slice(listMatch[0].length).trim();
                    if (contentAfterMarker) {
                        // Continue the list with same marker
                        let newMarker = marker;
                        if (/^\d+\.$/.test(marker)) {
                            // Increment number for ordered lists
                            const num = parseInt(marker) + 1;
                            newMarker = `${num}.`;
                        }
                        textToInsert = `\n${indent}${newMarker} `;
                    }
                }
            }

            // Use executeEdits to insert text (doesn't re-trigger handlers)
            const range = new monaco.Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column
            );

            editor.executeEdits('list-continuation', [{
                range: range,
                text: textToInsert,
                forceMoveMarkers: true
            }]);

            // Move cursor to end of inserted text
            const newPosition = model.getPositionAt(offset + textToInsert.length);
            editor.setPosition(newPosition);
        });
    };

    // Helper function to check if offset is inside a code block
    const checkIfInsideCodeBlock = (text: string, offset: number): boolean => {
        const textBeforeCursor = text.slice(0, offset);

        // Count occurrences of ``` before cursor
        const codeBlockMarkers = textBeforeCursor.match(/```/g);
        const count = codeBlockMarkers ? codeBlockMarkers.length : 0;

        // Odd number of markers means we're inside a code block
        return count % 2 === 1;
    };

    return (
        <div className={`h-full ${className}`}>
            <Editor
                height="100%"
                language="mdx"
                value={value}
                onChange={(val) => onChange(val || '')}
                theme={resolvedTheme === 'dark' ? 'blog-dark' : 'blog-light'}
                beforeMount={handleBeforeMount}
                onMount={handleMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    tabSize: 2,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    renderWhitespace: 'selection',
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    smoothScrolling: true,
                    bracketPairColorization: { enabled: true },
                    quickSuggestions: {
                        other: true,
                        comments: false,
                        strings: true,
                    },
                    suggest: {
                        showIcons: true,
                        showStatusBar: false,
                        preview: true,
                    },
                }}
            />
        </div>
    );
}
