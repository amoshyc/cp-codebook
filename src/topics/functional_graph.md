# Permutation & Functional Graph

## Permutation Graph

* Out degree of all vertex is 1.
* In degree of all vertex is 1.
* The graph consists of multiple cycles.
* Each connected componenet is a cycle.
* A permutation is a permutation graph.

<https://atcoder.jp/contests/abc175/tasks/abc175_d>
<https://atcoder.jp/contests/abc256/tasks/abc256_e>


## Functional Graph

* Out degree of all vertex is 1. 
* From any vertex, if you keep following the edge, you'll end in a cycle (or a self-loop).
* Each connected component consists of multiple trees rooting on a circle (or a self-loop).
* A permutation graph is a functional graph.
* The remainders of [{x, f(x), f(f(x)), ...}] under [{m}] is a functional graph due to pigeonholing.

Use [Tarjan SCC](../algorithms/tarjan_scc.html) to find the scc. Cycles in functional graph has 2 forms:
1. A cycle with length >= 2.
2. Self-loop.

To inspect the connected component, we can perform BFS from the cycles using **inversed** edges.

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

<https://atcoder.jp/contests/abc179/tasks/abc179_e>
<https://atcoder.jp/contests/abc311/submissions/54385687>
<https://atcoder.jp/contests/abc357/submissions/54387589>