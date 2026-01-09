import { ComponentPickerOption } from '../ComponentPickerOption';
import { Database, Layout, MessageSquare, BarChart2, LineChart, BarChart, Sigma, Activity, FileCode as FileCodeIcon, PlayCircle, Zap, Clock, Briefcase, GitFork } from 'lucide-react';
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
        // --- Interactive Demos ---
        new ComponentPickerOption('Code Comparison', {
            icon: <FileCodeIcon size={16} />,
            keywords: ['code', 'diff', 'comparison'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'CodeComparison',
                        kind: 'flow',
                        props: {
                            items: "[{ title: 'A', code: '' }, { title: 'B', code: '' }]"
                        }
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Benchmark Simulator', {
            icon: <PlayCircle size={16} />,
            keywords: ['benchmark', 'simulator', 'demo'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'BenchmarkSimulator',
                        kind: 'flow',
                        props: {}
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Context Race Demo', {
            icon: <Zap size={16} />,
            keywords: ['race', 'condition', 'demo', 'context'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'ContextRaceDemo',
                        kind: 'flow',
                        props: {}
                    });
                    closeMenu();
                });
            },
        }),
        // --- Timeline ---
        new ComponentPickerOption('Career Timeline', {
            icon: <Clock size={16} />,
            keywords: ['career', 'timeline', 'resume'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'CareerTimeline',
                        kind: 'flow',
                        props: {}
                    });
                    closeMenu();
                });
            },
        }),
        new ComponentPickerOption('Experience', {
            icon: <Briefcase size={16} />,
            keywords: ['experience', 'job', 'work'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'Experience',
                        kind: 'flow',
                        props: { period: '2024 - Present', role: 'Role', company: 'Company' }
                    });
                    closeMenu();
                });
            },
        }),
        // --- Logic ---
        new ComponentPickerOption('Switch Case', {
            icon: <GitFork size={16} />,
            keywords: ['switch', 'case', 'logic'],
            priority: 1,
            onSelect: (closeMenu) => {
                editor.update(() => {
                    insertJsx({
                        name: 'Switch',
                        kind: 'flow',
                        props: { value: 'condition' }
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
