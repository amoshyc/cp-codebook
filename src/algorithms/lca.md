# LCA

```rust
struct LCA {
    root: usize,
    dep: Vec<usize>,
    dp: Vec<Vec<usize>>,
}

impl LCA {
    fn from_adj(adj: &Vec<Vec<usize>>) -> Self {
        let n = adj.len();
        let inf = usize::MAX;
        let mut que = std::collections::VecDeque::new();
        let mut dep = vec![inf; n];
        let mut par = (0..n).collect::<Vec<usize>>();
        let root = 0;
        que.push_back(root);
        dep[root] = 0;
        par[root] = root;
        while let Some(u) = que.pop_front() {
            for &v in adj[u].iter() {
                if dep[v] == inf {
                    dep[v] = dep[u] + 1;
                    par[v] = u;
                    que.push_back(v);
                }
            }
        }
        assert!(dep.iter().all(|d| *d != inf));

        let nn = n.next_power_of_two().trailing_zeros() as usize;
        let mut dp = vec![vec![root; n]; nn]; // beyond root is root
        dp[0].clone_from_slice(&par);
        for i in 1..nn {
            for u in 0..n {
                dp[i][u] = dp[i - 1][dp[i - 1][u]];
            }
        }
        Self { root, dep, dp }
    }

    fn kth_par(&self, mut u: usize, k: usize) -> usize {
        for i in 0..self.dp.len() {
            if (k >> i) & 1 == 1 {
                u = self.dp[i][u];
            }
        }
        u
    }

    fn lca(&self, mut u: usize, mut v: usize) -> usize {
        // Make u lower than v
        if self.dep[u] < self.dep[v] {
            (u, v) = (v, u);
        }
        // Make u, v same depth
        u = self.kth_par(u, self.dep[u] - self.dep[v]);
        if u == v {
            return u;
        }
        // Increment binary search to find
        // the topmost node that is not common ancestor
        for i in (0..self.dp.len()).rev() {
            if self.dp[i][u] != self.dp[i][v] {
                u = self.dp[i][u];
                v = self.dp[i][v];
            }
        }
        self.dp[0][u]
    }

    fn dist(&self, u: usize, v: usize) -> usize {
        let lca = self.lca(u, v);
        self.dep[u] + self.dep[v] - 2 * self.dep[lca]
    }
}
```

[ABC209D](https://atcoder.jp/contests/abc209/submissions/49833365)