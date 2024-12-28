# BFS

```rust
fn bfs(adj: &Vec<Vec<usize>>, srcs: Vec<usize>, inf: usize) -> (Vec<usize>, Vec<usize>) {
    let n = adj.len();
    let mut dep = vec![inf; n];
    let mut par = vec![!0; n];
    let mut que = std::collections::VecDeque::new();

    for src in srcs {
        dep[src] = 0;
        par[src] = src;
        que.push_back(src);
    }

    while let Some(u) = que.pop_front() {
        for &v in adj[u].iter() {
            if dep[v] == inf {
                dep[v] = dep[u] + 1;
                par[v] = u;
                que.push_back(v);
            }
        }
    }

    (dep, par)
}
```

[ABC376D](https://atcoder.jp/contests/abc376/submissions/61135168)