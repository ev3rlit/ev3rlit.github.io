import { MenuOption } from '@lexical/react/LexicalTypeaheadMenuPlugin';

export class ComponentPickerOption extends MenuOption {
    title: string;
    icon?: React.ReactNode;
    keywords: string[];
    priority: number; // Lower is higher priority
    onSelect: (closeMenu: () => void) => void;

    constructor(
        title: string,
        options: {
            icon?: React.ReactNode;
            keywords?: string[];
            priority?: number;
            onSelect: (closeMenu: () => void) => void;
        },
    ) {
        super(title);
        this.title = title;
        this.keywords = options.keywords || [];
        this.icon = options.icon;
        this.priority = options.priority || 99;
        this.onSelect = options.onSelect;
    }
}
