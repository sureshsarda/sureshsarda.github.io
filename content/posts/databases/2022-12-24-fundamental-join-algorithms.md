---
date: 2022-12-24
tags:
  - databases
  - programming
title: Fundamental Join Algorithms and IO Cost
type: Essay
pinned: true
math: true
---

Joins are integral part of relational databases and they are designed to do
them well.

<!-- A precursor to this article is on how database finds something which you can
read here. Although not a pre-requisite, it's a good starter on how database
gives us results. -->

There are few considerations before we join two table which can make a lot of
difference on the performance of the query - whether there is an index present,
what are the sizes of table? Can one table be fit in memory or whether an
external disk sort could be required to perform the join efficiently. But
in this article we will only see what are the most common join techniques.
We will not worry about optimization and cost analysis of the query; just the
join algorithms.

## Comparing Costs

Just to understand how these algorithms perform against each other, we will do
some back of the envelope calculations. We will try to find the cost of IO (and
not compute).
For that, lets assume two tables -

* Table $R$: $M$ pages, and $m$ tuples
* Table $S$: $N$ pages, and $n$ tuples

## Nested Loop Join

This is the most basic, least optimized join technique. It's simple as joining
two lists where you don't have any indexes present. We basically have to
iterate over each tuple in first table and for that, we have to search the if
a matching tuple is found in second table. Therefore, as the name suggests -
these are two nested 'for' loops (or perhaps more if there are more tables
in the query). Something like this:

```plain
foreach tuple r in R:
    foreach tuple s in S:
        emit r and s if they match
```

### Cost Calculation for Nested Loop Join

Generally the expensive operations in the databses are to fetch something from
the secondary memory. In this case, we have to fetch all the pages from the
outer table, then for each record in the outer table, we have to fetch all the
pages from the inner table. Hence,

$$ M + (m \times N) $$

### Block Nested Loop Join

In Nested Loop Join, for every page in outer table, we were fetching all the
pages in inner table because we were joining directly on the tuples.
A quick optimization to reduce IO is to join the two
pages first before moving on. That is for each block in outer table fetch each
block in inner table.

This is faster because it reduces IO. Tuples can be spread across but with this
we make sure to first finish the given block before moving on to the next block.

The cost therefore becomes:
$$ M + (M \times N) $$

### Single Loop Join or Index Nested Loop Join

In both the above variants we assumed that the database did not have an index
on the table. But in presence of an index the joins would be much faster.
It can even create a temporary index if it's worth the effort (more on that in
later posts). This improves our cost further to:

$$ M + (m \times C) $$
where $C$ is the cost of index search. Because not we just have to iterate over
all the pages and all the tuples in outer table and for that perform an index
lookup. In only makes sense to have the index on the inner table because that's
where the lookups are happening. Having it on the outer table would be useless
since we are just iterating over all the tuples.

## Sort Merge Join

In sort merge join, the databse first sorts the keys for both the tables
(individually) on which we have to perform the join. Then it's like a two
pointer algorithm where it iterates through both the sorted keys to emit
records that match the condition.

The cost is to first sort both the tables and then merge them.

$$
\begin{align*}
SortCost R &= 2M \cdot (1+\lceil log_{B-1} \lceil \frac{M}{B} \rceil \rceil) \\\\
SortCost S &= 2N \cdot (1+\lceil log_{B-1} \lceil \frac{N}{B} \rceil \rceil) \\\\
MergeCost &= (M + N) \\\\
Total Cost &=  SortCost R + SortCost S + MergeCost
\end{align*}
$$

Assume $B$ is the number of buffer pools available to keep those pages in memory.

## Hash Join

There are two phases - build and probe. We first build a hash table from the
outer relation or table and then for each tuple in the inner table, we use the
same hashing function to check whether the tuple exists in the outer table.

We do want to have the entire hash table to be in memory otherwise there will
be random IOs. But in case, the table doesn't fit in memory, we can use a
variant of this algorithm called Grace Hash Join or Partition Hash Join.

### Grace Hash Join or Partition Hash Join

Again there are two phases here:

1. Build Phase: Hash both the tables on the join attributes into partitions
2. Probe Phase: Compare tuples in corresponding partitions

The number of buckets for both the tables are kept constant. Therefore, in the
probe phase, if the value is not present in the same bucket then it's not
present at all.

* [ ] Recursive Partition

### Cost Calculation for Hash Join

There are 2 passes to create the hash table - one to read and one to write, one
pass for each to probe. Therefore, the cost comes out to be:
$$
\begin{align*}
cost &= partition + probe \\\\
     &= 2(M + N) + (M + N) \\\\
     &= 3(M + N)
\end{align*}
$$

## Cost Comparision

Let's try to put some numbers in these variables to get a picture about how
fast or slow they are.

Assuming these stats:
| Table | Pages | Assumed Pages | Tuples | Assumed Tuples |
| ----- | ----- | ------------- | ------ | -------------- |
| $R$   | $M$   | 1000          | $m$    | 100,000        |
| $S$   | $N$   | 500           | $n$    | 40,000         |

* Number of buffer pools ($B$) to be 100
* IO cost to be 0.1ms

Using these values, we can find the cost of each algorithm:

| Algorithm | IO Cost | Example |
| --------- | ------- | ------- |
| Simple Nested Loop Join | $M + (m \times N)$ | 1.4 hours |
| Block Nested Loop Join | $M + (M \times N)$ | 50 seconds |
| Single Loop Join | $M + (m \times C)$ | varies |
| Sort Merge Join | $M + N + (sort cost)$ | 0.75 seconds (see calculation below) |
| Hash Join | $3 \cdot (M + N)$ | 0.45 seconds |

Calculating sort cost for Sort Merge Join:
$$
\begin{align*}
SortCost R + SortCost S &= 2M \cdot (1+\lceil log_{B-1} \lceil \frac{M}{B} \rceil \rceil) + 2N \cdot (1+\lceil log_{B-1} \lceil \frac{N}{B} \rceil \rceil) \\\\
&= 2000 \cdot (1+\lceil log_{99} \lceil \frac{1000}{100} \rceil \rceil) + 1000 \cdot (1+\lceil log_{99} \lceil \frac{500}{100} \rceil \rceil) \\\\
&= 4000 + 2000 \\\\
&= 6000
\end{align*}
$$

## References

- This article is largely based on the [course from CMU by Andy Pavlo](https://15445.courses.cs.cmu.edu/fall2022/schedule.html)
* <http://cs.boisestate.edu/~jhyeh/cs410/cs410_notes_ch15.pdf>
