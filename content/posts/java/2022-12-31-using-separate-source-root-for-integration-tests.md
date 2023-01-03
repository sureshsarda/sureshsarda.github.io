---
date: 2022-12-31
tags:
  - sdlc
  - java
  - programming
  - gradle
title: Using a Separate Source Root for Integration Tests
type: Essay
pinned: true

---
In Java if we apply the java plugin we get two source roots - main and test to
write our main code and all our tests.
It's often useful to have a separate directory for integration tests instead of
using some sort of tagging or file naming convention to run those different suites.

Let's do that!

## First, create the directory

To start with, create a new directory called `integration` under `src` directory.
The name can be anything, but whatever you name it, make sure to change `integration`
to that name in all the subsequent steps.

Your IDE will show this as a normal directory without any special treatment. We
will see how to fix that later.

## Second, mark it as source root

If you create a Java file in that directory, it won't compile. We need to inform
Gradle that this is a valid source root, and not just that, we should be able use
classes from our main source root. (Well how will you test otherwise?).

Add these lines to your `build.gradle`:

```gradle
sourceSets {
    integration {
        compileClasspath += sourceSets.main.output
        runtimeClasspath += sourceSets.main.output
    }
}
```

## Third, reuse the dependencies

At least it won't crib about *your* classes. But what about any dependency that
your are already using? Google Guava? Apache Commons? Spring Framework? Add this
piece of code to achieve that:

```gradle
configurations {
    integrationImplementation.extendsFrom implementation
    integrationRuntimeOnly.extendsFrom runtimeOnly
}
```

After this step, you should be able to run and compile your code. But if you run
your tests, Gradle will say that it didn't find any tests.

## Fourth, create a integration task

To help Gradle find your tests, we can either modify the existing `test` task;
or we can create a new one. We will create a new one:

```gradle
tasks.register('integrationTest', Test) {
    description = 'Runs integration tests.'
    group = 'verification'

    // use these classes to find tests
    testClassesDirs = sourceSets.integration.output.classesDirs
    classpath = sourceSets.integration.runtimeClasspath
    shouldRunAfter test

    useJUnitPlatform()

    testLogging {
        events "passed"
    }
}

```

Check if tests are running using: `./gradlew integrationTest`

## Fifth, but optional

If you run `./gradlew integrationTest`, your tests should not run. But IntelliJ
will not play nice with your new source root. It will assume it's a source root
like the `main` directory. We can fix that.

```gradle
apply plugin: 'idea'

idea {
    module {
        // by default it's assumed to be a source directory, we need to remove
        // that and add it as test directory.
        sourceDirs -= file('src/integration/java')
        testSourceDirs += file('src/integration/java')
    }
}

```

That's all is required to create a new test source using Gradle. We can even
create new type of test roots using the same method perhaps something for e2e
tests? Or we can create new source roots as well!

## Read More

* [Testing in Java & JVM projects on Gradle.org](https://docs.gradle.org/current/userguide/java_testing.html)

---

This is my 6th of 100 post in [#100daysToOffload](https://100daystooffload.com/).