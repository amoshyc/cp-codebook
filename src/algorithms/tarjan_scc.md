# Tarjan SCC

```rust
struct TarjanSCC {
    order: usize,
    index: Vec<usize>,
    lowlink: Vec<usize>,
    onstack: Vec<bool>,
    stack: Vec<usize>,
    scc_id: usize,
    belong: Vec<usize>,
}

// https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
// Returns:
//    num_scc: number of scc
//    belong: which scc each vertex belongs to
// The order of scc is a *reversed* topological sort of the DAG.
fn tarjan_scc(adj: &Vec<Vec<usize>>) -> (usize, Vec<usize>) {
    let n = adj.len();
    let mut data = TarjanSCC {
        order: 0,
        index: vec![!0; n],
        lowlink: vec![0; n],
        onstack: vec![false; n],
        stack: vec![],
        scc_id: 0,
        belong: vec![!0; n],
    };
    for root in 0..data.index.len() {
        if data.index[root] == !0 {
            tarjan_dfs(root, &mut data, adj);
        }
    }
    (data.scc_id, data.belong)
}

fn tarjan_dfs(u: usize, data: &mut TarjanSCC, adj: &Vec<Vec<usize>>) {
    data.index[u] = data.order;
    data.lowlink[u] = data.order;
    data.order += 1;
    data.stack.push(u);
    data.onstack[u] = true;

    for &v in adj[u].iter() {
        if data.index[v] == !0 {
            tarjan_dfs(v, data, adj);
            data.lowlink[u] = data.lowlink[u].min(data.lowlink[v]);
        } else if data.onstack[v] {
            data.lowlink[u] = data.lowlink[u].min(data.index[v]);
        }
    }

    if data.lowlink[u] == data.index[u] {
        while let Some(x) = data.stack.pop() {
            data.onstack[x] = false;
            data.belong[x] = data.scc_id;
            if x == u {
                break;
            }
        }
        data.scc_id += 1;
    }
}
```

To reconstruct the scc:

```rust
let mut scc = vec![vec![]; num_scc];
for u in 0..n {
    scc[belong[u]].push(u);
}
```

[Practice2-G](https://atcoder.jp/contests/practice2/submissions/53308987)

Tarjan SCC can be used to find directed cycles:

```rust
let (num_scc, belong) = tarjan_scc(&adj);
let mut scc = vec![vec![]; num_scc];
for u in 0..n {
    scc[belong[u]].push(u);
}

for i in 0..num_scc {
    if scc[i].len() >= 2 || (scc[i].len() == 1 && adj[scc[i][0]][0] == scc[i][0]) {
        // scc[i] is a cycle or self loop
    }
}
```

[ABC357E](https://atcoder.jp/contests/abc357/submissions/54387589)