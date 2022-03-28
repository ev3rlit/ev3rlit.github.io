---
title: "전문가를 위한 C++ - 구조적 바인딩"
excerpt: "C++ 17의 unpacking을 위한 구조적 바인딩"
categories:
    - "excpp"
tags:
    - [C++, Expert C++, Structured Bindings]

date: 2021-03-28
---
> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.
> 
> 본 포스팅은 마크 그레고리의 "전문가를 위한 c++"의 내용을 정리하였습니다.

![](https://media1.giphy.com/media/nthoYgQ91Up2u7qmcE/giphy.gif?cid=ecf05e474qok4grj7vz9gydiu4lba82d6qhq7g8ebxj67p20&rid=giphy.gif&ct=g){: .align-center}

## 구조적 바인딩

<b><sub>Structured Bindings</sub></b>

C++ 17에 구조적 바인딩이라는 개념이 새롭게 추가되었습니다. 구조적 바인딩은 파이썬에서 제공하던 unpack과 유사한 기능입니다. 구조적 바인딩을 사용하면 배열, 구조체, 페어<sub>pair</sub> 또는 튜플<sub>tuple</sub>의 자료구조로 초기화되는 여러 변수를 선언할 수 있습니다. 

예를 들어, 다음 배열이 있습니다.

```cpp
std::array<int, 3> value = {1,2,3};
```

다음과 같이 배열의 세 값으로 초기화된 세 개의 변수 x, y 및 z를 선언할 수 있습니다. 구조화된 바인딩에는 auto 키워드를 사용해야 합니다. 예를 들어, auto 대신 int를 지정할 수 없습니다.

```cpp
auto [x,y,z] = value;
```

> 구조적 바인딩으로 선언된 변수의 수는 오른쪽 표현식 값의 수와 일치해야 합니다. 

구조적 바인딩은 또한 public으로 선언된 비정적 멤버들이 있는 구조체에서도 사용이 가능합니다. 예를 들어, 다음 코드와 같습니다.

```cpp
struct Point
{
    double x,y,z;
};

Point point{1.f,2.f,3.f};
auto [x,y,z] = point;
```

## 레퍼런스

구조적 바인딩은 unpack시 값의 참조가 가능합니다. 기존의 튜플이 std::tie()를 통해 값을 가져올 때 레퍼런스를 하지 못하는 단점을 개선합니다. 다음 코드는 튜플에서 구조적 바인딩을 통해 레퍼런스 합니다.

```cpp
auto tuple = std::make_tuple("Korea", 37.34f, 126.58, 80);
auto&[country, latitude, longitude, code] = tuple;
code = 82;      // 국가번호 수정
```

## 참고

- 전문가를 위한 C++
- [\[C++17\] Structured Bindings](http://egloos.zum.com/sweeper/v/3203903)