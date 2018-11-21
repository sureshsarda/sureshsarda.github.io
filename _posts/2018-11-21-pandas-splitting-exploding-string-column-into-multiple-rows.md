---
layout: single
title: "Pandas: Splitting (Exploding) a column into multiple rows"
date: 2018-11-21 10:00:00 +05:30
share: true
description: Learn how to split/explode a Pandas DataFrame with a column or cell with multiple values separated by a deliminator into multiple rows
tags: pandas python
---

Recently, while working with on something in my [office](https://whatfix.com), I faced a small but interesting problem. I had to clean some data and the data was not normalized. In one of the columns, a single cell had multiple comma seperated values. I could not find out the distribution of how frequently the value was appearing without splitting these cells into individual cells of their own; creating new rows.

Example:
```python
# Input data:
EmployeeId, City
001, Mumbai|Bangalore
002, Pune|Mumbai|Delhi
003, Mumbai|Bangalore
004, Mumbai|Pune
005, Bangalore
...
```
Do you see the challenge? To plot the histogram, of cities I had no choice to take the individual `Series` and work on it independently. So I decided to explode the `City` into multiple rows, so that the data becomes like this:
```python
# Expected format
EmployeeId, City
001, Mumbai
001, Bangalore
002, Pune
002, Mumbai
002, Delhi
003, Mumbai
003, Bangalore
004, Mumbai
004, Pune
005, Bangalore
```

Apparently, there is no straightforward way to clean this in Pandas, but it's not that difficult either.

```python
import pandas as pd

# Import the data
df = pd.DataFrame({
   'EmployeeId': ['001', '002', '003', '004', '005'],
   'City': ['Mumbai|Bangalore', 'Pune|Mumbai|Delhi', 'Mumbai|Bangalore', 'Mumbai|Pune', 'Bangalore'] 
})

# Step 1
# We start with creating a new dataframe from the series with EmployeeId as the index
new_df = pd.DataFrame(df.City.str.split('|').tolist(), index=df.EmployeeId).stack()

# Step 2
# We now want to get rid of the secondary index
# To do this, we will make EmployeeId as a column (it can't be an index since the values will be duplicate)
new_df = new_df.reset_index([0, 'EmployeeId'])

# Step 3
# The final step is to set the column names as we want them
new_df.columns = ['EmployeeId', 'City']

# Result
 EmployeeId City
0 	001 	Mumbai
1 	001 	Bangalore
2 	002 	Pune
3 	002 	Mumbai
4 	002 	Delhi
5 	003 	Mumbai
6 	003 	Bangalore
7 	004 	Mumbai
8 	004 	Pune
9 	005 	Bangalore
```
See the Jupyter Notebook [here].(https://gist.github.com/sureshsarda/00c3b7423ea7b6cba4250a719d6b7424)

## Explanation
Step 1 is the real trick here, the other 2 steps are more of cleaning exercises to get the data into correct format. 
In Step 1, we are asking Pandas to split the series into multiple values and the combine all of them into single column using the [stack] method.
The output of Step 1 without stack looks like this:
```md 	
            0 	        1 	        2
EmployeeId 			
001 	    Mumbai 	    Bangalore 	None
002 	    Pune 	    Mumbai      Delhi
003 	    Mumbai 	    Bangalore 	None
004 	    Mumbai 	    Pune        None
005 	    Bangalore       None        None
```
After this, we stack these individual indexes into one and do some cleaning using [`reset_index`][reset_index] and [change the column names][columns].

## Final Code Snippet
```python
# Explode/Split column into multiple rows
new_df = pd.DataFrame(df.City.str.split('|').tolist(), index=df.EmployeeId).stack()
new_df = new_df.reset_index([0, 'EmployeeId'])
new_df.columns = ['EmployeeId', 'City']
```

## Read more
- [pandas.DataFrame.stack][stack] Stack the prescribed level(s) from columns to index.
- [pandas.DataFrame.reset_index][reset_index]: Reset index method
- [pandas.DataFrame.columns][columns]: Change the column names


[stack]: https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.stack.html
[reset_index]:https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.reset_index.html
[columns]: https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.columns.html