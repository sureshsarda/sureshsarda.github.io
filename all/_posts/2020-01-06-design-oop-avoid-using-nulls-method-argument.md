---
layout: single
title: "Why you should not use null as a method parameter"
date: 2020-01-06
share: true
description: Why passing null as a method parameter breaks the abstraction paradigm and how you should avoid it.
categories:
- Design
---

Object Oriented concept was first introduced with [Lisp][lisp] in the late 1950s. Lisp has atoms and attributes, where the atoms represented an real world object. OOP has evolved quite a bit after that. [SOLID][solid] design principle were introduced that helped us craft a better software. I will not go in details of [how these principles help us, there is already lot of material out there][solid_benefits]. Instead I'll focus on some mistakes we do while implementing these patterns. One of them is passing `null` as a method parameter especially when the called method doesn't use that parameter or has some default behavior.

## What are we talking about?
Let's take a simple example to elaborate this:
```java
public interface IdentityProvider {
    public User login(String username, String password, String type);

    // other methods
}
```
The anti-pattern which I'm talking about uses `null` as a flag to toggle behavior. For example, take the following usages:
```java
// 1. A valid type is passsed
idp.login('username', 'password', AccountType.ADMIN);

// 2. Using null to take default value
idp.login('username', 'password', null);
```
The first call here is absolutely fine. But in the second call we are passing `null` so that the login is attempted against the standard/default account type.

## What's wrong with this?
This type of call violate a fundamental design principle - [abstraction][abstraction]. Let's take an example to understand how.

### The Carpenter and the table
```
You: Hey! I need a table, can you make me one?
Carpenter: Sure, I'll need some wood, screws and glue.
You: Oh Okay! I have wood and screws but I didn't get glue.
Carpenter: No problem, we can make one without glue. I'll just put more screws for the strength.
You: Awesome! Here you go!
(and you hand over the *ingredients* to the carpenter and get your table)
```
In programming, one might call the `makeTable` method like this:
```java
carpenter.makeTable(wood, screw, glue);
```
Note that `glue` is optional, so someone can call the method like this as well:
```java
carpenter.makeTable(wood, screw, null);
```

### So what's wrong?
Well, you know the implementation details, *that's wrong*. The `makeTable` method is not abstract any more because *you know* that you can pass `null` and it will work fine. *You know* that internally it can work without *glue*.

When methods are declared with parameters, it marks a contract that, *that* method needs those argument to work correctly. If you were just a user of a third party library, you would not know that glue is required or not. You would have 2 options - read to docs if it says whether it can take `null` or figure it out by trial and error; in both the cases you are trying to know whether it works without glue and in both the cases you will have some idea about the internal implementation.

## How to fix it?
One simple way to fix it using method overloading:
```java
Table makeTable(Wood wood, Screw screws, Glue glue);
Table makeTable(Wood wood, Screw screws);
```

The other one is having a separate method for without glue:
```java
Table makeTable(Wood wood, Screw screws, Glue glue);
Table makeTableWithoutGlue(Wood wood, Screw screws);
```

There could be many more way to fix the design. But these are probably the simplest one. It makes the code clearer. It leaves less space for errors and assumptions.

## Don't get me wrong!
Don't get me wrong. Internally the second method might call the first method with a `null` argument. But that's *internally*. That's the implementation of the carpenter class and the guy implementing is aware of it. **The null paradigm should not go outside the class/library. Not to the programmer using it.**

You will wonder that I'm not an API designer, neither anyone else apart from my team is using the code we have written. Why should I do this? Well, it has the same benefits as other design principles - [SOLID][solid], [KISS], etc - helps with writing maintainable and clean code. In one part of the code we might be a API designer while in some other part we might be user for that API. We have to interchangeably wear those 2 hats multiple times a day. In fact multiple times in an hour.




[solid]: https://en.wikipedia.org/wiki/SOLID
[lisp]: https://en.wikipedia.org/wiki/Lisp_(programming_language)
[solid_benefits]: https://stackoverflow.com/questions/20073023/understanding-the-practical-benefits-of-using-the-single-responsibility-principl
[abstraction]: https://en.wikipedia.org/wiki/Abstraction_(computer_science)
[KISS]: https://en.wikipedia.org/wiki/KISS_principle