---
layout: single
title: Elasticsearch in Action - Basic Search (Case Study - IMDB)
date: 2020-04-01
categories:
- Elasticsearch
permalink: /elasticsearch/case-study-movies-imdb-part-1-basic-search
tags:
- Elasticsearch
- CaseStudies
publish: true
---

Searching is an important component of an application. The search bar that take the least amount of space on your site or app attracts more users than you think. But sadly, it gets less attention from the developer and it turns down more user than you think.


A search journey typically looks like this:
1. User starts typing something, here we show sample results (auto-complete) or suggest more terms as they type (auto-suggest). Yes there is a difference.
2. The second part is to actually show the search results
3. The third part is user consumes the content by clicking on it

In this article, we will use [Elasticsearch](https://www.elastic.co/what-is/elasticsearch) to search movies from a dataset. We will only concentrate on the second part - that is to search the documents. I assume that you are slightly familiar with Elasticsearch so I won't explain the queries in very detail.

This kind of search is something Elasticsearch provides out of the box. We don't have to do much but just index (insert) documents in Elasticsearch and then fire appropriate queries.

## Data
To keep things simple right now, we will use basic movies documents:
```json
{
        "title": "Pirates of the Caribbean: Dead Man's Chest",
        "tag_line": "Captain Jack is back.",
        "plot_summary": "Jack Sparrow races to recover the heart of Davy Jones to avoid enslaving his soul to Jones' service, as other friends and foes seek the heart for their own agenda as well."
    },
    {
        "title": "Pirates of the Caribbean: At World's End",
        "tag_line": "At the End of the World, the Adventure Begins",
        "plot_summary": "Captain Barbossa, Will Turner and Elizabeth Swann must sail off the edge of the map, navigate treachery and betrayal, find Jack Sparrow, and make their final alliances for one last decisive battle."
    },
    {
        "title": "Pirates of the Caribbean: The Curse of the Black Pearl",
        "tag_line": "Over 3000 Islands of Paradise -- For Some it's A Blessing -- For Others... It's A Curse.",
        "plot_summary": "Blacksmith Will Turner teams up with eccentric pirate \"Captain\" Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead."
    },
    ...
```
The complete data to search can be found [here][data]. The dataset is intentionally small so we can see and measure what's happening.

Typical mapping for this will look something like this:
```json
{
  "mappings": {
    "_doc": {
      "properties": {
        "title": {
          "type": "text"
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

## First Search
We are not processing the data in any way. And therefore there are few but very important things we can do with it. To search movies by title, we will do something like this:
```json
GET /movies/_search
{
    "query": {
        "match": {
            "title" : "hobbit"
        }
    }
}
```
It will give us all the movie titles with hobbit in it:

```
The Hobbit: The Desolation of Smaug
The Hobbit: The Battle of the Five Armies
```

## Searching in all parts of the document

This is good, but most of the times not sufficient. Searching just in the title of the movie or article or product name is not sufficient. We have to dig deeper. This will very quickly return no result just because the title doesn't contain that word. An ideal search should take all the available information about an item and give you most relevant results.

Here, the user not necessarily want to search in title, they might want to search movies about hobbits (or hobyte? Lame). Let's modify the query accordingly. We can use a multi-search query.

```json
GET /movies/_search
{
    "query": {
        "multi_match": {
            "query": "hobbit",
            "fields": ["title", "plot_summary", "tagline"]
        }
    }
}
```
So now we are searching for `hobbit` in all parts of the document. We get this: (I have removed the Elasticsearch metadata and kept only the sequence)
```json
{
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "tag_line": "One ring to rule them all, One ring to find them, One ring to bring them all and in the darkness bind them",
    "plot_summary": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron."
},
{
    "title": "The Hobbit: The Desolation of Smaug",
    "tag_line": "Beyond darkness... beyond desolation... lies the greatest danger of all.",
    "plot_summary": "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
},
{
    "title": "The Hobbit: The Battle of the Five Armies",
    "tag_line": "The epic conclusion to 'The Hobbit' trilogy.",
    "plot_summary": "Bilbo and company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."
}
```
So it returns one more result (lot more in case of bigger database) which mentions about the term `hobbit`.

## Scoring - because not all parts are *that* important
Presence of word in some part of document might not be as important as somewhere else. In the above example, the movies that have `hobbit` in title will be far more relevant than those where it's present in plot_summary or in some trivia. We have to change the order such that this is taken care of. We can use `boosting` for this.
```json
GET /movies/_search
{
    "query": {
        "multi_match": {
            "query": "hobbit",
            "fields": ["title^3", "plot_summary", "tagline"]
        }
    }
}
```
The same query but with boosted title gives a more accurate search result:
```json
{
    "title": "The Hobbit: The Desolation of Smaug",
    "tag_line": "Beyond darkness... beyond desolation... lies the greatest danger of all.",
    "plot_summary": "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
},
{
    "title": "The Hobbit: The Battle of the Five Armies",
    "tag_line": "The epic conclusion to 'The Hobbit' trilogy.",
    "plot_summary": "Bilbo and company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."
},
{
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "tag_line": "One ring to rule them all, One ring to find them, One ring to bring them all and in the darkness bind them",
    "plot_summary": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron."
}
```
Notice, how `The Lord of the Rings` is pushed down because hobbit is mentioned in plot summary.

That's it! The tiny looking search bar is more important that you think. Let's keep it useful. We saw a very basic use case of Elasticsearch and later we will improve on this. Stay tuned.

## Further Reading
- [`multi-query` on Elastic.co](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html)

[Data]: https://gist.github.com/sureshsarda/fa4b61fb4919b628f3de088cba504890