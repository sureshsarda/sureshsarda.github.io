---
categories:
- Linux
date: "2016-06-26T00:00:00Z"
tags:
  - linux
  - power-unix-tools
  - du
title: 'Weekly Unix #2 - du'
series:
    - Power Unix User
---
### du = Disk Usage
du summarizes the disk usage for files and folders.

## How to use
```bash
du
```
This will list size of all the files as well as folders in the current directory. The folders will be explored recursively. That means all the files in the folders will be listed as well.

The above gets bit out of hand when you have lot of files. You won't be able to figure out what is happening as lot of entries will go from your eyes. We can use -s option to summarize. So therefore,

```bash
du -s
```
will print the size of current directory. This size is in bytes and to print it in human readable format, add -h option.

```bash
du -sh
```
This will print the size of current directory in readable format. But what if we want to view the sizes of all files in current directory the way it shows in file explorer?

```bash
du -sh *
```
This will print sizes of all folders in current directory. The output can then be piped to sort command to get a sorted output.

```bash
du -sh * | sort -h
```
The `-h` option sorts considering the suffix `K` or `M` of the file sizes. This can be dropped if you have used a common unit for listing the sizes.

But I prefer having the largest directory/file on the top so I know what is consuming most of the space. We could simple add `-r` switch to sort command that will sort in decreasing order.

## Frequent Usage
And finally I create an alias and added to my `.bashrc` file so I don't have to type all this again and again when I want to list files.

```bash
alias size="du -sh * | sort -rh"
```
Every time I want size of current directory, I just need to type `size`

