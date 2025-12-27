---
trigger: always_on
---

### 📋 FSD 기반 MDX 블로그

**Role:**
너는 10년 차 시니어 프론트엔드 엔지니어이자 시스템 아키텍트야. **Next.js (App Router)**와 **FSD (Feature-Sliced Design)** 아키텍처에 대한 깊은 이해가 있고, 확장 가능한 코드베이스를 설계하는 데 능숙해.

**Goal:**
개발자가 자신의 학습 내용을 기록하고 시각화할 수 있는 **"Interactive MDX Blog"**의 프로토타입을 만들어줘. 정적 배포(GitHub Pages)가 가능해야 하며, 단순한 텍스트 렌더링을 넘어 SQL 실행, 다이어그램 렌더링 등의 상호작용이 가능해야 해.

**Tech Stack:**

* **Framework:** Next.js 14+ (App Router, TypeScript)
* **Styling:** Tailwind CSS (Typography plugin 포함)
* **Architecture:** FSD (Feature-Sliced Design) v2
* **Content Processing:** `next-mdx-remote` (RSC 호환), `gray-matter`
* **Interactive Libs:** `@electric-sql/pglite` (Browser-based Postgres), `reactflow`
* **State Management:** Zustand (필요시)
* **Package Manager:** npm

---

### 🏛️ Architecture & Folder Structure (FSD)

이 프로젝트는 엄격한 **FSD(Feature-Sliced Design)** 원칙을 따른다.
Next.js의 App Router(`app/`)는 오직 라우팅 진입점(Entry point) 역할만 수행하고, 실제 로직은 `src/` 하위의 FSD 계층에서 관리한다.

**Directory Rule:**

```text
root/
├── content/                     # MDX 파일 저장소 (연/월/글이름 구조)
│   └── 2025/
│       └── 05/
│           └── learning-postgresql.mdx
├── public/
├── src/
│   ├── app/                     # [App Layer] Next.js Routing, Providers, Global CSS
│   │   ├── layout.tsx
│   │   ├── page.tsx             # 메인 홈 (pages/home import)
│   │   └── blog/
│   │       └── [slug]/
│   │           └── page.tsx     # 상세 페이지 (pages/post-detail import)
│   ├── pages/                   # [Pages Layer] 라우트별 페이지 조합
│   │   ├── home/
│   │   └── post-detail/
│   ├── widgets/                 # [Widgets Layer] Header, Footer, PostList, TOC
│   ├── features/                # [Features Layer] 유저 상호작용 기능
│   │   ├── mdx-viewer/          # MDX 렌더링 및 Custom Component 매핑 로직
│   │   ├── sql-playground/      # PGlite 실행기 컴포넌트
│   │   └── schema-diagram/      # React Flow 다이어그램 뷰어
│   ├── entities/                # [Entities Layer] 비즈니스 로직 (데이터 모델)
│   │   └── post/                # Post 타입 정의, 파일 시스템 읽기(fs) 로직
│   └── shared/                  # [Shared Layer] 공용 UI, 유틸리티
│       ├── ui/                  # Button, Card 등 기본 UI (Shadcn/UI 스타일)
│       ├── lib/                 # 날짜 포맷팅, clsx 등
│       └── config/

```

---

### 🚀 Functional Requirements

**1. Data Layer (Entities/Post)**

* `content` 폴더 내의 `.mdx` 파일을 재귀적으로 탐색하여 읽어오는 로직을 작성해라.
* **핵심 요구사항:** 폴더 구조가 `year/month/postname.mdx`이므로, URL Slug를 생성할 때 이 구조를 평탄화(flatten)하거나 경로를 유지하는 로직이 필요하다. (예: slug를 `2025-05-learning-postgresql` 처럼 유니크하게 만들거나, path 자체를 id로 사용)
* Node.js `fs` 모듈을 사용하여 Build Time에 데이터를 가져와야 한다.

**2. MDX Engine (Features/Mdx-viewer)**

* `next-mdx-remote/rsc`를 사용하여 서버 사이드에서 MDX를 렌더링해라.
* `SqlPlayground`, `SchemaDiagram`, `Callout` 컴포넌트를 MDX 내에서 사용할 수 있도록 `components` 객체에 매핑해라.
* Tailwind Typography (`prose` 클래스)를 사용하여 마크다운 기본 스타일을 적용해라.

**3. Interactive Components (Features)**

* **SqlPlayground:** `@electric-sql/pglite`를 사용하여 브라우저 메모리상에서 SQL을 실행하고 결과를 Table로 보여주는 Client Component를 구현해라. (초기화 쿼리 `setup` props 지원)
* **SchemaDiagram:** `reactflow`를 사용하여 노드 기반 다이어그램을 그리는 Client Component를 구현해라. (반드시 컨테이너 높이 지정 필요)

**4. GitHub Pages Deployment**

* `next.config.js`에 `output: 'export'` 설정을 추가하여 정적 HTML로 빌드되도록 해라.
* 이미지 최적화(`unoptimized: true`) 설정도 포함해라.

---
