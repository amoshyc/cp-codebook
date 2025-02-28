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

[ABC363D](https://atcoder.jp/contests/abc363/submissions/55856350)

## Palindrome Paths

> Given a directed graph with N vertices and at most N(N - 1)/2 edges,
> each edge has a lowercase English character as label.
> For each pair of vertex (s, t), find the shortest path from s to t where
> the concatenation of the edge labels is a palindrome.
> (N < 100)

At first glance, it is tempting to stripping out the head and tail vertex of a palindrome like floyd-warshall. 
But the key of his problem is extending existing palindrome paths:

dp[u, v] = minimum distance from u to v using palindrome path

By initializing the dp using 0-distance edges and 1-distance edges:

```rust
// 0-length edges
for a in 0..n {
    dp[a][a] = 0;
    que.push_back((a, a));
}

// 1-length edges
for a in 0..n {
    for b in 0..n {
        if a != b && arr[a][b] != '-' {
            dp[a][b] = 1;
            que.push_back((a, b));
        }
    }
}
```

and using the queue to find the previous and the next label:

```rust
while let Some((s, t)) = que.pop_front() {
    for u in 0..n {
        for v in 0..n {
            // u -> s ~> t -> v
            if arr[u][s] == arr[t][v] && arr[u][s] != '-' && arr[t][v] != '-' {
                if dp[s][t] + 2 < dp[u][v] {
                    dp[u][v] = dp[u][v].min(dp[s][t] + 2);
                    que.push_back((u, v));
                }
            }
        }
    }
}
```

, the answer can be found.

[ABC394E](https://atcoder.jp/contests/abc394/submissions/63065958)

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

[ABC359D](https://atcoder.jp/contests/abc359/submissions/54874723)


