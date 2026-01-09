"use client";

import { usePublisher, insertJsx$, insertTable$, insertCodeBlock$ } from '@mdxeditor/editor';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalTypeaheadMenuPlugin, useBasicTypeaheadTriggerMatch } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { TextNode } from 'lexical';
import { useCallback, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { ComponentPickerOption } from './autocomplete/ComponentPickerOption';
import { ComponentPickerMenuItem } from './autocomplete/ComponentPickerMenuItem';
import { getCustomComponentOptions } from './autocomplete/options/customComponents';
import { getMarkdownSnippetOptions } from './autocomplete/options/markdownSnippets';
import { getHtmlTagOptions } from './autocomplete/options/htmlTags';

export function MdxComponentAutocompletePlugin() {
    const [editor] = useLexicalComposerContext();
    const insertJsx = usePublisher(insertJsx$);
    const insertTable = usePublisher(insertTable$);
    const insertCodeBlock = usePublisher(insertCodeBlock$);
    const [queryString, setQueryString] = useState<string | null>(null);

    // Use standard hook again
    const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('<', {
        minLength: 0,
    });

    const options = useMemo(() => {
        const customComponents = getCustomComponentOptions(editor, insertJsx);
        const markdownSnippets = getMarkdownSnippetOptions(editor, insertTable, insertCodeBlock);
        const htmlTags = getHtmlTagOptions(editor);

        const allOptions = [...customComponents, ...markdownSnippets, ...htmlTags];

        if (!queryString) return allOptions;

        const normalizedQuery = queryString.toLowerCase();

        const filtered = allOptions.filter((option) => {
            const titleMatch = option.title.toLowerCase().includes(normalizedQuery);
            const keywordMatch = option.keywords.some(k => k.includes(normalizedQuery));
            return titleMatch || keywordMatch;
        });

        // Sort: Priority first, then partial match accuracy, then alphabetical
        return filtered.sort((a, b) => {
            if (a.priority !== b.priority) {
                return a.priority - b.priority;
            }
            // If query matches start of title, boost it
            const aStartsWith = a.title.toLowerCase().startsWith(normalizedQuery);
            const bStartsWith = b.title.toLowerCase().startsWith(normalizedQuery);
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;

            return a.title.localeCompare(b.title);
        });

    }, [editor, queryString, insertJsx]);

    const onSelectOption = useCallback(
        (
            selectedOption: ComponentPickerOption,
            nodeToRemove: TextNode | null,
            closeMenu: () => void,
            matchingString: string,
        ) => {
            editor.update(() => {
                if (nodeToRemove) {
                    nodeToRemove.remove();
                }
                selectedOption.onSelect(closeMenu);
            });
        },
        [editor],
    );

    return (
        <LexicalTypeaheadMenuPlugin<ComponentPickerOption>
            onQueryChange={setQueryString}
            onSelectOption={onSelectOption}
            triggerFn={checkForTriggerMatch}
            options={options}
            menuRenderFn={(
                anchorElementRef,
                { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
            ) => {
                if (anchorElementRef.current && options.length === 0) {
                    return null;
                }

                return anchorElementRef.current && options.length
                    ? ReactDOM.createPortal(
                        <div className="fixed overflow-hidden bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm border border-slate-200 dark:border-stone-800 rounded-lg shadow-xl z-[9999] min-w-[220px] max-h-[300px] flex flex-col p-1 animate-in fade-in zoom-in-95 duration-150">
                            <div className="text-[10px] font-bold text-slate-400 dark:text-stone-500 px-2 py-1.5 uppercase tracking-wider bg-slate-50 dark:bg-stone-900/50 rounded flex justify-between">
                                <span>Suggestions</span>
                                <span className="text-[9px] opacity-70">TAB/ENTER</span>
                            </div>
                            <ul className="flex flex-col gap-0.5 overflow-y-auto mt-1 custom-scrollbar">
                                {options.map((option, i) => (
                                    <ComponentPickerMenuItem
                                        key={option.key}
                                        index={i}
                                        isSelected={selectedIndex === i}
                                        onClick={() => {
                                            setHighlightedIndex(i);
                                            selectOptionAndCleanUp(option);
                                        }}
                                        onMouseEnter={() => {
                                            setHighlightedIndex(i);
                                        }}
                                        option={option}
                                    />
                                ))}
                            </ul>
                        </div>,
                        anchorElementRef.current,
                    )
                    : null;
            }}
        />
    );
}