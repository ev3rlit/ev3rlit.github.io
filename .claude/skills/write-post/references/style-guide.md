# 블로그 포스트 스타일 가이드

## 관점별 작성 패턴

### 1. 학습자/삽질기 관점
"내가 겪은 문제와 해결 과정"을 공유하는 형태.

**특징:**
- 1인칭 시점 ("저는", "제가")
- 시간순 서술 ("처음에는", "그런데", "결국")
- 실수와 깨달음 강조

**예시 도입부:**
```markdown
API를 배포하고 테스트를 돌려보니 이상한 일이 벌어졌습니다.
분명 `id: number`로 타입을 지정했는데, 왜 조회가 안 될까요?
```

### 2. API 제공자/가이드 관점
"사용자에게 어떻게 알려줄 것인가"에 초점.

**특징:**
- 질문 중심 구조 ("어떻게 알려주지?")
- 사용자 입장에서 서술
- 에러 메시지의 명확성 강조

**예시 도입부:**
```markdown
API를 배포하고 나면 여러 가지 질문이 생깁니다.
- 사용자가 잘못된 필드를 보내면 어떻게 알려주지?
- 빈 요청을 보내면 어떻게 안내하지?
```

### 3. 튜토리얼/How-to 관점
단계별로 따라할 수 있는 가이드.

**특징:**
- 단계별 번호 매기기
- 완성 코드 제공
- 중간 결과 확인 포인트

**예시 도입부:**
```markdown
이 글에서는 NestJS + Zod로 타입 안전한 API를 만드는 방법을
단계별로 설명합니다.
```

## 섹션 구조 패턴

### 문제-해결 구조 (권장)
```markdown
## 질문: [문제 상황]

[문제 설명 - 코드 예제]

### 해결: [해결책 이름]

[해결 코드]

[결과 확인]
```

### Before-After 구조
```markdown
## [주제]

### Before (문제)
[잘못된 코드/상황]

### After (해결)
[올바른 코드/상황]
```

## 코드 블록 가이드

### 언어별 하이라이팅
```typescript
// TypeScript/JavaScript
```

```bash
# Shell 명령어 / HTTP 요청
```

```yaml
# 설정 파일
```

```go
// Go 코드 (비교용)
```

### 주석 스타일
```typescript
// 1. 파일 경로는 첫 줄에
// posts.controller.ts

// 2. 중요한 부분에만 주석
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  // id는 이제 진짜 number ← 핵심 포인트
  return this.postsService.findOne(id);
}

// 3. 문제 있는 부분 표시
@Body() dto: UpdatePostDto,  // 🚨 여기서 검증이 안 됨!
```

### HTTP 요청/응답 예시
```bash
# 요청
PUT /posts/1
{ "title": "새 제목", "unknown": "값" }

# 응답 (400 Bad Request)
{
  "statusCode": 400,
  "message": "Unrecognized key(s) in object: 'unknown'"
}
```

## 마무리 섹션 패턴

### 요약 테이블
| 문제 | 해결책 |
|------|--------|
| URL 파라미터 타입 | `ParseIntPipe` |
| 정의되지 않은 필드 | `.strict()` |
| 빈 요청 | `.refine()` |

### 핵심 교훈 (번호 목록)
1. **첫 번째 교훈** - 설명
2. **두 번째 교훈** - 설명
3. **세 번째 교훈** - 설명

### 다음 글 예고 (선택)
```markdown
다음에는 NestJS의 Guard와 Interceptor에 대해 정리해볼 예정입니다.
```

## Frontmatter 가이드

### 태그 컨벤션
- 기술 스택: `NestJS`, `TypeScript`, `React`, `Go`
- 주제: `Validation`, `DTO`, `API`
- 유형: `TIL`, `Tutorial`, `DevLog`

### 슬러그 컨벤션
- 소문자, 하이픈 구분: `nestjs-dto-validation-journey`
- 날짜 포함 안 함 (경로에 이미 있음)
- 핵심 키워드 포함

### draft 상태
- `draft: true` - 작성 중, 검토 필요
- `draft: false` - 공개 상태

## Velog 변환 체크리스트

- [ ] `date` 필드 제거
- [ ] `description` 필드 제거
- [ ] MDX 컴포넌트 제거 또는 대체
  - `<GraphwriteDemo />` → 스크린샷 또는 제거
  - `<Callout>` → `> ` 인용문으로 대체
- [ ] 원문 링크 추가
- [ ] 이미지 경로 확인 (절대 경로로)
