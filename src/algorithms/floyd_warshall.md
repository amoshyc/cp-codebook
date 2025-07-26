# Floyd Warshall

```rust
// Please check:
// 1. adj[u][u] = 0 in most cases
// 2. adj[u][v] = adj[u][v].min(w) to deal with multiple edges
fn floyd_warshall(adj: &Vec<Vec<i64>>, inf: i64) -> Vec<Vec<i64>> {
    // dp[k][u][v] = minimum distance from u to v using vertices 0..=k as intermediate
    // dp[-1][u][v] = adj[u][v]
    // dp[k][u][v] = min(dp[k - 1][u][v], dp[k - 1][u][k] + dp[k - 1][k][v]);
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

The dp can be updated in [{ O(n^2) }] when the weight of an edge updated:

```rust
let relax = |dis: &mut Vec<Vec<i64>>, x: usize, y: usize, w: i64| {
    for i in 0..=n {
        for j in 0..=n {
            if dis[i][x] != inf && dis[y][j] != inf {
                dis[i][j] = dis[i][j].min(dis[i][x] + w + dis[y][j]);
            }
        }
    }
};

let dis = floyd_warshall(&adj, inf);
relax(&mut dis, u, v, w); // u -> v decreases to w
```

Problem List:
* basic: [ABC369E](https://atcoder.jp/contests/abc369/submissions/59443525)
* 2 times: [ABC143E](https://atcoder.jp/contests/abc143/submissions/65400848)
* dp update: [ABC375F](https://atcoder.jp/contests/abc375/submissions/59443536), [ABC416E](https://atcoder.jp/contests/abc416/submissions/67977770)