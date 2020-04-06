---
layout: single
title: Elasticsearch in Action - Building an autocompletion with completion suggester (Case Study - IMDB)
date: 2020-04-06
categories:
- Elasticsearch
permalink: /elasticsearch/case-study-movies-imdb-autocompletion-using-completion-suggester
tags:
- Elasticsearch
- CaseStudies
publish: true
---

In the previous article we saw [how to build a basic search using Elasticsearch][previous-part]. But search is kind of incomplete without the suggestion tips that appear when we start typing something. This functionality is useful to steer the direction of the search by giving the user idea of what an actual search result may look like as well as saves the effort of typing and user can select one of the suggestion directly without typing further.

In this article, we will look at how to build this functionality using Elasticsearch and the completion suggester mapping type.

## Preparing your index by adding the relevant mapping
A special mapping field is required for this to work. The new mapping will look something like this:
```json
{
  "mappings": {
    "_doc": {
      "properties": {
        "title": {
          "type": "text"
        },
        "title_suggest" {
            "type": "completion"
        },
        "subtitle": {
          "type": "text"
        },
        "summary": {
          "type": "text"
        }
      }
    }
  }
}

```
We have added a new field `suggest` which is not present in the document we are indexing. So while indexing, we will have to put the title in this field as well. A sample document that gets indexed will look something like this:
```json
{
    "title": "Pirates of the Caribbean: At World's End",
    "title_suggest": "Pirates of the Caribbean: At World's End",
    "tag_line": "At the End of the World, the Adventure Begins",
    "plot_summary": "Captain Barbossa, Will Turner and Elizabeth Swann must sail off the edge of the map, navigate treachery and betrayal, find Jack Sparrow, and make their final alliances for one last decisive battle."
}
```
Link to [complete data of 100 movies][data]

## Using the suggester
Once the data is ready, creating suggestions as easy as querying Elasticsearch.
```json
GET /movies/_search
{
    "suggest": {
        "movie-suggester-1": {
            "prefix": "the dark knight",
            "completion": {
                "field": "title_suggest"
            }
        }
    }
}
```

This returns the following result:
```json
{
    /* Elasticsearch metadata */
    "suggest": {
        "movie-suggester-1": [
            {
                "text": "the dark knight",
                "offset": 0,
                "length": 15,
                "options": [
                    {
                        "text": "The Dark Knight Rises",
                        "_score": 1,
                        "_source": { /* actual document */ }
                    },
                    {
                        "text": "The Dark Knight",
                        "_source": { /* actual document */ }
                    }
                ]
            }
        ]
    }
}
```

*Some Elasticsearch metadata has been removed to keep the output succinct*

## Perfect. But not so much
This completion suggester works perfectly fine when the text we are trying to match starts with the data indexed in it. Only querying `dark knight` instead of the `the dark knight` returns not results at all! In this particular case, removing stop words will prevent the issue. It still won't address the issue when we search for `spiderman` and `the amazing spiderman` is not returned.

In the next articles, we will see how to overcome this issues: first by enriching the data and then by using edge ngram analyzer to build our own completion suggester.


[data]: https://gist.github.com/sureshsarda/fa4b61fb4919b628f3de088cba504890
[previous-part]: /elasticsearch/case-study-movies-imdb-part-1-basic-search