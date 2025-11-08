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
[ABC395E](https://atcoder.jp/contests/abc395/submissions/63290265)


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

> Given a undirected graph, you are at vertex `1` at time `0`.
> At each vertex, you can wait as long as you want.
> The crossing time of edge i is `C[i] + floor(D[i] / (t + 1)) `
> where t is the time starting to cross the edge.
> What is the earliest time to arrive vertex `N`?

For edge `(u, v)`, the arriving time of `v` is `f(t_w) = t_u + t_w + c + floor(d / (t_u + t_w + 1))` where `t_u` is the arriving time of `u` and `t_w` is waiting time. By ignoring the floor function and taking derivatives, we know that the minimum of `f(t_w)` occurrs when t_w is around `sqrt(d) - 1 - t_u`. Therefore we examine the numbers and find the minimum. And the rest is a Dijkstra algorithm.

```rust
let mut min = t_u + c + (d / (t_u + 1)); // f(0)
let x = (d as f64).sqrt() as i64 - 1 - t_u;
for t_w in (x - 3)..=(x + 3) {
    if t_w >= 0 {
        min = min.min(t_u + t_w + c + (d / (t_u + t_w + 1)));
    }
}
```

[ABC204E](https://atcoder.jp/contests/abc204/submissions/58928159)

