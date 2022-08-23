---
category: how to
date: "2019-11-18T00:00:00Z"
title: Java 8 Streams 101
url: /java/introduction-to-java-streams-101
---

Java 8 introduced a new Stream API. In this article we will take a look at how to create and use streams.

## How do I create Streams?
Streams can be created using the `of` method on the Stream class like this:
```java
Stream<String> stream = Stream.<String>of("Lorem", "ipsum", "dolor", "sit", "amet");
```

Or calling the `stream()` method on list or any collection like this:
```java
List<String> list = Arrays.asList("Lorem", "ipsum", "dolor", "sit", "amet");
Stream<String> stream = list.stream();
````

Or from an Array like this:
```java
String sentence = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
String[] tokens = sentence.split(" ");
Stream<String> stream = Arrays.stream(tokens);
```

Or you also use the `Stream.Builder`:
```java
Stream.Builder<String> builder = Stream.builder();
builder.add("lorem");
builder.add("ipsum");
builder.add("dolor");
builder.add("sit");
builder.add("amet");
Stream<String> stream = builder.build();
```

## Stream Pipelines

Stream manipulate data in terms of pipelines. They have intermediate and terminal operations. Intermediate operations work on a stream, process it and return a stream. Example of such operations are map, filter, etc. Terminal Operations produce a side effect. Example of such operations are Collectors. Let's take a deeper look in all these operations.

Let's say we want to convert a list of string to lowercase. Earlier we use to do:
```java
List<String> tokens = getTokens();
List<String> lowerCased = new ArrayList<>();
for (String token : tokens) {
    lowerCased.add(token.toLowerCase());
}
```

With Streams, this can be rewritten in more readable way:

```java
List<String> lowerCased = tokens.stream().map(String::toUpperCase).collect(Collectors.toList());
```
In this example to we first create a stream from the list/collection using `stream()` method. Then we apply bunch of intermediate operations, `map` in this case. Finally, we collect all the result in a list using `collect` method.

## What transformations can we apply?
There are many predefined transformations available - map, filter, limit, skip, sort, etc.

## What are the terminal operations we can apply?
Terminal operations typically produce a result. You can have terminal operations to collect and convert the stream to any collections, or you can find some more information about the stream like - first, last, sum, findAny, distinct. If the operations is not present in the predefined operations, you can write a reducer function that reduces the entire stream to a single value by repeatedly applying a method.

## To Vague. Show me some examples!

### Filter Strings based on a condition

Find out Strings greater than 5 characters long

Before Streams
```java
List<String> input = Arrays.asList("lorem ipsum dolor sit amet, consectetur adipiscing elit".split(" "));
List<String> filtered = new ArrayList<>();
for (String token : input) {
    if (token.length() > 5) {
        input.add(token)
    }
}
```

After Streams
```java
List<String> input = Arrays.asList("lorem ipsum dolor sit amet, consectetur adipiscing elit".split(" "));
List<String> out = input.stream()
        .filter(it -> it.length() > 5)
        .collect(Collectors.toList());

// out = [consectetur, adipiscing]
```