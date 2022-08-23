---
categories:
  - Linux
date: "2016-07-03T00:00:00Z"
tags:
  - linux
  - power-unix-tools
title: 'Weekly Unix #3 - tee'
---
`tee` command as the man page puts it, reads from standard input and writes to standard output and files. Okay good enough but what does that mean? Well that mean, while using a command, the output is sent to the console. You can redirect it to file by using `>` and `>>` to a file. That symbol is of output redirection (a summary of that in the end of this post and all the output redirection is covered in separate post). 

Let's see you execute a command, for example `ls` and you see the output on the screen. But now you want to send the file listing to a file. What you do is, 

```bash
ls > file
```
This way a new file, 'file' will be created and the file listing will be redirected to that file. The console will be clear. But what if you wanted the output to be displayed on the screen as well as in the file? You use tee. 

```bash
ls | tee file
```
With this command, the output the displayed on screen as well as it goes into the file 'file'. You can have multiple files with tee. 

```bash
ls | tee file1 file2 file3
```
All the 3 files will have same content - the directory listing of current directory. 

You can all append to file if you don't want the contents to be overwritten. 

```bash
ls | tee --append file
```
```bash
ls | tee -a file
```
Both `--append` and `-a` append the output to the file and do not overwrite its content. 

## Output Redirection
In bash, you can redirect output to file and overwrite its contents using `>` and append the output to file using `>>` So for example, 

```bash
ls > file
```
```bash
ls >> file
```
The first line will overwrite the contents of file and second line will append without overwriting the contents 

