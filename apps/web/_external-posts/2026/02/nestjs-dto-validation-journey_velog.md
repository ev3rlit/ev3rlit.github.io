---
title: "NestJS에서 API 사용자에게 친절한 에러 메시지 보내기"
tags: ["NestJS", "TypeScript", "Zod", "Validation", "DTO", "TIL"]
draft: true
---

## 들어가며: API 사용자에게 뭐가 잘못됐는지 어떻게 알려주지?

API를 배포하고 나면 여러 가지 질문이 생깁니다.

- 사용자가 **정의되지 않은 필드**를 보내면 어떻게 알려주지?
- **빈 요청**을 보내면 클라이언트 실수일 수 있는데, 어떻게 안내하지?
- 서버에서 **원하는 타입**(구조체)으로 요청을 받으려면 어떻게 해야 하지?
- URL 파라미터를 **문자열이 아닌 숫자**로 받으려면?

이 글에서는 NestJS + Zod 조합으로 이 질문들을 하나씩 해결해봅니다.

### 왜 Zod인가?

NestJS 공식 문서는 `class-validator`를 권장하지만, 저는 Zod를 선택했습니다.

```typescript
// class-validator: 데코레이터 기반
export class CreatePostDto {
  @IsString()
  @MinLength(1)
  title: string;
}

// Zod: 스키마 기반 - 타입 추론이 자동
export const CreatePostSchema = z.object({
  title: z.string().min(1),
});
export type CreatePostDto = z.infer<typeof CreatePostSchema>;  // 타입 자동 생성
```

Zod는 스키마 하나로 **검증 로직과 TypeScript 타입을 동시에** 정의할 수 있습니다. 중복이 없어서 유지보수가 편합니다.

---

## 질문 1: URL 파라미터를 숫자로 받으려면?

`GET /posts/1`에서 `1`을 숫자로 받고 싶습니다. 그런데 문제가 있습니다.

```typescript
@Get(':id')
async findOne(@Param('id') id: number) {
  console.log(typeof id);  // 'string' 😱
  return this.postsService.findOne(id);
}
```

TypeScript에서 `id: number`라고 선언해도, **런타임에는 문자열**입니다. HTTP URL의 모든 파라미터는 문자열이기 때문입니다. `'1' === 1`은 `false`니까 DB 조회도 실패합니다.

### 해결: ParseIntPipe로 변환 + 에러 메시지

```typescript
import { ParseIntPipe } from '@nestjs/common';

@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  // id는 이제 진짜 number
  return this.postsService.findOne(id);
}
```

사용자가 잘못된 값을 보내면 **자동으로 명확한 에러**를 반환합니다.

```bash
GET /posts/abc

# 응답 (400 Bad Request)
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)"
}
```

사용자는 "아, 숫자를 보내야 하는구나"를 바로 알 수 있습니다.

---

## 질문 2: 정의되지 않은 필드를 보내면 어떻게 알려주지?

사용자가 API 문서에 없는 필드를 보내는 경우가 있습니다.

```bash
PUT /posts/1
{
  "title": "새 제목",
  "hackerField": "이상한 값"   # API에 없는 필드
}
```

기본적으로 Zod는 **정의되지 않은 필드를 무시**합니다. 이러면 사용자는 자기가 보낸 필드가 적용됐다고 착각할 수 있습니다.

### 해결: `.strict()`로 알려주기

```typescript
export const UpdatePostSchema = CreatePostSchema.partial().strict();
```

이제 사용자에게 **명확한 에러 메시지**가 갑니다.

```bash
# 응답 (400 Bad Request)
{
  "statusCode": 400,
  "message": "Unrecognized key(s) in object: 'hackerField'"
}
```

"이 필드는 API에서 지원하지 않습니다"를 사용자가 바로 알 수 있습니다.

---

## 질문 3: 빈 요청을 보내면 어떻게 알려주지?

부분 업데이트 API에서 모든 필드가 optional이면, 빈 객체도 유효한 요청이 됩니다.

```bash
PUT /posts/1
{}   # 아무것도 수정 안 함
```

하지만 이건 대부분 **클라이언트 실수**입니다. 알려줘야 합니다.

### 해결: `.refine()`으로 커스텀 검증

```typescript
export const UpdatePostSchema = CreatePostSchema
  .partial()
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: '최소 하나의 필드가 필요합니다.' }
  );
```

```bash
# 응답 (400 Bad Request)
{
  "statusCode": 400,
  "message": "최소 하나의 필드가 필요합니다."
}
```

사용자는 "아, 뭔가 빠뜨렸구나"를 알 수 있습니다.

---

## 질문 4: 요청을 구조체(DTO)로 받으려면?

Zod 스키마를 정의했다고 끝이 아닙니다. **실제로 검증을 적용**해야 합니다.

```typescript
// 🚨 이렇게만 하면 검증이 안 됨!
@Put(':id')
async update(@Body() dto: UpdatePostDto) {
  return this.postsService.update(dto);
}
```

TypeScript 타입은 런타임에 존재하지 않습니다. Zod 스키마를 실제로 실행하는 Pipe가 필요합니다.

### 해결: ZodValidationPipe 생성

```typescript
// zod-validation.pipe.ts
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }
    return result.data;  // 검증된 데이터만 반환
  }
}
```

### 사용법: 컨트롤러에 적용

```typescript
@Put(':id')
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body(new ZodValidationPipe(UpdatePostSchema)) dto: UpdatePostDto,
) {
  // dto는 이제 검증 완료된 구조체
  return this.postsService.update(id, dto);
}
```

이제 잘못된 요청이 오면 **자동으로 에러 응답**이 갑니다.

```bash
POST /posts
{ "title": "" }   # 빈 문자열

# 응답 (400 Bad Request)
{
  "statusCode": 400,
  "message": {
    "title": { "_errors": ["제목은 1자 이상이어야 합니다."] }
  }
}
```

---

## 전체 코드: 사용자 친화적 API 검증

모든 질문의 해결책을 종합한 전체 코드입니다.

```typescript
// schemas/post.schema.ts
import { z } from 'zod';

// 생성 스키마 - 한글 에러 메시지로 사용자에게 친절하게
export const CreatePostSchema = z.object({
  title: z
    .string({ required_error: '제목은 필수입니다.' })
    .min(1, '제목은 1자 이상이어야 합니다.')
    .max(100, '제목은 100자 이하여야 합니다.'),
  content: z
    .string({ required_error: '내용은 필수입니다.' })
    .min(1, '내용은 1자 이상이어야 합니다.'),
});

// 수정 스키마 - 모든 엣지케이스 처리
export const UpdatePostSchema = CreatePostSchema
  .partial()           // 부분 업데이트 허용
  .strict()            // 정의되지 않은 필드 → 에러
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: '최소 하나의 필드가 필요합니다.' }  // 빈 요청 → 에러
  );

// 타입 자동 추출
export type CreatePostDto = z.infer<typeof CreatePostSchema>;
export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;
```

```typescript
// posts.controller.ts
@Controller('posts')
export class PostsController {

  // URL 파라미터 → 숫자로 변환
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  // Body → 검증된 구조체로 변환
  @Post()
  create(@Body(new ZodValidationPipe(CreatePostSchema)) dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  // 부분 업데이트 + 모든 검증
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(UpdatePostSchema)) dto: UpdatePostDto,
  ) {
    return this.postsService.update(id, dto);
  }
}
```

### 사용자가 받게 되는 에러 메시지들

| 잘못된 요청 | 응답 |
|------------|------|
| `GET /posts/abc` | `"Validation failed (numeric string is expected)"` |
| `PUT /posts/1` + `{}` | `"최소 하나의 필드가 필요합니다."` |
| `PUT /posts/1` + `{"unknown": "값"}` | `"Unrecognized key(s) in object: 'unknown'"` |
| `POST /posts` + `{"title": ""}` | `"제목은 1자 이상이어야 합니다."` |

모든 에러 메시지가 **무엇이 잘못됐는지 명확하게** 알려줍니다.

---

## 정리

| 질문 | 해결책 |
|------|--------|
| URL 파라미터를 숫자로 받으려면? | `ParseIntPipe` |
| 정의되지 않은 필드 알려주려면? | `.strict()` |
| 빈 요청 알려주려면? | `.refine()` |
| Body를 구조체로 받으려면? | `ZodValidationPipe` |

핵심은 **사용자가 잘못 사용했을 때, 무엇이 잘못됐는지 바로 알 수 있게 하는 것**입니다. 에러 메시지가 친절하면 API 문서를 다시 찾아볼 필요가 없습니다.

> **[블로그 원문 보기](https://ev3rlit.github.io/blog/2026-02-nestjs-dto-validation-journey)**
