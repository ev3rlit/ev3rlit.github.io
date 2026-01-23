export const NODE_STYLES = {
    section: "px-4 py-2 rounded-lg border-2 bg-white dark:bg-stone-900 border-slate-200 dark:border-stone-800 w-fit whitespace-nowrap font-bold text-sm text-slate-700 dark:text-stone-300",
    list: "px-3 py-1.5 rounded-md bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 w-fit max-w-[400px] whitespace-pre-wrap text-xs text-stone-600 dark:text-stone-400",
    component: "min-w-[200px] p-2 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20",
    root: "px-4 py-2 rounded-lg border-2 transition-all duration-200 bg-stone-900 border-stone-700 text-stone-100 min-w-[200px] text-center font-bold text-lg",
    code: "font-mono text-sm bg-stone-900 text-stone-50 p-3 rounded-md w-fit",
    blockquote: "border-l-4 border-stone-300 dark:border-stone-600 pl-4 py-2 italic text-stone-600 dark:text-stone-400 w-fit max-w-[400px]",
    table: "border-collapse border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-white dark:bg-stone-900",
    link: "px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-2 w-fit",
    image: "p-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-sm inline-block"
};

// Specific styles for complex components to ensure consistency between
// the React component (CodeNode.tsx) and the layout measurement (measureNode.ts)
export const CODE_NODE_STYLES = {
    container: "rounded-xl overflow-hidden bg-[#1e1e1e] border border-stone-800 shadow-xl min-w-[300px] transition-shadow duration-200",
    header: "flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-stone-800",
    contentWrapper: "relative group",
    pre: "text-xs font-mono overflow-x-auto max-w-[400px] max-h-[300px] overflow-y-auto p-4 custom-scrollbar"
};
