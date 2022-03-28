---
title: "전문가를 위한 C++ - 열거형 클래스"
excerpt: "Type-safe한 열거형 클래스"
categories:
    - "excpp"
tags:
    - [C++, Expert C++, Enum, Enum Class]

date: 2021-03-27
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.

![](https://media3.giphy.com/media/ule4vhcY1xEKQ/giphy.gif?cid=ecf05e47vqiet1dydzppmgrwa3952lagletqsdrysi40117u&rid=giphy.gif&ct=g){: .align-center}

## 열거형<sub>Enum</sub>

정수형은 수열 내의 값을 나타내는 자료형입니다. 열거형을 사용하면 고유한 수열을 정의하여  값이 있는 변수를 선언할 수 있습니다. 

예를 들어, 체스 프로그램에서 다음 코드와 같이 체스말 유형에 대해 상수를 사용하여 각 체스말을 정수형으로 표현할 수 있습니다. 각 유형들은 변할 수 없는 값이기 때문에 const로 표시합니다.

```cpp
const int PieceTypeKing = 0;
const int PieceTypeQueen = 1;
const int PieceTypeRook = 2;
const int PieceTypePawn = 3;
```

이 방법은 괜찮을 수는 있지만 위험할 수 있습니다. **체스말을 int로 표현하고 있을 뿐이지, 왕에 +1을 하면 여왕으로 바뀔 수 있는 문제가 있습니다.** 또는 -1 더해 없는 체스말을 가리킬수도 있습니다.

열거형은 변수 값의 범위를 엄격하게 정의하여 이러한 문제를 해결합니다. 다음 코드는 4개의 체스말을 나타내는 새로운 유형인 ```PieceType```을 선언합니다.

```cpp
enum PieceType
{
    PieceTypeKing,
    PieceTypeQueen,
    PieceTypeRook,
    PieceTypePawn
};
```

값이 할당되어 있지 않더라도 실제로, 열거형은 정수 값을 가지고 있습니다. ```PieceType::PieceTypeKing```의 실제 값은 0입니다. 

하지만, 이러한 ```PieceType```에 산술 연산을 수행하거나, 정수로 취급하여 처리하려고 하면 컴파일러에서 경고 또는 오류를 표시할 수 있습니다. 실제로 PieceType 변수를 선언한 다음 정수로 취급하게 되면, 컴파일러에서 경고나 오류가 발생합니다.

```cpp
PieceType piece;
piece = 1;          // Error
```

```console
error: invalid conversion from 'int' to 'PieceType' [-fpermissive]
```

> 열거형 멤버에 값을 하당하지 않으면 컴파일러는 기본적으로 1씩 증가된 값을 자동으로 할당합니다. 첫번째 열거형 멤버에 값을 할당하지 않으면 컴파일러에서 0을 할당합니다.

## 열거형 클래스<sub>Enum Class</sub>

앞서 언급한 열거형은 Strongly Typed<sub>강력한 형식</sub>이 아니므로 자료형이 안전하지 않습니다. 항상 정수로 해석되기에, 완전히 다른 열거 유형의 값을 비교할 수 있는 문제가 있습니다. 

다음 코드는 ```PieceSizeSmall```과 ```PiceTypeKing```이 컴파일러에 의해 0으로 할당되므로, if문 내의 코드가 실행될 수 있습니다.

```cpp
enum PieceSize
{
    PieceSizeSmall,
    PieceSizeMedium,
    PieceSizeBig
};
```

```cpp
PieceType piece{PieceType::PieceTypeKing};
PieceSize size{PieceSize::PieceSizeSmall};

if(piece == size)
{
    // 참이므로 통과됨
}
```

이러한 문제는 컴파일 단계에서 컴파일러에 의해 경고될 수 있습니다.

```console
warning: comparison between 'enum PieceType' and 'enum PieceSize'
```

Enum Class는 이러한 문제를 해결할 수 있습니다. 예를 들어, 다음 코드는 type-safe한 버전의 PieceType 열거형입니다.

```cpp
enum class PieceType
{
    PieceTypeKing,
    PieceTypeQueen,
    PieceTypeRook,
    PieceTypePawn
};
```

열거형 클래스의 경우 항상 범위 연산자를 사용해야 합니다. 그렇기에 멤버의 값이 자동으로 정수형으로 변환되지 않습니다. 

```cpp
PieceType piece = PieceType::PieceTypeKing;
if(PieceType::PieceTypeKing == 0){...}    // Error
```

결론적으로, 안전하지 않은 열거형을 사용하는 대신 열거형 클래스는 사용하는 것이 좋습니다.

## 참조

- 전문가를 위한 C++