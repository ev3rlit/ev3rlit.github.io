---
title: "UE4 Pitch Yaw Roll"
excerpt: "언리얼 좌표계에 대해 알아보자"
categories:
    - "ue4"
tags:
    - [Euler, Coordinate System, UE4, Unreal]
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.

<p align="center"><iframe src="https://giphy.com/embed/5xtDarDRj4xd6D0E9sQ" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/pislices-3d-cinema-4d-5xtDarDRj4xd6D0E9sQ"></a></p></p>

## Pitch Yaw Roll

피치<sub>Pitch</sub>, 요<sub>Yaw</sub>, 롤<sub>Roll</sub>은 항공에서 사용되는 3차원 회전으로, 오일러 각<sub>Euler Angle</sub>에서 나온 개념입니다. 

날개에서 날개로 이어지는 축을 피치, 기수(항공기의 앞부분)에서 꼬리까지 이어지는 축을 롤, 항공기의 중심과 수평면을 바라보는 축을 요라고 부릅니다.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Yaw_Axis_Corrected.svg/250px-Yaw_Axis_Corrected.svg.png){: .align-center}

- 피치<sub>Pitch</sub> : Y축을 중심으로 회전
- 요<sub>Yaw</sub> : Z축을 중심으로 회전
- 롤<sub>Roll</sub> : X축을 중심으로 회전

## 왼손 좌표계

<b><sub>Right Hand Coordinate System</sub></b>

언리얼도 마찬가지로 그래픽스에서 회전각을 나타내는 방법 중 오일러 각을 사용합니다. 언리얼은 좌표계를 왼손으로 표현하고 있습니다. 

![](/assets/2022-03-21-ue4-pitch_yaw_roll/unreal%20pitch%20yaw%20roll.png){: .align-center width="50%", height="50%"}

- Forward(X, Roll) : (1,0,0)
- Right(Y, Pitch) : (0,1,0)
- Up(Z, Yaw) : (0,0,1)



## 참조

- [좌표계 용어집](https://docs.unrealengine.com/4.27/ko/Basics/Actors/CoordinateSpace/)
- [Aircraft principal axes](https://en.wikipedia.org/wiki/Aircraft_principal_axes)
- [Pitch, Roll, Yaw](https://happy8earth.tistory.com/492)