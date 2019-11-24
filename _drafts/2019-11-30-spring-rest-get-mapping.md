---
layout: single
title: Spring REST - GetMapping in Spring
date: 2019-11-24
permalink: /java/spring/spring-mvc-boot-rest-get-mapping
categories:
- Java
tags:
- Spring
excerpt: This is a tutorial on exposing GET endpoints using Spring. It discussed how to expose an endpoint, how to accept Request Parameters and Request Body.
---

This is a tutorial on creating a `GET` endpoint using Spring.

`@GetMapping` annotation marks a method as handler for the GET request. It takes a path as parameters and whenever someone hits that endpoint, the handler is triggered.

```java
@GetMapping("/ping")
public ResponseEntity<String> greeting() {
    return new ResponseEntity<>("pong", HttpStatus.OK);
}
```
If we hit `/ping`, the above method will get triggered and we will get `pong` in the response. `GetMapping` is shorthand for `@RequestMapping(method = RequestMethod.GET)`, so the above example is same as:

```java
@RequestMapping(path = "/ping", method =  RequestMethod.GET)
public ResponseEntity<String> greeting() {
    return new ResponseEntity<>("pong", HttpStatus.OK);
}
```

## Reading Query Parameters
Like all standard RequestMappings, `GetMapping` also accepts the standard annotation for method arguments to parse request headers and request params or the request body using `RequestHeader`, `RequestParam` and `RequestBody` respectively. Here's the complete example that demonstrates all these in actions.

```java

@GetMapping("ping")
public ResponseEntity<Map<String, Object>> greeting(
            @RequestHeader("Content-Type") String contentType,
            @RequestParam("message") String message, 
            @RequestBody Map<String, Object> body) {
    System.out.println("Content-Type: " + contentType);
    body.put("Content-Type", contentType);
    body.put("Message", message);
    return new ResponseEntity<>(body, HttpStatus.OK);
}
```

Querying the above endpoint using cURL
```bash
curl -X GET \
  'http://localhost:8080/ping?message=hello' \
  -H 'content-type: application/json' \
  -d '{
	"example": "spring",
	"annotation": "GetMapping"
}'
```
Returns:
```json
{
    "message": "hello",
    "Content-Type": "application/json",
	"example": "spring",
	"annotation": "GetMapping"
}
```

## Read more about Spring
- [How to parse RequestHeaders in Spring]({% post_url 2019-11-23-spring-boot-request-headers %})
- [How to parse ReqeustParameters in Spring]
- [How to parse ReqeustBody in Spring]
- [How to pretty print a Map using Java Streams]
- [Introduction to Java Streams]({% post_url 2019-11-18-introduction-to-java-stream %})