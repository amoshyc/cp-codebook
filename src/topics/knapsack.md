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

```rust
// dp[i, j] = minimum total cost of total value j using items 0..=i
// if we use item i one time, dp[i, j] = dp[i, j - v[i]] + c[i]
// if we don't use item i, dp[i, j] = dp[i - 1, j]
fn unbounded_knapsack_by_value(v: Vec<usize>, c: Vec<i64>, p: usize, inf: i64) -> Vec<i64> {
    assert!(v.len() == c.len());
    let mut dp = vec![inf; p + 1];
    dp[0] = 0;
    for i in 0..v.len() {
        for j in v[i]..=p {
            dp[j] = dp[j].min(dp[j - v[i]] + c[i]);
        }
    }
    dp
}
```

[AtCoder Sumitrust 2019 C](https://atcoder.jp/contests/sumitrust2019/submissions/63488310)

```rust
// dp[i, j] = maximum total value of total cost j using items 0..=i
// if we use item i one time, dp[i, j] = dp[i, j - c[i]] + v[i]
// if we don't use item i, dp[i, j] = dp[i - 1, j]
fn unbounded_knapsack_by_cost(v: Vec<i64>, c: Vec<usize>, w: usize, inf: i64) -> Vec<i64> {
    assert!(v.len() == c.len());
    let mut dp = vec![-inf; w + 1];
    dp[0] = 0;
    for i in 0..v.len() {
        for j in c[i]..=w {
            dp[j] = dp[j].max(dp[j - c[i]] + v[i]);
        }
    }
    dp
}
```

[AtCoder Sumitrust 2019 C](https://atcoder.jp/contests/sumitrust2019/submissions/63564639)
[ABC153E](https://atcoder.jp/contests/abc153/submissions/59552524)