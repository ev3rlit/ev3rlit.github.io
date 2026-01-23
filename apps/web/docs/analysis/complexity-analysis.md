# Large File Analysis & Complexity Hotspots Report

## Executive Summary
- **Total files analyzed**: 50 largest source files
- **Files >500 lines**: 1 file (parser.ts with 578 lines)
- **Critical complexity hotspots**: 5 files identified
- **Highest cyclomatic complexity**: parser.ts (traverse function)

---

## 1. FILES OVER 500 LINES

### 🔴 CRITICAL: parser.ts (578 lines)
**Path**: `./src/features/mdx-whiteboard/lib/parser.ts`

**Complexity Metrics**:
- Lines: 578
- Functions: 31
- Conditionals: 91
- Loops: 35
- Max nesting depth: 9 levels
- **Cyclomatic Complexity**: ~45 (estimated)

**Hotspot Analysis**:
1. **traverse() function (lines 82-437)** - 355 lines
   - Massive switch-case logic for node type handling
   - 9 levels of nesting
   - Handles 8+ different node types (heading, listItem, mdxJsxFlowElement, table, code, blockquote, paragraph, list)
   - Complex state management with stack and parent tracking

2. **listItem processing (lines 126-218)** - 92 lines
   - Nested conditionals for promotable logic
   - Multiple child type checks
   - Complex label generation with 5+ branches

3. **processChildren() helper (lines 440-469)** - 29 lines
   - Stateful sibling tracking
   - Adjacency rule logic (Paragraph -> List)

**Refactoring Recommendations**:
- ✅ Extract node type handlers into separate functions (e.g., `handleHeading()`, `handleListItem()`, etc.)
- ✅ Use Strategy pattern for node type processing
- ✅ Split into multiple files: `parser.ts`, `nodeHandlers.ts`, `textExtraction.ts`
- ✅ Reduce nesting by early returns
- ✅ Extract label generation logic into dedicated function

---

## 2. HIGH COMPLEXITY FILES (300-500 LINES)

### 🟡 parser.test.ts (351 lines)
**Path**: `./src/features/mdx-whiteboard/lib/parser.test.ts`

**Metrics**:
- Functions: 59 (mostly test cases)
- Conditionals: 33
- Nesting: 2 levels (acceptable for tests)

**Status**: ✅ Acceptable - Test files naturally have many functions

---

### 🟡 Sidebar.tsx (307 lines)
**Path**: `./src/shared/ui/sidebar/Sidebar.tsx`

**Metrics**:
- Lines: 307
- Functions: 23
- Conditionals: 63
- Loops: 8
- Nesting: 5 levels

**Hotspot Analysis**:
1. Multiple component definitions in single file (Sidebar, SidebarGroup, SidebarItem, etc.)
2. Complex conditional rendering logic
3. State management spread across components

**Refactoring Recommendations**:
- ✅ Split into separate files per component
- ✅ Extract shared logic into hooks
- ✅ Consider component composition pattern

---

### 🟡 nodesToMdx.ts (259 lines)
**Path**: `./src/features/mdx-whiteboard/lib/nodesToMdx.ts`

**Metrics**:
- Functions: 33
- Conditionals: 55
- Nesting: 5 levels

**Hotspot Analysis**:
1. Reverse transformation logic (graph -> MDX)
2. Multiple node type serializers
3. Complex indentation and formatting logic

**Refactoring Recommendations**:
- ✅ Extract serializers into separate functions
- ✅ Use visitor pattern for node traversal
- ✅ Simplify indentation logic

---

### 🟡 monacoAutocomplete.ts (259 lines)
**Path**: `./src/features/mdx-whiteboard/lib/monacoAutocomplete.ts`

**Metrics**:
- Functions: 17
- Conditionals: 11
- Nesting: 4 levels

**Status**: ✅ Moderate complexity - acceptable for Monaco integration

---

## 3. COMPLEXITY HOTSPOT SUMMARY

### Top 5 Most Complex Functions

| Rank | Function | File | Lines | Complexity | Issue |
|------|----------|------|-------|------------|-------|
| 1 | `traverse()` | parser.ts | 355 | ~45 | God function, 9-level nesting |
| 2 | `processChildren()` | parser.ts | 29 | ~8 | Stateful sibling tracking |
| 3 | `extractCurrentNodeText()` | parser.ts | 26 | ~6 | Recursive text extraction |
| 4 | `toggleGroup()` | Sidebar.tsx | 20 | ~5 | Nested conditionals |
| 5 | `extractTableData()` | parser.ts | 24 | ~4 | Nested loops |

---

## 4. ARCHITECTURAL CONCERNS

### 🔴 Critical Issues

1. **parser.ts is a God Object**
   - Single file handles parsing, traversal, node creation, edge creation, text extraction
   - Violates Single Responsibility Principle
   - Difficult to test individual components
   - High cognitive load for maintenance

2. **Deep Nesting (9 levels)**
   - Makes code hard to follow
   - Increases bug risk
   - Difficult to debug

3. **Lack of Separation of Concerns**
   - Parsing logic mixed with graph construction
   - Text extraction mixed with node processing
   - No clear boundaries between responsibilities

### 🟡 Moderate Issues

1. **Component Sprawl in Sidebar.tsx**
   - Multiple components in single file
   - Shared state management
   - Could benefit from splitting

2. **Test File Size**
   - parser.test.ts is large but acceptable
   - Consider splitting by feature area

---

## 5. REFACTORING PRIORITY

### Priority 1: parser.ts (CRITICAL)
**Estimated effort**: 2-3 days
**Impact**: High - Core parsing logic

**Action Plan**:
```
1. Extract node handlers:
   - src/features/mdx-whiteboard/lib/handlers/
     - headingHandler.ts
     - listItemHandler.ts
     - componentHandler.ts
     - tableHandler.ts
     - codeHandler.ts
     - blockquoteHandler.ts
     - paragraphHandler.ts

2. Extract utilities:
   - src/features/mdx-whiteboard/lib/utils/
     - textExtraction.ts
     - nodeIdGenerator.ts
     - stackManager.ts

3. Refactor traverse() to use handler registry:
   const handlers = {
     heading: handleHeading,
     listItem: handleListItem,
     // ...
   };
   const handler = handlers[node.type];
   if (handler) return handler(node, context);
```

### Priority 2: Sidebar.tsx (MODERATE)
**Estimated effort**: 1 day
**Impact**: Medium - UI component organization

**Action Plan**:
```
Split into:
- Sidebar.tsx (main container)
- SidebarGroup.tsx
- SidebarItem.tsx
- SidebarContext.tsx
- useSidebarState.ts (hook)
```

### Priority 3: nodesToMdx.ts (LOW)
**Estimated effort**: 1 day
**Impact**: Low - Less frequently modified

---

## 6. METRICS DASHBOARD

### File Size Distribution
```
>500 lines:  1 file  (2%)
300-500:     4 files (8%)
200-300:     8 files (16%)
<200:       37 files (74%)
```

### Complexity Distribution
```
High (CC >20):     1 file  (parser.ts)
Medium (CC 10-20): 3 files
Low (CC <10):     46 files
```

### Nesting Depth
```
>7 levels:  1 file  (parser.ts - CRITICAL)
5-7 levels: 3 files (MODERATE)
<5 levels: 46 files (ACCEPTABLE)
```

---

## 7. RECOMMENDATIONS

### Immediate Actions (This Sprint)
1. ✅ Add complexity linting rules (ESLint complexity plugin)
2. ✅ Set max file size limit (400 lines)
3. ✅ Set max function size limit (50 lines)
4. ✅ Set max nesting depth (4 levels)

### Short-term (Next Sprint)
1. ✅ Refactor parser.ts (Priority 1)
2. ✅ Add unit tests for extracted handlers
3. ✅ Document architecture decisions

### Long-term (Next Quarter)
1. ✅ Establish code review checklist for complexity
2. ✅ Implement automated complexity reporting in CI
3. ✅ Regular complexity audits (monthly)

---

## 8. TOOLS & AUTOMATION

### Recommended Tools
```bash
# Install complexity analysis tools
npm install -D eslint-plugin-complexity
npm install -D @typescript-eslint/eslint-plugin

# Add to .eslintrc.js
rules: {
  'complexity': ['warn', 10],
  'max-lines': ['warn', 400],
  'max-lines-per-function': ['warn', 50],
  'max-depth': ['warn', 4],
  'max-nested-callbacks': ['warn', 3]
}
```

### CI Integration
```yaml
# .github/workflows/complexity-check.yml
- name: Complexity Analysis
  run: |
    npx eslint --ext .ts,.tsx --max-warnings 0 src/
    npx ts-complexity --threshold 10 src/
```

---

## CONCLUSION

**Critical Finding**: parser.ts is the primary complexity hotspot requiring immediate attention.

**Risk Level**: 🔴 HIGH
- Single point of failure for MDX parsing
- High maintenance cost
- Difficult to extend with new node types

**Next Steps**:
1. Create refactoring task for parser.ts
2. Implement complexity linting rules
3. Schedule code review session for architecture discussion

