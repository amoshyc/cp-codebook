# DP

Some dp problems that is not trivial to think of.

## Avoid K Palindrome

> Given a string consisting of `A`, `B`, or `?`. 
> Among all the wall to fill `?` with `A` or `B`, how many satisfies:
> The string do not have a palindrome of length `K`.

dp[i, m] = number of valid T[..=i] such that T[i - k + 1..=i] = m
dp[i, m] = 0 if m is palindrome
answer = sum(dp[n - 1, m] for m in 0..(1 << k))

```
(k = 3)           i
        x x x x x x x
curr:         ^^^^^
next:           ^^^^^
dp[i, m] -> dp[i + 1, m']
```

<https://atcoder.jp/contests/abc359/submissions/54874723>