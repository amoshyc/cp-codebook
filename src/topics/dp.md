# DP

Some dp problems that is not trivial to think of.

## Cooking

> There are `N` dishes, and the dish `i` takes an oven for `T[i]` consecutive minutes.
> If you have 2 ovens, what is the minimum time to cook all dishes? 
> (`N < 100, T[i] < 1e3`)

Since the order doesn't matter, we want to split the dishes to 2 sets where the larger total sum is minimized. It is same as saying we want their total sums are as close as possible, reaching `S/2` at best where `S` is `sum(T)`. We can do it using 

```
dp[i, j] = is it possible to pick a subset from T[0..=i] whose total sum is j.
dp[0, 0] = true
dp[0, t[i]] = true
dp[i, j] = d[i - 1][j] or dp[i - 1][j - t[i]]
```

and check for feasibility for the smaller total sum.

```rust
for j in (0..=(s / 2)).rev() {
    if dp[n - 1][j] {
        let smaller = dp[n - 1][j];
        let larger = s - dp[n - 1][j];
        break;
    }
}
```

[ABC204D](https://atcoder.jp/contests/abc204/submissions/58926973)


## Unbounded Knapsack

```
dp[i, j] = minimum total cost to achieve total value j using items 0..=i
```

if we use item `i` 1 times, the state backtracks to `dp[i, j - v[i]] + c[i]`. Note that it is not `dp[i - 1, j - v[i]] + c[i]`. If we don't use itme `i`, the state backtracks to `dp[i - 1, j]`.

```
dp[i, j] = min(dp[i, j - v[i]] + c[i], dp[i - 1, j])
```

```rust
let inf = 10usize.pow(8);
let mut dp = vec![inf; w + 1];
dp[0] = 0;
for i in 0..n {
    for j in v[i]..=w {
        dp[j] = dp[j].min(dp[j - v[i]] + c[i]);
    }
}
```

[ABC153E](https://atcoder.jp/contests/abc153/submissions/59552524)