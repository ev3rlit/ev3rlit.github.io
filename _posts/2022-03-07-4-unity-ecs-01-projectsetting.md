---
title: "Unity DOTS - 01 프로젝트 생성"
excerpt: "Unity DOTS 프로젝트 생성해보기"
categories:
    - "Unity"
tags:
    - [Unity, DOTS, ECS, Project, Setting]

date: 2021-03-08
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/R8Ji76wEcgE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 1. DOTS 설치

유니티 DOTS를 설치하기 위해서는 다음 패키지들이 필요합니다. 패키지는 ``` Windows - Package Manager ```를 통해 설치할 수 있습니다. 2022년 3월 7일 기준 ```Unity 2021.2.x```와 ```Entities 0.17.0 preview``` 버전으로 진행합니다.

> Unity 2022 beta는 아직 DOTS를 지원하고 있지 않아 설치가 불가능합니다. ~~이걸로 삽질 엄청했다는건 비밀입니다.~~ 자세한 내용은 [링크](https://forum.unity.com/threads/dots-development-status-and-next-milestones-december-2021.1209727/)를 통해 확인할 수 있습니다. 

- Mathmatices
- com.unity.entities
- com.unity.rendering.hybrid
- com.unity.dots.editor
- com.unity.platforms.windows

추가적으로 Burst와 Job System을 위한 패키지도 필요합니다. 이는 Unity DOTS의 장점을 더욱 극대화 시킬 수 있는 라이브러리입니다. 자세한 내용은 [Getting started with Burst](https://www.youtube.com/watch?v=o97g7wyOtq4)에서 확인할 수 있습니다.

- Burst
- Jobs

### Package Manager

> 본 포스팅에 사용된 버전은 Unity 2021이므로 패키지 매니저가, 이전 버전과 다를 수 있으나 유사한 형태로 제공되고 있습니다.

1. 패키지 매니저에서 우측 톱니바퀴를 눌러 Project Settings에서 "Enable Pre-release Packages"를 ✅ 체크합니다. 

    ![](/assets/4-unity-ecs-01-projectsetting/02.png){: .align-center}

2. 패키지 매니저에서 좌측 Packages를 눌러 Unity Registry로 변경해줍니다. 그러면 DOTS에 필요한 패키지들을 설치할 수 있습니다.

    ![](/assets/4-unity-ecs-01-projectsetting/01.png){: .align-center}

3. Mathmatices와 Burst, Jobs를 설치합니다.

    > 만약 Jobs가 없다면 유니티 프로젝트 폴더로 가서, manifest.json에 다음 패키지를 추가합니다.
    > ```"com.unity.jobs": "0.8.0-preview.23"```

4. 패키지 매니저 좌측 ➕ 버튼을 누르고 "Add package from git URL..." 눌러 com.unity.entities, com.unity.rendering.hybrid, com.unity.dots.editor, com.unity.platforms.windows를 차례 차례 설치합니다.

    ![](/assets/4-unity-ecs-01-projectsetting/03.png){: .align-center}

5. Packages에서 In Project로 변경하면 앞서 설치한 7개의 라이브러리가 잘 설치된 것을 확인할 수 있습니다.

    ![](/assets/4-unity-ecs-01-projectsetting/04.png){: .align-center}

## 2. 실행

새로운 Scene을 하나 생성하고 아무 3D Object를 추가합니다. 그리고 해당 오브젝트에 ```Convert To Entity```컴포넌트를 추가해 실행합니다. 실행하게 되면 Hierarchy 창에서 오브젝트가 사라지는 것을 확인할 수 있습니다. 마찬가지로 Scene에서 클릭해도 반응하지 않습니다.

변환된 Entity는 ```Window - DOTS - Entities```에서 확인할 수 있습니다. 또한 해당 Entity가 가진 Component에 대한 정보는 ```Window - Analysis - Entity Debugger```를 통해 확인할 수 있습니다.

Entities 창을 통해 방금 생성한 Cube에 다음과 같은 컴포넌트들이 있는 것을 확인할 수 있습니다. 컴포넌트는 데이터를 가진 구조체의 역활을 할 뿐 어떠한 로직도 들어있지 않습니다. 그렇기에 위치를 나타내는 Translation은 3개의 float를 가진 구조체입니다.

![](/assets/4-unity-ecs-01-projectsetting/05.5.png){: .align-center}

> 아직 까지는 Entities 창을 통해 생성된 Entity를 제어할 수는 없습니다.

## 3. 빌드

DOTS의 빌드 방식은 기존과는 다릅니다. 현재 Scene을 Window로 빌드하기 위해서는 ```Assets - Build```에서 Empty Build Configuration를 추가해줍니다. 

![](/assets/4-unity-ecs-01-projectsetting/05.png){: .align-center}

Scene List, General Settings, Classic Build Profile 컴포넌트를 추가하고, Scene List에 Scene을 하나 추가합니다. 

![](/assets/4-unity-ecs-01-projectsetting/06.png){: .align-center}

```Build and Run```를 클릭하면 빌드가 되고 유니티가 실행됩니다.

![](/assets/4-unity-ecs-01-projectsetting/07.png){: .align-center}


## 참조

- [DOTS Project Setp & Build](https://docs.unity3d.com/Packages/com.unity.entities@0.17/manual/install_setup.html)
- [DOTS Build Multi Platform](https://dots-tutorial.moetsi.com/unity-ecs/publish-builds-in-unity-ecs)
