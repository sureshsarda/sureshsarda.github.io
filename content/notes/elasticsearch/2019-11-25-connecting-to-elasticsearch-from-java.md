---
categories:
- Elasticsearch
date: "2019-11-25T00:00:00Z"
tags:
- Elasticsearch
- Java
title: Connect to Elasticsearch using Java High Level Client
url: /elasticsearch/connect-from-java-using-high-level-client
---

Elasticsearch provides a client to conveniently connect with Elasticsearch. Create a Maven project and add the following maven dependency:

## Add Maven Dependency
```xml
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>elasticsearch-rest-high-level-client</artifactId>
    <version>7.3.1</version>
</dependency>
```

## Set Up connection with Elasticsearch
Elasticsearch maintains 2 clients - Low Level Client and High Level Client. It is recommended to use the High Level Client to query and index documents in Elasticsearch. You can create connection to Elasticsearch like this:
```java
 RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http")));
```
The High Leve Client internally creates a low level client which manages the connections to Elasticsearch. Once you are done, you can close the connection by calling `client.close()`. Note that this should be only called when you are absolutely done using the connection because it will close the connection pool created by low level client. Opening and closing connection again and again will add peroformance overhead.

## Check if connection was successful
You can get the cluster information with the `info` method on the `client`:
```java
MainResponse info = client.info(RequestOptions.DEFAULT);
System.out.println(info.getClusterName());
```
`MainResponse` has many helper method to get cluster information provided by Elasticsearch when you directly query Elasticsearch without any parameter or path like this: `GET http://localhost:9200/`.


## Don't forget to close the connection
Connection can be closed by calling the `close` method:
```java
client.close()
```

## Conclusion
1. Connect to Elasticsearch from Java
2. Get Cluster Info from Java High Level Client
3. Close the connection once done.