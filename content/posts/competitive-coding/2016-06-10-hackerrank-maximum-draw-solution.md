---
title: Hackerrank - maximum-draw solution
date: 2016-06-10T00:00:00Z
category: competitive-coding
---
Solution to HackerRank question: [maximum draw](hackerrank)

## Explanation

This one is really simple. The question is:

>Jim is off to a party and is searching for a matching pair of socks. His drawer is filled with socks, each pair of a different color. In its worst case scenario, how many socks (x) should Jim remove from his drawer until he finds a matching pair?

So Jim keeps removing socks from drawer, and the moment he finds a pair(repeat color) he stops. To find the solution, let's start with an example and dig our way further.
Let's say he has 4 pairs:
```
Paris: a, b, c, d
Socks: al, ar, bl, br, cl, cr and so on.. (l = left and r = right)
```
That means, he has 8 socks.
In the worst case, on a really bad day, he will take out socks of all different colors. Untill at last there is no unique color left! So total **unique colors = number of pair**. So the next sock after taking out single sock from all the pair is going to be repeated.

Therefore, we can say that in worst case he will draw `(p + 1)` sock where `p` is the number of pairs.

It doesn't matter which pair complets. The only condition is pair MUST complete.
I'll leave it to you how many he will need to withdraw in the best case ;)

### Code
```java
import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    public static void main(String[] args) {
        Scanner scn = new Scanner(System.in);
        int testCases = scn.nextInt();
        for (int i= 0; i &lt; testCases; i++) {
            int pairs = scn.nextInt();
            System.out.println(pairs + 1);
        }
    }
}
```
The answer to the best case question is 2. On his lucky day.. :)


[hackerrank]: https://www.hackerrank.com/challenges/maximum-draws
