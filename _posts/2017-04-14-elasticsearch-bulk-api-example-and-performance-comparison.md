---
layout: single
title: Elasticsearch Bulk API Example and Performance Comparison
date: 2017-04-14 10:14:10.000000000 +05:30
categories:
- Elasticsearch
tags:
- bulk-api
- performance
---
Elasticsearch provides bulk operations to perform multiple operations in a single call. Bulk APIs can be accessed by hitting the [_bulk][es-ref-bulk] endpoint.
This post demonstrates the use of bulk API with Python. It assumes that you are familiar (not expert) with [REST Bulk API of Elasticsearch][es-ref-bulk]. To keep it simple we will just consider the insertion case.

## Problem Statement
Before we jump into code, let’s take a minute and think about the problem in hand. We have some data that we want to insert into Elasticsearch. 

To simulate this, we need a data generation module that provides us data. At times, we cannot directly insert the data in the database. We need to perform some sort of processing on the data before inserting it. After this, we can send these documents to Elasticsearch. Summarizing this, we have 3 steps (or phases):
1. Data generation
2. Processing of data
3. Insertion

## [elasticsearch-py]
We are going to use elasticsearch-py. Bulk APIs are provided as [helper method in elasticsearch-py][es-py-docs]. Let’s now write code for each step.

### 1. Data Generation
Data can be generated anyhow. It could be read from a file or from any other database or from a socket. It doesn’t matter. For this example, I’ll generate some random data.
```python
def generate_doc(count=10):
    """
    Creates a document with random username, random salary amount, random profession and a date of birth
    :param count: number of documents to return
    :return: generator object for user documents
    """
    def generate_username():
        return ''.join(random.choice(string.ascii_lowercase) for _ in range(10))
    
    def generate_profession():
        return random.choice(['Accountant', 'Doctor', 'Engineer', 'Realtor', 'Writer'])
    
    def generate_user_doc():
        return dict(
            username=generate_username(),
            profession=generate_profession(),
            salary=random.randint(1000, 100000)
        )

    random.seed(33)
    for i in range(count):
        yield generate_user_doc()
```
### Data Processing
Okay, so we have our data. Now we need to process this. This step is required if you are copying the data from some other database to ES and need to perform some preprocessing. But since we have the data in the correct format, we will just skip this step.
```python
def process_document(document):
    # Add document processing here
    return document
```
You could add your implementation in this method.

### Bulk Insertion
Alright, now we have all the data we need. Let’s store it. But before we store there’s something that we need to consider. The body of bulk API should contain the some metadata. It should contain the `operation` we need to perform, what `index` and what `type` to perform on, etc. For every document we need this metadata. Let’s write one more method that adds this information.
```python
def create_bulk_api_query(document_generator, index, type, action='index'):
    for doc in document_generator:
        d = dict(
            _op_type=action,
            _index=index,
            _type=type,
            _source=doc
        )
        yield d
```

This function takes the generator object we created earlier and returns it’s own generator object that adds some metadata to the document. Simple.

Next we perform the operation we specified earlier. And this is as simple as executing this one statement:

```python
success, failed = bulk(client, create_bulk_api_query(documents, index=index, type=type))
```

We have passed an Elasticsearch `client`, the `generator` object and the `index` and `type` to perform the operations on. It returns a tuple with 2 fields – `success` count and `failure` count. That's it!
The complete script can be found [here][gist].

## Comparing Performance with regular inserts:
So I tried to insert some documents with bulk API. It looked fast to me. It had to be. But the results I found were astonishing:

| Documents | One by One    | Bulk         | Gain         |
| --------: | ------------: | -----------: | -----------: |
| 100       | 1.3989231586  | 0.1614105701 | 8.6668621354 |
| 1000      | 10.0419487953 | 0.3521802425 | 28.5136631258|
| 10000     | 64.6501646042 | 2.8116579056 | 22.9936097403|
| 100000    | 600.7230203152| 17.1942903996| 34.9373545727|

#### Plotting it:
![Comparasion][image]

I was expecting a 5x or 10x gain. 34X at 100k documents is a lot!

*Note: This is not a benchmarking study. These are just approximate results and should be used only as guideline.*

[es-ref-bulk]: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html
[elasticsearch-py]: http://elasticsearch-py.readthedocs.io/en/master/index.html
[es-py-docs]: http://elasticsearch-py.readthedocs.io/en/master/helpers.html
[gist]: https://github.com/sureshsarda/scripts/blob/master/bulk_api.py
[image]: /assets/images/posts/es/performance.png