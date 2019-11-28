---
layout: single
title: Search Elasticsearch from Java using High Level Client
date: 2019-11-26
categories:
- Elasticsearch
permalink: /elasticsearch/search-match-all-from-java-using-high-level-client
tags:
- Elasticsearch
- Java
---

In [the last post]({% post_url 2019-11-28-connection-to-elasticsearch-from-java %}) we saw how to connect to Elasticsearch using the High Level Client.

## `match_all` Query using Java client
The client provides many high level methods to build an Elasticsearch query. To keep it simple, let's see how to construct a simple `match_all` query:

```java
SearchRequest request = new SearchRequest("online"); // -- 1
SearchSourceBuilder builder = new SearchSourceBuilder(); // -- 2
builder.query(QueryBuilders.matchAllQuery());
request.source(builder); // -- 3
```
1. Parameter to the constructor is the index you want to query, this can be left empty and all the indices will be queried
2. `SearchSourceBuilder` is used to create a search request. We can create search requests with compound queries and filters using `SearchSourceBuilder`
3. Once we have created the `source` we can set that in the query using the `source` method on the `SearchRequest` object.

To find out what query was generated using the `SearchSourceBuilder` we can call the `toString()` method on it.
For example, in the above example, the following query was generated:
```json
{
    "query":{
        "match_all":{
            "boost":1.0
        }
    }
}
```

## Specifying the number of hits returned
By default Elasticsearch returns 10 hits as part of the response but this can be configured in the search request. The same thing can be achieved like this:

```java
SearchRequest request = new SearchRequest("online");
SearchSourceBuilder builder = new SearchSourceBuilder();
builder.query(QueryBuilders.matchAllQuery());
builder.size(50); // 50 hits will be returned as part of response
request.source(builder);
```
The resultant query generated is:
```json
{
    "size":50,
    "query":{
        "match_all":{
            "boost":1.0
        }
    }
}
```

## fetching source
By default Elasticsearch fetches the source of the document that matches and this can be controlled using the `_source` parameter in the search response. In the Java client, we can set the source field like this:
```java
builder.fetchSource(false);
```

## Search Response
The `SearchResponse` object is the parsed form of the response that Elasticsearch returns. It has the time taken, total hits, hits, etc that can be extracted.

For example, to get total number of hits, we can do:
```java
SearchResponse response = client.search(request, RequestOptions.DEFAULT);
int totalHits = response.getHits().totalHits;
```
We can get all the hits in the `SearchHits` object using `response.getHits()` method. We can iterate over all hits like this:
```java
for (SearchHit hit : response.getHits()) {
    hit.getSourceAsMap(); // this returns the actual document
    hit.getId(); // returns the document Id
}
```
There are more helper methods to parse every field returned by Elasticsearch.

## Conclusion
In this article we saw how to query Elasticsearch and how to iterate over the results.