import type { languages } from 'monaco-editor';

// MDX Component definitions for autocomplete
const mdxComponents = [
    { label: 'SqlPlayground', insertText: '<SqlPlayground />', detail: 'SQL 실행기', keywords: ['sql', 'query', 'db'] },
    { label: 'SchemaDiagram', insertText: '<SchemaDiagram />', detail: 'ERD 다이어그램', keywords: ['schema', 'erd'] },
    { label: 'Chart', insertText: '<Chart type="line" xKey="name" yKey="value" data={[]} />', detail: '차트', keywords: ['chart', 'graph'] },
    { label: 'Math', insertText: '<Math formula="E = mc^2" />', detail: '수식', keywords: ['math', 'latex'] },
    { label: 'Stats', insertText: '<Stats title="Title" value="100" delta="+10%" trend="up" />', detail: 'KPI', keywords: ['stats', 'kpi'] },
    { label: 'Callout', insertText: '<Callout type="info">\n  $0\n</Callout>', detail: '콜아웃', keywords: ['callout', 'alert'] },
    { label: 'StatCard', insertText: '<StatCard label="Label" value="100" />', detail: '통계 카드', keywords: ['stat', 'card'] },
    { label: 'CodeComparison', insertText: '<CodeComparison items={[{ title: "A", code: "" }]} />', detail: '코드 비교', keywords: ['code', 'diff'] },
    { label: 'BenchmarkSimulator', insertText: '<BenchmarkSimulator />', detail: '벤치마크', keywords: ['benchmark'] },
    { label: 'CareerTimeline', insertText: '<CareerTimeline>\n  $0\n</CareerTimeline>', detail: '타임라인', keywords: ['career', 'timeline'] },
    { label: 'Experience', insertText: '<Experience period="" role="" company="">\n  $0\n</Experience>', detail: '경력', keywords: ['experience'] },
    { label: 'Project', insertText: '<Project title="" role="" tech="">\n  $0\n</Project>', detail: '프로젝트', keywords: ['project'] },
    { label: 'Switch', insertText: '<Switch value={$1}>\n  <Case when={true}>$0</Case>\n  <Default></Default>\n</Switch>', detail: '조건 분기', keywords: ['switch', 'case'] },
    { label: 'Map', insertText: '<Map data={$1}>\n  {(item) => <></>}\n</Map>', detail: '반복', keywords: ['map', 'loop'] },
];

// Register MDX language and autocomplete provider
export function registerMdxLanguage(monaco: typeof import('monaco-editor')) {
    // Register MDX as an extended markdown language
    monaco.languages.register({ id: 'mdx' });

    // Set language configuration
    monaco.languages.setLanguageConfiguration('mdx', {
        comments: {
            blockComment: ['{/*', '*/}'],
        },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')'],
            ['<', '>'],
        ],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
            { open: '`', close: '`' },
            // Removed <> to prevent auto-closing interfering with component autocomplete
        ],
        surroundingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
            { open: '`', close: '`' },
        ],
        onEnterRules: [],
    });

    // Set tokenizer (extend markdown with embedded languages for code blocks)
    monaco.languages.setMonarchTokensProvider('mdx', {
        defaultToken: '',
        tokenizer: {
            root: [
                // JSX components
                [/<[A-Z][a-zA-Z0-9]*/, { token: 'tag', next: '@jsxTag' }],
                [/<\/[A-Z][a-zA-Z0-9]*>/, 'tag'],
                // Markdown headings
                [/^#{1,6}\s.*$/, 'keyword'],
                // Bold
                [/\*\*[^*]+\*\*/, 'strong'],
                // Italic
                [/\*[^*]+\*/, 'emphasis'],
                // Code blocks with language - embedded highlighting
                [/^```(typescript|ts)$/, { token: 'string.code.fence', next: '@codeblockTypescript', nextEmbedded: 'typescript' }],
                [/^```(javascript|js)$/, { token: 'string.code.fence', next: '@codeblockJavascript', nextEmbedded: 'javascript' }],
                [/^```(python|py)$/, { token: 'string.code.fence', next: '@codeblockPython', nextEmbedded: 'python' }],
                [/^```sql$/, { token: 'string.code.fence', next: '@codeblockSql', nextEmbedded: 'sql' }],
                [/^```(css|scss|less)$/, { token: 'string.code.fence', next: '@codeblockCss', nextEmbedded: 'css' }],
                [/^```html$/, { token: 'string.code.fence', next: '@codeblockHtml', nextEmbedded: 'html' }],
                [/^```json$/, { token: 'string.code.fence', next: '@codeblockJson', nextEmbedded: 'json' }],
                [/^```(go|golang)$/, { token: 'string.code.fence', next: '@codeblockGo', nextEmbedded: 'go' }],
                [/^```rust$/, { token: 'string.code.fence', next: '@codeblockRust', nextEmbedded: 'rust' }],
                [/^```java$/, { token: 'string.code.fence', next: '@codeblockJava', nextEmbedded: 'java' }],
                [/^```(bash|sh|shell|zsh)$/, { token: 'string.code.fence', next: '@codeblockShell', nextEmbedded: 'shell' }],
                [/^```yaml$/, { token: 'string.code.fence', next: '@codeblockYaml', nextEmbedded: 'yaml' }],
                [/^```(c|cpp|c\+\+)$/, { token: 'string.code.fence', next: '@codeblockCpp', nextEmbedded: 'cpp' }],
                [/^```(jsx|tsx)$/, { token: 'string.code.fence', next: '@codeblockTypescript', nextEmbedded: 'typescript' }],
                [/^```(md|markdown)$/, { token: 'string.code.fence', next: '@codeblockMarkdown', nextEmbedded: 'markdown' }],
                // Generic code block (no language or unknown language)
                [/^```\w*$/, { token: 'string.code.fence', next: '@codeblockGeneric' }],
                // Inline code
                [/`[^`]+`/, 'string.code.inline'],
                // Links
                [/\[([^\]]+)\]\([^)]+\)/, 'string.link'],
                // Lists
                [/^\s*[-*+]\s/, 'keyword'],
                [/^\s*\d+\.\s/, 'keyword'],
                // Blockquotes
                [/^>\s.*$/, 'comment'],
            ],
            jsxTag: [
                [/\s+/, ''],
                [/[a-zA-Z_][\w]*=/, 'attribute.name'],
                [/"[^"]*"/, 'string'],
                [/\{[^}]*\}/, 'variable'],
                [/\/>/, { token: 'tag', next: '@pop' }],
                [/>/, { token: 'tag', next: '@pop' }],
            ],
            // Embedded language code blocks
            codeblockTypescript: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockJavascript: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockPython: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockSql: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockCss: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockHtml: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockJson: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockGo: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockRust: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockJava: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockShell: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockYaml: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockCpp: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            codeblockMarkdown: [
                [/^```$/, { token: 'string.code.fence', next: '@pop', nextEmbedded: '@pop' }],
            ],
            // Generic code block without syntax highlighting
            codeblockGeneric: [
                [/^```$/, { token: 'string.code.fence', next: '@pop' }],
                [/.*$/, 'string.code'],
            ],
        },
    });

    // Register completion provider
    monaco.languages.registerCompletionItemProvider('mdx', {
        triggerCharacters: ['<'],
        provideCompletionItems: (model, position) => {
            const textUntilPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });

            // Match < followed by letters, handling auto-closed > as well
            // Updated regex to handle cases like <Sql> where > is auto-closed
            const match = textUntilPosition.match(/<([A-Za-z]*)>?$/);
            if (!match) return { suggestions: [] };

            const query = match[1].toLowerCase();

            // Calculate range: from '<' to current position
            // This will replace the entire <Tag or <Tag> with the component
            const startColumn = position.column - match[0].length;

            // Check if there's a closing > after cursor that should also be replaced
            const lineContent = model.getLineContent(position.lineNumber);
            const afterCursor = lineContent.substring(position.column - 1);
            const hasClosingAngle = afterCursor.startsWith('>');

            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: startColumn,
                endColumn: hasClosingAngle ? position.column + 1 : position.column,
            };

            const suggestions: languages.CompletionItem[] = mdxComponents
                .filter(comp => {
                    if (!query) return true;
                    return comp.label.toLowerCase().includes(query) ||
                        comp.keywords.some(k => k.includes(query));
                })
                .map(comp => ({
                    label: comp.label,
                    kind: monaco.languages.CompletionItemKind.Class,
                    insertText: comp.insertText,
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: comp.detail,
                    range,
                    // filterText must match what user types: <ComponentName
                    filterText: '<' + comp.label,
                    sortText: comp.label.toLowerCase().startsWith(query) ? '0' + comp.label : '1' + comp.label,
                }));
            return { suggestions };
        },
    });
}

// Markdown snippets (triggered by '/')
export function registerMarkdownSnippets(monaco: typeof import('monaco-editor')) {
    monaco.languages.registerCompletionItemProvider('mdx', {
        triggerCharacters: ['/'],
        provideCompletionItems: (model, position) => {
            const textUntilPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });

            const match = textUntilPosition.match(/\/([a-z-]*)$/);
            if (!match) return { suggestions: [] };

            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: position.column - match[0].length,
                endColumn: position.column,
            };

            const snippets = [
                { label: '/code', insertText: '```$1\n$0\n```', detail: '코드 블록' },
                { label: '/ts', insertText: '```typescript\n$0\n```', detail: 'TypeScript' },
                { label: '/js', insertText: '```javascript\n$0\n```', detail: 'JavaScript' },
                { label: '/sql', insertText: '```sql\n$0\n```', detail: 'SQL' },
                { label: '/table', insertText: '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |', detail: '테이블' },
                { label: '/link', insertText: '[$1]($0)', detail: '링크' },
                { label: '/img', insertText: '![$1]($0)', detail: '이미지' },
                { label: '/quote', insertText: '> $0', detail: '인용문' },
            ];

            return {
                suggestions: snippets.map(s => ({
                    label: s.label,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: s.insertText,
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: s.detail,
                    range,
                })),
            };
        },
    });
}
