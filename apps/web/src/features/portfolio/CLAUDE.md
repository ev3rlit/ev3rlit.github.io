# Features Layer — Portfolio

> MDX 콘텐츠에서 사용하는 유틸 UI 컴포넌트. Compound Components 패턴.

## 디렉토리 구조

```
features/portfolio/
└── ui/
    └── PortfolioComponents.tsx    ← 5개 Compound Components
```

## 컴포넌트 목록

### ProblemSolution (컨테이너)

Problem → Solution → Result 구조를 감싸는 래퍼 컴포넌트.

```tsx
<ProblemSolution>
  <Problem>문제 설명</Problem>
  <Solution>해결 방법</Solution>
  <Result>결과</Result>
</ProblemSolution>
```

- **스타일**: `rounded-2xl`, gradient 배경 (slate-50 → slate-100 / dark: stone-800 → stone-900), ring border
- **레이아웃**: `space-y-6` 수직 배치

### Problem
- **시각적 구분**: 빨간색 좌측 보더 (`border-l-4 border-red-400`)
- **아이콘**: 빨간 원 안의 `!` 마크
- **라벨**: `"Problem"` (uppercase, tracking-widest)

### Solution
- **시각적 구분**: 파란색 좌측 보더 (`border-l-4 border-blue-400`)
- **아이콘**: 번개 SVG 아이콘
- **라벨**: `"Solution"` (uppercase, tracking-widest)

### Result
- **시각적 구분**: 초록색 좌측 보더 (`border-l-4 border-green-400`)
- **아이콘**: 체크마크 SVG 아이콘
- **라벨**: `"Result"` (uppercase, tracking-widest)
- **텍스트**: `font-medium` (다른 컴포넌트보다 강조)

### TechDetail
- **용도**: 기술적 세부 사항 강조 블록
- **스타일**: indigo 배경 (`bg-indigo-50 / dark: bg-indigo-500/10`), ring border
- **아이콘**: 코드 SVG (`</>` 모양)
- **라벨**: `"Technical Details"` (uppercase)

### Lesson
- **용도**: 교훈/인사이트 강조 블록
- **스타일**: amber 배경 (`bg-amber-50 / dark: bg-amber-500/10`), ring border
- **아이콘**: 전구 SVG
- **라벨**: `"Lesson Learned"` (uppercase)

## 사용 패턴

MDX 파일이나 React 컴포넌트에서 import하여 사용:

```tsx
import { ProblemSolution, Problem, Solution, Result, TechDetail, Lesson } from '@/features/portfolio/ui/PortfolioComponents';
```

## 스타일 규칙

- 모든 컴포넌트 dark mode 지원 (`dark:` prefix)
- 컬러 체계: Problem=red, Solution=blue, Result=green, TechDetail=indigo, Lesson=amber
- 텍스트 크기: `text-[15px] leading-relaxed` 통일
- 라벨: `text-xs font-bold uppercase tracking-widest`
- 공통 패딩: `p-6`, margin: `my-6` 또는 `my-8`

## 새 컴포넌트 추가 시

1. 같은 파일(`PortfolioComponents.tsx`)에 추가
2. 기존 컬러 체계와 일관된 새 컬러 선택
3. 좌측 보더(4px) + 원형 아이콘 + 대문자 라벨 패턴 유지
4. `children: React.ReactNode` props 유지 (Compound Component)
5. dark mode 대응 필수

## 의존 관계

```
features/portfolio/
  └── (의존 없음 — 순수 UI 컴포넌트)
```
