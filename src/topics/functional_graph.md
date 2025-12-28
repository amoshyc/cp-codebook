# Functional Graph


## Functional Graph

Functional Graph can be seen as a lots of trees rooted on cycles.

Properties: 
* Out degree of any vertex is 1. 
* From any vertex, if we keep following the edge, we'll end in a cycle (or a self-loop).
* Each connected component consists of multiple trees rooting on a circle (or a self-loop).
* The remainders of [{x, f(x), f(f(x)), ...}] under [{m}] is a functional graph due to pigeonhole.

```rust
fn walk_on_functional_graph(nxt: &Vec<usize>, src: usize) -> (Vec<usize>, Vec<usize>) {
    let mut idx = vec![!0; nxt.len()];
    idx[src] = 0;
    let mut path = vec![src];
    let mut u = nxt[src];
    while idx[u] == !0 {
        idx[u] = path.len();
        path.push(u);
        u = nxt[u];
    }
    let prior = path[..idx[u]].to_vec(); // will be empty in permutation graph
    let cycle = path[idx[u]..].to_vec();
    (prior, cycle)
}
```

[ABC311C](https://atcoder.jp/contests/abc311/submissions/59193557)
[ABC179E](https://atcoder.jp/contests/abc179/submissions/59192678)

```rust
fn find_cycles_in_functional_graph(nxt: &Vec<usize>) -> Vec<Vec<usize>> {
    let n = nxt.len();
    let mut dsu = DSU::new(n);
    let mut cycles = vec![];
    for u in 0..n {
        if !dsu.same(u, nxt[u]) {
            dsu.unite(u, nxt[u]);
        } else {
            // (u, nxt[u]) is the last edge of the cycle
            let mut cycle = vec![u];
            let mut x = nxt[u];
            while x != u {
                cycle.push(x);
                x = nxt[x];
            }
            cycles.push(cycle);
        }
    }
    cycles
}
```
[ABC256E](https://atcoder.jp/contests/abc256/submissions/59194110)

To find all the trees that walks into a cycle, we can do BFS on the **reversed** graph.

[ABC357E](https://atcoder.jp/contests/abc357/submissions/59194044)

## Permutation Graph

* A special case of functional graph
* Out degree of all vertex is 1.
* In degree of all vertex is 1.
* The graph consists of multiple cycles.
* Each connected componenet is a cycle.
* A permutation is a permutation graph.

```rust
fn find_cycles_in_permutation_graph(nxt: &Vec<usize>) -> Vec<Vec<usize>> {
    let n = nxt.len();
    let mut idx = vec![!0; n];
    let mut cycles = vec![];
    for r in 0..n {
        if idx[r] == !0 {
            idx[r] = 0;
            let mut path = vec![r];
            let mut u = nxt[r];
            while idx[u] == !0 {
                idx[u] = path.len();
                path.push(u);
                u = nxt[u];
            }
            cycles.push(path);
        }
    }
    cycles
}
```

[ABC436E](https://atcoder.jp/contests/abc436/submissions/71707266)
[ABC377E](https://atcoder.jp/contests/abc377/submissions/71707185)


## Find the Vertex after K moves by Doubling


```rust
let mut dp = vec![vec![0; n]; m];
dp[0] = nxt.clone();
for i in 1..m {
    for u in 0..n {
        dp[i][u] = dp[i - 1][dp[i - 1][u]];
    }
}

let mut x = ...;
for i in 0..m {
    if (k >> i) & 1 == 1 {
        for u in 0..n {
            x = dp[i][u];
        }
    }
}
```

[ABC438E](https://atcoder.jp/contests/abc438/submissions/72051632)
[ABC367E](https://atcoder.jp/contests/abc367/submissions/56834920)



