# LazySegTree

```rust
struct Node;
impl SegTrait for Node {
    type S = usize;
    type F = usize;
    fn default_data() -> Self::S {
        0
    }
    fn default_lazy() -> Self::F {
        0
    }
    fn op(a: Self::S, b: Self::S) -> Self::S {
        a.max(b)
    }
    fn apply_lazy(lazy: Self::F, data: Self::S, l: usize, r: usize) -> Self::S {
        data + lazy
    }
    fn merge_lazy(parent: Self::F, child: Self::F) -> Self::F {
        parent + child
    }
}

trait SegTrait {
    type S: Clone + PartialEq + std::fmt::Debug;
    type F: Clone + PartialEq + std::fmt::Debug;
    fn default_data() -> Self::S;
    fn default_lazy() -> Self::F;
    fn op(a: Self::S, b: Self::S) -> Self::S;
    fn apply_lazy(lazy: Self::F, data: Self::S, l: usize, r: usize) -> Self::S;
    fn merge_lazy(parent: Self::F, child: Self::F) -> Self::F;
}

struct SegTree<T: SegTrait> {
    nn: usize,
    data: Vec<T::S>,
    lazy: Vec<T::F>,
}

impl<T: SegTrait> SegTree<T> {
    fn new(n: usize) -> Self {
        let nn = n.next_power_of_two();
        let data = vec![T::default_data(); 2 * nn];
        let lazy = vec![T::default_lazy(); 2 * nn];
        Self { nn, data, lazy }
    }

    fn from_vec(arr: &Vec<T::S>) -> Self {
        let nn = arr.len().next_power_of_two();
        let mut data = vec![T::default_data(); 2 * nn];
        let lazy = vec![T::default_lazy(); 2 * nn];
        let s = nn - 1;
        let t = s + arr.len();
        data[s..t].clone_from_slice(arr);
        for u in (0..s).rev() {
            data[u] = T::op(data[2 * u + 1].clone(), data[2 * u + 2].clone());
        }
        Self { nn, data, lazy }
    }

    fn push(&mut self, u: usize, l: usize, r: usize) {
        if self.lazy[u] != T::default_lazy() {
            let (m, lch, rch) = ((l + r) / 2, 2 * u + 1, 2 * u + 2);
            self.data[lch] = T::apply_lazy(self.lazy[u].clone(), self.data[lch].clone(), l, m);
            self.data[rch] = T::apply_lazy(self.lazy[u].clone(), self.data[rch].clone(), m, r);
            self.lazy[lch] = T::merge_lazy(self.lazy[u].clone(), self.lazy[lch].clone());
            self.lazy[rch] = T::merge_lazy(self.lazy[u].clone(), self.lazy[rch].clone());
            self.lazy[u] = T::default_lazy();
        }
    }

    fn query(&mut self, a: usize, b: usize, u: usize, l: usize, r: usize) -> T::S {
        // l..r has no intersection with a..b
        if l >= b || r <= a {
            return T::default_data();
        }
        // l..r is inside a..b
        if l >= a && r <= b {
            return self.data[u].clone();
        }
        // partially intersect
        let (m, lch, rch) = ((l + r) / 2, 2 * u + 1, 2 * u + 2);
        self.push(u, l, r);
        T::op(self.query(a, b, lch, l, m), self.query(a, b, rch, m, r))
    }

    fn modify(&mut self, a: usize, b: usize, x: T::F, u: usize, l: usize, r: usize) {
        // l..r has no intersection with a..b
        if l >= b || r <= a {
            return;
        }
        // l..r is inside a..b
        if l >= a && r <= b {
            self.data[u] = T::apply_lazy(x.clone(), self.data[u].clone(), l, r);
            self.lazy[u] = T::merge_lazy(x.clone(), self.lazy[u].clone());
            return;
        }
        // partially intersect
        let (m, lch, rch) = ((l + r) / 2, 2 * u + 1, 2 * u + 2);
        self.push(u, l, r);
        self.modify(a, b, x.clone(), lch, l, m);
        self.modify(a, b, x.clone(), rch, m, r);
        self.data[u] = T::op(self.data[lch].clone(), self.data[rch].clone());
    }

    fn show(&mut self, dep: usize, u: usize, l: usize, r: usize) {
        if u >= 2 * self.nn - 1 {
            return;
        }
        println!("{}{:?}", " ".repeat(dep * 3), self.data[u]);
        self.push(u, l, r);
        self.show(dep + 1, 2 * u + 1, l, (l + r) / 2);
        self.show(dep + 1, 2 * u + 2, (l + r) / 2, r);
    }

    // 0 0 0 1 1 1
    //       ^
    fn first_of<P: Fn(T::S, T::S, T::S) -> bool>(
        &mut self,
        ok: &P,
        pref: T::S,
        suff: T::S,
        u: usize,
        l: usize,
        r: usize,
    ) -> Option<usize> {
        if !ok(
            self.data[u].clone(),
            T::op(pref.clone(), self.data[u].clone()),
            T::op(suff.clone(), self.data[u].clone()),
        ) {
            return None;
        }
        if r - l == 1 {
            return Some(l);
        }
        self.push(u, l, r);
        let (m, lch, rch) = ((l + r) / 2, 2 * u + 1, 2 * u + 2);
        // pivot at left
        let new_pref = T::op(T::default_data(), pref.clone());
        let new_suff = T::op(suff.clone(), self.data[rch].clone());
        if let Some(idx) = self.first_of(ok, new_pref, new_suff, lch, l, m) {
            return Some(idx);
        }
        // pivot at right
        let new_pref = T::op(self.data[lch].clone(), pref.clone());
        let new_suff = T::op(suff.clone(), T::default_data());
        if let Some(idx) = self.first_of(ok, new_pref, new_suff, rch, m, r) {
            return Some(idx);
        }
        None
    }
}
```

Rust:
* [ABC382F](https://atcoder.jp/contests/abc382/submissions/60343888)
* [Practice2-K](https://atcoder.jp/contests/practice2/submissions/49674983)
* [ABC389F](https://atcoder.jp/contests/abc389/submissions/62924558): `find_first_of`

C++:
* [ABC382F](https://atcoder.jp/contests/abc382/submissions/61135848)
* [Practice2-K](https://atcoder.jp/contests/practice2/submissions/61135769)