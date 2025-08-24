# Bellman Ford

```rust
fn bellman_ford(edges: &[(usize, usize, i64)], n: usize, s: usize, inf: i64) -> Vec<i64> {
    // if an vertex is relaxed >= n - 1 times, 
    // then it is on a negative cycle or can be reached from a negative cycle.
    // To find all the vertices that can be reached from a negative cycle, 
    // we need to relax the graph v more times.
    // dis[u] = inf if u is unreachable from source
    // dis[u] = -inf if u can reached from a negative cycle.
    let mut dis = vec![inf; n];
    dis[s] = 0;
    for r in 0..(2 * n - 1) {
        for &(u, v, w) in edges {
            if dis[v] > dis[u] + w {
                dis[v] = dis[u] + w;
                if r >= n - 1 {
                    dis[v] = -inf;
                }
            }
        }
    }
    dis
}
```

[ABC061D](https://atcoder.jp/contests/abc061/submissions/68732267)