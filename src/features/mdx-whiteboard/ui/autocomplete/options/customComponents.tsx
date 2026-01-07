import { ComponentPickerOption } from '../ComponentPickerOption';
import { Database, Layout, MessageSquare, BarChart2, LineChart, BarChart, Sigma, Activity } from 'lucide-react';
import { LexicalEditor } from 'lexical';

interface InsertJsxPayload {
    name: string;
    kind: 'flow' | 'text';
    props: Record<string, any>;
}

export const getCustomComponentOptions = (
    editor: LexicalEditor,
    insertJsx: (payload: InsertJsxPayload) => void
) => {
    return [
        new ComponentPickerOption('SqlPlayground', {
            icon: <Database size={16} />,
            keywords: ['sql', 'query', 'db'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'SqlPlayground',
                        kind: 'flow',
                        props: {}
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('SchemaDiagram', {
            icon: <Layout size={16} />,
            keywords: ['schema', 'diagram', 'erd', 'db'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'SchemaDiagram',
                        kind: 'flow',
                        props: {}
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Callout', {
            icon: <MessageSquare size={16} />,
            keywords: ['callout', 'alert', 'note', 'info'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'Callout',
                        kind: 'flow',
                        props: { type: 'info' }
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('StatCard', {
            icon: <BarChart2 size={16} />,
            keywords: ['stat', 'card', 'metric'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'StatCard',
                        kind: 'flow',
                        props: { label: 'Label', value: '100' }
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Line Chart', {
            icon: <LineChart size={16} />,
            keywords: ['chart', 'graph', 'line'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'Chart',
                        kind: 'flow',
                        props: {
                            type: 'line',
                            xKey: 'name',
                            yKey: 'value',
                            data: "[{ name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 600 }]"
                        }
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Bar Chart', {
            icon: <BarChart size={16} />,
            keywords: ['chart', 'graph', 'bar'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'Chart',
                        kind: 'flow',
                        props: {
                            type: 'bar',
                            xKey: 'name',
                            yKey: 'value',
                            data: "[{ name: 'A', value: 100 }, { name: 'B', value: 200 }, { name: 'C', value: 150 }]"
                        }
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Math Formula', {
            icon: <Sigma size={16} />,
            keywords: ['math', 'equation', 'latex', 'formula'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'Math',
                        kind: 'flow',
                        props: { formula: 'E = mc^2' }
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('KPI Stats', {
            icon: <Activity size={16} />,
            keywords: ['stats', 'kpi', 'metric'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'Stats',
                        kind: 'flow',
                        props: { title: 'Active Users', value: '1,234', delta: '+12%', trend: 'up' }
                    });
                    closeMenu();
                });
            },
        }),
    ];
};
