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

impl<T> Treap<T>
where
    T: std::cmp::PartialOrd + Clone + std::fmt::Display,
{
    fn new() -> Self {
        Self {
            root: None,
            lch: vec![],
            rch: vec![],
            siz: vec![],
            key: vec![],
            rnd: vec![],
            seed: 1234,
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

    fn size(&self, u: Option<usize>) -> usize {
        if let Some(u) = u {
            self.siz[u]
        } else {
            0
        }
    }

    fn pull(&mut self, u: usize) {
        self.siz[u] = 1 + self.size(self.lch[u]) + self.size(self.rch[u]);
    }

    fn split_by_size(&mut self, u: Option<usize>, size: usize) -> (Option<usize>, Option<usize>) {
        if let Some(u) = u {
            if size <= self.size(self.lch[u]) {
                // pivot is at lch
                //     u
                //   /   \
                // a+b   rch
                // ---------
                //  a   u
                //     / \
                //    b  rch
                let (a, b) = self.split_by_size(self.lch[u], size);
                self.lch[u] = b;
                self.pull(u);
                (a, Some(u))
            } else {
                // pivot is at rch
                //     u
                //   /   \
                // lch   a+b
                // ---------
                //    u    b
                //   / \
                // lch  a
                let (a, b) = self.split_by_size(self.rch[u], size - self.size(self.lch[u]) - 1);
                self.rch[u] = a;
                self.pull(u);
                (Some(u), b)
            }
        } else {
            (None, None)
        }
    }

    fn split_by_key(&mut self, u: Option<usize>, key: T) -> (Option<usize>, Option<usize>) {
        if let Some(u) = u {
            if key <= self.key[u] {
                let (a, b) = self.split_by_key(self.lch[u], key);
                self.lch[u] = b;
                self.pull(u);
                (a, Some(u))
            } else {
                let (a, b) = self.split_by_key(self.rch[u], key);
                self.rch[u] = a;
                self.pull(u);
                (Some(u), b)
            }
        } else {
            (None, None)
        }
    }

    fn merge(&mut self, a: Option<usize>, b: Option<usize>) -> Option<usize> {
        if let Some((a, b)) = a.zip(b) {
            if self.rnd[a] > self.rnd[b] {
                // merge b into rch of a
                //    a      b
                //   / \
                // lch rch
                // -------------
                //       a
                //     /   \
                //   lch  rch+b
                self.rch[a] = self.merge(self.rch[a], Some(b));
                self.pull(a);
                Some(a)
            } else {
                // merge a into lch of b
                //    a      b
                //          / \
                //        lch rch
                // -------------
                //       b
                //     /   \
                //  a+lch  rch
                self.lch[b] = self.merge(Some(a), self.lch[b]);
                self.pull(b);
                Some(b)
            }
        } else {
            a.or(b)
        }
    }

    fn insert_at_pos(&mut self, k: T, p: usize) {
        let node = self.new_node(k);
        let (t1, t2) = self.split_by_size(self.root, p);
        self.root = self.merge(t1, Some(node));
        self.root = self.merge(self.root, t2);
    }

    fn insert_key(&mut self, k: T) {
        let node = self.new_node(k.clone());
        let (t1, t2) = self.split_by_key(self.root, k);
        self.root = self.merge(t1, Some(node));
        self.root = self.merge(self.root, t2);
    }

    fn traverse<F: FnMut(Option<T>, usize)>(
        &self,
        u: Option<usize>,
        dep: usize,
        f: &mut F,
        mode: &str,
    ) {
        if let Some(u) = u {
            match mode {
                "pre" => {
                    f(Some(self.key[u].clone()), dep);
                    self.traverse(self.lch[u], dep + 1, f, mode);
                    self.traverse(self.rch[u], dep + 1, f, mode);
                }
                "in" => {
                    self.traverse(self.lch[u], dep + 1, f, mode);
                    f(Some(self.key[u].clone()), dep);
                    self.traverse(self.rch[u], dep + 1, f, mode);
                }
                "post" => {
                    self.traverse(self.lch[u], dep + 1, f, mode);
                    self.traverse(self.rch[u], dep + 1, f, mode);
                    f(Some(self.key[u].clone()), dep);
                }
                _ => (),
            }
        } else {
            f(None, dep);
        }
    }

    fn to_vec(&self) -> Vec<T> {
        let mut arr = vec![];
        self.traverse(
            self.root,
            0,
            &mut |key, dep| {
                if let Some(key) = key {
                    arr.push(key)
                }
            },
            "in",
        );
        arr
    }

    fn show(&self) {
        self.traverse(
            self.root,
            0,
            &mut |key, dep| {
                if let Some(key) = key {
                    println!("{}- {}", " ".repeat(dep * 2), key);
                } else {
                    println!("{}- None", " ".repeat(dep * 2));
                }
            },
            "pre",
        );
    }
}
```

- [ABC392F](https://atcoder.jp/contests/abc392/submissions/62575641): `split_by_size`
- [ABC392F](https://atcoder.jp/contests/abc392/submissions/62587787): Python reference