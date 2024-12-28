# SPFA

```rust
fn spfa(
    adj: &Vec<Vec<(usize, i64)>>,
    inf: i64,
    srcs: Vec<usize>,
) -> (Vec<i64>, Vec<usize>, Vec<usize>) {
    let n = adj.len();
    let mut dis = vec![inf; n];
    let mut inq = vec![false; n];
    let mut cnt = vec![0; n];
    let mut par = vec![!0; n];
    let mut que = std::collections::VecDeque::new();

    for src in srcs {
        dis[src] = 0;
        par[src] = src;
        inq[src] = true;
        que.push_back(src);
    }

    while let Some(u) = que.pop_front() {
        inq[u] = false;
        for &(v, w) in adj[u].iter() {
            let nd = dis[u] + w;
            if nd < dis[v] {
                dis[v] = nd;
                par[v] = u;
                cnt[v] += 1;
                if !inq[v] && cnt[v] < n {
                    inq[v] = true;
                    que.push_back(v);
                }
            }
        }
    }

    (dis, par, cnt)
}
```
[CSES1673](https://cses.fi/paste/6cecb5d37f16cbe9b0a065/)
