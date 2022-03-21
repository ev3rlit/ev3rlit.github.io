---
title: "Unity - Raycast"
excerpt: "Raycast란 무엇인가?"
categories:
    - "Unity"
tags:
    - [Unity, Raycast, Physic]

date: 2021-03-02
last_modified_at: 2021-03-02
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.

---

<p align="center"><iframe src="https://giphy.com/embed/jTqPSlTvpjPIh43MZq" width="480" height="203" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/alltheanimeuk-anime-screenanime-screen-jTqPSlTvpjPIh43MZq"></a></p></p>

## Raycast란?

> 한 지점으로 부터 특정한 방향으로 보이지 않는 광선을 발사하여 Collision을 가진 어떤 대상을 검출

![](/assets/2-unity-raycast/what%20is%20raycasting.png)

Raycast을 활용하면 현재 카메라의 위치에서 발상한 광선이 바닥에 부딪히면서 해당 지점의 좌표를 알아낼 수 있고, 캐릭터를 클릭한 지점으로 이동시킬 수 있습니다.

![](/assets/2-unity-raycast/raycast%20모습.png)

## Rasycst 구현

다음 함수와 클래스를 이용하여 카메라로 부터 화면에 클릭한 지점 까지의 광선을 확인할 수 있습니다.

- [Debug.DrawRay](https://docs.unity3d.com/2022.2/Documentation/ScriptReference/Debug.DrawRay.html)
- [Camera.ScreenPointToRay](https://docs.unity3d.com/2022.2/Documentation/ScriptReference/Camera.ScreenPointToRay.html)
- [Physics.Raycast](https://docs.unity3d.com/2022.2/Documentation/ScriptReference/Physics.Raycast.html)
- [RaycastHit](https://docs.unity3d.com/2022.2/Documentation/ScriptReference/RaycastHit.html)


클릭한 지점의 월드 좌표를 알아내는 기능을 앞으로도 자주 사용될 것으로 생각되어, Functional 클래스를 만들어 정적 함수로 구현합니다.

> Functional.cs

```csharp
using UnityEngine;

public class Functional
{
    public static Vector3 GetMouseWorldPosition3D(){
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        Debug.DrawRay(ray.origin, ray.direction * 1000f);
        
        return Vector3.zero;
    }
}
```

그리고 이를 테스트할 스크립트를 만들어 줍니다.

> MouseInput.cs

```csharp
using UnityEngine;

public class MouseInput : MonoBehaviour {
    private void Update() {
        if(Input.GetMouseButton(0)){
            Functional.GetMouseWorldPosition3D();
        }
    }
}
```

실행하면 카메라로 부터 발사된 광선이 보라색 박스에 부딪힌 것을 확인할 수 있습니다.

![](/assets/2-unity-raycast/raycast%20구현.png)

그다음 Physics의 Raycast를 이용하여 앞서 카메라로 부터 구한 Ray를 통해 부딪힌 대상을 알아낼 수 있습니다. 

[Physics.Raycast](https://docs.unity3d.com/2022.2/Documentation/ScriptReference/Physics.Raycast.html) 에서 확인할 수 있듯이 Raycast에 감지가 되려면 Collider가 꼭 필요합니다.

> Functional.cs

```csharp
using UnityEngine;

public class Functional
{
    public static Vector3 GetMouseWorldPosition3D(){
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;

        // Debug.DrawRay(ray.origin, ray.direction * 1000f);
        
        if(Physics.Raycast(ray, out hit)){
            return hit.point;
        }

        return Vector3.zero;
    }
}
```

## Raycast 활용

앞서 구현한 GetMouseWorldPosition3D()와 MouseInput 컴포넌트를 이용하여 화면에 클릭한 지점의 **월드좌표**를 알아낼 수 있다. 

NavMeshAgent에 목적지를 설정하면 실시간으로 움직이는 캐릭터를 구현할 수 있다. 

> MovePositionNavMesh.cs

```csharp
using UnityEngine;
using UnityEngine.AI;

public class MovePositionNavMesh : MonoBehaviour, IMovePosition
{
    private NavMeshAgent agent;

    private void Awake()
    {
        agent = GetComponent<NavMeshAgent>();
    }

    public void SetMovePosition(Vector3 movePosition)
    {
        agent.SetDestination(movePosition);
        Stop(false);
    }
}
```

> MoveMouseInput.cs

```csharp
using UnityEngine;

public class MoveMouseInput : MonoBehaviour
{
    private void Update()
    {
        if (Input.GetMouseButton(0))
        {
            Vector3 worldPosition = Functional.GetMouseWorldPosition3D(true);
            GetComponent<IMovePosition>()?.SetMovePosition(worldPosition);
        }
    }
}
```

![](/assets/2-unity-raycast/raycast%20test.gif){: .align-center}


~~움직이는 유티니짱이 너무 맘에든다.~~

## 참조

- [Code Monkey - Moudlar Move](https://youtu.be/mJRc9kLxFSk)
- [NavMeshAgent](https://docs.unity3d.com/2022.2/Documentation/Manual/class-NavMeshAgent.html)
- [Physics.Raycast](https://docs.unity3d.com/2022.2/Documentation/ScriptReference/Physics.Raycast.html)
