---
category: how to
date: "2019-11-27T00:00:00Z"
header:
  caption: Elasticsearch Index Documents
  overlay_image: /assets/images//overlay/marcel-strauss-unsplash.jpg
  show_overlay_excerpt: false
tags:
- Elasticsearch
- Java
title: Insert, Index document in Elasticsearch using Java
url: /elasticsearch/insert-index-document-elasticsearch-java
---

In this article we will see how to insert a document in Elasticsearch using the High Level Client provided by Elasticsearch.

## Prepare the Index Request
Elasticsearch client accepts `IndexRequest` to insert documents. Two required details for this request are:
1. Name of the index
2. Document source

Everything else can take default value. We will stick to the easy path to create our very first document and explore other optional arguments later.

There are multiple ways to provide the source of the document - using a map, using JSON string, using `XContent`, etc.


```java
String body = "{'name': 'John Doe', 'age': 25, updated: '2019-11-25'}";
IndexRequest request = new IndexRequest("users");
request.source(body, XContentType.JSON);
```
The request is ready to be inserted into Elasticsearch.

## Insert the document
Assuming you have the [connection established]({% post_url elasticsearch/2019-11-25-connecting-to-elasticsearch-from-java %}) you can just call the `index` method on the client.

```java
client.index(request, RequestOptions.DEFAULT);
```

Connection can be setup like this:
```java
 RestHighLevelClient client = new RestHighLevelClient(
    RestClient.builder(
        new HttpHost("localhost", 9200, "http")));
```
make sure you close the connection by calling `client.close()` once you are done using it.


## Check if it was inserted
We will see in next articles how to retrieve documents from Elasticsearch. To quicky check if the document was inserted, we can run:
```bash
curl localhost:9200/users/_search?pretty
```
And this should give us the response with the document:
```json
{
  "took" : 24,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "users",
        "_type" : "_doc",
        "_id" : "ZAoIz24BnE_7WJlL7MOP",
        "_score" : 1.0,
        "_source" : {
          "name" : "John Doe",
          "updated" : "2019-12-04T03:51:38.797Z",
          "age" : 25
        }
      }
    ]
  }
}

```

## Alternatives to create a document
### Inserting document from a Map
Many times we might have a Map serialized from some channel to be indexed in Elasticsearch. Elasticsearch provides helper method to insert a Map directly. This can be achieved like this:
```java
IndexRequest request = new IndexRequest("users");
Map<String, Object> data = new HashMap<>();
data.put("name", "John Doe");
data.put("age", 25);
data.put("updated", new Date());
request.source(data);
```

### Inserting document directly using key values
Data can be directly entered in the request using key value in the source object like this:
```java
IndexRequest request = new IndexRequest("users");
request.source("name", "John Doe", "age", 25, "updated", new Date());
```

## Conclusion
We saw how to insert a document in Elasticsearch using the Java client. Documents need the index name and the content. Documents can be created directly from JSON strings, Map or directly from key value pairs in the `source` method of the `IndexRequest`.