---
layout: single
title: Collections
permalink: /collections
---

<h2>Databases</h2>

<h3>Index of articles</h3>
{% for db in site.databases %}
    {% if db.publish %}
        <li><a href="{{ db.url }}">{{ db.title }}</a></li>
    {% endif %}
{% endfor %}


<h2>Elasticsearch</h2>
<ul>
{% for es in site.elasticsearch %}
    {% if es.publish %}
        <li><a href="{{ es.url }}">{{ es.title }}</a></li>
    {% endif %}
{% endfor %}
</ul>

<h2>Design Patterns</h2>
<ul>
{% for a in site.patterns %}
    <li><a href="{{ a.url }}">{{ a.title }}</a></li>
{% endfor %}
</ul>

<h2>Reference Articles</h2>
- [Developer to Architect by Mark Richards](https://www.developertoarchitect.com/lessons/)
- [Anatomy of a flawed microbenchmark](https://www.ibm.com/developerworks/java/library/j-jtp02225/). In fact the entire Java theory and practice is good read by Brian Goetz


