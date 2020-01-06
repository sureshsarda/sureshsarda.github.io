---
layout: single
title: Spring - Read Http Request headers
date: 2019-11-23
permalink: /java/spring/request-headers-in-spring-rest
categories:
- Java
tags:
- Spring
---
In the previous article we saw how to use request parameters and request body of a request. In this article we will see how to use the request headers.

The request headers can be accessed using the `@RequestHeader` attribute.
```java
@RequestMapping("/greeting")
public ResponseEntity<String> greeting(@RequestHeader("Accept-Language") String language,
        @RequestHeader("Content-Type") String contentType) {
    // do something with the headers
    return new ResponseEntity<String>(String.format("Language: %s, Content Type: %s", language, contentType), HttpStatus.OK);
}
```
*Note that the name of the header field is case insensitive. So `Content-Type` and `content-type` are both same.*

If in case the header value is not present in the request, then a `400 Bad Request` error is sent as response.

## Marking headers as optional
Headers can be marked as optional and `400 Bad Request` will not be sent in case if the header is absent. This can be achieved using the `required` parameter.
```java
@RequestHeader(name = 'Content-Type', required = false)
```
Make sure you check for null values or provide default values.

## All headers as Map
We can get all the headers if we don't provide the name of the header that we are extracting and use a `Map` instead.
```java
@RequestMapping("/greeting")
public ResponseEntity<String> greeting(@RequestHeader Map<String, String> headers) {
    headers.entrySet().stream().map(it -> it.getKey() + ":" + it.getValue()).forEach(System.out::println);
    return new ResponseEntity<String>("ok", HttpStatus.OK);
}
```
*Note that headers will have only one value if multi value headers are found. In that case we should use `MultiValueMap`.*


## Using the `HttpHeader` object
The `HttpHeader` objects is designed for the purpose of extracting headers from the request and should be preferred. `HttpHeader` is extends a `MultiValueMap` so it is exactly same as the above method of extracting headers but it provides method to extract common headers values.

For example these are some methods which are present:
```java
headers.getContentType();
headers.getContentLength();
headers.getAccessControlAllowOrigin();
headers.getAccessControlAllowHeaders();
headers.getLocation();
headers.getOrigin();
// and lot more...
```

## Conclusion
In this article we learned how to extract request headers in Sprint REST.

- If we just want a single value, we can do that using `@ReqeustHeader("name")` method. Be sure to mark is optional is it's not a required header.
- We can get all headers using `HttpHeaders` object which is nothing but a `MultiValueMap`.
