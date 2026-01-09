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

// --- Interactive Demos ---
const codeComparisonDescriptor: JsxComponentDescriptor = {
    name: 'CodeComparison',
    kind: 'flow',
    props: [
        { name: 'items', type: 'expression' }
    ],
    hasChildren: false,
    Editor: InlineCodeEditor
};

const benchmarkSimulatorDescriptor: JsxComponentDescriptor = {
    name: 'BenchmarkSimulator',
    kind: 'flow',
    props: [],
    hasChildren: false,
    Editor: InlineCodeEditor
};

const contextRaceDemoDescriptor: JsxComponentDescriptor = {
    name: 'ContextRaceDemo',
    kind: 'flow',
    props: [],
    hasChildren: false,
    Editor: InlineCodeEditor
};

// --- Resume / Timeline ---
const careerTimelineDescriptor: JsxComponentDescriptor = {
    name: 'CareerTimeline',
    kind: 'flow',
    props: [],
    hasChildren: true,
    Editor: InlineCodeEditor
};

const experienceDescriptor: JsxComponentDescriptor = {
    name: 'Experience',
    kind: 'flow',
    props: [
        { name: 'period', type: 'string' },
        { name: 'role', type: 'string' },
        { name: 'company', type: 'string' }
    ],
    hasChildren: true,
    Editor: InlineCodeEditor
};

const projectDescriptor: JsxComponentDescriptor = {
    name: 'Project',
    kind: 'flow',
    props: [
        { name: 'title', type: 'string' },
        { name: 'role', type: 'string' },
        { name: 'tech', type: 'string' }
    ],
    hasChildren: true,
    Editor: InlineCodeEditor
};

const featureDescriptor: JsxComponentDescriptor = {
    name: 'Feature',
    kind: 'flow',
    props: [
        { name: 'title', type: 'string' }
    ],
    hasChildren: true,
    Editor: InlineCodeEditor
};

const featureItemDescriptor: JsxComponentDescriptor = {
    name: 'FeatureItem',
    kind: 'text', // Component within text (inline-ish) or flow? Usually flow in timeline.
    props: [
        { name: 'status', type: 'string' }
    ],
    hasChildren: true,
    Editor: InlineCodeEditor
};

// --- Logic Operators ---
const switchDescriptor: JsxComponentDescriptor = {
    name: 'Switch',
    kind: 'flow',
    props: [{ name: 'value', type: 'expression' }],
    hasChildren: true,
    Editor: InlineCodeEditor
};

const caseDescriptor: JsxComponentDescriptor = {
    name: 'Case',
    kind: 'flow',
    props: [{ name: 'when', type: 'expression' }],
    hasChildren: true,
    Editor: InlineCodeEditor
};

const defaultDescriptor: JsxComponentDescriptor = {
    name: 'Default',
    kind: 'flow',
    props: [],
    hasChildren: true,
    Editor: InlineCodeEditor
};

const mapDescriptor: JsxComponentDescriptor = {
    name: 'Map',
    kind: 'flow',
    props: [{ name: 'data', type: 'expression' }],
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
    statsDescriptor,
    // New
    codeComparisonDescriptor,
    benchmarkSimulatorDescriptor,
    contextRaceDemoDescriptor,
    careerTimelineDescriptor,
    experienceDescriptor,
    projectDescriptor,
    featureDescriptor,
    featureItemDescriptor,
    switchDescriptor,
    caseDescriptor,
    defaultDescriptor,
    mapDescriptor
];
