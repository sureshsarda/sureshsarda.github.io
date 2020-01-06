---
title: How to create a Gmail like advanced filter and search in your app using Elasticsearch
layout: single
publish: true
---
I'm sure you must have used the advanced filters in Gmail where you can filter a message by sender or by whether it has any attachment or exact text match in various part of the mail - the body or the subject. There are more filters and in this article we will try to create a parser based in Typescript and tie it with an API endpoint that queries Elasticsearch to give you relevant results.

Before we begin, let's understand what are the different components that we need for this app. What will be get done on the UI and what will be passed to the backend.



