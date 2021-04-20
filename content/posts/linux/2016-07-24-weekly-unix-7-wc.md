---
categories:
- Linux
date: "2016-07-24T00:00:00Z"
tags: []
title: 'Weekly Unix #7 - wc'
type: post
---
wc counts. It can count newlines, bytes, characters and words.

## Syntax
```bash
wc [option] [input-file]
```
Option is what do you want to count.
- `-c` for bytes
- `-m` for chars
- `-w` for **w**ords
- `-l` for new **l**ines (lines)


Let’s first create a test file that we will work on, and then we will start counting.

```bash
echo "this is a dummy file.nI am going to see how wc works" > test
$wc -c test
54 test # 54 bytes
$wc -m test
54 test # on my machine locale is UTF-8; so again 54
$wc -w test
12 test # 12 words
$wc -l test
1 test # only one line in the file
```
We can also have all of them together.
```bash
$wc -clw test
1 12 54 test # sequence is always largest to smallest irrespective of the arguments
```

`wc` doesn’t work on directories but it does work on binary file for example images.
So you can find size of the file in bytes:
```bash
$wc -c image.jpg
2343344 image.jpg # Size of file is ~2343kb
```
Passing `-l` or `-w` returns a number but it doesn’t make any sense.

Note 1: The command also reads filenames from a file using `--file0-from` argument

Note 2: There is a `-L` option which I have not discussed here. I’ll leave it to you to explore

---
So this was a simple yet powerful wc command. It has one task, but it does it well.

```bash
$wc -w thisblogpost
233 thisblogpost
```

