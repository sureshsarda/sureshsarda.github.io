---
layout: single
title: "Solution to Leetcode - Happy Number"
date: 2020-04-02
share: true
description: Solution to Leetcode's Happy Number problem. Write an algorithm to determine if a number is "happy".
categories:
- Problem Solving
publish: true
---

As part of 30 days challenge during the Corono pandemic, Leetcode published this problem on the second day:
> A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

## Explanation
Happy Number = repeated sum of squares of digits will end in 1
Non Happy Number = repeated sum of squares will lead in an infinite loop.

## Thought Process for Solution
The main task is to figure out when to stop out of the infinite loop and conclude that a number is not happy. Once you can figure this out, the code is not very tricky.

Let's look at a sequence of a unhappy number, 42:
```
    input   = 42
=> 16 + 4   = 20
=> 4 + 0    = 4
=> 16       = 16
=> 1 + 36   = 37
=> 9 + 49   = 56
=> 25 + 36  = 61
=> 36 + 1   = 37
```
It's evident from 37 that it will start to loop again from the 37 we have already seen. This is important. We can now stop iterating because any number of time we try 37, it's going to give same sequence `37 -> 56 -> 61 -> 37 -> 56 -> ...`.

From here, the solution is simple, keep a track of already seen numbers and when ever a new number is found, add it to this set. We are good till the numbers are unique, but if we find a number we have already seen, that means we have detected a loop.

### Pseudo Code
```
seen = {}
while number not in already seen and number is not 1:
    find square of digits of number
    add it to seen 
```

## Code

```java
public class HappyNumber {

    static boolean isHappy(int n) {
        if (n <= 0) {
            return false;
        }
        Set<Integer> alreadySeen = new TreeSet<>();

        int current = n;
        while (!alreadySeen.contains(current) && current != 1) {
            alreadySeen.add(current);
            current = squareOfDigits(current);

        }

        return current == 1;
    }

    static int squareOfDigits(int number) {
        int[] digits = intToDigits(number);
        return IntStream.of(digits).reduce(0, (a, b) -> a + b * b);
    }

    static int[] intToDigits(int number) {
        return String.valueOf(number).chars().map(it -> it - '0').toArray();
    }

}
```

## Some test cases to validate
```java
public class HappyNumberTest extends TestCase {

    public void testIntToDigits() {
        assertArrayEquals(new int[]{0}, HappyNumber.intToDigits(0));
        assertArrayEquals(new int[]{1}, HappyNumber.intToDigits(1));
        assertArrayEquals(new int[]{2}, HappyNumber.intToDigits(2));

        assertArrayEquals(new int[]{1, 0}, HappyNumber.intToDigits(10));
        assertArrayEquals(new int[]{2, 2}, HappyNumber.intToDigits(22));
        assertArrayEquals(new int[]{9, 9}, HappyNumber.intToDigits(99));

        assertArrayEquals(new int[]{1, 0, 0}, HappyNumber.intToDigits(100));
        assertArrayEquals(new int[]{1, 0, 1}, HappyNumber.intToDigits(101));
        assertArrayEquals(new int[]{5, 0, 0}, HappyNumber.intToDigits(500));

    }

    public void testSquareOfDigits() {
        assertEquals(0, HappyNumber.squareOfDigits(0));
        assertEquals(1, HappyNumber.squareOfDigits(1));
        assertEquals(9, HappyNumber.squareOfDigits(3));
        assertEquals(25, HappyNumber.squareOfDigits(5));

        assertEquals(29, HappyNumber.squareOfDigits(25));
        assertEquals(37, HappyNumber.squareOfDigits(16));
        assertEquals(145, HappyNumber.squareOfDigits(89));
        assertEquals(42, HappyNumber.squareOfDigits(145));

    }

    public void testIsHappy() {
        assertTrue(HappyNumber.isHappy(1));
        assertTrue(HappyNumber.isHappy(10));
        assertTrue(HappyNumber.isHappy(100));
        assertTrue(HappyNumber.isHappy(13));
        assertTrue(HappyNumber.isHappy(31));
        assertTrue(HappyNumber.isHappy(19));

        assertFalse(HappyNumber.isHappy(25));
        assertFalse(HappyNumber.isHappy(145));
        assertFalse(HappyNumber.isHappy(41));
        assertFalse(HappyNumber.isHappy(42));
        assertFalse(HappyNumber.isHappy(0));
        assertFalse(HappyNumber.isHappy(99));
        assertFalse(HappyNumber.isHappy(573));

    }
}
```

## Conclusion
It's an interesting problem with a very simple solution. Once you get the bright idea behind how to stop the loop, the solution becomes evident.
