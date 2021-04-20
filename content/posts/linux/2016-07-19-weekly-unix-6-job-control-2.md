---
categories:
- Linux
date: "2016-07-19T00:00:00Z"
tags: []
title: 'Weekly Unix #6 - job control (2)'
series:
    - Power Unix User
---
## Finer Job Selection
In the <a href="http://sureshsarda.in/2016/07/18/weekly-unix-6-job-control/">previous</a> article we saw basics of job control but we skipped alternatives to select jobs. Consider the following job listing throughout this article.

```bash
$jobs
[1]   Running    find . -name *.xml > /dev/null &
[2]-  Stopped    cat /dev/zero > /dev/null
[3]+  Stopped    find . -name *.cc > /dev/null
```

### 1. Using job number
You can use the job number (the number in square bracket) to work on it. Jobs can be referred by job number using `%N` where `N` is the job number.
```bash
fg %2
```
will resume 2nd job in foreground

### 2. Using job execution command
It’s not required to know the job number if you are more comfortable with the execution command.

The following command will resume 2nd job (the one starting with cat in background)

```bash
bg %cat
```
Whereas this next one will resume the 3rd one in background

```bash
bg %?cc
```
Note the difference of `?` in first and second form. Without `?`, prefix is searched whereas with `?` substring is searched. In case there are more than one job matching, the command will report an error.

### 3. Selecting current and previous jobs
Current job and previous job can be referred using `%+` and `%-` respectively.

## Shorthand
A shorthand method to resume jobs in foreground and background exists. Following commands are just short-form of respective longer commands.

```bash
%N => fg %N
%N & => bg %N
```
A detailed article on job control can be found <a href="http://sureshsarda.in/2016/07/18/weekly-unix-6-job-control/">here</a>.

