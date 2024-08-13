# Dijkstra

```rust
use std::cmp::Reverse;

fn dijkstra<T>(adj: &Vec<Vec<(usize, T)>>, s: usize, inf: T) -> (Vec<T>, Vec<usize>)
where
    T: std::ops::Add<Output = T> + Ord + Copy + Default,
{
    let n = adj.len();
    let mut que = std::collections::BinaryHeap::new(); // max heap
    let mut dis = vec![inf; n];
    let mut par = vec![!0; n];

    dis[s] = T::default();
    par[s] = s;
    que.push((Reverse(dis[s]), s));

    while let Some((Reverse(d), u)) = que.pop() {
        if d > dis[u] {
            continue;
        }
        for &(v, w) in adj[u].iter() {
            let new_d = dis[u] + w;
            if new_d < dis[v] {
                dis[v] = new_d;
                par[v] = u;
                que.push((Reverse(dis[v]), v));
            }
        }
    }

    (dis, par)
}
```

[CSES1195](https://cses.fi/paste/cc143ad21450a97e71debc/)


## Applications

> Given an undirected graph, each vertex `v` has a positive value `A[v]`. 
> Among all the paths from vertex `1` to vertex `N`, what is the maximum score? 
> The score is defined as the number of disinct `A` on the path.
> However, if the `A` on the path is decreasing, the score is 0.

Maximize the distance (score) using dijkstra. For edge `(u, v)`, there are 3 cases:
1. A[u] < A[v], then `new_d = dis[u] + 1`.
2. A[u] = A[v], then `new_d = dis[u]`.
3. A[u] > A[v], then `new_d = 0`.

When poping candidate from pq, choose the one with minimum `A`.

[ABC335E](https://atcoder.jp/contests/abc335/submissions/54858379)