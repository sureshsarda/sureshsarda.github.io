---
date: 2024-03-28
tags:
  - research-paper
  - database-management
  - systems
  - concurrency
  - distributed-databases
  - transaction-processing
  - google
  - mvcc
  - paxos
  - two-phase-commit
title: >
    'Spanner: Google's Globally Distributed Database'
type: Essay
pinned: true
toc: false
---

> Corbett, James C., et al. "Spanner: Google’s globally distributed database." ACM Transactions on Computer Systems (TOCS) 31.3 (2013): 1-22.

Spanner is a globally distributed databases, schematized semi-relational database. Data is replicated across datacenters and regions. The data is automatically sharded and distributed.

## Server Organization

A spanner deployment is called a universe. Given it manages data globally, there are handful of universes deployed. Universe is divided into zones. Zones can be added or removed and serve as an administrative deployment (a physical isolation). There can be one or many zones in a data center.

A zone has zonmaster and can have thousands of spanservers.

* Universe - very few (test, development and production, etc)
* Universe Master - an ineractive console for diagnostics
* Zone - one or many across on a data center, physical isolation, can be added or removed
* Zone Master - responsible for maintaining data across span servers
* Spanservers - one to thousands in a Zone
* Placement Driver - handles movement of data across zones
* Tablets - Each spanserver has 100 - 1000 tablets. A tablet is a bag of mapping (`key: string, timestamp:int64 -> string`). Implemented as Colossus, replicated as Paxos state machine.


## TrueTime API

At the heart of the database is the TrueTime API without which the transactions can't be implemented the way they are in Spanner.

A problem with distributed systems is the clock. Clocks are unreliable and out of sync. Having a reliable and in-sync clock would make distributed transactions much easier.

TrueTiem API provides following methods:

* `TT.now()` - returns a `TT.interval: [earliest, latest]`. An interval with earliest possible time and latest possible time at that given instance.
* `TT.after(t)` - true, if `t` has **definitely** passed.
* `TT.before(t)` - true, if `t` has **definitely** not arrived.

Atomic and GPS clocks are present in every datacenters. These clocks are spread across the datacenter to avoid an radio interference or any other design fault. Every Spanner node syncs its time with these clocks every 30 seconds. In production environement the error is observed to be not more than 6 seconds.

## Concurrency Control

> It is better to have application programmers deal with performance problems due to overuse of transactions as bottlenecks arise, rather than always coding the lack of transactions.

Spanner flaunts features like externally consistent transactions, lock-free snapshot transactions, and non blocking reads in the past.
