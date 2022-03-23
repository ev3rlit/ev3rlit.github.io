---
title: "UE4 GameplayAbilitySystem 소개"
excerpt: ""
categories:
    - "ue4"
tags:
    - [UE4, Unreal Engine, GameplayAbilitySystem, Ability System Component]
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/x5KqpYX4H6g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## GameplayAbilitySystem

GameplayAbilitySystem을 언리얼에서는 다음과 같이 소개하고 있습니다.

> 게임 플레이 능력 시스템은 RPG 또는 MOBA 장르에서 찾을 수 있는 능력 및 속성 유형을 구축하기 위한 매우 유연한 프레임워크입니다. 게임의 캐릭터가 사용할 액션이나 패시브 능력, 이러한 액션의 결과로 다양한 속성을 쌓거나 약화시킬 수 있는 상태 효과를 구축할 수 있으며, 추가적으로 "쿨다운" 타이머 또는 리소스 비용을 구현하여 사용량을 조절할 수 있습니다. 이러한 동작 중 각 수준에서 능력 및 효과의 수준을 변경하고 파티클, 사운드 이펙트 등을 활성화합니다. 게임 플레이 능력 시스템은 현대 RPG 또는 MOBA 장르에 설정된 좋아하는 캐릭터의 능력만큼 단순한 점프부터 복잡한 능력까지 게임 내 능력을 설계, 구현 및 효율적으로 네트워크화하는 데 도움이 될 수 있습니다.

GameplayAbilitySystem 줄여서 GAS 플러그인은 Epic Games에서 개발했으며, Unreal Engine 4에서 제공되는 기능입니다. Paragon 및 Fortnite와 같은 AAA 상용 게임에서 전투 테스트를 거쳤습니다.

GAS는 싱글 및 멀티플레이어 게임에서 사용 가능한 기능을 제공합니다.

- GameplayAbility : 레벨 기반의 캐릭터 능력 또는 기술 구현
- Attributes : 캐릭터의 스탯
- GameplayEffects : 캐릭터의 상태 효과
- GameplayTags : 태그
- GameplayCues : VFX 또는 SFX 생성
- 위의 기능들에 대한 리플리케이션

멀티플레이어 게임에서, GAS는 클라이언트 사이드 예측을 지원합니다.

- 능력 활성화
- 애니메이션 몽타주 재생
- Attributes 변경
- GameplayTags 적용
- GameplayCues 생성
- CharacterMovementComponent에 연결된 RootMotionSource 기능을 통한 움직임

## 설치

GAS는 플러그인에서 설치할 수 있습니다.

![](/assets/2022-03-23-ue4-GameplayAbilitySyetem%20overview/01%20plugin.png)

설치된 플러그인을 프로젝트에서 사용하려면, ```*.Build.cs```파일의 PublicDependencyModuleNames에 'GameplayTags', 'GameplayAbilities' 및 'GameplayTasks'를 추가해야 합니다.

```c++
PublicDependencyModuleNames.AddRange(new string[] { 
    "Core", 
    "CoreUObject", 
    "Engine", 
    "InputCore",
    "GameplayAbilities",
    "GameplayTags",
    "GameplayTasks"
});
```

## 참조

- [Gameplay Ability System](https://docs.unrealengine.com/4.27/en-US/InteractiveExperiences/GameplayAbilitySystem/)
- [GASDocumentation](https://github.com/tranek/GASDocumentation#intro)