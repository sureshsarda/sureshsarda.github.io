---
layout: single
title: The Absolute Minimum Every Software Developer Absolutely, Positively Must Know - Design Principles
permalink: /books/absolute-minimum-about-programming/design-principles
---
> TODO Quote here

1. SOLID
3. KISS
4. Correct-Clean-Concise-Optimize in that order
5. Writing clean code


## 1. SOLID
Solid is not a design principle in itself but it's a mnemonic for five different principles. When I started working professionally, I understood only one of them and foud the remaining four quite theoritical that I didn't even understand where and when to use them. I'll try to give an example for each one of them and let's see if that makes sense to you.

Solid is an acrynym for five design principles:
1. Single Responsibility Principle
2. Open-Close Principle
3. Liskov Substitution Principle
4. Interface Segeration Principle
5. Dependency Inversion Principle

They sound a lot but let's look at them one by one.

### 1.1 Single Responsibility Principle
Single Responsibility Principle (SRP) is as the name suggests - one object should have one and only one responsibility. Objects should stick with their responsibility and try to delegate whatever is not their behavior. For example

```java

class Square {
    Integer length;

    public Square(Map<String, Object> configuration) {
        this.length = (Integer) this.configuration.get("length");
    }

    public Integer area() {
        return length * length;
    }
}

```
This innocent looking code violates 

This is probably the most simple one to understand