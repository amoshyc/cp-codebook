# BFS-01

```rust
use std::collections::VecDeque;

fn bfs01<T>(adj: &Vec<Vec<(usize, T)>>, s: usize, inf: T) -> (Vec<T>, Vec<usize>)
where
    T: std::ops::Add<Output = T> + Copy + Default + Eq + Ord,
{
    let n = adj.len();
    let mut que = VecDeque::new();
    let mut dis = vec![inf; n];
    let mut par = vec![!0; n];

    dis[s] = T::default();
    par[s] = s;
    que.push_back((s, dis[s]));

    while let Some((u, d)) = que.pop_front() {
        if d > dis[u] {
            continue;
        }
        for &(v, w) in &adj[u] {
            let new_d = dis[u] + w;
            if new_d < dis[v] {
                dis[v] = new_d;
                par[v] = u;
                if w == T::default() {
                    que.push_front((v, dis[v]));
                } else {
                    que.push_back((v, dis[v]));
                }
            }
        }
    }

    (dis, par)
}
```

[ABC431E](https://atcoder.jp/contests/abc431/submissions/70805378)
[ABC400D](https://atcoder.jp/contests/abc400/submissions/64707621)