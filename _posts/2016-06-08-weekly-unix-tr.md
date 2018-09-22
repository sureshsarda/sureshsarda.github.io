---
layout: single
title: Weekly Unix \#1 - tr
date: 2016-06-08
categories:
- Competitive programming
tags:
- hackerrank
---


## tr - translate
TR basically stands for translate. The man page says - translate or delete character. So tr is used to manipulate the byte stream provided to it. This command again is very powerful when combined with other commands. For example you want to rename files to lower case (thought there are other methods for this), or you want to change a (or a set of) character in a file or from a live stream, this is the utility you will need. So let's dive in, see the basic usage first and then dig further.

### Syntax:

```shell
tr [OPTION] ... SET1 [SET2]
```
Well nothing much there, that was a simple copy-paste from the manual page of the command but it gives us basic idea of how to use the command.  It has various options which we will see in a bit and then there is something called set. Will see that too.

### Example:

```shell
$echo "Hello, World! How are you today?" | tr A-Z a-z
> hello, world! how are you today?
```

So that was simple lower case.

Simply put, `tr` takes first set, and replaces them with the second set. But the second set was optional. Well that's because you can also delete using translate.

### Example:

```bash
$echo "Hello, World! How are you today?" | tr -d a-z
>   
```
<p>Oh no!</p>

```bash
$echo "Hello, World! How are you today?" | tr -d aeiou
> Hll, Wrld! Hw r y tdy?
```
Well if you are wondering what are all the weird spaces there, then they are from our input. The characters specified are totally gone. No placeholders either. Let's remove those spaces too.

```bash
$echo "Hello, World! How are you today?" | tr -d aeiou
> Hll,Wrld!Hwrytdy?
```

Did you see how the space was escaped? So yeah special characters are to be escaped before using.</p>

### Using Character ranges
Character ranges like some in regular expression are supported. Few special types are also builtin. For example - `:alnum:` is for alpha numeric, `:digit:` is for all digit and many more - `:lower:`, `:upper:`, `:punct:`, `:space:`, etc, etc.. You can always refer the manual to see which one corresponds to what.

Hope that helps!