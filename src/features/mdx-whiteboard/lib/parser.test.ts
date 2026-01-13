
import { describe, it, expect } from 'vitest';
import { parseMdxToGraph } from './parser';

describe('parseMdxToGraph', () => {
    it('should parse basic frontmatter and create a root node', () => {
        const mdx = `---
title: "Test Title"
---
# Hello World
`;
        const result = parseMdxToGraph(mdx);
        expect(result).not.toBeNull();
        if (!result) return;

        expect(result.nodes).toHaveLength(2); // Root + Heading
        const root = result.nodes.find(n => n.type === 'root');
        expect(root).toBeDefined();
        expect(root?.data.label).toBe('Test Title');
    });

    it('should create section nodes for headings and respect hierarchy', () => {
        const mdx = `
# Section 1
## Section 1.1
# Section 2
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        const sections = result.nodes.filter(n => n.type === 'section');
        expect(sections).toHaveLength(3); // H1, H2, H1

        const edges = result.edges;
        // Check hierarchy
        // We expect: Root -> Section 1 -> Section 1.1
        // And: Root -> Section 2

        // Since IDs are line-based, let's just check edge existence
        expect(edges.length).toBeGreaterThanOrEqual(3);
    });

    it('should parse lists correctly', () => {
        const mdx = `
- Item 1
- Item 2
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        const lists = result.nodes.filter(n => n.type === 'list');
        expect(lists).toHaveLength(2);
        expect(lists[0].data.label).toContain('Item 1');
        expect(lists[1].data.label).toContain('Item 2');
    });

    it('should parse tables correctly', () => {
        const mdx = `
| Header 1 | Header 2 |
| --- | --- |
|Data 1|Data 2|
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        const tableNode = result.nodes.find(n => n.type === 'table');
        expect(tableNode).toBeDefined();
        expect(tableNode?.data.tableData).toBeDefined();

        const data = tableNode?.data.tableData as any;
        expect(data.headers).toEqual(['Header 1', 'Header 2']);
        expect(data.rows[0]).toEqual(['Data 1', 'Data 2']);
    });

    it('should parse code blocks', () => {
        const mdx = `
\`\`\`javascript
const x = 1;
\`\`\`
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        const codeNode = result.nodes.find(n => n.type === 'code');
        expect(codeNode).toBeDefined();
        expect(codeNode?.data.codeData.lang).toBe('javascript');
        expect(codeNode?.data.codeData.value).toContain('const x = 1;');
    });

    it('should parse custom components', () => {
        const mdx = `
<SqlPlayground query="SELECT * FROM users" />
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        const componentNode = result.nodes.find(n => n.type === 'component');
        expect(componentNode).toBeDefined();
        expect(componentNode?.data.label).toBe('SqlPlayground');
        expect(componentNode?.data.props.query).toBe('SELECT * FROM users');
    });

    it('should handle correctly nested lists', () => {
        // This fails in the current parser implementation according to user history
        // Let's see if our logic holds up or if we need to fix it.
        const mdx = `
- Parent Item
  - Child Item
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        // We expect 2 list nodes
        const lists = result.nodes.filter(n => n.type === 'list');
        expect(lists).toHaveLength(2);

    });

    it('should handle code blocks and components inside list items', () => {
        const mdx = `
- Item with code
  \`\`\`javascript
  const x = 1;
  \`\`\`
- Item with component
  <SqlPlayground query="SELECT 1" />
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        // We expect: 2 list items, 1 code block, 1 component
        const lists = result.nodes.filter(n => n.type === 'list');
        const codeNodes = result.nodes.filter(n => n.type === 'code');
        const componentNodes = result.nodes.filter(n => n.type === 'component');

        expect(lists).toHaveLength(2);
        expect(codeNodes).toHaveLength(1);
        expect(componentNodes).toHaveLength(1);

        // Check parent-child relationship via edges
        // Code block should be child of first list item
        const firstListItem = lists.find(l => l.data.label.includes('code'));
        const codeNode = codeNodes[0];
        const codeEdge = result.edges.find(e => e.target === codeNode.id);
        expect(codeEdge?.source).toBe(firstListItem?.id);

        // Component should be child of second list item
        const secondListItem = lists.find(l => l.data.label.includes('component'));
        const componentNode = componentNodes[0];
        const componentEdge = result.edges.find(e => e.target === componentNode.id);
        expect(componentEdge?.source).toBe(secondListItem?.id);
    });

    it('should handle list item with ONLY code block (no preceding text)', () => {
        // This is the CRITICAL case: 
        // - ```python
        //   hello world
        //   ```
        // Should create: root + 1 code block ONLY (NO listItem node!)
        const mdx = `
- \`\`\`python
  hello world
  \`\`\`
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        // Should have: root + 1 code block = 2 nodes total (NO listItem!)
        const lists = result.nodes.filter(n => n.type === 'list');
        const codeNodes = result.nodes.filter(n => n.type === 'code');
        const textNodesWithCodeContent = result.nodes.filter(n =>
            n.data.label && n.data.label.includes('hello world')
        );

        expect(lists).toHaveLength(0); // No listItem node created!
        expect(codeNodes).toHaveLength(1);
        expect(textNodesWithCodeContent).toHaveLength(0);
        expect(result.nodes).toHaveLength(2);
    });



    it('should handle code block with nested list correctly (no text duplication)', () => {
        // User reported case:
        // - ```python
        //   hello world
        //   ```
        //     - child 1
        const mdx = `
- \`\`\`python
  ㅇㅈㅇ
  ㅁㅈㅇㅁㅈㅇ
  hello world
  \`\`\`
  - ㅁㅇㅁㅈㅇ
  - ㅁㅇㅁㅈㅇ
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        // Should have:
        // 1. Root
        // 2. ListItem (parent) -> Label should be placeholder "📝 Code", NOT "hello world"
        // 3. CodeBlock (child of ListItem)
        // 4. ListItem (child node) -> "child 1"

        const lists = result.nodes.filter(n => n.type === 'list');
        const codeNodes = result.nodes.filter(n => n.type === 'code');

        // 1. Ensure NO 'ListItem' wrapping the code (label "📝 Code" or text)
        // The lists found should ONLY be the nested list items + container list
        const listWithCodeContent = lists.find(l =>
            l.data.label.includes('ㅇㅈㅇ') ||
            l.data.label.includes('hello world') ||
            l.data.label.includes('📝 Code')
        );
        expect(listWithCodeContent).toBeUndefined();

        // 2. Code node should exist
        expect(codeNodes).toHaveLength(1);




    });

    it('should handle table with nested list correctly (no text duplication)', () => {
        // User reported case:
        // - | A | B |
        //   |---|---|
        //   | 1 | 2 |
        //     - child A
        const mdx = `
- | A | B |
  |---|---|
  | 1 | 2 |
  - child A
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        const lists = result.nodes.filter(n => n.type === 'list');
        const tableNodes = result.nodes.filter(n => n.type === 'table');

        // Check NO wrapping list item
        const wrapperList = lists.find(l =>
            (l.data.label.includes('A') && l.data.label.includes('B')) ||
            l.data.label.includes('📊 Table')
        );
        expect(wrapperList).toBeUndefined();

        expect(tableNodes).toHaveLength(1);
    });

    it('should balance layout groups smartly', () => {
        // Scenario: ONE heavy section and THREE light sections.
        // Heavy section (Table + Code) -> Should go to Side A.
        // Light sections -> Should accumulate on Side B to balance.
        const mdx = `
# Heavy Section
| Header | Header |
| --- | --- |
| Data | Data |
| Data | Data |
\`\`\`js
const code = "long content";
\`\`\`

# Light A
- Item
# Light B
- Item
# Light C
- Item
`;
        const result = parseMdxToGraph(mdx);
        if (!result) return;

        const nodes = result.nodes;
        // Count how many "sections" (Headings) are on left vs right
        const sections = nodes.filter(n => n.type === 'section');
        const leftSections = sections.filter(n => n.data.direction === 'left');
        const rightSections = sections.filter(n => n.data.direction === 'right');

        // With alternating logic (Old): A(R), B(L), C(R), D(L) -> Balanced count? No, index driven.
        // Index 0 (Heavy) -> Right
        // Index 1 (Light) -> Left
        // Index 2 (Light) -> Right
        // Index 3 (Light) -> Left
        // Result: Right has Heavy+Light, Left has Light+Light. Unbalanced weight.

        // With greedy logic (New):
        // 1. Heavy -> Left (L: Heavy, R: 0)
        // 2. Light A -> Right (L: Heavy, R: Light)
        // 3. Light B -> Right (L: Heavy, R: 2*Light)
        // 4. Light C -> Right (L: Heavy, R: 3*Light)
        // Expected: 1 Section on Left (Heavy), 3 Sections on Right (Lights).

        // Note: The first item always goes to Left (0 <= 0 is True or False depending on impl).
        // My impl: if (leftWeight <= rightWeight) -> Left.
        // 0. Heavy -> Left. L=Big.
        // 1. Light A -> Right. R=Small.
        // 2. Light B -> Right. R=2*Small.
        // 3. Light C -> Right. R=3*Small.

        // So we expect 1 vs 3 split (or 3 vs 1).
        // If it was alternating, it would be 2 vs 2.

        const counts = [leftSections.length, rightSections.length].sort();
        expect(counts).toEqual([1, 3]);
    });
});
