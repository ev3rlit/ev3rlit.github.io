---
title: "전문가를 위한 C++ - 스마트 포인터"
excerpt: "C++14 스마트 포인터에 대해 알아보자"
categories:
    - "excpp"
tags:
    - [C++, Expert C++, nullptr]

sitemap:
    changefreq: daily

date: 2021-03-31
---

> 게임 개발자가 되기 위해 공부하면서 배우는 여러가지 내용들을 기록하기 위한 블로그입니다. 포스팅에 참고한 모든 강의와 자료들은 하단에 "참조"에 남겨두었습니다.
> 
> 본 포스팅은 마크 그레고리의 "전문가를 위한 c++"의 내용을 정리하였습니다.

## 스마트 포인터

<b><sub>Smart Pointer</sub></b>

C 스타일의 포인터는 사용자가 직접 메모리 할당과 해제에 대한 책임을 져야하는 문제가 있습니다. 이는 잘못된 메모리 참조와 누수가 발생할 가능성이 있습니다.

이러한 일반적인 메모리 문제를 방지하려면 C++14에서 도입된 스마트 포인터를 사용해야 합니다. 스마트 포인터는 스마트 포인터 개체가 범위를 벗어날 때(예: 함수 실행이 완료된 경우) 메모리를 자동으로 할당 해제합니다.

다음은 C++에서 가장 중요한 두 가지 스마트 포인터 타입이며, 둘다 \<memory\>에 정의되어 있습니다.

- std::unique_ptr
- std::shared_ptr

## unique_ptr

```unique_ptr```은 ```unique_ptr```이 범위를 벗어나거나 삭제 될 때 메모리나 리소스를 자동으로 해제한다는 점을 제외하면 일반 포인터과 유사합니다.

따라서 ```unique_ptr```은 가리키는 개체에 대한 유일한 소유권을 같습니다. ```unique_ptr```의 한 가지 장점은 return문이 실행되거나 예외가 발생될 때에도 메모리와 리소스가 항상 해제된다는 것입니다.

예를 들어, 각 return 문 전에 리소스를 해제해야 한다는 것을 기억할 필요가 없기 때문에 함수에 여러 return문이 있는 경우 코드가 단순해집니다.

```unique_ptr```을 생성하려면 ```std::make_unique<>()```를 사용해야 합니다. 예를 들어, 기존 방식 대신 다음 코드로 작성할 수 있습니다.

```cpp
Employee* employee = new Employee();
/*
    TODO
*/
delete employee;
```

```cpp
auto employee = std::make_unique<Employee>();
/*
    TODO
*/
```

더이상 ```delete```를 호출하지 않아도 됩니다. 이는 ```unique_ptr```에 의해 자동으로 호출됩니다. ```auto``` 키워드는 추후에 다룰 타입 추론에서 설명합니다. 

```unique_ptr```은 모든 종류의 메모리를 가리킬수 있는 generic 스마트 포인터입니다. 즉, 템플릿을 지원합니다. 템플릿에는 템플릿 매개변수를 지정하기 위한 \<\><sub>대괄호</sub>가 필요합니다. 대괄호 사이에 ```unique_ptr```이 가리키고 싶은 메모리 유형을 지정하면됩니다.

```std::make_unique()``` 함수는 C++ 14부터 사용할 수 있습니다. 만약 C++ 14를 사용할 수 없는 환경이라면, 다음과 같은 방법으로 Employee를 생성할 수 있습니다.

```cpp
std::unique_ptr<Employee> employee(new Employee);
```

```unique_ptr```은 일반 포인터와 같은 방식으로 멤버들을 참조할 수 있습니다.

```cpp
if(employee)
{
    std::cout<<"연봉 : "<<employee->salary<<std::endl;
}
```

또한 ```unique_ptr```은 C스타일 배열을 저장할 수도 있습니다. 다음 코드는 10개의 Employee가진 배열을 만들어, ```unique_ptr```에 저장하고 각 배열의 원소에 접근하는 방법입니다.

```cpp
auto employees = std::make_unique<Employee[]>(10);
for(auto& employee : employees)
{
    std::cout<<"이름 : "<<employee->name<<", 연봉 : "<<employee->salaray<<std::endl;
}
```

## shared_ptr

```shared_ptr```은 데이터의 분산 소유권을 허용합니다. ```shared_ptr```이 할당 될 때마다 참조 카운트가 증가하여 데이터 소유자가 한명 더 있음을 나타냅니다. ```shared_ptr```이 범위를 벗어나면 참조 카운트가 감소합니다. 

만약, 참조 횟수가 0이 되면 더 이상 데이터 소유자가 없고 포인터가 참조하는 오브젝트가 해제됩니다.

```shared_ptr```을 생성하려면 ```std::make_unique<>()```와 유사한 ```std::make_shared<>()```를 사용해야 합니다.

```cpp
auto employee = make_shared<Employee>();
if(employee)
{
    cout<<"연봉 : "<<employee->salary<<endl;
}
```

C++ 17부터 ```shared_ptr```에 배열을 저장할 수 도 있지만 이전 버전의 C++에서는 이를 지원하지 않습니다. 

> 기존의 ```auto_ptr```는 더이상 C++11/14에서 사용되지 않으며, C++17에서는 제거되었습니다.

## 참조

- 전문가를 위한 C++