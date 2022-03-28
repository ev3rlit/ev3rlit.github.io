---
title: "C++ - VS SFML 환경 구성"
excerpt: "Visual Studio에서 간단하게 SFML 사용하기"
categories:
    - "cpp"
tags:
    - [C++, SFML, VSC, Configuration, Visual Studio Code]

date: 2021-03-28
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.

일단 시작하기에 앞서 Visual Studio에서 SFML 환경을 구성하는 방법은 간단합니다. Visual Studio의 프로젝트 속성에서 include, lib, dll 폴더의 경로만 추가해주면 바로사용할 수 있습니다.

환경 구성을 위해 다음 순서로 진행합니다.

1. Visual Studio 프로젝트 생성
2. SFML 다운로드 및 폴더 복사
3. dll 파일을 위한 환경 변수 추가
4. Visual Studio 프로젝트 속성 설정
5. 샘플 코드 실행

## 환경 구성

본 포스팅에 사용된 SFML 사용환경은 다음과 같습니다.

- Visual Studio Community 2019 
- SFML 64bit(for Visual C++15)

## 1. Visual Studio 프로젝트 생성

SFML을 다운로드 하기 전에, 먼저 Visual Studio에서 빈 프로젝트를 하나 생성해줍니다. 

![](/assets/2022-03-28-cpp-SFML%20Install/01%20create%20new%20empty%20project.png){: .align-cetner}

프로젝트 명은 자유롭게 설정해주시면 됩니다. 그리고 하단의 ```솔루션 및 프로젝트를 같은 디렉터리에 배치```를 클릭해줍니다.

![](/assets/2022-03-28-cpp-SFML%20Install/02%20set%20project%20name.png){: .align-cetner}


## 2. SFML 다운로드 및 폴더 복사

SFML은 [다음 링크](https://www.sfml-dev.org/download.php) 또는 [공식 홈페이지](https://www.sfml-dev.org/index.php)를 통해 다운받을 수 있습니다. ```Visual C++ 15 (2017) - 64-bit```를 다운받아서 압축을 풀어줍니다.

![](/assets/2022-03-28-cpp-SFML%20Install/03%20download%20sfml.png){: .align-center}

압축을 해제한 SFML 폴더에서 필요한 폴더는 총 3개로, bin, include 그리고 lib 입니다. 해당 폴더들을 복사한뒤, ```1. Visual Studio 프로젝트 생성```에서 생성한 프로젝트 폴더에 복사합니다.

![](/assets/2022-03-28-cpp-SFML%20Install/04%20sfml%20directory%20overview.png){: .align-center}

![](/assets/2022-03-28-cpp-SFML%20Install/05%20copy%20sfml%20library%20into%20project%20directory.png){: .align-center}


## 3. dll 파일을 위한 환경 변수 추가

bin 폴더에는 외부 코드 사용을 위한 dll 파일이 들어있습니다. Visual Studio에서는 기본적으로 프로그램 실행에 필요한 dll 파일 경로를 설정할 수 없기에, 프로젝트 폴더에 두도록 하고 있습니다.

대신에, dll 파일을 환경 변수에 등록해두면 알아서 사용할 수 있습니다. ```환경 변수 - 시스템 변수 - Path```로 가서 bin 폴더를 추가해줍니다.

![](/assets/2022-03-28-cpp-SFML%20Install/06%20set%20enviroment%20variables.png){: .align-center}

> 환경 변수는 윈도우에서 '시스템 환경 변수 편집'으로 검색해서 들어갈 수 있습니다.

## 4. Visual Studio 프로젝트 속성 설정

프로젝트 속성을 설정하기에 앞서, 해당 프로젝트가 사용하고 있는 언어가 무엇인지 인식하기 위해서는 최소 하나 이상의 파일을 추가해야 합니다. 'main.cpp'로 소스파일을 하나 추가해줍니다.

![](/assets/2022-03-28-cpp-SFML%20Install/07%20create%20new%20cpp%20file.png){: .align-center}

상단 탭에서 ```프로젝트 - Project-SFML 속성``` 눌러 속성 페이지를 엽니다. 그다음 ```구성```과 ```플랫폼```을 **모든 구성**과 **모든 플랫폼**으로 설정합니다.

![](/assets/2022-03-28-cpp-SFML%20Install/08%20set%20configuration%20and%20target%20platform.png){: .align-center}

include 폴더를 추가하기 위해서 ```C/C++ - 일반```에서 '추가 포함 디렉토리'에 다음 경로를 추가합니다.

```console
$(SolutionDir)include
```

경로를 입력하면, '평가 값' 항목에 include 폴더의 경로가 잘 들어간 것을 확인할 수 있습니다.

![](/assets/2022-03-28-cpp-SFML%20Install/09%20additional%20include%20directory.png){: .align-center}

> $(SolutionDir)은 현제 프로젝트의 절대 경로를 나타내는 심볼입니다.

라이브러리 폴더를 추가하는 과정또한 유사합니다. lib 폴더를 추가하기 위해서 ```링커 - 일반```에서 '추가 라이브러리 디렉터리'에 다음 경로를 추가합니다.

```console
$(SolutionDir)lib
```

경로를 입력하면, '평가 값' 항목에 lib 폴더의 경로가 잘 들어간 것을 확인할 수 있습니다.

![](/assets/2022-03-28-cpp-SFML%20Install/10%20additional%20library%20directory.png){: .align-center}

마지막으로, 프로그램 실행시 필요한 라이브러리를 위해 ```링커 - 입력```에서 '추가 종속성'에 다음 경로를 추가합니다.

```console
$(SolutionDir)lib\*.lib
```

![](/assets/2022-03-28-cpp-SFML%20Install/11%20%20additional%20dependency.png){: .align-center}


SFML 라이브러리를 사용하기 위한 프로젝트 설정이 끝났으므로, 적용을 누르고 창을 닫아줍니다. 

## 5. 샘플 코드 실행

main.cpp에 다음 코드를 복사 붙여넣고, 실행합니다. 만약 다음 오류가 발생한다면, 상단의 대상 플랫폼을 ```x64```로 변경하고 다시 빌드합니다.

```console
warning LNK4272: 'x64' 라이브러리 컴퓨터 종류가 'x86' 대상 컴퓨터 종류와 충돌합니다.
```

```cpp
#include <SFML/Graphics.hpp>

int main()
{
    sf::RenderWindow window(sf::VideoMode(200, 200), "SFML works!");
    sf::CircleShape shape(100.f);
    shape.setFillColor(sf::Color::Green);

    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
        }

        window.clear();
        window.draw(shape);
        window.display();
    }

    return 0;
}
```

정상적으로 실행되었다면, 아래와 같이 초록색 원이 그려지게 됩니다. 

![](/assets/2022-03-28-cpp-SFML%20Install/12%20run%20sample%20code%20and%20finished%20all%20parts.png){: .align-center}

> 빌드는 성공하였으나, 프로그램이 실행되지 않는다면 ```3. dll 파일을 위한 환경 변수 추가```으로 가셔서 bin 폴더가 환경 변수에 잘 등록되어 있는지 확인합니다.

## 마무리

Visual Studio에서 SFML의 환경 구성을 하기 위한 모든 작업이 끝났습니다. 앞으로도 다른 라이브러리를 사용하실 때 다음과 같은 방법으로 진행하시면 동일하게 사용이 가능합니다.

어떤 라이브러리든, 처음 접하실 때는 공식 홈페이지의 문서를 참고하는 것이 가장 도움이 된다고 생각됩니다. 여기까지 읽어주셔서 진심으로 감사드리고, 많은 도움이 되셨으면 좋겠습니다. 

## 참조

- [COMP4300 - Game Programming - Lecture 04 - Assignment 1](https://www.youtube.com/watch?v=I6LQ9igO-ZE&list=PL_xRyXins848jkwC9Coy7B4N5XTOnQZzz&index=4)
- [SFML and Visual Studio](https://www.sfml-dev.org/tutorials/2.5/start-vc.php)
- [C, C++ 외부 라이브러리(dll, lib) 사용하기](https://wnsgml972.github.io/setting/2018/11/01/dll_lib/)
- [C++ GUI SFML 설치](https://manufacture.tistory.com/6)