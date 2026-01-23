# 화이트보드 기능 견적 분석

## 현재 프로젝트 규모

| 항목 | 수치 |
|------|------|
| 총 코드 | ~3,800줄 |
| 파일 수 | 32개 |
| 노드 타입 | 10가지 |
| 주요 라이브러리 | ReactFlow, Monaco, Zustand, MDX 파서 |

---

## 1. VSCode Extension 견적

### 아키텍처

```
VSCode Extension
├─ Extension Host (Node.js)
│  ├─ 파일 시스템 연동 (*.mdx 감시)
│  ├─ 커맨드 등록 (Open Whiteboard)
│  └─ 워크스페이스 상태 관리
└─ Webview Panel (React)
   ├─ 현재 WhiteboardCanvas 재사용
   ├─ Monaco → VSCode 네이티브 에디터 연동
   └─ Extension API 통신
```

### 작업 항목별 분류

| 작업 | 예상 작업량 | 비고 |
|------|-------------|------|
| **Extension 기본 구조** | | |
| - package.json, 빌드 설정 | 0.5일 | esbuild/webpack 설정 |
| - 커맨드 & 메뉴 등록 | 0.5일 | |
| - Webview Provider 구현 | 1일 | |
| **코드 마이그레이션** | | |
| - ReactFlow 캔버스 포팅 | 1일 | 대부분 재사용 |
| - 노드 컴포넌트 포팅 (10개) | 1일 | CSS 조정 필요 |
| - MDX 파서/직렬화 포팅 | 0.5일 | 그대로 사용 |
| - 레이아웃 알고리즘 포팅 | 0.5일 | 그대로 사용 |
| **VSCode 연동** | | |
| - 파일 시스템 API 연동 | 1일 | vscode.workspace |
| - 네이티브 에디터 동기화 | 1.5일 | TextDocument 동기화 |
| - 상태 저장 (Memento) | 0.5일 | |
| **UI 조정** | | |
| - VSCode 테마 호환 | 1일 | CSS Variables |
| - 키보드 단축키 충돌 해결 | 0.5일 | |
| - 반응형 Webview 레이아웃 | 0.5일 | |
| **테스트 & 배포** | | |
| - 테스트 | 1일 | |
| - Marketplace 배포 설정 | 0.5일 | |

### VSCode Extension 총 견적

| 구분 | 예상 |
|------|------|
| **총 작업량** | 약 11-13일 (1인 기준) |
| **난이도** | 중 (Webview 통신, 에디터 동기화) |
| **재사용률** | ~70% (캔버스, 파서, 노드) |
| **새로 작성** | ~1,500줄 (Extension Host 로직) |

### 핵심 도전 과제

1. VSCode-Webview 메시지 통신 설계
2. 네이티브 에디터 ↔ Webview 실시간 동기화
3. Extension 번들 크기 최적화 (ReactFlow가 큼)

---

## 2. 웹 서비스 (Supabase) 견적

### 아키텍처

```
Web Service
├─ Frontend (기존 Next.js 확장)
│  ├─ 현재 화이트보드 코드 재사용
│  ├─ 인증 UI (로그인/회원가입)
│  └─ 대시보드 (프로젝트 목록)
├─ Supabase Backend
│  ├─ Auth (이메일, OAuth)
│  ├─ Database (PostgreSQL)
│  │  ├─ users
│  │  ├─ projects
│  │  ├─ whiteboards
│  │  └─ collaborators
│  ├─ Storage (이미지/파일)
│  └─ Realtime (실시간 협업)
└─ Edge Functions (선택)
   └─ MDX 변환, AI 기능 등
```

### 작업 항목별 분류

| 작업 | 예상 작업량 | 비고 |
|------|-------------|------|
| **Supabase 설정** | | |
| - 프로젝트 생성 & 스키마 설계 | 0.5일 | |
| - RLS (Row Level Security) 설정 | 1일 | 핵심 보안 |
| - Storage 버킷 설정 | 0.5일 | |
| **인증 시스템** | | |
| - Supabase Auth 연동 | 0.5일 | @supabase/auth-helpers |
| - 로그인/회원가입 UI | 1일 | |
| - OAuth (Google, GitHub) | 0.5일 | |
| - 세션 관리 | 0.5일 | |
| **대시보드** | | |
| - 프로젝트 목록 페이지 | 1일 | |
| - 프로젝트 CRUD | 1일 | |
| - 화이트보드 목록/관리 | 1일 | |
| **화이트보드 저장** | | |
| - MDX 자동저장 연동 | 1일 | debounce, conflict 처리 |
| - 버전 히스토리 | 1일 | |
| - 이미지 업로드 연동 | 0.5일 | |
| **실시간 협업 (선택)** | | |
| - Supabase Realtime 연동 | 2일 | |
| - 커서 공유 | 1일 | |
| - 충돌 해결 (CRDT/OT) | 2-3일 | 복잡도 높음 |
| **공유 기능** | | |
| - 공유 링크 생성 | 0.5일 | |
| - 권한 관리 (뷰어/에디터) | 1일 | |
| - 공개/비공개 설정 | 0.5일 | |
| **테스트 & 배포** | | |
| - API 테스트 | 1일 | |
| - Vercel 배포 설정 | 0.5일 | |
| - 환경 변수 관리 | 0.5일 | |

### 웹 서비스 총 견적

#### 옵션 A: 기본 (저장/공유만)

| 구분 | 예상 |
|------|------|
| **총 작업량** | 약 12-14일 (1인 기준) |
| **난이도** | 중 |
| **재사용률** | ~90% (화이트보드 코드 거의 그대로) |
| **새로 작성** | ~2,000줄 |
| **Supabase 월비용** | Free ~ $25/월 |

#### 옵션 B: 실시간 협업 포함

| 구분 | 예상 |
|------|------|
| **총 작업량** | 약 18-22일 (1인 기준) |
| **난이도** | 상 (CRDT/충돌 해결) |
| **새로 작성** | ~3,500줄 |
| **Supabase 월비용** | $25 ~ $100/월 |

### Supabase 스키마 (예시)

```sql
-- users: Supabase Auth 자동 관리

create table projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users,
  name text not null,
  created_at timestamptz default now()
);

create table whiteboards (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade,
  title text not null,
  mdx_content text,
  metadata jsonb,
  updated_at timestamptz default now()
);

create table collaborators (
  project_id uuid references projects,
  user_id uuid references auth.users,
  role text check (role in ('viewer', 'editor', 'owner')),
  primary key (project_id, user_id)
);
```

---

## 비교 요약

| 항목 | VSCode Extension | 웹 서비스 (기본) | 웹 서비스 (협업) |
|------|------------------|------------------|------------------|
| **작업량** | 11-13일 | 12-14일 | 18-22일 |
| **코드 재사용** | 70% | 90% | 85% |
| **신규 코드** | ~1,500줄 | ~2,000줄 | ~3,500줄 |
| **런닝 비용** | 무료 | Free~$25/월 | $25-100/월 |
| **배포** | Marketplace | Vercel + Supabase | Vercel + Supabase |
| **사용자 관리** | 불필요 | 필요 | 필요 |
| **실시간 협업** | 불가 | 불가 | 가능 |
| **오프라인** | 가능 | 제한적 | 제한적 |

---

## 추천

- **개인 사용/개발자 대상**: VSCode Extension
- **일반 사용자 대상/협업 필요**: 웹 서비스 (Supabase)
- **둘 다 필요하다면**: 웹 서비스 먼저 → 코드 공유해서 Extension 개발
