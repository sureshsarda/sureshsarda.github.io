---
category: how to
date: "2019-11-24T00:00:00Z"
excerpt: Learn how to extract path variables from URL. This is useful when building
  RESTful services to extract the resource name or resource id from the URL
tags:
- Spring
teaser: https://www.websoptimization.com/blog/wp-content/uploads/2019/03/top-10-reasons-to-use-spring-framework-1.jpg
title: Spring REST - Extract URL Path Variables
url: /java/spring/extract-use-parse-url-path-data-variable
---
REST APIs have resource names and resource id present in the URL path unlike a traditional web API. This article focuses on how to extract that information and use it.

Take a typical REST URL:
```http
GET https://api.bookstore.com/authors/twain-mark/books/roughing-it
```
Here, the name of the author and the name of the book are inside the book and not part of the request body or query parameters. This is a standard practice while developing REST APIs. To extract the path variables in Spring, we use the annotation `@PathVariable`:

```java
@RequestMapping("/authors/{author}/books/{book}")
public ResponseEntity<String> greeting(@PathVariable String author, @PathVariable String book) {
    System.out.println("Requested Author: " + author);
    System.out.println("Requested Book: " + book);
    return new ResponseEntity<String>("ok", HttpStatus.OK);
}
```
Similar to the `@RequestParam` annotation, 
- if a variable is not present, a `400 Bad Request` error is thrown
- if a variable can be optional, the it can be marked like that using `required = false`. (there's a catch which we will see in a bit)
- There is no default value for the `PathVariable`

## Marking URL Variables as Optional 
Request variables can be marked as optional using `required = false`. But unlike `RequestParam`, an alternate URL has to be specified in the path mapping. Example:

```java
@RequestMapping(path = { "/authors/{author}/books/{book}", "authors/{author}/books" })
public ResponseEntity<String> greeting(@PathVariable(name = "author") String author,
        @PathVariable(name = "book", required = false) String book, @RequestParam() int p) {
    System.out.println("Requested Author: " + author);
    System.out.println("Requested Book: " + book);
    return new ResponseEntity<String>("ok", HttpStatus.OK);
}
```
Here the `book` field is marked as optional but there are 2 paths in the `RequestMapping`.

## Get all Path Variables in a Map
All the path variables can be extracted in a `Map` similar to `@RequestParam` and `@RequestHeader` in Spring. Simply specify a `Map` and you are done.

```java
@RequestMapping(path = { "/authors/{author}/books/{book}", "authors/{author}/books" })
public ResponseEntity<String> greeting(@PathVariable Map<String, String> pathParams) {
    System.out.println("Requested Author: " + pathParams.get("author"));
    System.out.println("Requested Book: " + pathParams.get("book"));
    return new ResponseEntity<String>("ok", HttpStatus.OK);
}
```
*Note: Do not forget to give alternate URLs in case of optional path variables other wise Spring will throw a `404 Not Found` error.*


## Conclusion
- Path Variable can be extracted by specifying the variables in `{field}` in the `RequestMapping`
- They can be extracted using `PathVariable` annotation either one at a time or all together using a `Map`
- If they are optional, do not forget to add additional path mapping in the `RequestMapping`


## Related Articles
- [How to extract Request Headers]({% post_url java/2019-11-23-spring-boot-request-headers %})
- [Introduction to Java Streams]({% post_url java/2019-11-18-introduction-to-java-stream %})