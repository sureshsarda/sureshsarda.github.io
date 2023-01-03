---
date: 2023-01-04
tags:
  - clean code
  - programming
  - design
title: Side Effect Free Functions
type: Essay
pinned: true
---

While writing code, we call various functions. Broadly, these can be divided into
two categorized - *commands* and *queries*.

Queries often query the database, state
of the system or return value of a variable. Commands on the other hand modify the
state of the system. For example by changing a variable.

## What is a side effect

> What is side effect? Most function calls call other function who in term
> call other set of functions. This nesting can go on arbitrarily deep. It becomes
> very hard for developers to gauge the consequence or effect of calling a function.
> When developers have not intended the effects of second or third tier consequences,
> these consequences become Side Effects.

Impact of these multi level calls becomes quite difficult to predict. To understand
the implication the only option is to go through each and every nested function
call and understand what it's doing. The whole point of abstraction and encapsulation
goes down the drain when developers are forced to look at the implementation of
methods before calling them.

Now obviously, we can not get rid of all commands and use only queries. But there
are ways to reduce the behavior described above.

First, we can try to keep these functions which change the state as simple as possible,
carve correct interfaces, and follow all the best practices in the world, but that's
easier said than done. Hard to follow rules here and complexity creeps in as the
system ages.

## Value Objects to the rescue

The second, better option, is to design and return a `Value Object` as result of
these computation. These Value Objects should be immutable. An operation that mixes
logic or calculation with state change should be refactored into two separate
function - one that performs the calculation and the other the actual command
which modifies the state.

These side effect free, function returning immutable Value Objects are safe to
compute, are idempotent and easier to test. Combining any number of these functions
don't break the system as the state is not modified.

## Key Takeaway

Carefully craft your design to split the computation from the state change.
Use `Value Objects` to return the result of computation so that the state change
is minimal code and clearer to understand. This might require refactoring or introducing
more model classes. But the end result is worth it as these objects and idompotent,
computation only functions are easier to test, easier to understand and safer to
reuse.

---

This is my 7th of 100 post in [#100daysToOffload](https://100daystooffload.com/).
