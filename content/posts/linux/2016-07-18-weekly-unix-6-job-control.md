---
categories:
- Linux
date: "2016-07-18T00:00:00Z"
tags:
  - linux
  - power-unix-tools
title: 'Weekly Unix #6 - job control'
---
Some commands take long time to finish execution. For example if you are searching for a file in a directory or extracting/compressing a directory or maybe building a project which take quite some time to complete. The command when executed takes a while to complete and thereby occupy the terminal preventing you from doing other stuff.

Linux (since a multitasking operating system) offers neat job control tools to deal with this.

The most basic which most of us know is adding `&` after the command. It makes the job run in background. Like this:
```bash
find . -name somefile.xml &
```
That’s okay but what if you want to check the status of this command? Or what if you forgot adding the `&amp;` or what if you thought it will get executed quickly but it’s taking some time and you need the terminal?

The following set of tools will help you with all these problems.

### Suspending and terminating job

| Task | Shortcut
| - | -
| Suspend job | ^Z (Control-Z)
| Terminate job | ^C (Control-C)

The table is self explanatory.


### Putting a job in background
If you have already started a job and wish to put it in background, first suspend it and execute `bg`.

For example:
```bash
$find . -name somefile.xml
^Z
$bg
$ <you have console for your next task>
```
### Listing all the jobs
Executing `jobs` prints a list of all the available jobs.
```bash
$jobs
[1]   Running      find . -name *.xml > /dev/null &
[2]-  Stopped      cat /dev/zero > /dev/null
[3]+  Stopped      find . -name *.cc > /dev/null
```
The number in square brackets is the job number followed by status and followed by the command used to execute.

`+(plus)` and `-(minus)` denote current and previous jobs respectively. *Current Job* is the last job stopped while it was in foreground or started in background. This is the default job for `bg` and `fg` commands. Whereas *previous job* is the one before that. A detailed article on job reference can be found <a href="http://sureshsarda.in/2016/07/19/weekly-unix-6-job-control-2/">here.</a>

### Killing a job
To terminate a job running in background, execute the `kill` command.

```bash
$find . -name *.xml > /dev/null
^Z
[1]+  Stopped    find . -name *.xml > /dev/null

$kill %N
[1]+  Stopped    find . -name *.xml > /dev/null
```
Here `N` is the job number.

Note that this applies to jobs running under current shell and to list all other jobs, you will have to use `top` or `ps -aux`.

## TL;DR
Run a job in background by adding `&`. Put a job to background by first suspending it and then typing `bg`. View all jobs under current shell by executing jobs and kill a job by its number.

| Task | Shortcut
| - | -
| Move a suspended job to foreground | `fg <job_reference>`
| Move a suspended job to background | `bg <job_reference>`
| List all jobs | `jobs`
| Kill a job | `kill <job_reference>`
| Start a job directly in background | `command &`

*Note that you have to suspend a job before you can do anything.*

&nbsp;

