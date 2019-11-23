---
layout: single
title: Spring - Sending request parameters and request body
date: 2019-11-23
categories:
- Java
tags:
- Spring
---

Sending a custom body with a request is as easy in Spring as sending the RequestParam. All you need a Java class that represents the body and the @RequestBody annotation.

For example, to send request param, we use:
```java
@RequestMapping("/greeting")
public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
    return new Greeting("Hello, " + name);
}
```

Similarly, to send the request body with a Get request, you need a model class that represents the request.
```java
public class GreetingRequest {

    private String name;

    private String message;

    public GreetingRequest(String name, String message) {
        this.name = name;
        this.message = message;
    }
}
```
And then all you have to do is add `@RequestBody` instead of `@RequestParam` and Spring will do the parsing for you.
```java
@RequestMapping("/greeting")
public Greeting grettingByMessage(@RequestBody GreetingRequest request) {
    String name = request.getName();
    String message = request.getMessage();

    // do something here
    return new Greeting("Hello, " + name + ". Message = " + message);
}
```