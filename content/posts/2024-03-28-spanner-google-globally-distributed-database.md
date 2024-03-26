---
date: 2024-03-26
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

Transactions are categorized into 4 types and explained below. RW transaction requires locking where as others do not. These gurantees a whole-database read at timestamp $t$ will see the effect of all transaction at time $t$.

### Read Write Transaction

Transactional read and writes use strict two phase locking. A timestamp can be assigned after all locks have been acquired but before any of them released. In Spanner, the timestamp of Paxos write is used as transaction timestamp.

Few invariants applied:
* A leader must assign timestamp within the interval of leader lease.
* Whenever a timestamp is assigned, $s_{max}$ is advanced to $s$ to preserve disjointness.
* if the start of a transaction $T_2$ occurs after commit of a transaction $T_1$, then the commit time of timestamp $T_2$ must be greater than the commit time of $T_1$.

Writes are bufferd at the client until commit. That means, reads in the transaction do not see the effect of writes. This is inline that uncomitted writes are not visible. Reads use wound-wait[?] to avoid deadlock. When a client as completed all reads and buffered all writes, it begins the two-phase commit.

### Snapshot Read (Client Chosen Timestamp or Client Chosen Bound)

The monotonicity invariant allows Spanner to determine the safe timestamp value which can be used to perform the read. Every replica tracks $t_{safe}$, which is the maximum timestamp at which a replica is up-to-date. Formally, a replica can read at a timestamp $t$, if $t <= t_{safe}$.

### Snapshot Transaction

A snapshot transaction executes in two phases.
1. **Prepare** - assign a timestamp $s_{read} = TT.now().latest$ at any time after transaction starts. This is negotiated between various Paxos groups if the read spans across.
2. **Execute** the reads at $s_{read}$

### Schema Change Transactions

Schema changes are supported as atomic transactions in Spanner. 
* First, an explicitly assigned timestamp in the future is registered in the preapre phase.
* Second, reads and writes, which depend on the schema change may proceed if their timestamp is before $t$, otherwise they must wait. 

This is a significant benefit of TrueTime. Schema change across thousands of servers can complete with minimum disruption.


## Conclusion

Spanner provides external consistency gurantee even after being a large distrubuted database with thousands of databases. Read Write transactions require locks, but reads are lock free. This is achieved using a novel time API - TrueTime which is a system of servers to synchronize clocks and can drift at most 6ms. Spanner would not have become possible without this. Apart from this, most of the techniques are not new.

