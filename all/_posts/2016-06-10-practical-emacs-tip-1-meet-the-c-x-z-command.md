---
layout: single
title: 'Practical Emacs Tip #1: Meet the C-x z command'
date: 2016-06-10
categories:
- Emacs
tags: []
---
The Emacs manual simply states that "Repear the most recently executed command".

This command just repeats the last command with the last given set of arguments to that command (if any). No rocket science. Just simple Emacs!

By the way, before we start there is one more thing - Once you press `C-x z`, you can repeatedly press only `z` for the command to repeat itself! No need to press C-x again and again.

Let's take few examples:

| Key Sequence | Buffer Contents | Comments
| - | - | -
| `{start}` | <span style="background-color:#cccccc;">L</span>ine One | Starting buffer content
| | Line Two | 
| | Line Three | 
| `C-d` (delete a character) | <span style="background-color:#cccccc;">i</span>ne One | 1 character was deleted
| | Line Two | 
| | Line Three |
| `C-x z` (repeat) | <span style="background-color:#cccccc;">n</span>e One | Repeating the precious command
| | Line Two | 
| | Line Three | 
| `z` | <span style="background-color:#cccccc;">e</span> One | Repeating one more time. Note that `C-x` is not used
| | Line Two | 
| | Line Three | 
| `zzz` | <span style="background-color:#cccccc;">n</span>e | Repeat few more times without the prefix command
| | Line Two | 
| | Line Three | 

Repeat can be used after anything. I mean ANYTHING! Even if you have something like this `C-u 20 C-k`, you can use repeat and one more set of 20 lines will be killed! Don't worry you can also undo with this if you screw up a lot!