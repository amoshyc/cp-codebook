# Palindrome


## Palindrome Numbers

For a k-digit *positive* palindrome consists of 0..=9 without leading zero:

```
ABC...Z...CBA (k is odd)
ABC......CBA (k is even)
```

These holds:

1. The number of k-digit palindrome is [{ 9 * 10^(floor((k + 1) / 2) - 1) }].
2. The prefix of the x-th smallest (0-based) k-digit palindrome is [{ x + 10^(floor((k + 1) / 2) - 1) }].

(1) comes from the fact there are 1 position `A` that has 9 possible digits and `(k + 1) // 2 - 1` positions that has 10. (2) comes from that the prefix of the x-th smallest k-digit palindrome is x itself if we allow leading zero. Since positive `A` cannot be 0, we simply add 1 to the position `A`.

```rust
let f = |k: i64| 9 * 10i64.pow(((k + 1) / 2) as u32 - 1);
let g = |x: i64, k: i64| 10i64.pow(((k + 1) / 2) as u32 - 1) + x;
```

<https://atcoder.jp/contests/abc363/submissions/55856350>


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