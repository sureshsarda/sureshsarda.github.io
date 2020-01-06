---
layout: single
title: Collections
permalink: /collections
---

<h2>Elasticsearch</h2>
<ul>
{% for es in site.elasticsearch %}
    {% if es.publish %}
        <li><a href="{{ es.url }}">{{ es.title }}</a></li>
    {% endif %}
{% endfor %}
</ul>