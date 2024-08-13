# Rerooting

```rust
fn dfs(
    u: usize,
    p: usize,
    d: usize,
    dep: &mut Vec<usize>,
    sum: &mut Vec<i64>,
    adj: &Vec<Vec<usize>>,
    c: &Vec<i64>,
) {
    dep[u] = d;
    sum[u] = c[u];
    for v in adj[u].iter() {
        if *v != p {
            dfs(*v, u, d + 1, dep, sum, adj, c);
            sum[u] += sum[*v];
        }
    }
}

fn rec(
    u: usize,
    p: usize,
    dp: &mut Vec<i64>,
    sum: &Vec<i64>,
    adj: &Vec<Vec<usize>>,
    c: &Vec<i64>,
    total: i64,
) {
    if u > 0 {
        dp[u] = dp[p];
        dp[u] -= sum[u] + c[u]; // bottom
        dp[u] += total - sum[u] + c[u]; // top
    }
    for v in adj[u].iter() {
        if *v != p {
            rec(*v, u, dp, sum, adj, c, total);
        }
    }
}
```

[ABC348E](https://atcoder.jp/contests/abc348/submissions/52118283)
[Typical90-039](https://atcoder.jp/contests/typical90/submissions/54320817)