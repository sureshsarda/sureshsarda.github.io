---
date: 2023-01-15
tags:
  - java
  - clean code
  - gradle
title: Spotless - an alternative to Checkstyle that applies the formatting
type: Essay
pinned: true
---

[Checkstyle][4] is a wonderful tool when we want to enforce the style guidelines in
the project. But it has 2 major problems:

1. It can't apply the formatting, it can only check whether the code is
   compatable. You need to rely on alternatives like suggested in this [Stack
   Overflow thread][1]. But there is
   no programattic way to do it.
2. It can't work only on the changes that you have made. For you to only check
   with the files that you have modified, you need a workaround suggested in
   [this article][2]. (I don't speak the language but the code snippet is quite
   evident)

## Enter [Spotless][3]

Spotless is more or less similar to Checkstyle but with few more features that
we need. We will only discuss the differences. The rest is same.

### Apply the fixes

While Checkstyle only supports finding out the problems, Spotless can even fix
them for you. With Gradle you would end up running

```bash
./gradlew spotlessApply
```

and ta-da!

The regular `./gradlew spotlessCheck` will just generate a report for you like
Checkstyle does.

### Working with only the diff

A very neat feature with Spotless is that it can only work with the diff. So
if you are integrating a code formatter for the first time on a legacy project
it would become very simple. The spotless configuration looks something like
this:

```groovy
spotless {
    ratchetFrom 'origin/main'
    // more configuration omitted
```

This will only check and apply against the diff with `main` branch. Works fine
with tags, branches or any other commit for that matter.

### Working with an existing code formatter

Onboarding a legacy project to these changes is always challenging because
you end up either too many changes or it doesn't comply with the exact code
style that your organization is following. If your project already uses Eclipse
code formatter, you can simply re-use that with spotless. No new files or
anything is required.

```groovy
spotless {
    java {
        eclipse().configFile('./.settings/eclipse-formatter.xml')
        // more configurations emitted
    }
}

```

Well, these are the 3 features I loved about Spotless, which made it easy to
integrate with my existing projects.

---
[1]: https://stackoverflow.com/questions/8409074
[2]: https://ealebed.github.io/posts/2020/gradle-checkstyle-on-changed-files-only/
[3]: https://github.com/diffplug/spotless
[4]: https://checkstyle.org/

This is my 10th of 100 post in [#100daysToOffload](https://100daystooffload.com/).
