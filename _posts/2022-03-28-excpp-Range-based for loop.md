---
title: "전문가를 위한 C++ - 범위 기반 for문"
excerpt: "C++ 11의 Range-based for loop"
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

## 범위 기반 for문

<b><sub>Range-based for loop</sub></b>

범위 기반 for문은 C++ 11에 새롭게 추가된 반복문으로 배열 및 STL 컨테이너등의 원소들을 쉽게 반복할 수 있습니다. std::array와 같이 iterator를 반환하는 begin()과 end() 함수가 있는 모든 자료형에서 동작합니다. 

다음 코드는 4개의 정수 배열을 정의하고, 이를 범위 기반 for문에서 각 원소를 출력하는 예제입니다. 

```cpp
std::array<int, 4> arr{1,2,3,4};

for(int i : arr)
{
    std::cout<<i<<std::endl;
}
```

범위 기반 for문은 기본적으로 값 복사가 이뤄지기 때문에, 복사본을 만들지 않고 원소를 반복하려면 레퍼런스를 이용하면 됩니다.

```cpp
for(int& i : arr)
{
    std::cout<<i<<std::endl;
}
```

## 게속

이후 내용은 앞으로 계속 추가될 예정입니다.

## 참조

- 전문가를 위한 C++