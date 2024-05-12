# Treap

```rust
#[derive(Debug)]
struct Treap<T> {
    root: Option<usize>,
    lch: Vec<Option<usize>>,
    rch: Vec<Option<usize>>,
    siz: Vec<usize>,
    key: Vec<T>,
    rnd: Vec<u32>,
    seed: u32,
}

impl<T: std::cmp::PartialOrd + std::fmt::Debug + Clone> Treap<T> {
    fn new() -> Self {
        Self {
            root: None,
            lch: vec![],
            rch: vec![],
            siz: vec![],
            key: vec![],
            rnd: vec![],
            seed: 123,
        }
    }

    fn new_node(&mut self, k: T) -> usize {
        let mut rnd = self.seed;
        rnd ^= rnd << 13;
        rnd ^= rnd >> 17;
        rnd ^= rnd << 5;
        self.seed = rnd;

        let id = self.key.len();
        self.lch.push(None);
        self.rch.push(None);
        self.siz.push(1);
        self.key.push(k);
        self.rnd.push(rnd);
        id
    }

    fn size(&self, t: Option<usize>) -> usize {
        if let Some(t) = t {
            self.siz[t]
        } else {
            0
        }
    }

    fn pull(&mut self, t: usize) {
        self.siz[t] = 1 + self.size(self.lch[t]) + self.size(self.rch[t]);
    }

    fn split_by_key(&mut self, t: Option<usize>, k: T) -> (Option<usize>, Option<usize>) {
        if let Some(t) = t {
            if k <= self.key[t] {
                let (a, b) = self.split_by_key(self.lch[t], k);
                self.lch[t] = b;
                self.pull(t);
                (a, Some(t))
            } else {
                let (a, b) = self.split_by_key(self.rch[t], k);
                self.rch[t] = a;
                self.pull(t);
                (Some(t), b)
            }
        } else {
            (None, None)
        }
    }

    fn merge(&mut self, a: Option<usize>, b: Option<usize>) -> Option<usize> {
        if let (Some(a), Some(b)) = (a, b) {
            if self.rnd[a] > self.rnd[b] {
                self.rch[a] = self.merge(self.rch[a], Some(b));
                self.pull(a);
                Some(a)
            } else {
                self.lch[b] = self.merge(Some(a), self.lch[b]);
                self.pull(b);
                Some(b)
            }
        } else {
            a.or(b)
        }
    }

    fn insert(&mut self, t: Option<usize>, k: T) -> Option<usize> {
        let node = self.new_node(k.clone());
        let (t1, t2) = self.split_by_key(t, k);
        let res = self.merge(t1, Some(node));
        let res = self.merge(res, t2);
        res
    }

    fn print(&self, t: Option<usize>, dep: usize) {
        let margin = " ".repeat(dep * 3);
        if let Some(t) = t {
            print!("{}(", margin);
            print!(
                "\n{} k={:?}, r={}, s={}",
                margin, self.key[t], self.rnd[t], self.siz[t]
            );
            print!("\n{} lch=\n", margin);
            self.print(self.lch[t], dep + 1);
            print!("\n{} rch=\n", margin);
            self.print(self.rch[t], dep + 1);
            print!("\n{})", margin);
        } else {
            print!("{}None", margin);
        }
    }
}
```

<https://atcoder.jp/contests/abc231/submissions/43081575>