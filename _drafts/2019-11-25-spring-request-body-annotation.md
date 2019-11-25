---
layout: single
title: Spring MVC - @RequestBody annotation to parse Http Request Body
date: 2019-11-24
permalink: /java/spring/spring-mvc-boot-rest-request-body-parse-http-request-body
categories:
- Java
tags:
- Spring
excerpt: This is a brief introduction on using the @RequestBody annotation in Spring to parse Http Request Body over different content types.
---

In this article we will take a look at how to use the `@RequestBody` annotation.

The `@RequestBody` is used to automatically parse and serialize the Http Request Body of the request and create Java objects out of it. The Java objects can be a POJO (Plain Old Java Objects) or a Map depending on the requirement.

Let's take an example on how to use `@RequestBody` annotation to parse body passed as `application/json`:

