---
title: Building a heap
curated: true
draft: true
---

I always tend to forget how to build a heap from an array. It's a really simple algorithm but I tend to forget it. So I decided to build it myself. Let's see how to do it.

## Properties of a heap we have to consider
Heap can be a min heap or a max heap and depending on that, the parent can either be less than or greater than the children. I'll build a min heap but converting that to a max heap is straightforward.

> Parent is always less than the children

So we should get a heap if we start from the bottom and keep swapping the elements or start bubbling the min element to the top.