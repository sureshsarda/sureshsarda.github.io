---
layout: single
title: Hackerrank - find-point solution
date: 2016-06-05 04:47:00 +05:30
categories:
- Competitive programming
tags:
- hackerrank
header:
  teaser: /assets/images/overlay/caleb-jones-unsplash.jpg
  overlay_image: /assets/images//overlay/marcel-strauss-unsplash.jpg
  caption: "Hackerrank - find-point solution"
  show_overlay_excerpt: false
  cta_label: Read
  cta_url: "#"
---
Solution to HackerRank [FindPoint][question]

## Domain Knowledge Required
### What is a symmetric point?
Given 2 points P and Q, a symmetric point of P against Q is such that Q is the midpoint of the line joining P and the symmetric point P’.
In other words, let’s say a point P’ is the symmetric point. Then,
 - P-Q-P’are on one line
 - Dist(PQ) = Dist(QP’)

## Code
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
        for (int i = 0; i < testCases; i++) {
            int x1 = scn.nextInt();
            int y1 = scn.nextInt();
            int x2 = scn.nextInt();
            int y2 = scn.nextInt();

            int x3 = 2 * x2 - x1;
            int y3 = 2 * y2 - y1;

            System.out.println(x3 + " " + y3);
        }
    }
 }
 ```

[question]: https://www.hackerrank.com/challenges/find-point