# Functional Graph

Properties: 
* Out degree of any vertex is 1. 
* From any vertex, if we keep following the edge, we'll end in a cycle (or a self-loop).
* Each connected component consists of multiple trees rooting on a circle (or a self-loop).
* The remainders of [{x, f(x), f(f(x)), ...}] under [{m}] is a functional graph due to pigeonholing.

To inspect the cycles, we can use [Tarjan SCC](../algorithms/tarjan_scc.html).
To inspect the connected component, we can perform BFS from the cycles using the **reversed** edges.

```rust
let (num_scc, belong) = tarjan_scc(&adj);
let mut scc = vec![vec![]; num_scc];
for u in 0..n {
    scc[belong[u]].push(u);
}

for i in 0..num_scc {
    if scc[i].len() >= 2 || (scc[i].len() == 1 && adj[scc[i][0]][0] == scc[i][0]) {
        // scc[i] is a cycle
    }
}
```

[ABC311C](https://atcoder.jp/contests/abc311/submissions/54385687)
[ABC357E](https://atcoder.jp/contests/abc357/submissions/54387589)
[ABC256E](https://atcoder.jp/contests/abc256/submissions/54402714)

Sometimes, we just want to inspect the current connected component's prefix and cycle:

```rust
let mut vis = vec![!0; m]; // visiting index
let mut path = vec![];
vis[r] = 0; // starting from r
path.push(r);

let mut x = f(r);
while vis[x] == !0 {
    vis[x] = path.len();
    path.push(x);
    x = f(x);
}

// path: 2 -> 4 -> 16 -> 256 -> 471 -> 620 [-> 16 -> ...]
let cycle = path[vis[x]..].to_vec(); // [16, 256, 471, 620]
let prefix = path[..vis[x]].to_vec(); // [2, 4]
```

[ABC179E](https://atcoder.jp/contests/abc179/submissions/54401791)


## Permutation Graph

* A spectial case of functional graph
* Out degree of all vertex is 1.
* In degree of all vertex is 1.
* The graph consists of multiple cycles.
* Each connected componenet is a cycle.
* A permutation is a permutation graph.

[ABC175D](https://atcoder.jp/contests/abc175/submissions/15967185)