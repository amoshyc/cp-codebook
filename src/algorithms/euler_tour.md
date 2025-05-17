# Euler Tour

```rust
// subtree of u will be the range enter[u]..leave[u]
fn euler_tour(adj: &Vec<Vec<usize>>, root: usize) -> (Vec<usize>, Vec<usize>) {
    let n = adj.len();
    let mut t = 0;
    let mut enter = vec![!0; n];
    let mut leave = vec![!0; n];
    euler_dfs(root, !0, &mut t, &mut enter, &mut leave, &adj);
    (enter, leave)
}

fn euler_dfs(
    u: usize,
    p: usize,
    t: &mut usize,
    enter: &mut Vec<usize>,
    leave: &mut Vec<usize>,
    adj: &Vec<Vec<usize>>,
) {
    enter[u] = *t;
    *t += 1;
    for &v in &adj[u] {
        if v != p {
            euler_dfs(v, u, t, enter, leave, adj);
        }
    }
    leave[u] = *t;
}
```

[ABC406F](https://atcoder.jp/contests/abc406/submissions/65929372)