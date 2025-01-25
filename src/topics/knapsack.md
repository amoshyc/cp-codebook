# Knapsack

# 01 Knapsack

```
dp[i, j] = maximum total value with total cost j using items 0..=i
dp[i, j] -> dp[i + 1, j] // don't use item i
dp[i, j] + value[i] -> dp[i + 1, j + cost[i]] // use item i
```

```rust
// dp[j] = maximum total value using total cost j
fn knapsack_01(values: &Vec<i64>, costs: &Vec<usize>, max: usize) -> Vec<i64> {
    assert!(values.len() == costs.len());
    let mut dp = vec![0; max + 1];
    for (v, c) in values.iter().zip(costs.iter()) {
        for j in (0..=max).rev() {
            if j + c <= max {
                dp[j + c] = dp[j + c].max(dp[j] + v);
            }
        }
    }
    dp
}
```
[ABC390E](https://atcoder.jp/contests/abc390/submissions/62105294)


# Unbounded Knapsack

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