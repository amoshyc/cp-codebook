# Floyd Warshall

```rust
fn floyd_warshall(adj: &Vec<Vec<i64>>, inf: i64) -> Vec<Vec<i64>> {
    // dp[k][u][v] = minimum distance from u to v using vertices 0..=k as intermediate
    // dp[-1][u][v] = adj[u][v]
    // dp[k][u][v] = min(dp[k - 1][u][v], dp[k - 1][u][k] + dp[k - 1][k][v]);
    // adj[u][u] is usally 0. Remember to check it.
    let n = adj.len();
    let mut dp = adj.clone();
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

The dp can be updated in [{ O(n^2) }] when the weight of an edge decreased to `w`:

```rust
let dis = floyd_warshall(&adj, inf);
dis[u][v] = w; // (u, v) decreases to w
for s in 0..n {
    for t in 0..n {
        if dis[s][u] != inf && dis[v][t] != inf {
            dis[s][t] = dis[s][t].min(dis[s][u] + dis[u][v] + dis[v][t]);
        }
    }
}
```

Problem List:
* basic: [ABC369E](https://atcoder.jp/contests/abc369/submissions/59443525)
* dp update: [ABC375F](https://atcoder.jp/contests/abc375/submissions/59443536)