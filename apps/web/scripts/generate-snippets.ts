
import fs from 'fs';
import path from 'path';

/**
 * MDX Component Snippet Generator
 * 
 * This script automates the creation of VS Code snippets for MDX components.
 * It ensures that the editor autocomplete is always in sync with the actual
 * components available in MdxContent.tsx.
 * 
 * Strategy:
 * 1. Define a 'Source of Truth' configuration here for snippet bodies.
 *    (Parsing TypeScript AST to extract props automatically is complex/flaky 
 *    without a heavy parser project, so configuration-as-code is a pragmatic maintenance step).
 * 2. Write this configuration to .vscode/mdx.code-snippets.
 */

const SNIPPET_CONFIG: Record<string, { body: string[], description: string, prefix?: string }> = {
    // --- Interactive Features ---
    "SqlPlayground": {
        body: [
            "<SqlPlayground",
            "  setup={`CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);`}",
            "  initialQuery=\"SELECT * FROM users;\"",
            "/>"
        ],
        description: "Interactive SQL Playground using PGlite"
    },
    "SchemaDiagram": {
        body: [
            "<SchemaDiagram",
            "  nodes={[",
            "    { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },",
            "    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } }",
            "  ]}",
            "  edges={[",
            "    { id: 'e1-2', source: '1', target: '2' }",
            "  ]}",
            "  height={300}",
            "/>"
        ],
        description: "React Flow Schema Diagram"
    },
    // --- Dashboard / Stats ---
    "StatCard": {
        body: [
            "<StatCard",
            "  label=\"${1:Label}\"",
            "  value=\"${2:Value}\"",
            "  trend=\"${3:Trend}\"",
            "/>"
        ],
        description: "Statistic Card for Dashboard-like layout"
    },
    "CodeComparison": {
        body: [
            "<CodeComparison",
            "  items={[",
            "    {",
            "      title: '${1:Option A}',",
            "      code: `${2:codeA}`",
            "    },",
            "    {",
            "      title: '${3:Option B}',",
            "      code: `${4:codeB}`",
            "    }",
            "  ]}",
            "/>"
        ],
        description: "Side-by-side Code Comparison"
    },
    "BenchmarkSimulator": {
        body: [
            "<BenchmarkSimulator />"
        ],
        description: "Interactive Benchmark Simulator Component"
    },
    "ContextRaceDemo": {
        body: [
            "<ContextRaceDemo />"
        ],
        description: "Context Switching Race Condition Demo"
    },
    // --- Resume / Timeline ---
    "CareerTimeline": {
        body: ["<CareerTimeline>", "  $0", "</CareerTimeline>"],
        description: "Career Timeline Container"
    },
    "Experience": {
        body: [
            "<Experience",
            "  period=\"${1:YYYY.MM - Present}\"",
            "  role=\"${2:Role}\"",
            "  company=\"${3:Company}\"",
            ">",
            "  $0",
            "</Experience>"
        ],
        description: "Experience Item for Timeline"
    },
    "Project": {
        body: [
            "<Project",
            "  title=\"${1:Project Name}\"",
            "  role=\"${2:Role}\"",
            "  tech=\"${3:Tech Stack}\"",
            ">",
            "  $0",
            "</Project>"
        ],
        description: "Project Item for Timeline"
    },
    "Feature": {
        body: [
            "<Feature title=\"${1:Feature Title}\">",
            "  <FeatureItem status=\"${2|done,doing,todo|}\">${3:Item Description}</FeatureItem>",
            "</Feature>"
        ],
        description: "Feature List for Project"
    },
    // --- Logic ---
    "Switch": {
        body: [
            "<Switch value={${1:condition}}>",
            "  <Case when={${2:value}}>",
            "    $3",
            "  </Case>",
            "  <Default>",
            "    $4",
            "  </Default>",
            "</Switch>"
        ],
        description: "Logic: Switch Case"
    },
    "Map": {
        body: [
            "<Map data={${1:array}}>",
            "  {(item) => (",
            "    $0",
            "  )}",
            "</Map>"
        ],
        description: "Logic: Map Array"
    },
    "MindmapViewer": {
        body: ["<MindmapViewer source={`$0`} />"],
        description: "Embedded Mindmap Viewer"
    }
};

const main = () => {
    const rootDir = process.cwd();
    const vscodeDir = path.join(rootDir, '.vscode');
    const snippetPath = path.join(vscodeDir, 'mdx.code-snippets');

    if (!fs.existsSync(vscodeDir)) {
        fs.mkdirSync(vscodeDir);
    }

    const snippets: Record<string, any> = {};

    Object.entries(SNIPPET_CONFIG).forEach(([name, config]) => {
        snippets[name] = {
            prefix: config.prefix || name,
            body: config.body,
            description: config.description,
            scope: "markdown,mdx" // Ensure it works in MD and MDX files
        };
    });

    fs.writeFileSync(snippetPath, JSON.stringify(snippets, null, 2));
    console.log(`✨ Generated ${Object.keys(snippets).length} snippets to ${snippetPath}`);
};

main();
