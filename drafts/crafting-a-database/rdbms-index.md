# Crafting a RDBMS

We will try to create a fully functional relational database system. The goal is to implement the most essential concepts of a DBMS.

> What I cannot create, I do not understand
> Richard Feynman

## Strategy

1. We will try to keep our code functional - it might not do the everything and mock or hard code many items. But after each step we would have something to test
2. Steps
   1. Building Blocks
      1. Build REPL
      2. Query Parser
      3. Persistance
      4. Search
      5. Joins
   2. Concurrency
      1. ACID and Transactions
      2. Write ahead logs
   3. Performance
      1. Indexes - B Tree
      2. Index - Hash
      3. Query Optimization
