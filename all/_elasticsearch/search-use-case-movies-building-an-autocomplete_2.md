---
layout: single
title: Elasticsearch in Action - Building an autocompletion with completion suggester (Case Study - IMDB) - Part 2
date: 2020-04-10
categories:
- Elasticsearch
permalink: /elasticsearch/case-study-movies-imdb-autocompletion-using-completion-suggester-2
tags:
- Elasticsearch
- CaseStudies
publish: true
---

In the previous article we saw how to build a completion suggester but it only works when the search query matches the start of the suggestion text. The reason for this is, by default the analyzer is `simple`. The text is not tokenized and not processed.

## The Problem
Consider the documents inserted:
```
The Lord of the Rings: The Two Towers
The Lord of the Rings: The Fellowship of the Ring
The Lord of the Rings: The Return of the King
```
In the last article we saw that `towers` or `fellowship of the ring` did not return any result.

## Solution - Split by terms
A simple solution to this is to split the text and insert it.

*Plot Summary and Tag line are not present, below and they should be inserted as it is.*

```json
{
  "title": "The Lord of the Rings: The Two Towers",
  "title_suggest": ["the", "lord", "of", "the", "rings", "two", "towers"]
},
{
  "title": "The Lord of the Rings: The Fellowship of the Ring",
  "title_suggest": ["the", "lord", "of" "the", "rings", "fellowship", "ring"] 
},
{
  "title": "The Lord of the Rings: The Return of the King",
  "title_suggest": ["the", "lord", "of", "the", "rings", "return", "king"]
}
```
This will suggest even if any word is from the suggestion is present in the search query. For example:

### Example
```
GET /movies/_search
{
    "suggest": {
        "movie-suggester-1": {
            "prefix": "towers",
            "completion": {
                "field": "title_suggest"
            }
        }
    }
}
```
Returns,
```json
/* other Elasticsearch metadata */
{
  "_source": {
    "title": "The Lord of the Rings: The Two Towers",
    "tag_line": "All will be sacrificed... All will be lost... Unless all unite against evil. (Trailer)",
    "plot_summary": "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
    "title_suggest": [
        "The",
        "Lord",
        "of",
        "the",
        "Rings:",
        "The",
        "Two",
        "Towers"
    ]
}
```
There is still a problem with this approach that it fails with two words in search term. A search with `two towers` return no results.

## Solution - Index all the suffixes
Another way to enrich the data is by inserting as many possible search queries as possible by finding out all the possible suffixes of the `title`. A title like `The Amazing Spiderman` becomes somethings like this:
```
The Amazing Spiderman
Amazing Spiderman
Spiderman
```
`The Lord of the Rings: The Two Towers` becomes:
```
The Lord of the Rings: The Two Towers
Lord of the Rings: The Two Towers
of the Rings: The Two Towers
the Rings: The Two Towers
Rings: The Two Towers
The Two Towers
Two Towers
Towers
```

A Python mapper that converts will look something like this:
```python
def mapper_split(d):
    tokens = d['title'].split(" ")
    suggestions = []
    for i in range(len(tokens)):
        suggestions.append(' '.join(tokens[i:]))

    d['title_suggest'] = suggestions
    return d
```

And searching for any term `two towers`, `the two towers` or `tower` will result in correct results.

In the subsequent articles we will try to improve this search further and look at performance implications of these enriched documents.

That's all for now!