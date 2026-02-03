---
title: "Remotion에서 영감을 얻다: 왜 나는 리액트로 마인드맵을 만드는가"
tags: ["AI-First", "Graphwrite", "Skill", "TypeScript", "Whiteboard", "DevLog", "Mindmap", "Tailwind CSS"]
draft: true
---

## 트렌드의 변화, 그리고 우연한 발견

최근 앱 개발의 트렌드가 급격하게 변화하고 있음을 느낍니다. 화려한 GUI 버튼을 줄이고, 최소한의 유저 인터랙션만을 남겨두는 미니멀리즘, 그리고 <b>Claude Code</b>, <b>Gemini CLI</b> 처럼 텍스트 기반의 채팅이나 터미널(CLI)로 제어하는 방식이 주류로 떠오르고 있습니다.

복잡한 GUI 조작 대신, 텍스트 한 줄로 의도를 전달하는 시대입니다. [Stitch](https://stitch.withgoogle.com/), [Flow](https://labs.google/flow/about), [Figma](https://www.figma.com/), [Meshy AI](https://www.meshy.ai/), 그리고 [Remotion](https://www.remotion.dev/)까지. 이들은 모두 사용자의 다양한 입력을 텍스트 창 하나로 통합하고 있습니다.

이 흐름 속에서 최근 Vercel이 공개한 [skill.sh](https://skills.sh/)를 살펴보다가 우연히 [Remotion](https://www.remotion.dev/)이라는 라이브러리를 접하게 되었습니다. <i>'Remotion is a framework for creating videos programmatically using React.'</i> (React를 이용해 프로그래밍 방식으로 비디오를 만드는 프레임워크).

이 문구를 보는 순간, 새로운 가능성을 직감했습니다. 영상 편집이라는, 가장 직관적이고 감각적인 영역조차 '코드'로 제어할 수 있다면, 우리가 '생각'을 정리하는 방식도 바꿀 수 있지 않을까?

## 기존 마인드맵 도구의 한계

학창 시절, 저는 왼손잡이라 글씨 쓰는 게 유독 서툴렀습니다. 친구들이 칠판 내용을 속기사처럼 받아 적을 때, 저는 그 속도를 도저히 따라갈 수 없었죠. 수업 시간 내에 빼곡하게 노트를 채우는 친구들이 그저 부러웠습니다.

그래서 찾은 대안이 바로 '마인드맵'이었습니다.

모든 문장을 적는 대신 핵심 키워드만 적고 관계를 연결하는 방식. 이 방법은 전체적인 큰 그림을 파악하는 데 탁월했고, 덕분에 학습 효율도 꽤 좋았습니다. (노트가 너무 난해해서 친구들에게 빌려줄 수 없다는 단점만 빼면요.)

문제는 무대를 '종이'에서 '디지털'로 옮기면서 시작됐습니다.

종이와 펜을 쓸 때는 직관적이었습니다. 원하는 곳에 긋고 쓰면 끝이니까요. 하지만 시중의 마인드맵 앱들은 제 생각의 속도를 따라주지 못했습니다.

1. 도형을 생성하고
2. 마우스로 위치를 잡고
3. 텍스트를 입력하고
4. 다시 선을 연결하고...

생각은 이미 저 멀리 뻗어나가고 있는데, 손은 마우스와 씨름하며 도형의 '줄 맞춤'을 고민하고 있었습니다. 생각의 지도를 그리는 게 아니라, 마치 '도형 배치 게임'을 하는 기분이었습니다.

기존의 GUI 툴은 너무 번거로웠고, 그렇다고 JSON 같은 데이터 포맷으로 생각을 정리하자니 너무 건조했습니다.

## 파일은 AI 에이전트를 위한 인터페이스다

여기서 다시 Remotion이 준 영감을 떠올렸습니다.

> "사람은 방향성만 제시하고, 구체적인 작업은 AI가 다루기 쉬운 프로그래밍 기반의 라이브러리에 맡기자."

지금까지 우리는 마인드맵 파일을 '사람이 보기 위한 저장소'로만 생각했습니다. 하지만 관점을 바꿔, 파일을 <mark>AI 에이전트가 다룰 수 있는 수단</mark>으로 정의한다면 어떨까요?

AI에게 가장 친숙하고, 구조를 이해하기 쉬우며, 동시에 사람이 읽기에도 명확한 포맷. 그 답은 <mark>선언형 프로그래밍(Declarative Programming)</mark>에 있었습니다.

왜 하필 선언형 프로그래밍이었을까요? 저는 이 선택이 단순한 기술적 선호를 넘어, '생각의 구조'와 '코드의 구조'를 일치시키는 과정이었다고 확신합니다.

**첫째, 생각의 모양과 코드의 모양은 닮아 있습니다.**
우리의 뇌가 마인드맵을 그릴 때를 떠올려봅시다. 중심 주제에서 가지가 뻗어나가고, 그 가지 끝에 세부 내용이 달립니다. 즉, 전형적인 **트리(Tree) 구조**입니다.
재미있게도 React의 컴포넌트 구조 역시 `App`에서 `Parent`, 그리고 `Child`로 이어지는 트리 구조를 가집니다.

* **마인드맵:** Root → Branch → Leaf
* **React:** Provider → Component → Children

이 둘은 '구조적 동형성(Isomorphism)'을 가집니다. 굳이 뇌의 생각을 2차원 좌표 평면의 `(x, y)` 좌표로 번역할 필요 없이, "이 생각은 저 생각의 하위 개념이야"라고 코드에 포함(Nesting)시키기만 하면 됩니다. 직관이 곧 코드가 되는 경험입니다.

**둘째, '어떻게(How)'가 아닌 '무엇(What)'에 집중할 수 있습니다.**
기존의 명령형(Imperative) 방식이나 그래픽 툴에서는 화면을 구성하기 위해 수많은 '과정'을 제어해야 했습니다. "사각형을 오른쪽으로 10픽셀 옮기고, 선을 다시 연결해."라는 식이죠.
하지만 선언형 프로그래밍은 다릅니다. 위치를 계산하는 건 컴퓨터에게 맡기고, 우리는 단지 **관계**만 정의하면 됩니다.

> "A 컴포넌트 안에 B 컴포넌트가 있다."

이 한 줄의 선언으로 모든 배치는 끝납니다. 시각적인 렌더링은 엔진이 알아서 처리하니까요. 덕분에 사용자는 디자인 노동에서 해방되어, 오직 정보의 논리적 흐름에만 몰입할 수 있습니다.

<b>셋째, 코드는 AI가 가장 잘 이해하는 언어입니다.</b>
이 프로젝트의 핵심인 'AI 에이전트' 관점에서 볼 때, 이점은 더욱 명확해집니다.
거대 언어 모델(LLM)은 픽셀의 좌표를 계산하는 공간지각 능력보다, 텍스트로 된 논리적 구조를 짜는 능력이 월등히 뛰어납니다. 복잡한 JSON 데이터나 바이너리 파일보다는, 의미가 명확한 태그(`<Node title="...">`)와 컴포넌트 구조가 AI에게는 훨씬 더 명료한 <b>설계도</b>가 됩니다.

결국 React와 TypeScript라는 문법을 빌려, AI와 사람이 오해 없이 소통할 수 있는 가장 효율적인 프로토콜을 만든 셈입니다.

## Graphwrite, 코드로 선언하는 생각의 지도

그렇게 시작된 프로젝트가 바로 <b>[Graphwrite](https://github.com/ev3rlit/graphwrite)</b> 입니다.

> "지식 노동의 미래는 '그리는 것(Drawing)'이 아니라 '서술하는 것(Describing)'입니다."

Graphwrite는 AI 에이전트와의 협업을 위해 설계된 <b>프로그래머블 화이트보드(Programmable Whiteboard)</b>입니다.

코드로 정의된 다이어그램은 손으로 그리는 것보다 빠르고, 의도가 명확하며, 영구적으로 보관하기 쉽습니다. 그래서 이 프로젝트는 'Mobile-First'가 아닌, 철저하게 <b>'AI-First'</b> 철학으로 설계되었습니다.

Graphwrite는 사람이 마우스로 도형을 그리거나 위치를 조절하지 않습니다. <b>사람은 생각의 의도(Intent)만 전달하고, 실제 코드는 AI 에이전트가 작성합니다.</b>

* **React:** 컴포넌트 기반으로 생각의 단위를 쪼개고 조립합니다.
* **Tailwind CSS:** 직관적인 유틸리티 클래스로 스타일을 입힙니다.
* **TypeScript:** 컴파일 타임에 구조적 오류를 잡아내고, 명확한 타입을 통해 AI가 문맥을 더 잘 이해하도록 돕습니다.

실제 코드는 다음과 같습니다.

```typescript
import { Canvas, MindMap, Node, Markdown } from '@graphwrite/core';

export default function GraphwriteConcept() {
  return (
    <Canvas>
      <MindMap layout="tree">
        <Node id="root">
          <Markdown>{`
## 📝 Graphwrite
코드로 선언하는 생각의 지도
          `}</Markdown>
        </Node>
        
        <Node id="traditional" from="root">
          <Markdown>{`
### 🖱️ 기존 방식
마우스로 드래그 & 드롭
          `}</Markdown>
        </Node>
        <Node id="t1" from="traditional">좌표 계산에 시간 낭비</Node>
        <Node id="t2" from="traditional">AI 협업 불가능</Node>
        
        <Node id="declarative" from="root">
          <Markdown>{`
### ⚡ 선언형 접근
관계만 정의하면 끝
          `}</Markdown>
        </Node>
        <Node id="d1" from="declarative">구조가 곧 코드</Node>
        <Node id="d2" from="declarative">AI가 이해하는 언어</Node>
        
        <Node id="result" from="root">
          <Markdown>{`
### 🎯 결과
생각의 속도로 시각화
          `}</Markdown>
        </Node>
        <Node id="r1" from="result">React 컴포넌트 = 노드</Node>
        <Node id="r2" from="result">TypeScript로 타입 안전</Node>
      </MindMap>
    </Canvas>
  );
}
```

`from="root"`라는 한 줄로 부모-자식 관계를 정의하면 끝입니다. 위치 계산은 레이아웃 엔진이 알아서 처리합니다. 마치 **HTML을 작성하면 브라우저가 렌더링하듯**, 구조만 선언하면 시각화는 자동으로 따라옵니다.

아래는 Graphwrite의 핵심 컨셉을 시각화한 인터랙티브 데모입니다. 마우스로 드래그하거나 확대/축소해보세요.

> *(이곳에 Graphwrite 데모 스크린샷이나 GIF를 삽입해주세요)*

이 구조는 AI 에이전트에게 최적화되어 있습니다. "이 노드를 저기로 옮겨줘"라고 말하면, AI는 좌표값을 계산하는 것이 아니라 리액트 컴포넌트의 구조를 변경하면 됩니다. 사람은 로직과 흐름(Context)에만 집중하고, 시각적인 렌더링은 코드가 알아서 처리하는 방식입니다.

## AI 에이전트에게 펜을 쥐여주다: Agent Skills

그렇다면 AI는 어떻게 코드를 작성할까요? 단순히 "코드 짜줘"라고 말하는 것이 아닙니다.

최근 Anthropic이 소개한 <b>[Agent Skills (Tool Use)](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)</b> 개념이 핵심입니다. 이는 AI에게 '눈'과 '손'을 달아주는 것과 같습니다. 우리는 AI에게 `create_user`라는 도구를 쥐여주고, "유저를 만들어줘"라고 말하면 AI가 스스로 그 도구를 꺼내 쓰는 방식입니다.

Graphwrite도 마찬가지입니다. 저는 AI 에이전트에게 [graphwrite-skill](https://github.com/ev3rlit/graphwrite/blob/main/.claude/skills/graphwrite/SKILL.md)이라는 도구를 만들어서 제공합니다. 이 스킬 안에는 마인드맵의 노드를 추가하고, 연결하고, 레이아웃을 잡는 구체적인 명세가 들어있습니다.

사용자는 그저 자연어로 툭 던지면 그만입니다.

> "Graphwrite 스킬을 이용해서, 이번 주에 공부해야 할 React 19의 신기능들을 마인드맵으로 정리해줘. UseClient와 ServerActions의 관계를 중심으로 시각화해줘."

그러면 AI는 이 모호한 명령을 해석하여 스스로 [graphwrite-skill](https://github.com/ev3rlit/graphwrite/blob/main/.claude/skills/graphwrite/SKILL.md)을 호출하여, 정확한 리액트 컴포넌트 구조를 생성해냅니다. 이것이 바로 우리가 지향하는 <b>"서술하는 것(Describing)"</b>의 진짜 의미입니다.

## 기록과 시각화의 본질로 돌아가다

Graphwrite는 제가 오랫동안 갈망해왔던, "온전히 기록하고 정리하고 시각화하는 것"에 집중하기 위한 도구입니다.

사용자가 텍스트로 의도를 전달하면, AI 에이전트는 MCP(Model Context Protocol)나 스킬(Skill) 같은 도구를 활용해 직접 프로그래밍하고 결과를 완성하는 것.

저는 이런 도구가 필요했고, 그래서 만들고 있습니다.

> **[블로그 원문 보기](https://ev3rlit.github.io/blog/2026-01-why-building-mindmap-with-react)**

---

## 참조

* [Remotion - Make videos programmatically using React](https://www.remotion.dev/)
* [Graphwrite - Programmable Whiteboard for AI Agents](https://github.com/ev3rlit/graphwrite)
* [Anthropic - Tool Use (Agent Skills)](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
* [Graphwrite Skill Definition](https://github.com/ev3rlit/graphwrite/blob/main/.claude/skills/graphwrite/SKILL.md)
* [Skill.sh - AI Skills Registry](https://skills.sh/)
* [Google Stitch](https://stitch.withgoogle.com/)
* [Google Flow](https://labs.google/flow/about)
* [Meshy AI - 3D AI Generator](https://www.meshy.ai/)
