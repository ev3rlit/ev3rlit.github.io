# Entities Layer — Post

> Post 도메인 모델 정의와 MDX 콘텐츠 API 함수. 블로그와 포트폴리오 양쪽에서 공유.

## 디렉토리 구조

```
entities/post/
├── model/
│   └── types.ts          ← Post, PostMeta 타입 정의
└── api/
    └── get-posts.ts      ← 블로그 + 포트폴리오 데이터 API 함수
```

> barrel export (`index.ts`) 없음. 직접 경로로 import.

## 타입 정의 (`model/types.ts`)

```typescript
interface PostMeta {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  draft?: boolean;       // true=초안 (production에서 필터링)
  [key: string]: any;    // order, 기타 커스텀 필드 허용
}

interface Post {
  slug: string;
  meta: PostMeta;
  content: string;       // MDX 원문 문자열
  readingTime?: string;
}
```

### 주요 사항
- `draft` 기본값은 `true` — production에서는 `draft: false`만 노출
- `[key: string]: any`로 frontmatter의 커스텀 필드(`order`, `project` 등) 허용
- `content`는 MDX 원문 (파싱은 소비자 측에서 수행)

## API 함수 (`api/get-posts.ts`)

### 블로그 API

| 함수 | 반환 | 용도 |
|------|------|------|
| `getAllPostSlugs()` | `string[]` | 전체 블로그 slug 목록 |
| `getPostList()` | `Promise<Post[]>` | 블로그 포스트 목록 (날짜 DESC, draft/exclude 필터링) |
| `getPostBySlug(slug)` | `Promise<Post \| null>` | 단일 포스트 조회 |
| `getPostWithNeighbors(slug)` | `Promise<{post, nextPost, prevPost} \| null>` | 이전/다음 포스트 포함 |
| `getPageContent(fileName)` | `Promise<Post \| null>` | 정적 페이지 콘텐츠 |

### 포트폴리오 API

| 함수 | 반환 | 용도 |
|------|------|------|
| `getPortfolioProjects()` | `Promise<Post[]>` | 전체 프로젝트 목록 (`order` 정렬) |
| `getProjectBySlug(slug)` | `Promise<Post \| null>` | 단일 프로젝트 조회 |
| `getExperiencesByProject(slug)` | `Promise<Post[]>` | 프로젝트별 경험 목록 (`order` 정렬) |
| `getExperienceDetail(project, experience)` | `Promise<Post \| null>` | 단일 경험 상세 |
| `getExperienceWithNeighbors(project, experience)` | `Promise<{experience, prev, next, total, current}>` | 슬라이드 네비 |
| `getPortfolioPostBySlug(slug)` | `Promise<Post \| null>` | 포트폴리오 단일 포스트 |

## 콘텐츠 디렉토리 구조

```
content/
├── {year}/{month}/{post}.mdx       ← 블로그 포스트
└── portfolio/
    └── {project}/
        ├── index.mdx                ← 프로젝트 메타 (title, date, order)
        └── {experience}.mdx         ← 경험 상세
```

### 콘텐츠 규칙
- **블로그**: `content/draft/`와 `content/portfolio/` 디렉토리는 블로그 목록에서 제외
- **포트폴리오**: `content/portfolio/{project}/index.mdx`가 프로젝트 진입점
- **파싱**: `gray-matter`로 frontmatter 추출
- **slug 생성**: 파일 경로를 `-`로 연결 (e.g., `2025-05-learning-postgresql`)
- **정렬**: 블로그=날짜 DESC, 포트폴리오=`order` 필드 ASC

## 의존 관계

```
entities/post/
  ├── shared/config/site.ts  (SITE_CONFIG.exclude — 블로그 필터링)
  └── gray-matter             (외부 패키지 — frontmatter 파싱)
```

## 사용처

- **블로그 라우트**: `app/(blog)/` 등에서 `getPostList()`, `getPostBySlug()` 사용
- **포트폴리오 Views**: `SwissDetailPage`에서 `Post` 타입 사용
- **포트폴리오 스토리 디테일**: Detail_* 컴포넌트는 이 API를 직접 사용하지 않음 (하드코딩된 데이터)
