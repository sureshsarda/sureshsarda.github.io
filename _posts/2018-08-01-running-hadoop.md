---
layout: single
title:  "Running in Pig in Local Mode in Java"
date:   2018-08-01 07:11:02 +0530
categories: hadoop java pig
share: true
---

# Running Pig in Local Mode in Java

## Overview of steps
1. Create a new maven project
2. Add Hadoop and Pig dependencies
3. Write a small pig script to count words in a file
4. Write a driver program that will run this pig script


## 1. Create a new maven project
```shell
mvn archetype:generate -DgroupId=com.example -DartifactId=piglocal -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
```

You can now import the project in your IDE.

### 2. Add Hadoop and Pig dependencies
Pig needs the following dependencies:
```xml
<dependency>
    <groupId>org.apache.pig</groupId>
    <artifactId>pig</artifactId>
    <version>0.17.0</version>
</dependency>

<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.16</version>
</dependency>

<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-hdfs</artifactId>
    <version>3.0.3</version>
</dependency>
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-client</artifactId>
    <version>3.0.3</version>
</dependency>

<dependency>
    <groupId>org.python</groupId>
    <artifactId>jython</artifactId>
    <version>2.7-b1</version>
</dependency>
```

## 3. Write a small pig script to count words in a file
```shell
inp = LOAD 'complete/path/to/file.txt' as (line:chararray);
words = foreach inp generate FLATTEN(TOKENIZE(line)) as word;
word_groups = group words by word;
word_count = foreach word_groups generate group, COUNT(words);
ordered_word_count = order word_count by group desc;
store ordered_word_count into 'out';
```

Don't forget to update the input file

### 4. Write a driver program
```java
public static void main(String[] args) throws IOException {
    PigServer ps = new PigServer(ExecType.LOCAL);
    ps.registerScript("wordcount.pig");
}   
```