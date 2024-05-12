# Topological Sort

Kahn's Algorithm

```rust
fn topological_sort(adj: &Vec<Vec<usize>>) -> Vec<usize> {
    let n = adj.len();
    let mut indeg = vec![0; n];
    for u in 0..n {
        for &v in adj[u].iter() {
            indeg[v] += 1;
        }
    }

    let mut que = std::collections::VecDeque::new();
    for u in 0..n {
        if indeg[u] == 0 {
            que.push_back(u);
        }
    }

    let mut nodes = vec![];
    while let Some(u) = que.pop_front() {
        nodes.push(u);
        for &v in adj[u].iter() {
            indeg[v] -= 1;
            if indeg[v] == 0 {
                que.push_back(v);
            }
        }
    }

    nodes
}
```

<https://atcoder.jp/contests/dp/submissions/41166690>