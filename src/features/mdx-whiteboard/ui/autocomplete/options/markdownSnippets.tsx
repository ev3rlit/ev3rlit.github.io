import { ComponentPickerOption } from '../ComponentPickerOption';
import {
    Image as ImageIcon,
    Link as LinkIcon,
    FileCode as FileCodeIcon,
    Table
} from 'lucide-react';
import { LexicalEditor, $getSelection, $isRangeSelection } from 'lexical';

interface InsertTablePayload {
    rows?: number;
    columns?: number;
}

interface InsertCodeBlockPayload {
    language: string;
    code: string;
}

export const getMarkdownSnippetOptions = (
    editor: LexicalEditor,
    insertTable: (payload: InsertTablePayload) => void,
    insertCodeBlock: (payload: InsertCodeBlockPayload) => void
) => {
    return [
        new ComponentPickerOption('Table', {
            icon: <Table size={16} />,
            keywords: ['table', 'grid', 'markdown'],
            priority: 1.5,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertTable({ rows: 3, columns: 2 });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Image', {
            icon: <ImageIcon size={16} />,
            keywords: ['image', 'img', 'picture', 'photo', 'markdown'],
            priority: 1.5,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        selection.insertText('![Alt text](image_url)');
                    }
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Link', {
            icon: <LinkIcon size={16} />,
            keywords: ['link', 'anchor', 'url', 'markdown'],
            priority: 1.5,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        selection.insertText('[Link text](url)');
                    }
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Code Block', {
            icon: <FileCodeIcon size={16} />,
            keywords: ['code', 'snippet', 'markdown', 'block'],
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertCodeBlock({ language: 'ts', code: '' });
                    closeMenu();
                });
            },
        }),
    ];
};
