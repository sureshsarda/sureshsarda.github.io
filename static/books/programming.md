---
layout: single
title: The Absolute Minimum Every Software Developer Absolutely, Positively Must Know
permalink: /books/absolute-minimum-about-programming
---

This book is inspired from [an article by Joel Spolsky on Encoding][1]. This article got me wondering what are few more things every program must know or should lear when they are programming. So I started compiling a list of topics which I believe as a programmer you should be aware of. Few of these are taught in graduate courses but they were well hidden behind other topics which perhaps are not that relevant. Few of these are never taught in grad school but we are somehow supposed to know them or are only taught by a mentor at work.

### Chapters
1. Design Principles
    1. SOLID
    3. KISS
    4. Correct-Clean-Concise-Optimize in that order
    5. Writing clean code
2. [Debugging and your IDE][debugging]
    1. Printing variable value on console is not how you debug
3. Strings
    1. Encoding
    2. Big Endian and Little Endian
    3. Encryption
4. Caching
    1. Caching Algorithms
    2. Where and when to use
4. Data Structures
    1. Other trees
    2. Bloom Filters
    3. ...
5. Code Optimization
    1. Operating Systems Memory Management
    2. Trusting the optimizer and writing readable code
    3. Inlining
6. Multi-threading
    1. Threads
    2. Synchronization - Mutex, Semaphores
    3. Threadpools
7. Web APIs
    1. Authentication and Authorization
    2. Rate Limiting
    3. Documentation
    4. Hello, World
8. The package manager of your language of choice
9. Shell Commands
    1. Grep
    2. Find
    3. Think Automation -Get into a habit of writing small scripts
10. Databases
    1. SQL vs NoSQL
    2. CAP theorem
    3. Scaling
11. More databases
    1. Data storage
    2. Indexes
    3. Aggregations
    4. Performance
12. Design Patterns (Why?)
13. Deploying your application
    1. What options do you have
    2. APIs
    3. Web-apps
        1. CDN
    4. Containers


[1]: https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/

[debugging]: /books/absolute-minimum-about-programming/debugging