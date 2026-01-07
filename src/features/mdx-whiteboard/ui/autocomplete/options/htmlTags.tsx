import { ComponentPickerOption } from '../ComponentPickerOption';
import { Code } from 'lucide-react';
import { LexicalEditor, $getSelection, $isRangeSelection } from 'lexical';

export const getHtmlTagOptions = (editor: LexicalEditor) => {
    const htmlTags = ['div', 'span', 'p', 'a', 'strong', 'em', 'code', 'pre', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'section', 'article', 'aside', 'blockquote'];
    
    return htmlTags.map(tag =>
        new ComponentPickerOption(tag, {
            icon: <Code size={16} />,
            keywords: [tag, 'html'],
            priority: 2,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        selection.insertText(`<${tag}></${tag}>`);
                    }
                    closeMenu();
                });
            },
        })
    );
};
