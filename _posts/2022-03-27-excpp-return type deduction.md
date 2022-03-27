---
title: "전문가를 위한 C++ - 반환형 추론"
excerpt: "auto를 이용한 함수 반환형 추론"
categories:
    - "excpp"
tags:
    - [C++, Expert C++, Auto, Return type, Deduction]

date: 2021-03-27
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.

## 반환형 추론

C++ 14에서는 컴파일러에게 함수의 반환형을 자동으로 알아낼수 있도록 할 수 있습니다. 해당 기능을 사용하려면 반환형으로 ```auto``를 지정해야 합니다.

```cpp
auto add(int number1, int number2)
{
    return number1 + number2;
}
```

컴파일러는 return문에 사용된 표현식<sub>expression</sub>을 기반으로 반환형을 추론합니다.

함수에는 여러개의 return문이 존재할 수 있지만 모두 동일한 자료형으로 해야 합니다. 

재귀 함수에도 다음 기능을 사용할 수는 있지만, 재귀 호출전에 함수의 첫번째 return문에서 자료형을 추론할 수 있도록 비재귀호출을 해야 합니다.

```cpp
auto factorial(int n)
{
    if(n == 1)  return 1;   // 비재귀 호출
    return factorial(n-1) * n;
}
```

## 참조

- 전문가를 위한 C++