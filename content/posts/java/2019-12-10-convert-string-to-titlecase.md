---
category: how to
date: "2019-12-10T00:00:00Z"
tags:
- Streams
- String
title: Convert String to title case in Java using Streams
url: /java/convert-string-title-case-java-streams
---


Title case is capitalized first character of each word. That means, we have to do this:
- Break at word boundaries
- Capitalize the first character and lowercase the others
- Join again at word boundaries.


```java
public String toTitleCase(String str) {
    final String wordBoundary = " ";
    return Arrays.stream(str.split(wordBoundary))
            .map(it -> it.substring(0, 1).toUpperCase() + it.substring(1, it.length()).toLowerCase())
            .collect(Collectors.joining(wordBoundary));
}
```

Let's see it in actions:
```
Roughing It => Roughing It
PRIde AnD PrejudICE => Pride And Prejudice
a tale of two Cities => A Tale Of Two Cities
```

