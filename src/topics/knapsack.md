# Knapsack

# 01 Knapsack

pull dp
```
dp[i, j] = maximum total value with total cost j using items 0..=i
dp[i, j] = max(
    dp[i - 1, j], // don't use item
    dp[i - 1, j - w[i]] + v[i], // use item i
)
```
[AtCoder DP D](https://atcoder.jp/contests/dp/submissions/68727087)


# Unbounded Knapsack


```
dp[i, j] = maximum total value of total weight j using items 0..=i
if we use item i one time, dp[i, j] = dp[i, j - w[i]] + v[i]
if we don't use item i, dp[i, j] = dp[i - 1, j]
```

Easier to code if reusing the dp:

```rust
let mut dp = vec![inf; w + 1];
dp[0] = 0;
for i in 0..vs.len() {
    for j in vs[i]..=p {
        dp[j] = dp[j].min(dp[j - vs[i]] + ws[i]);
    }
}
```

[AtCoder Sumitrust 2019 C](https://atcoder.jp/contests/sumitrust2019/submissions/63488310)


# Bounded Knapsack

With deque optimization.


# Large Weight with Small Value


```
dp[i, j] = minimum total weight of total value j using items 0..=i
if we use item i one time, dp[i, j] = dp[i, j - v[i]] + c[i]
if we don't use item i, dp[i, j] = dp[i - 1, j]
answer is (0..=max_v).filer(|&v| dp[n - 1][v] <= w).max().unwrap().
```

[AtCoder DP E](https://atcoder.jp/contests/dp/submissions/68790002)
[AtCoder Sumitrust 2019 C](https://atcoder.jp/contests/sumitrust2019/submissions/63564639)
[ABC153E](https://atcoder.jp/contests/abc153/submissions/59552524)


# Upperbound Clipping

> Given N (< 1e2) items with positive values (V[i] < 1e5) and weights (W[i] < 1e5), what is the minimum total weight if the total values is at least K (K < 1e5) ?

Easier to code if using push-dp instead of pull-dp.

```
dp[j + v] <- dp[j] + w
dp[(j + v).clip(k)] <- dp[j] +w
```

# Subset Sum

```
dp[i, j] = is it possible to make total j using items 0..=i
dp[i, j] = dp[i - 1, j] or dp[i - 1, j - arr[i]]
```

[Leetcode 416](https://leetcode.com/problems/partition-equal-subset-sum/submissions/1746756667/)


# Tug of War


# With Prefix Sum

[AtCoder DP M](https://atcoder.jp/contests/dp/submissions/41207863)