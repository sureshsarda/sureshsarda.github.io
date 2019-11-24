---
layout: single
title: Using Streams with Map and Pretty Printing it
date: 2019-11-24
permalink: /java/pretty-print-map-using-streams
categories:
- Java
tags:
- Streams
excerpt: Learn how to iterate on values of a Map using streams.
---

Lot of things have simplified after introduction of Streams in Java. Streams can act on any collection and therefore it can act of Map's entries, only keys or only values.

Imagine a Map created like this:
```java
Map<String, String> map = new HashMap<>();
map.put("mark-twain", "roughing it");
map.put("jane-austen", "pride and prejudice");
map.put("charles-dickens", "a tale of two cities");
```

Now let's say we want to clean up all authors and convert them to upper case:
```java
map.keySet().stream().map(it -> it.replace("-", " ")).map(String::toUpperCase).collect(Collectors.toSet());
```


