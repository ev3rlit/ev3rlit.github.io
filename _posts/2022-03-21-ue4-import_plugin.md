---
title: "UE4 외부 플러그인 추가"
excerpt: "외부 플러그인을 추가하는 방법을 알아보자"
categories:
    - "ue4"
tags:
    - [Plugin, ALSv4, UE4, Unreal]
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참고"에 남겨두었습니다.

![](https://media4.giphy.com/media/BZhvKu7MT0n2voRhtf/giphy.gif?cid=ecf05e47qtvnmpbpm992go52x6s33ig9jr0p21xovmr2jowq&rid=giphy.gif&ct=g){: .align-center}

## 플러그인 추가

에픽 게임즈의 마켓플레이스에서 제공하는 플러그인들은 프로젝트에 쉽게 추가할 수 있도록 제공하고 있지만, 깃허브나 외부 사이트에서 소스코드 형태로 플러그인이 공개되어 있는 경우가 있습니다. 이런 플러그인들을 수동으로 추가하는 방법에 대해 알아보겠습니다.


프로젝트의 루트 폴더에 ```Plugins``` 폴더를 새로 추가합니다. 

![](/assets/2022-03-21-ue4-import_plugin/01%20add%20plugin%20directory.png){: .align-center}

깃허브나 외부에서 다운받은 플러그인 프로젝트 폴더내에 ```*.uplugin``` 확장자로된 파일이 있는지 확인합니다. 

![](/assets/2022-03-21-ue4-import_plugin/02%20check%20uplugin.png){: .align-center}

있다면, 해당 프로젝트 폴더를 앞서 만든 ```Plugins``` 폴더로 복사합니다.

![](/assets/2022-03-21-ue4-import_plugin/03%20copy%20to%20plugins.png){: .align-center}

## 플러그인 확인

프로젝트 폴더의 ```*.uproject```파일을 누르거나 프로젝트를 실행시켜, Plugins 창에 추가한 플러그인이 잘 들어있는지 확인합니다.

![](/assets/2022-03-21-ue4-import_plugin/05%20check%20plugins%20imported.png){: .align-center}

> 만약 플러그인 버전이 현재 프로젝트 버전을 지원하지 않는 경우 재빌드 할지 물어봅니다. 사용하고자 하는 플러그인 버전이 호환된다면 확인을 눌러 재빌드를 합니다.
>
>
>   ![](/assets/2022-03-21-ue4-import_plugin/04%20diffrent%20engine%20version.png){: .align-center}

## 참조