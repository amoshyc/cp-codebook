# SPFA

```rust
#[derive(Debug)]
struct SPFA<T> {
    dis: Vec<T>,
    par: Vec<usize>,
    cnt: Vec<usize>,
}

impl<T: Copy + Ord + Default + std::ops::Add<Output = T>> SPFA<T> {
    fn new(n: usize, inf: T) -> Self {
        Self {
            dis: vec![inf; n],
            par: vec![!0; n],
            cnt: vec![0; n],
        }
    }

    fn spfa(&mut self, adj: &Vec<Vec<(usize, T)>>, sources: &Vec<usize>) {
        let n = adj.len();
        let mut que = std::collections::VecDeque::new();
        let mut inq = vec![false; n];

        for &s in sources.iter() {
            self.dis[s] = T::default();
            self.par[s] = s;
            que.push_back(s);
            inq[s] = true;
        }

        while let Some(u) = que.pop_front() {
            inq[u] = false;
            for &(v, w) in adj[u].iter() {
                let new_d = self.dis[u] + w;
                if new_d < self.dis[v] {
                    self.dis[v] = new_d;
                    self.par[v] = u;
                    self.cnt[v] += 1;
                    if !inq[v] && self.cnt[v] < n {
                        que.push_back(v);
                        inq[v] = true;
                    }
                }
            }
        }
    }
}
```
[CSES1673](https://cses.fi/paste/ce6ef3502f52e0f65b421f/)
