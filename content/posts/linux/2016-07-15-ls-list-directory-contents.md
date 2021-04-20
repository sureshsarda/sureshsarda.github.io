---
categories:
- Linux
date: "2016-07-15T00:00:00Z"
tags: []
title: 'Weekly Unix #4 - ls'
---
This command is one of the most widely used (no references, just guessing) command. It simple lists the directory contents. It lists files, directories and links in current directory (default behavior). The command and it’s variants are so widely used, that some of the distributions contains some aliases for this command in the `.bashrc` file. For example I am using Mint and it already contains these `ls` aliases in my `.bashrc`:

```bash
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
```
I am not going to bore you with what this command does and where to use it. Instead I am going to talk about how to control the output of this command and how to create some more interesting aliases of this command.

## Some interesting aliases
### 1. Filtering results with `ls` and `grep`
Many times we wish to see only part of directory content. Something that matches a particular pattern. We can achieve this by passing the output to grep. Having an alias for this is simply very handy.
```bash
alias lsf="ls | grep $1"
alias llf="ll | grep $1"
```
### 2. Size matters
Sometimes `ll` is not the preferred way to print files. It sorts them according to the filename. Instead we are interested in the size.

```bash
alias lls="ls -SFlra"
```
`-S` sorts according to size, `-r` reverses the order thus making largest files in the bottom and folders, links at the top. Other modifiers are same as the original ll alias.

### 3. Show modified files on top
```bash
alias lst="ls -lt"
```
### 4. sl - The program ‘sl’ is currently not installed.
I’m very prone to typing `sl` instead of `ls` and I get the above error message. A simple but effective fix is create an alias!
```bash
alias sl=ls
```
Every time I mistakenly type `sl`, it understands what I am trying to do.

## -F (--classify) Notations
Terminal sometimes doesn’t have colors or other markers that distinguish between directory or link or file. This argument appends one of `*/=>@|` after the name so that it can be understood what we are looking at.


| Operator | Description
| - | -
| `/` | is for directory
| `@` | is for a link
| `*` | is for an executable
| `=` | is for a socket
| `|` | is for a named pipe
| `>` | is for a door

Hope this helps to list items faster! :)