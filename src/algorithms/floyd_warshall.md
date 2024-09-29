# Floyd Warshall

```rust
fn floyd_warshall(adj: &Vec<Vec<i64>>, inf: i64) -> Vec<Vec<i64>> {
    // dp[k][u][v] = minimum distance from u to v using vertices 0..=k as intermediate
    // dp[0][u][v] = adj[u][v]
    // dp[k][u][v] = min(dp[k - 1][u][v], dp[k - 1][u][k] + dp[k - 1][k][v]);
    let n = adj.len();
    let mut dp = vec![vec![i64::MAX; n]; n];
    dp = adj.clone();
    for k in 0..n {
        for u in 0..n {
            for v in 0..n {
                if dp[u][k] != inf && dp[k][v] != inf {
                    dp[u][v] = dp[u][v].min(dp[u][k] + dp[k][v]);
                }
            }
        }
    }
    dp
}
```

* [ABC369E](https://atcoder.jp/contests/abc369/submissions/58171789)