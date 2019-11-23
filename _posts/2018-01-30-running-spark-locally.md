---
layout: single
title: Running Spark Locally
date: 2018-01-30
type: post
categories:
- Apache Spark
tags: []
excerpt: A quick guide on setting up Apache Spark on your local machine for development
  and testing.
---
Running distributed applications on local machine might seem like a tedious task, but apparently it’s pretty easy.

## 1. Download and extract the binary
The binary can be downloaded from [here](https://spark.apache.org/downloads.html), extract it somewhere, let’s call it `SPARK_HOME`

## 2. Running the master
```bash
cd $SPARK_HOME/sbin
./start-master.sh
```
*Verify permissions if you are not able to run it*

The script will emit some log statement and a URL where master is running. On local machine this will be of format: `spark://your-machine-name:7077`

## 3. Verifying with Web UI
Spark ships with a UI as well and it is started automatically (default settings) at port `8080`, so you can navigate to `localhost:8080` and see if things are running fine

## 4. Running Slaves
Run the slaves/workers by executing:

```bash
./start-slave.sh $SPARK_URL -m 512m -c 1
```
The first parameter is the URL at which spark master is running.
You can also provide the memory and CPU cores the worker will take, in this example its 512mb and 1 core. The default is `(total memory - 1gb)` memory and all available cores which is not recommended in local mode.
You can verify on the UI if the slave got attached to the master.

## 5. Stopping
To stop, execute `./stop-all.sh` in the same directory. If things get crazy you can of course find the tasks using `ps -aux | grep "spark"` and kill them individually.

Detailed information can be found [here](https://spark.apache.org/docs/latest/spark-standalone.html).

