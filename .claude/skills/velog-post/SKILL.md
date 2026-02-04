---
name: velog-post
description: "MDX 블로그 포스트를 Velog 마크다운 형식으로 변환한다. 'velog로 변환', 'velog 마크다운', 'export to velog', 'velog-post' 등의 요청에 트리거된다."
---

# Velog 포스트 변환 스킬

MDX 블로그 포스트를 Velog에 게시할 수 있는 마크다운 형식으로 변환한다.

## 변환 워크플로우

### 1단계: 원본 MDX 파일 확인

사용자에게 변환할 MDX 파일 경로를 확인한다.

```bash
# 최근 MDX 파일 목록
ls -lt apps/web/content/**/*.mdx | head -10
```

### 2단계: Frontmatter 변환

**MDX 원본:**
```yaml
---
title: "제목"
date: "2026-02-04"
description: "설명 텍스트"
tags: ["태그1", "태그2"]
draft: true
---
```

**Velog 변환:**
```yaml
---
title: "제목"
tags: ["태그1", "태그2"]
draft: true
---
```

변환 규칙:
- `date` 필드 제거 (velog가 자동 생성)
- `description` 필드 제거 (velog 미지원)
- `title`, `tags`, `draft` 유지

### 3단계: MDX 컴포넌트 처리

MDX 전용 컴포넌트는 velog에서 렌더링되지 않으므로 대체하거나 제거한다.

| MDX 컴포넌트 | 변환 방법 |
|-------------|----------|
| `<ComponentName />` | 제거 또는 스크린샷으로 대체 |
| `<Callout>텍스트</Callout>` | `> 텍스트` (인용문) |
| `<Tabs>...</Tabs>` | 일반 섹션으로 펼치기 |
| `import ...` | 제거 |

### 4단계: 원문 링크 추가

파일 끝에 블로그 원문 링크를 추가한다.

```markdown
> **[블로그 원문 보기](https://ev3rlit.github.io/blog/{slug})**
```

슬러그 규칙: `{year}-{month}-{filename}`
- 예: `apps/web/content/2026/02/nestjs-dto.mdx` → `2026-02-nestjs-dto`

### 5단계: 파일 저장

저장 경로: `apps/web/_external-posts/{year}/{month}/{filename}_velog.md`

```bash
# 디렉토리 생성 (필요시)
mkdir -p apps/web/_external-posts/2026/02
```

## 변환 체크리스트

변환 완료 후 확인사항:

- [ ] `date` 필드 제거됨
- [ ] `description` 필드 제거됨
- [ ] MDX 컴포넌트 모두 처리됨
- [ ] `import` 문 제거됨
- [ ] 원문 링크 추가됨
- [ ] 이미지 경로가 절대 URL인지 확인

## 예시

### 변환 전 (MDX)
```mdx
---
title: "NestJS에서 API 사용자에게 친절한 에러 메시지 보내기"
date: "2026-02-04"
description: "API를 배포하고 나면..."
tags: ["NestJS", "TypeScript"]
draft: true
---

import { Callout } from '@/components/Callout'

## 도입부

<Callout>
중요한 내용입니다.
</Callout>

<GraphwriteDemo />
```

### 변환 후 (Velog)
```markdown
---
title: "NestJS에서 API 사용자에게 친절한 에러 메시지 보내기"
tags: ["NestJS", "TypeScript"]
draft: true
---

## 도입부

> 중요한 내용입니다.

> **[블로그 원문 보기](https://ev3rlit.github.io/blog/2026-02-nestjs-dto-validation-journey)**
```
