import { JsxComponentDescriptor } from '@mdxeditor/editor';
import { chartDescriptor } from './components/chart/ChartNode';
import { mathDescriptor } from './components/math/MathNode';
import { statsDescriptor } from './components/stats/StatsNode';
import { sqlPlaygroundDescriptor } from '@/features/sql-playground/ui/SqlPlayground';
import { schemaDiagramDescriptor } from '@/features/schema-diagram/ui/SchemaDiagram';
import { InlineCodeEditor } from '../editors/InlineCodeEditor';

// Legacy descriptors using InlineCodeEditor for inline raw JSX editing
const statCardDescriptor: JsxComponentDescriptor = {
    name: 'StatCard',
    kind: 'flow',
    props: [
        { name: 'label', type: 'string' },
        { name: 'value', type: 'string' }
    ],
    hasChildren: false,
    Editor: InlineCodeEditor
};

const calloutDescriptor: JsxComponentDescriptor = {
    name: 'Callout',
    kind: 'flow',
    props: [
        { name: 'type', type: 'string' }
    ],
    hasChildren: true,
    Editor: InlineCodeEditor
};

export const descriptors: JsxComponentDescriptor[] = [
    sqlPlaygroundDescriptor,
    schemaDiagramDescriptor,
    statCardDescriptor,
    calloutDescriptor,
    chartDescriptor,
    mathDescriptor,
    statsDescriptor
];
