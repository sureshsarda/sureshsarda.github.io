---
date: 2023-01-07
tags:
  - testing
  - programming
  - java
  - docker
title: Creating TestContainers from Dockerfile and DSL
type: Essay
pinned: true
---
Containers make the job of writing integration test cases quite easy which rely
on a tool like a database or cloud infrastructure or any other tool for that
matter. Test containers take it a step further but letting us create containers
 from the code itself.

There is another neat trick in TestContainers that let’s us create the
containers on the fly. From Dockerfile or directly by declaring the container
spec with Java using a DSL. Let’s see how to do this.

## `Dockerfile` to create containers for `TestContainers`

The below code snippet create a container from the Dockerfile present in the
classpath. The advantages are quite obvious where we don’t need the tool out of
the box but some configurations are applied on the top of it.

```java
@Rule
public GenericContainer dslContainer = new GenericContainer(
    new ImageFromDockerfile()
            .withFileFromClasspath("Dockerfile", "test-containers/Dockerfile"))
```

For example, while the `JDBCContainer` provides the `initScript` method to load
the initial data, but it would be much better to use a container directly which
has the data set up already. This should speed up the creation process since
the layers will be cached by Docker and containers will be created much faster.

We can even experiment and test with such containers independently.

## Using DSL to build containers

If a Dockerfile is not sufficient, and we still need more dynamic way of
creating containers. Or say we want to test a feature against various database
implementations or perhaps we want to test our `ffmpeg` against various
operating systems. We can create containers dynamically using the DSL that
TestContainers provide. See this code snippet below:

```java
var images = new String[] {"ubuntu", "alpine"};
for (image in images) {
    new GenericContainer(
        new ImageFromDockerfile()
                    .withDockerfileFromBuilder(builder ->
                         builder
                                 .from(image + ":latest")
                                 .run("sudo apt install --update ffmpeg")
                                 .build()))
                 .withExposedPorts(80);
 // run some tests here
}
```

---

So while TestContainers make it easy to test against tools like Databases,
Cloud Services and many other out of the box support of tools. It now let’s us
create any container that’s possible using a Dockerfile and not just that; we
can even create these containers dynamically.

Of course, when the DSL gets complex enough, another option is to use the
Dockerfile with some velocity template and generate these Dockerfiles
dynamically. They can also be fed to TestContainers!

---

This is my 8th of 100 post in [#100daysToOffload](https://100daystooffload.com/).
