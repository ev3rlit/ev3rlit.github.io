import { clsx } from 'clsx';
import { ComponentPickerOption } from './ComponentPickerOption';

interface Props {
    index: number;
    isSelected: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    option: ComponentPickerOption;
}

export function ComponentPickerMenuItem({
    index,
    isSelected,
    onClick,
    onMouseEnter,
    option,
}: Props) {
    return (
        <li
            key={option.key}
            tabIndex={-1}
            className={clsx(
                'cursor-pointer p-2 flex items-center gap-2 rounded-md outline-none transition-colors border-l-2',
                isSelected ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 border-blue-500' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent'
            )}
            ref={option.setRefElement}
            role="option"
            aria-selected={isSelected}
            id={'typeahead-item-' + index}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
        >
            <div className="flex-shrink-0 text-slate-500 dark:text-slate-400">
                {option.icon}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{option.title}</span>
                {option.priority === 1 && <span className="text-[10px] text-blue-500 font-semibold mt-0.5">Component</span>}
                {option.priority === 1.5 && <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold mt-0.5">Markdown</span>}
            </div>
        </li>
    );
}
