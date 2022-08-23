---
category: how to
date: "2019-11-17T00:00:00Z"
tags:
- Java
title: Creating CSV from Strings in Java
url: /java/creating-csv-from-strings
---


Earlier in Java 7, you needed a StringBuilder to create a CSV from list. From Java 8 onwards, there are multiple ways to achieve this depending on the task in hand.
## 1. Using the String.join method

The String class has a join method that take a delimiter.

```java
List<String> tokens = Arrays.asList("one", "two", "three");
String joined = String.join(",", tokens);
System.out.println(joined);

// --output --
// one,two,three
```

## 2. Using the StringJoiner

Another similar way to achieve this is using the StringJoiner class.

```java
List<String> tokens = Arrays.asList("one", "two", "three");
StringJoiner joiner = new StringJoiner(",");
for (String item : tokens) {
	joiner.add(item);
}
System.out.println(joiner.toString());

// -- output --
// one,two,three
```

We can add prefix and suffix with StringJoiner, which can prove helpful in case we want to surround the output with something.

```java
List<String> tokens = Arrays.asList("one", "two", "three");
StringJoiner joiner = new StringJoiner(",", "[", "]");
for (String item : tokens) {
	joiner.add(item);
}
System.out.println(joiner.toString());

// -- output --
// [one,two,three]
```

A more practical use case of this would be in case of creating a multiline CSV where you want the header row as well:

```java
List<String> tokens = Arrays.asList("one", "two", "three");
String header = "numbers";
StringJoiner joiner = new StringJoiner("\n", header + "\n", "");
for (String item : tokens) {
	joiner.add(item);
}
System.out.println(joiner.toString());

-- output --
// numbers
// one
// two
// three
```

## 3. Using Java Stream

Strings can be combined using Collectors. There is a joining collector in Java using which you can join items of a list or collection.

```java
System.out.println(tokens.stream().collect(Collectors.joining(",")));
```

This gives the same output as above.

## 4. Using Streams and Reducers

Creating a CSV out of multiple strings is nothing but creating a single string out of many. This can be achieved using reducers as well:

```java
Optional<String> f = tokens.stream().collect(Collectors.reducing(new BinaryOperator<String>() {

	@Override
	public String apply(String t, String u) {
		return t + "," + u;
	}
}));
System.out.println(f.get());

// -- output --
// one,two,three
```

This can also be rewritten in a single line as follows:

```java
Optional<String> f = tokens.stream().collect(Collectors.reducing((t, u) -> t + "," + u));
System.out.println(f.get());

// -- output --
// one,two,three
```

---
These are just helper methods and don’t have any performance improvements over the good old StringBuilder method we used to use before Java 8.

 
