---
title: "C++ 전방선언"
excerpt: "헤더 의존성과 컴파일 시간을 줄이자."
categories:
    - "cpp"
tags:
    - [C++, Unreal]

date: 2021-03-08
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.

<p align="center"><iframe src="https://giphy.com/embed/12zV7u6Bh0vHpu" width="240" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/hamburglar-12zV7u6Bh0vHpu"></a></p></p>

## 전방선언(Forward Declaration)

> **식별자를 정의하기 전, 식별자의 존재를 컴파일러에게 미리 알리는 것**

A 헤더파일과 B헤더파일이 있다면, B 파일에서 A를 사용하기 위해서는 A파일을 추가시켜야 합니다. 그러나 이러한 방식은 컴파일의 시간을 증가시킬뿐만 아니라, 헤더 파일에 대한 의존성이 발생하게 됩니다.

전방선언은 이러한 문제점을 해결하기 위해 도입된 방식입니다.

- 컴파일 시간 단축
- 헤더 파일에 대한 의존성 낮춤

> 전방선언은 해당 객체의 할당 크기를 알 수 없기 때문에, 포인터형으로 선언된 객체에 한하여 사용할 수 있습니다.

## 클래스 전방선언

헤더파일에서 헤더파일을 포함시키는 행위는 컴파일 시간을 증가시킵니다. 그렇기에 포인터 객체를 선언하기전에, 클래스를 명시함으로써 헤더파일의 중복을 피할 수 있습니다.

함수의 매개변수나, 리턴 타입으로 이름만 사용하게 될 경우 포인터 형이 아닌 객체를 사용할 수 있습니다. 함수 내부와 그 함수를 호출하는 코드에서만 클래스의 크기를 요구하기 때문이다.

> B.h

```cpp
// #inculde <A.h>

class A;

class B
{
public:
    A GetA();
private:
    A* ptrA;
}
```

## 참조

- [전방선언 (FORWARD DECLARATION)](https://coding-restaurant.tistory.com/504)
- [C++ 전방 선언 (Forward Declaration)](https://ju3un.github.io/c++-forward-declaration/)